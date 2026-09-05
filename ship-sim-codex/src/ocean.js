import * as THREE from 'three';
import { radialTexture } from './textures.js';

const MAX_RIPPLES = 28;
const RIPPLE_LIFE = 5.0;

const OCEAN_VERT = `
uniform float uTime;
uniform vec3 uShipPos;
uniform vec3 uShipDir;
uniform int uRippleCount;
uniform vec3 uRipplePos[${MAX_RIPPLES}];
uniform vec4 uRippleParam[${MAX_RIPPLES}]; // x:startTime, y:amp, z:expandSpeed, w:sharpness

varying vec3 vWorld;
varying vec3 vNormal;
varying float vFoam;

float heightOf(vec2 p) {
  float h = 0.0;
  h += 0.42 * sin(dot(p, vec2(0.62, 0.78)) * 0.55 - uTime * 1.25);
  h += 0.24 * sin(dot(p, vec2(-0.42, 0.91)) * 0.95 + uTime * 1.90);
  h += 0.13 * sin(dot(p, vec2(0.97, -0.24)) * 1.55 + uTime * 0.75);
  h += 0.08 * sin(dot(p, vec2(0.12, 0.99)) * 2.35 + uTime * 2.60);
  h += 0.05 * sin(dot(p, vec2(-0.80, 0.60)) * 3.30 - uTime * 3.50);
  return h;
}

vec2 waveGradient(vec2 p) {
  float e = 5.0;
  return vec2(
    heightOf(p + vec2(e, 0.0)) - heightOf(p - vec2(e, 0.0)),
    heightOf(p + vec2(0.0, e)) - heightOf(p - vec2(0.0, e))
  ) / (2.0 * e);
}

void main() {
  vec3 wp = (modelMatrix * vec4(position, 1.0)).xyz;
  vec2 p = wp.xz;

  float h = heightOf(p);

  // Click ripples — expanding rings that gently die out.
  for (int i = 0; i < ${MAX_RIPPLES}; i++) {
    if (i >= uRippleCount) break;
    vec3 c = uRipplePos[i];
    vec4 pa = uRippleParam[i];
    float age = uTime - pa.x;
    if (age < 0.0 || age > ${RIPPLE_LIFE.toFixed(1)} || pa.y < 0.001) continue;
    vec2 d = p - c.xz;
    float dist = length(d);
    float radius = pa.z * age;
    float env = smoothstep(0.0, 0.7, age) * (1.0 - smoothstep(${(RIPPLE_LIFE * 0.45).toFixed(2)}, ${RIPPLE_LIFE.toFixed(1)}, age));
    float band = exp(-pow(abs(dist - radius) * pa.w, 2.0));
    float att = 1.0 / (1.0 + dist * 0.06);
    h += pa.y * env * band * att;
  }

  // Ship wake: bow spray + a widening V of froth behind the hull.
  vec2 rel = p - uShipPos.xz;
  float fwd = dot(rel, uShipDir.xz);
  float side = rel.x * -uShipDir.z + rel.y * uShipDir.x;
  float wake = 0.0;

  float bow = (1.0 - smoothstep(0.0, 6.0, fwd)) * (0.5 - smoothstep(0.2, 1.0, abs(side)));
  wake += bow * 0.55;

  float back = -fwd;
  if (back > 0.0) {
    float spread = 1.1 + back * 0.016;
    float edge = 1.0 - smoothstep(spread, spread + 1.3, abs(side));
    edge *= 1.0 - smoothstep(10.0, 85.0, back);
    edge *= 0.55 + 0.45 * sin(back * 1.4 - uTime * 6.0);
    wake += edge;
  }

  float hullLine = ((1.0 - smoothstep(0.25, 1.6, abs(side))) *
    ((1.0 - smoothstep(0.0, 6.0, abs(fwd))) * smoothstep(-14.0, -2.0, fwd) * 0.4 +
     (1.0 - smoothstep(-20.0, 0.0, fwd)) * 0.6));
  wake += hullLine * 0.3;

  h += wake * 0.4;
  vFoam = clamp(wake * 1.4, 0.0, 1.0);

  vec4 localPos = vec4(position.x, h, position.z, 1.0);
  vWorld = (modelMatrix * localPos).xyz;
  vNormal = normalize(vec3(-waveGradient(p), 1.0));
  gl_Position = projectionMatrix * (modelViewMatrix * localPos);
}
`;

const OCEAN_FRAG = `
uniform vec3 uSunDir;
uniform vec3 uSunColor;
uniform float uSunIntensity;
uniform float uDayFactor;
uniform vec3 uDeepDay;
uniform vec3 uDeepNight;
uniform vec3 uSkyColor;
uniform vec3 uHorizonColor;
uniform vec3 uFogColor;
uniform float uFogNear;
uniform float uFogFar;

varying vec3 vWorld;
varying vec3 vNormal;
varying float vFoam;

vec3 aces(vec3 x) {
  const float a = 2.51, b = 0.03, c = 2.43, d = 0.59, e = 0.14;
  return clamp((x * (a * x + b)) / (x * (c * x + d) + e), 0.0, 1.0);
}

void main() {
  vec3 V = normalize(cameraPosition - vWorld);
  vec3 N = normalize(vNormal);

  vec3 deep = mix(uDeepNight, uDeepDay, uDayFactor);
  float upness = clamp(V.y * 1.6 + 0.12, 0.0, 1.0);
  vec3 skyRef = mix(uHorizonColor, uSkyColor, upness);
  float fres = pow(1.0 - max(dot(N, V), 0.0), 3.0);
  vec3 col = mix(deep, skyRef, fres);

  // Crisp sun glint and a broad glitter path toward the reflection.
  vec3 R = reflect(-uSunDir, N);
  float spec = pow(max(dot(R, V), 0.0), 230.0);
  float glitter = pow(max(dot(R, V), 0.0), 26.0);
  col += uSunColor * (spec * 4.0 + glitter * 0.4) * uSunIntensity * uDayFactor;

  // Whitecaps on sharp crests + ship foam.
  float slope = 1.0 - N.y;
  float crest = smoothstep(0.34, 0.58, slope) * 0.16;
  col = mix(col, vec3(0.96, 0.985, 1.0), clamp(vFoam + crest, 0.0, 1.0));

  // Fade into the horizon fog.
  float dist = length(cameraPosition - vWorld);
  float fog = smoothstep(uFogNear, uFogFar, dist);
  col = mix(col, uFogColor, fog);

  col = aces(col * 1.25);
  col = pow(col, vec3(1.0 / 2.2));
  gl_FragColor = vec4(col, 1.0);
}
`;

/**
 * Builds a circular ocean disc whose rings are packed densely near the middle
 * (where the camera sits) so waves stay crisp right around the viewpoint.
 */
function makeOceanGeometry(radius, rings, sectors) {
  const vcount = (rings + 1) * sectors;
  const positions = new Float32Array(vcount * 3);
  const indices = [];
  for (let r = 0; r <= rings; r++) {
    const rad = radius * Math.pow(r / rings, 2);
    for (let s = 0; s < sectors; s++) {
      const a = (s / sectors) * Math.PI * 2;
      const i = r * sectors + s;
      positions[i * 3 + 0] = Math.cos(a) * rad;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = Math.sin(a) * rad;
    }
  }
  for (let r = 0; r < rings; r++) {
    for (let s = 0; s < sectors; s++) {
      const s1 = (s + 1) % sectors;
      const a = r * sectors + s;
      const b = (r + 1) * sectors + s;
      const c = (r + 1) * sectors + s1;
      const d = r * sectors + s1;
      indices.push(a, b, d, b, c, d);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  g.setIndex(indices);
  return g;
}

export class Ocean {
  constructor() {
    this.time = 0;

    this.ripples = [];
    for (let i = 0; i < MAX_RIPPLES; i++) {
      this.ripples.push({
        enabled: false,
        start: 0,
        amp: 0,
        speed: 0,
        sharp: 0,
      });
    }
    this.rippleCursor = 0;
    this.rippleCount = 0;
    this.rippleStrength = 1.0;

    // Splash particles for click feedback.
    this.splashTex = radialTexture({ size: 128, inner: 'rgba(255,255,255,1)', outer: 'rgba(240,250,255,0)' });
    this.splashes = [];

    this.uniforms = {
      uTime: { value: 0 },
      uShipPos: { value: new THREE.Vector3(0, 0, 0) },
      uShipDir: { value: new THREE.Vector3(1, 0, 0) },
      uRippleCount: { value: 0 },
      uRipplePos: { value: Array.from({ length: MAX_RIPPLES }, () => new THREE.Vector3()) },
      uRippleParam: { value: Array.from({ length: MAX_RIPPLES }, () => new THREE.Vector4()) },
      uSunDir: { value: new THREE.Vector3(0.4, 0.6, 0.8).normalize() },
      uSunColor: { value: new THREE.Color(1.0, 0.85, 0.6) },
      uSunIntensity: { value: 1.0 },
      uDayFactor: { value: 1.0 },
      uDeepDay: { value: new THREE.Color(0.03, 0.22, 0.34) },
      uDeepNight: { value: new THREE.Color(0.006, 0.02, 0.05) },
      uSkyColor: { value: new THREE.Color(0.3, 0.5, 0.9) },
      uHorizonColor: { value: new THREE.Color(0.9, 0.93, 0.98) },
      uFogColor: { value: new THREE.Color(0.75, 0.82, 0.92) },
      uFogNear: { value: 520 },
      uFogFar: { value: 1600 },
    };

    this.geometry = makeOceanGeometry(2400, 220, 512);
    this.material = new THREE.ShaderMaterial({
      vertexShader: OCEAN_VERT,
      fragmentShader: OCEAN_FRAG,
      uniforms: this.uniforms,
      side: THREE.DoubleSide,
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.frustumCulled = false;
    this.mesh.matrixAutoUpdate = false;

    this.group = new THREE.Group();
    this.group.add(this.mesh);
    this.group.add(this.splashHolder = new THREE.Group());
  }

  setLighting(state) {
    const u = this.uniforms;
    u.uSunDir.value.copy(state.sunDir);
    u.uSunColor.value.copy(state.sunColor);
    u.uSunIntensity.value = state.sunIntensity;
    u.uDayFactor.value = state.dayFactor;
    u.uDeepDay.value.copy(state.deepDay);
    u.uDeepNight.value.copy(state.deepNight);
    u.uSkyColor.value.copy(state.skyColor);
    u.uHorizonColor.value.copy(state.horizonColor);
    u.uFogColor.value.copy(state.fogColor);
    u.uFogNear.value = state.fogNear;
    u.uFogFar.value = state.fogFar;
  }

  follow(camera) {
    this.mesh.position.set(camera.position.x, 0, camera.position.z);
    this.mesh.updateMatrix();
  }

  addRipple(point, strength) {
    const s = (strength == null ? this.rippleStrength : strength);
    const c = this.rippleCursor;
    this.rippleCursor = (this.rippleCursor + 1) % MAX_RIPPLES;
    const r = this.ripples[c];
    r.enabled = true;
    r.start = this.time;
    r.amp = 0.55 * s;
    r.speed = 9.0;
    r.sharp = 0.32;
    const u = this.uniforms;
    u.uRipplePos.value[c].set(point.x, 0, point.z);
    u.uRippleParam.value[c].set(r.start, r.amp, r.speed, r.sharp);
    if (this.rippleCount < MAX_RIPPLES) this.rippleCount++;
    u.uRippleCount.value = this.rippleCount;

    this.spawnSplash(point.x, point.z, s);
  }

  spawnSplash(x, z, s) {
    const count = 4 + Math.round(4 * s);
    for (let i = 0; i < count; i++) {
      const ang = Math.random() * Math.PI * 2;
      const mat = new THREE.SpriteMaterial({
        map: this.splashTex,
        color: 0xffffff,
        transparent: true,
        opacity: 0.9,
        depthWrite: false,
        depthTest: true,
      });
      const spr = new THREE.Sprite(mat);
      spr.position.set(x, 0.2, z);
      spr.scale.setScalar(1.5);
      this.splashHolder.add(spr);
      this.splashes.push({
        sprite: spr,
        vel: new THREE.Vector3(Math.cos(ang), 2.2 + Math.random() * 1.8, Math.sin(ang)),
        life: 0,
        max: 0.85 + Math.random() * 0.35,
      });
    }
  }

  update(dt) {
    this.time += dt;
    this.uniforms.uTime.value = this.time;

    const u = this.uniforms;
    // advance ripple ages already encoded via uTime; nothing else to do live.

    // Advance splashes.
    for (let i = this.splashes.length - 1; i >= 0; i--) {
      const sp = this.splashes[i];
      sp.life += dt;
      const p = sp.sprite.position;
      p.x += sp.vel.x * dt;
      p.y += sp.vel.y * dt;
      p.z += sp.vel.z * dt;
      sp.vel.y -= 9.0 * dt;
      p.y = Math.max(p.y, 0.15);
      const t = sp.life / sp.max;
      if (t >= 1) {
        this.splashHolder.remove(sp.sprite);
        sp.sprite.material.dispose();
        this.splashes.splice(i, 1);
        continue;
      }
      sp.sprite.material.opacity = Math.max(0, 1 - t) * 0.85;
      sp.sprite.scale.setScalar(1.5 + t * 5.5);
    }
  }
}
