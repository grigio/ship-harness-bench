import * as THREE from 'three';
import { radialTexture, cloudTexture } from './textures.js';

function smoothstep(a, b, x) {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
}

const SKY_VERT = `
varying vec3 vDir;
void main() {
  vDir = normalize(position);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const SKY_FRAG = `
uniform vec3 uSunDir;
uniform vec3 uSunColor;
uniform float uSunEl;
uniform float uNightFactor;
uniform vec3 uZenithDay;
uniform vec3 uZenithNight;
uniform vec3 uHorizonDay;
uniform vec3 uHorizonNight;
uniform vec3 uSunsetColor;
varying vec3 vDir;

vec3 aces(vec3 x) {
  const float a = 2.51, b = 0.03, c = 2.43, d = 0.59, e = 0.14;
  return clamp((x * (a * x + b)) / (x * (c * x + d) + e), 0.0, 1.0);
}

void main() {
  vec3 dir = normalize(vDir);
  float y = dir.y;
  float day = 1.0 - uNightFactor;

  vec3 zenith = mix(uZenithNight, uZenithDay, day);
  vec3 horizon = mix(uHorizonNight, uHorizonDay, day);

  // Warm sunset/sunrise band right along the horizon.
  float golden = exp(-abs(uSunEl + 0.04) * 5.0);
  horizon = mix(horizon, uSunsetColor * 0.85, golden * 0.9 * day);

  float hf = pow(clamp(y, 0.0, 1.0), 0.8);
  vec3 col = mix(horizon, zenith, hf);

  // Darken the dome under the horizon so the sea silhouette stays clean.
  col = mix(col, horizon * 0.18, 1.0 - smoothstep(-0.10, -0.02, y));

  // Sun glow & halo.
  float d = max(dot(dir, uSunDir), 0.0);
  if (day > 0.001) {
    float core = pow(d, 320.0) * 1.7 * day;
    float glow = pow(d, 10.0) * 0.5 * day;
    float halo = pow(d, 2.4) * 0.32 * day;
    vec3 sunTint = uSunColor;
    col += sunTint * (core + glow) * (0.35 + 1.5 * clamp(1.0 - abs(uSunEl) * 0.35, 0.0, 1.0));
    col += sunTint * halo * 0.16;
  }

  col = aces(col * 1.1);
  col = pow(col, vec3(1.0 / 2.2));
  gl_FragColor = vec4(col, 1.0);
}
`;

export class SkyDome {
  constructor(scene) {
    this.scene = scene;
    this.smoothstep = smoothstep;

    this.uniforms = {
      uSunDir: { value: new THREE.Vector3(0, 0.6, 0.8).normalize() },
      uSunColor: { value: new THREE.Color(0xffb066) },
      uSunEl: { value: 0.4 },
      uNightFactor: { value: 0 },
      uZenithDay: { value: new THREE.Color(0x2f6fc9) },
      uZenithNight: { value: new THREE.Color(0x04060f) },
      uHorizonDay: { value: new THREE.Color(0xcfe9ff) },
      uHorizonNight: { value: new THREE.Color(0x0a1226) },
      uSunsetColor: { value: new THREE.Color(0xff7e33) },
    };

    const skyGeo = new THREE.SphereGeometry(4000, 48, 28);
    const skyMat = new THREE.ShaderMaterial({
      vertexShader: SKY_VERT,
      fragmentShader: SKY_FRAG,
      uniforms: this.uniforms,
      side: THREE.BackSide,
      depthWrite: false,
      fog: false,
    });
    this.sky = new THREE.Mesh(skyGeo, skyMat);
    this.sky.frustumCulled = false;
    this.sky.renderOrder = -10;
    scene.add(this.sky);

    // Sun disc + halo
    this.sunTex = radialTexture({ size: 256, inner: 'rgba(255,240,200,0.9)', midColor: 'rgba(255,190,110,0.35)', outer: 'rgba(255,150,60,0)' });
    this.sunMesh = new THREE.Mesh(
      new THREE.SphereGeometry(70, 24, 24),
      new THREE.MeshBasicMaterial({ color: 0xfff2c4, fog: false })
    );
    this.sunHalo = new THREE.Sprite(new THREE.SpriteMaterial({
      map: this.sunTex,
      color: 0xffb066,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }));
    this.sunHalo.scale.setScalar(760);
    scene.add(this.sunMesh);
    scene.add(this.sunHalo);

    // Moon
    this.moonMesh = new THREE.Mesh(
      new THREE.SphereGeometry(34, 20, 20),
      new THREE.MeshBasicMaterial({ color: 0xe8ecf5, fog: false })
    );
    this.moonHalo = new THREE.Sprite(new THREE.SpriteMaterial({
      map: this.sunTex.clone(),
      color: 0xaebfe0,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }));
    this.moonHalo.scale.setScalar(420);
    scene.add(this.moonMesh);
    scene.add(this.moonHalo);

    // Stars
    this.starMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 2.6,
      sizeAttenuation: false,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const starCount = 900;
    const starPos = new Float32Array(starCount * 3);
    const starCol = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const az = Math.random() * Math.PI * 2;
      const elev = Math.asin(Math.random() * 0.98 + 0.02);
      const r = 3600;
      starPos[i * 3 + 0] = Math.cos(elev) * Math.cos(az) * r;
      starPos[i * 3 + 1] = Math.sin(elev) * r;
      starPos[i * 3 + 2] = Math.cos(elev) * Math.sin(az) * r;
      const warm = 0.75 + Math.random() * 0.25;
      starCol[i * 3 + 0] = 1;
      starCol[i * 3 + 1] = Math.random() < 0.3 ? 0.86 + warm * 0.1 : 0.95 + warm * 0.05;
      starCol[i * 3 + 2] = Math.random() < 0.3 ? 0.8 + warm * 0.15 : 0.92 + warm * 0.06;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starCol, 3));
    this.starMat.vertexColors = true;
    this.stars = new THREE.Points(starGeo, this.starMat);
    this.stars.frustumCulled = false;
    this.stars.renderOrder = -5;
    scene.add(this.stars);

    // Clouds
    this.cloudTex = cloudTexture(512);
    this.clouds = [];
    for (let i = 0; i < 14; i++) {
      const mat = new THREE.SpriteMaterial({
        map: this.cloudTex,
        color: 0xffffff,
        transparent: true,
        opacity: 0.0,
        depthWrite: false,
        fog: false,
      });
      const spr = new THREE.Sprite(mat);
      const r = 200 + Math.random() * 1700;
      const a = Math.random() * Math.PI * 2;
      spr.position.set(Math.cos(a) * r, 190 + Math.random() * 190, Math.sin(a) * r);
      const sc = 300 + Math.random() * 320;
      spr.scale.setScalar(sc);
      spr.renderOrder = 12;
      scene.add(spr);
      this.clouds.push({ sprite: spr, baseScale: sc, baseOpacity: 0.45 + Math.random() * 0.45, wind: 1.6 + Math.random() * 1.6 });
    }

    // Lighting rig
    this.sunLight = new THREE.DirectionalLight(0xfff0d0, 1.0);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.mapSize.set(2048, 2048);
    this.sunLight.shadow.camera.left = -70;
    this.sunLight.shadow.camera.right = 70;
    this.sunLight.shadow.camera.top = 70;
    this.sunLight.shadow.camera.bottom = -70;
    this.sunLight.shadow.camera.near = 10;
    this.sunLight.shadow.camera.far = 400;
    this.sunLight.shadow.bias = -0.0006;
    scene.add(this.sunLight);
    scene.add(this.sunLight.target);

    this.moonLight = new THREE.DirectionalLight(0x9db4d6, 0);
    scene.add(this.moonLight);

    this.hemi = new THREE.HemisphereLight(0x9fd4ff, 0x0a2a3a, 0.55);
    scene.add(this.hemi);

    this.ambient = new THREE.AmbientLight(0xffffff, 0.12);
    scene.add(this.ambient);

    this.sunPos = new THREE.Vector3();
    this.moonPos = new THREE.Vector3();
    this.sunTmpColor = new THREE.Color();
  }

  _dateColors(hour) {
    const el = Math.sin(((hour - 6) / 24) * Math.PI * 2);
    const az = (hour / 24) * Math.PI * 2 - Math.PI / 2;

    const cd = Math.hypot(Math.cos(az) * Math.max(0, 1 - el * el), Math.sin(az) * Math.max(0, 1 - el * el)) || 0;
    const sx = Math.cos(az) * Math.max(0, 1 - el * el) * 3000;
    const sy = el * 3000;
    const sz = Math.sin(az) * Math.max(0, 1 - el * el) * 3000;
    this.sunPos.set(sx, sy, sz).normalize().multiplyScalar(3000);

    const moonEl = Math.sin(((hour - 18) / 24) * Math.PI * 2);
    const mh = Math.max(0, 1 - moonEl * moonEl);
    this.moonPos.set(
      Math.cos(az + Math.PI) * mh,
      moonEl,
      Math.sin(az + Math.PI) * mh
    ).normalize().multiplyScalar(2800);

    return { el, az, moonEl, sx, sy, sz };
  }

  update(hour, dt) {
    const d = this._dateColors(((hour % 24) + 24) % 24);
    const el = d.el;
    const dayFactor = smoothstep(-0.07, 0.28, el);
    const nightFactor = 1 - dayFactor;
    const golden = Math.exp(-Math.abs(el) * 4.2);

    // Colors
    const u = this.uniforms;
    u.uSunDir.value.copy(this.sunPos.clone().normalize());
    u.uSunEl.value = el;
    u.uNightFactor.value = nightFactor;

    const sunColor = this.sunTmpColor.setRGB(
      0.68 + 0.32 * smoothstep(0.04, 0.6, el),
      0.42 + 0.55 * smoothstep(0.04, 0.6, el),
      0.28 + 0.68 * smoothstep(0.04, 0.6, el)
    );
    u.uSunColor.value.copy(sunColor);

    const sunIntensity = Math.min(1.45, Math.max(0, 1.25 * (el * 1.5 + 0.18)));

    // Sky / horizon derived colors
    const zenith = u.uZenithNight.value.clone().lerp(u.uZenithDay.value, dayFactor);
    const horizon = u.uHorizonNight.value.clone().lerp(u.uHorizonDay.value, dayFactor);
    const warm = smoothstep(-0.1, 0.0, el) * (1 - smoothstep(0.0, 0.45, el));
    horizon.lerp(u.uSunsetColor.value.clone().multiplyScalar(0.85), warm * 0.9 * Math.max(dayFactor, 0.4));

    const fogColor = horizon.clone();

    // Sun node
    const visible = el > -0.02;
    this.sunMesh.visible = visible;
    this.sunHalo.visible = visible;
    if (visible) {
      this.sunMesh.position.copy(this.sunPos);
      this.sunHalo.position.copy(this.sunPos);
      this.sunHalo.material.color.copy(sunColor);
      this.sunHalo.material.opacity = 0.35 + 0.3 * golden;
      const discColor = el < 0.25 ? sunColor.clone().lerp(new THREE.Color(0xff5a1a), (0.25 - el) * 1.2) : sunColor;
      this.sunMesh.material.color.lerpColors(this.sunMesh.material.color, discColor, 0.9);
      this.sunMesh.material.color.copy(discColor);
    }

    // Moon node
    const moonDay = smoothstep(-0.25, -0.08, el);
    this.moonMesh.visible = d.moonEl > -0.05 && moonDay > 0.05;
    if (this.moonMesh.visible) {
      this.moonMesh.position.copy(this.moonPos);
      this.moonHalo.position.copy(this.moonPos);
      this.moonHalo.material.opacity = 0.3 * moonDay;
    }

    // Stars
    this.starMat.opacity = nightFactor * 0.9;
    this.stars.visible = nightFactor > 0.02;

    // Clouds drift
    const wind = 2.5;
    for (const c of this.clouds) {
      c.sprite.position.x += wind * dt;
      if (c.sprite.position.x > 2100) c.sprite.position.x = -2100;
      const p = c.sprite.position;
      c.sprite.material.opacity = c.baseOpacity * (0.3 + 0.7 * dayFactor) * (0.75 + 0.25 * Math.sin(p.x * 0.004 + p.z * 0.003 + 1));
      c.sprite.material.color.lerpColors(new THREE.Color(0x1b2440), new THREE.Color(0xffffff), dayFactor);
    }

    // Lights
    this.sunLight.position.copy(this.sunPos);
    this.sunLight.color.copy(sunColor);
    this.sunLight.intensity = sunIntensity;

    this.hemi.color.lerpColors(new THREE.Color(0x20304f), new THREE.Color(0x9fd4ff), dayFactor);
    this.hemi.groundColor.lerpColors(new THREE.Color(0x0a1a28), new THREE.Color(0x556b74), dayFactor);
    this.hemi.intensity = 0.12 + 0.55 * dayFactor + golden * 0.18;

    this.ambient.intensity = 0.05 + 0.28 * dayFactor;

    const moonIntensity = 0.085 * nightFactor * smoothstep(0.0, 0.5, d.moonEl);
    this.moonLight.intensity = moonIntensity;
    this.moonLight.position.copy(this.moonPos);

    // background clear color (should never be visible, but tidy)
    this.scene.background = null;

    return {
      sunDir: u.uSunDir.value,
      sunColor: sunColor,
      sunIntensity: sunIntensity,
      dayFactor: dayFactor,
      moonIntensity: moonIntensity,
      deepDay: new THREE.Color(0x0b3a58),
      deepNight: new THREE.Color(0x050d1c),
      skyColor: zenith,
      horizonColor: horizon,
      fogColor: fogColor,
      fogNear: 520,
      fogFar: 1600,
    };
  }
}
