// Adrift — a relaxing 3D ship simulator
// Three.js: day/night cycle, sun on the horizon, click the sea to make waves.
import * as THREE from 'three';

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------
const DAY_LENGTH = 180;          // seconds for a full day/night cycle
const T0_PHASE = 0.36;           // start the day near morning (0=midnight .. 1)
const SEA_SIZE = 260;            // water plane size in world units
const SEA_SEGS = 220;
const MAX_RIPPLES = 16;
const RIPPLE_SPEED = 11;
const RIPPLE_LIFE = 7;
const RIPPLE_AMP = 0.55;
const SHIP_SAIL_SPEED = 0.7;    // world units / s
const CAM_DIST = 11;

// Base swell: components {dx, dz, k, w, a}.  dx*dz is a unit direction.
const SWELL = [
  { dx: 1.0,        dz: 0.0,       k: 0.055, w: 0.55, a: 0.38 },
  { dx: 0.707,      dz: 0.707,     k: 0.082, w: 0.72, a: 0.24 },
  { dx: -0.384,     dz: 0.923,     k: 0.115, w: 0.95, a: 0.13 },
  { dx: 0.222,      dz: -0.975,    k: 0.16,  w: 1.18, a: 0.06 },
];

// ---------------------------------------------------------------------------
// Wave math — shared between the GLSL shader and the JS (ship motion).
// The shader and JS must agree, so keep these in sync.
// ---------------------------------------------------------------------------
function swellHeightJS(px, pz, t) {
  let h = 0;
  for (const c of SWELL) {
    h += c.a * Math.sin((px * c.dx + pz * c.dz) * c.k + t * c.w);
  }
  return h;
}
function rippleHeightJS(px, pz, t, ripples) {
  let h = 0;
  for (const r of ripples) {
    const age = t - r.t0;
    if (age <= 0 || age >= RIPPLE_LIFE) continue;
    const d = Math.hypot(px - r.x, pz - r.z);
    const u = age * RIPPLE_SPEED - d;          // distance behind the wave front
    if (u <= 0) continue;
    h += RIPPLE_AMP * Math.exp(-age * 0.55) * Math.exp(-u * 0.1) * Math.sin(u * 5.0);
  }
  return h;
}
function seaHeightJS(px, pz, t, ripples) {
  return swellHeightJS(px, pz, t) + rippleHeightJS(px, pz, t, ripples);
}

const SWELL_GLSL = `
  const int SWELL_N = ${SWELL.length};
  const vec4 SWELL[SWELL_N] = vec4[SWELL_N](
${SWELL.map(c => `    vec4(${c.dx}, ${c.dz}, ${c.k}, ${c.a})`).join(',\n')}
  );
`;

// ---------------------------------------------------------------------------
// Renderer / scene
// ---------------------------------------------------------------------------
const canvas = document.getElementById('scene');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x9db8d6, 90, 420);

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 3000);

// Lights
const hemi = new THREE.HemisphereLight(0xbfd8f0, 0x1a3550, 0.8);
scene.add(hemi);
const sunLight = new THREE.DirectionalLight(0xffe9c0, 2.2);
scene.add(sunLight);
sunLight.position.set(1, 0.3, 0.5);

// Palettes: [zenith, horizon] per phase
const P = {
  day:   { zen: new THREE.Color(0x3d7ec2), hor: new THREE.Color(0xcfe9f5), water: new THREE.Color(0x1a5c86), deep: new THREE.Color(0x0d3a5c), sun: new THREE.Color(0xfff4d6) },
  dusk:  { zen: new THREE.Color(0x2a3560), hor: new THREE.Color(0xffb37a), water: new THREE.Color(0x514a70), deep: new THREE.Color(0x2a2440), sun: new THREE.Color(0xffb066) },
  night: { zen: new THREE.Color(0x060b1e), hor: new THREE.Color(0x101a33), water: new THREE.Color(0x0d1626), deep: new THREE.Color(0x070d1a), sun: new THREE.Color(0x93a8d8) },
};
// ---------------------------------------------------------------------------
// Sky dome (gradient + stars) and sun / moon
// ---------------------------------------------------------------------------
const skyUniforms = {
  uZen: { value: new THREE.Color(0x3d7ec2) },
  uHor: { value: new THREE.Color(0xcfe9f5) },
  uSunDir: { value: new THREE.Vector3(0, 0.3, -1).normalize() },
  uSunCol: { value: new THREE.Color(0xfff4d6) },
  uSunDisc: { value: 1 },
  uStars: { value: 0 },
  uTime: { value: 0 },
};
const sky = new THREE.Mesh(
  new THREE.SphereGeometry(900, 32, 24),
  new THREE.ShaderMaterial({
    uniforms: skyUniforms,
    side: THREE.BackSide,
    depthWrite: false,
    vertexShader: `
      varying vec3 vDir;
      void main() {
        vDir = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,
    fragmentShader: `
      uniform vec3 uZen; uniform vec3 uHor;
      uniform vec3 uSunDir; uniform vec3 uSunCol;
      uniform float uSunDisc; uniform float uStars; uniform float uTime;
      varying vec3 vDir;
      float hash13(vec3 p) {
        p = fract(p * vec3(0.1031, 0.1030, 0.0974));
        p *= 17.0;
        return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
      }
      void main() {
        vec3 v = normalize(vDir);
        float h = clamp(v.y, -0.05, 1.0);
        vec3 col = mix(uHor, uZen, pow(max(h, 0.0), 0.55));
        float sd = dot(v, uSunDir);
        col += uSunCol * pow(max(sd, 0.0), 900.0) * 2.2;   // disc
        col += uSunCol * pow(max(sd, 0.0), 7.0) * 0.35;      // warm halo
        if (uStars > 0.01 && v.y > 0.02) {
          vec3 g = floor(v * 130.0);
          float s = hash13(g);
          float b = smoothstep(0.986, 0.9995, s);
          float tw = 0.6 + 0.4 * sin(uTime * 2.0 + s * 40.0);
          col += vec3(1.0, 0.98, 0.9) * b * tw * uStars * smoothstep(0.02, 0.12, v.y);
        }
        gl_FragColor = vec4(col, 1.0);
      }`,
  })
);
sky.renderOrder = -10;
scene.add(sky);

// Sun glow sprite
function makeGlowTexture(inner, mid, outer) {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d');
  const grad = g.createRadialGradient(64, 64, 2, 64, 64, 64);
  grad.addColorStop(0, inner);
  grad.addColorStop(0.25, mid);
  grad.addColorStop(1, outer);
  g.fillStyle = grad;
  g.fillRect(0, 0, 128, 128);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}
const sunGlow = new THREE.Sprite(new THREE.SpriteMaterial({
  map: makeGlowTexture('rgba(255,250,235,1)', 'rgba(255,200,120,0.55)', 'rgba(255,150,60,0)'),
  blending: THREE.AdditiveBlending, depthWrite: false, transparent: true,
}));
sunGlow.scale.setScalar(240);
scene.add(sunGlow);

// Moon
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(14, 24, 16),
  new THREE.MeshStandardMaterial({ color: 0xdfe4ee, roughness: 1, metalness: 0, emissive: 0x8a94b0, emissiveIntensity: 0.25 })
);
scene.add(moon);
const moonGlow = new THREE.Sprite(new THREE.SpriteMaterial({
  map: makeGlowTexture('rgba(230,238,255,0.9)', 'rgba(160,180,230,0.30)', 'rgba(120,140,200,0)'),
  blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, opacity: 0.9,
}));
moonGlow.scale.setScalar(60);
scene.add(moonGlow);

// ---------------------------------------------------------------------------
// Sea
// ---------------------------------------------------------------------------
const rippleData = [];   // {x, z, t0}
const rippleUniforms = Array.from({ length: MAX_RIPPLES }, () => ({ value: new THREE.Vector4(0, 0, -1, 0) }));

const seaUniforms = {
  uTime: { value: 0 },
  uSunDir: { value: new THREE.Vector3(0, 0.3, -1) },
  uSunCol: { value: new THREE.Color(0xfff4d6) },
  uWater: { value: new THREE.Color(0x1a5c86) },
  uDeep: { value: new THREE.Color(0x0d3a5c) },
  uDay: { value: 1 },
  uCam: { value: new THREE.Vector3() },
  uRipples: rippleUniforms,
};

const seaMaterial = new THREE.ShaderMaterial({
  uniforms: seaUniforms,
  vertexShader: `
    uniform float uTime;
    uniform vec4 uRipples[${MAX_RIPPLES}];
    uniform vec3 uSunDir;
    varying vec3 vWorld;
    varying float vH;
    varying float vGlint;
    ${SWELL_GLSL}
    float rippleH(vec2 p, float t) {
      float h = 0.0;
      for (int i = 0; i < ${MAX_RIPPLES}; i++) {
        vec4 rp = uRipples[i];
        if (rp.w < 0.5) continue;
        float age = t - rp.z;
        if (age < 0.0 || age > ${RIPPLE_LIFE.toFixed(1)}) continue;
        float u = age * ${RIPPLE_SPEED.toFixed(1)} - distance(p, rp.xy);
        if (u <= 0.0) continue;
        h += ${RIPPLE_AMP.toFixed(2)} * exp(-age * 0.55) * exp(-u * 0.1) * sin(u * 5.0);
      }
      return h;
    }
    float seaH(vec2 p, float t) {
      float h = rippleH(p, t);
      for (int i = 0; i < SWELL_N; i++) {
        vec4 c = SWELL[i];
        h += c.w * sin(dot(c.xy, p) * c.z + t * c.w);
      }
      return h;
    }
    void main() {
      vec3 p = position;
      float h = seaH(p.xz, uTime);
      p.y += h;
      vec4 wp = modelMatrix * vec4(p, 1.0);
      vWorld = wp.xyz;
      vH = h;
      vGlint = pow(max(dot(normalize(uSunDir), vec3(0.0, 1.0, 0.0)), 0.0), 3.0);
      gl_Position = projectionMatrix * viewMatrix * wp;
    }`,
  fragmentShader: `
    uniform float uTime;
    uniform vec3 uSunDir; uniform vec3 uSunCol;
    uniform vec3 uWater; uniform vec3 uDeep;
    uniform float uDay;
    uniform vec3 uCam;
    varying vec3 vWorld; varying float vH; varying float vGlint;
    void main() {
      float e = 0.6;
      vec2 p = vWorld.xz;
      float hx = seaH(p + vec2(e, 0.0), uTime) - seaH(p - vec2(e, 0.0), uTime);
      float hz = seaH(p + vec2(0.0, e), uTime) - seaH(p - vec2(0.0, e), uTime);
      vec3 n = normalize(vec3(-hx, 2.0 * e, -hz));
      vec3 v = normalize(uCam - vWorld);
      vec3 l = normalize(uSunDir);

      float band = smoothstep(0.12, -0.45, vH);
      vec3 col = mix(uWater, uDeep, band);
      col += vec3(0.05, 0.10, 0.12) * max(vH * 0.6, 0.0);

      float ndl = max(dot(n, l), 0.0);
      col += uSunCol * (0.30 * pow(ndl, 1.5) + 0.18) * (0.15 + 0.85 * uDay);

      vec3 hv = normalize(l + v);
      float spec = pow(max(dot(n, hv), 0.0), 240.0);
      col += uSunCol * spec * (0.25 + 2.2 * uDay) * vGlint;

      float fres = pow(1.0 - max(dot(n, v), 0.0), 3.0);
      col += (0.20 + 0.80 * uDay) * fres * (0.35 * uZen + 0.65 * uHor);

      float distC = distance(uCam, vWorld);
      float fogF = 1.0 - exp(-pow(distC * 0.0035, 2.0));
      col = mix(col, uHor, fogF);
      gl_FragColor = vec4(col, 1.0);
    }`,
});
// NOTE: fragment shader references uZen/uHor — add to uniforms
seaUniforms.uZen = { value: new THREE.Color(0x3d7ec2) };
seaUniforms.uHor = { value: new THREE.Color(0xcfe9f5) };

const seaGeo = new THREE.PlaneGeometry(SEA_SIZE, SEA_SIZE, SEA_SEGS, SEA_SEGS);
seaGeo.rotateX(-Math.PI / 2);
const sea = new THREE.Mesh(seaGeo, seaMaterial);
scene.add(sea);

// ---------------------------------------------------------------------------
// Clouds
// ---------------------------------------------------------------------------
const clouds = new THREE.Group();
const cloudMat = new THREE.MeshLambertMaterial({
  color: 0xffffff, transparent: true, opacity: 0.85, emissive: 0x8892aa, emissiveIntensity: 0.25,
});
for (let i = 0; i < 9; i++) {
  const cluster = new THREE.Group();
  const n = 4 + Math.floor(Math.random() * 4);
  for (let j = 0; j < n; j++) {
    const r = 6 + Math.random() * 9;
    const m = new THREE.Mesh(new THREE.SphereGeometry(r, 12, 10), cloudMat);
    m.position.set((Math.random() - 0.5) * r * 1.6, (Math.random() - 0.5) * r * 0.4, (Math.random() - 0.5) * r * 0.9);
    m.scale.y = 0.55;
    cluster.add(m);
  }
  const a = Math.random() * Math.PI * 2;
  const rad = 140 + Math.random() * 220;
  cluster.position.set(Math.cos(a) * rad, 55 + Math.random() * 45, Math.sin(a) * rad);
  cluster.userData.speed = 1.2 + Math.random() * 1.4;
  clouds.add(cluster);
}
scene.add(clouds);

// ---------------------------------------------------------------------------
// Ship
// ---------------------------------------------------------------------------
function buildShip() {
  const ship = new THREE.Group();

  const hullShape = new THREE.Shape();
  hullShape.moveTo(-1.55, 0);
  hullShape.quadraticCurveTo(-1.50, 0.95, -0.75, 1.02);
  hullShape.lineTo(0.75, 1.02);
  hullShape.quadraticCurveTo(1.70, 0.95, 2.35, 0);
  hullShape.quadraticCurveTo(1.70, -0.95, 0.75, -1.02);
  hullShape.lineTo(-0.75, -1.02);
  hullShape.quadraticCurveTo(-1.50, -0.95, -1.55, 0);

  const hullGeo = new THREE.ExtrudeGeometry(hullShape, { depth: 1.15, bevelEnabled: true, bevelThickness: 0.28, bevelSize: 0.22, bevelSegments: 3, steps: 1 });
  hullGeo.rotateX(Math.PI / 2);   // extrusion goes downward (hull below deck)
  hullGeo.translate(0, -0.35, 0);
  const wood = new THREE.MeshStandardMaterial({ color: 0x6b4a32, roughness: 0.85, metalness: 0 });
  const hull = new THREE.Mesh(hullGeo, wood);
  ship.add(hull);

  // Deck
  const deckShape = new THREE.Shape();
  deckShape.absarc(0, 0, 1.02, 0, Math.PI * 2, false);
  const deck = new THREE.Mesh(
    new THREE.ExtrudeGeometry(deckShape, { depth: 0.06, bevelEnabled: false, steps: 1 }),
    new THREE.MeshStandardMaterial({ color: 0x8a6a4a, roughness: 0.9 })
  );
  deck.geometry.rotateX(Math.PI / 2);
  deck.position.y = 0.30;
  ship.add(deck);

  // Cabin
  const cabin = new THREE.Mesh(
    new THREE.BoxGeometry(0.85, 0.5, 0.8),
    new THREE.MeshStandardMaterial({ color: 0x775840, roughness: 0.8 })
  );
  cabin.position.set(-0.85, 0.58, 0);
  ship.add(cabin);
  const roof = new THREE.Mesh(
    new THREE.BoxGeometry(0.95, 0.07, 0.9),
    new THREE.MeshStandardMaterial({ color: 0x503726, roughness: 0.8 })
  );
  roof.position.set(-0.85, 0.85, 0);
  ship.add(roof);

  // Mast + rigging
  const mastMat = new THREE.MeshStandardMaterial({ color: 0x4a3526, roughness: 0.8 });
  const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.07, 3.1, 8), mastMat);
  mast.position.set(-0.1, 1.9, 0);
  ship.add(mast);
  const spar = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.5, 8), mastMat);
  spar.rotation.z = Math.PI / 2;
  spar.position.set(-0.1, 3.0, 0);
  ship.add(spar);

  // Sail (soft curved quad)
  const sailGeo = new THREE.PlaneGeometry(1.35, 2.15, 8, 8);
  sailGeo.translate(0, -1.075, 0);
  const pos = sailGeo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const y = pos.getY(i);
    const x = pos.getX(i);
    pos.setZ(i, Math.sin(x * 1.6) * 0.22 + (y + 1.075) * 0.10);
  }
  sailGeo.computeVertexNormals();
  const sail = new THREE.Mesh(sailGeo, new THREE.MeshStandardMaterial({
    color: 0xf2ead8, roughness: 0.95, side: THREE.DoubleSide,
  }));
  sail.position.set(-0.1, 3.0, 0.06);
  ship.add(sail);

  // Flag
  const flagGeo = new THREE.PlaneGeometry(0.42, 0.24);
  flagGeo.translate(0.21, 0, 0);
  const flag = new THREE.Mesh(flagGeo, new THREE.MeshStandardMaterial({ color: 0xe05a3c, roughness: 0.9, side: THREE.DoubleSide }));
  flag.position.set(-0.1, 3.48, 0);
  ship.add(flag);

  return ship;
}
const ship = buildShip();
ship.position.set(0, 0, 0);
ship.rotation.y = -0.5;
scene.add(ship);

// ---------------------------------------------------------------------------
// State / time
// ---------------------------------------------------------------------------
const simTime = { t: 0 };
const sunDir = new THREE.Vector3(1, 0.1, 0).normalize();
const moonDir = new THREE.Vector3();
const camState = { theta: 0.9, phi: 1.12, dist: CAM_DIST };
const clockEl = document.getElementById('clock');

function dayPhase(t) { return (T0_PHASE + t / DAY_LENGTH) % 1; }
function blendPalettes(e) {
  const day = THREE.MathUtils.smoothstep(e, -0.04, 0.18);
  const night = THREE.MathUtils.smoothstep(-e, -0.04, -0.22);
  const dusk = Math.max(0, 1 - day - night);
  const zen = new THREE.Color().copy(P.day.zen).multiplyScalar(day)
    .add(P.dusk.zen.clone().multiplyScalar(dusk))
    .add(P.night.zen.clone().multiplyScalar(night));
  const hor = new THREE.Color().copy(P.day.hor).multiplyScalar(day)
    .add(P.dusk.hor.clone().multiplyScalar(dusk))
    .add(P.night.hor.clone().multiplyScalar(night));
  const water = new THREE.Color().copy(P.day.water).multiplyScalar(day)
    .add(P.dusk.water.clone().multiplyScalar(dusk))
    .add(P.night.water.clone().multiplyScalar(night));
  const deep = new THREE.Color().copy(P.day.deep).multiplyScalar(day)
    .add(P.dusk.deep.clone().multiplyScalar(dusk))
    .add(P.night.deep.clone().multiplyScalar(night));
  const sun = new THREE.Color().copy(P.day.sun).multiplyScalar(day)
    .add(P.dusk.sun.clone().multiplyScalar(dusk))
    .add(P.night.sun.clone().multiplyScalar(night));
  const sunDisc = THREE.MathUtils.smoothstep(e, -0.18, 0.03);
  const stars = THREE.MathUtils.smoothstep(-e, -0.05, -0.28);
  return { day, dusk, night, zen, hor, water, deep, sun, sunDisc, stars };
}

function updateEnvironment(t) {
  const e = dayPhase(t) * Math.PI * 2 - Math.PI / 2;
  sunDir.set(Math.cos(e), Math.sin(e), -0.22).normalize();
  const pal = blendPalettes(sunDir.y);

  skyUniforms.uZen.value.copy(pal.zen);
  skyUniforms.uHor.value.copy(pal.hor);
  skyUniforms.uSunDir.value.copy(sunDir);
  skyUniforms.uSunCol.value.copy(pal.sun);
  skyUniforms.uSunDisc.value = pal.sunDisc;
  skyUniforms.uStars.value = pal.stars;
  skyUniforms.uTime.value = t;

  sunGlow.position.copy(sunDir).multiplyScalar(860);
  sunGlow.visible = sunDir.y > -0.12;
  sunGlow.material.color.copy(pal.sun);

  moonDir.copy(sunDir).multiplyScalar(-1);
  moonDir.x += 0.18; moonDir.y += 0.10; moonDir.normalize();
  moon.position.copy(moonDir).multiplyScalar(860);
  moonGlow.position.copy(moon.position);
  const moonVis = THREE.MathUtils.smoothstep(-sunDir.y, -0.1, -0.3);
  moon.visible = moonDir.y > -0.15;
  moonGlow.visible = moonDir.y > -0.15;
  moonGlow.material.opacity = 0.9 * moonVis;
  moon.material.emissiveIntensity = 0.25 + 0.55 * moonVis;

  sunLight.position.copy(sunDir).multiplyScalar(100);
  sunLight.intensity = 0.15 + 2.3 * pal.day + 0.9 * pal.dusk;
  sunLight.color.copy(pal.sun);
  hemi.intensity = 0.18 + 0.75 * pal.day;

  seaUniforms.uSunDir.value.copy(sunDir);
  seaUniforms.uSunCol.value.copy(pal.sun);
  seaUniforms.uWater.value.copy(pal.water);
  seaUniforms.uDeep.value.copy(pal.deep);
  seaUniforms.uZen.value.copy(pal.zen);
  seaUniforms.uHor.value.copy(pal.hor);
  seaUniforms.uDay.value = pal.day + 0.35 * pal.dusk;
  scene.fog.color.copy(pal.hor);
}

function updateShip(t, ripples, dt) {
  // Heading rotates very slowly (lazy meandering)
  const heading = -0.5 + 0.03 * Math.sin(t * 0.021);
  ship.rotation.y = heading;
  const fwd = new THREE.Vector3(Math.sin(heading), 0, Math.cos(heading));
  ship.position.addScaledVector(fwd, SHIP_SAIL_SPEED * dt);
  // keep the ship on the lake
  const r = Math.hypot(ship.position.x, ship.position.z);
  const limit = SEA_SIZE * 0.38;
  if (r > limit) {
    ship.position.x *= limit / r;
    ship.position.z *= limit / r;
    ship.rotation.y = Math.atan2(-ship.position.x, -ship.position.z); // face centre
  }

  // Wave motion
  const p = ship.position;
  const h0 = seaHeightJS(p.x, p.z, t, ripples);
  const fx = p.x + Math.sin(heading) * 1.6, fz = p.z + Math.cos(heading) * 1.6;
  const bx = p.x - Math.sin(heading) * 1.6, bz = p.z - Math.cos(heading) * 1.6;
  const hf = seaHeightJS(fx, fz, t, ripples);
  const hb = seaHeightJS(bx, bz, t, ripples);
  const hSide = seaHeightJS(p.x + Math.cos(heading) * 1.0, p.z - Math.sin(heading) * 1.0, t, ripples);
  const hStarb = seaHeightJS(p.x - Math.cos(heading) * 1.0, p.z + Math.sin(heading) * 1.0, t, ripples);

  const pitch = Math.atan2(hf - hb, 3.2);
  const roll = Math.atan2(hStarb - hSide, 2.0);
  ship.position.y = h0;
  ship.rotation.x = -pitch;
  ship.rotation.z = roll;
  // idle sway
  ship.rotation.z += 0.02 * Math.sin(t * 0.6);
}

// ---------------------------------------------------------------------------
// Camera orbit + input
// ---------------------------------------------------------------------------
const ptr = { x: 0, y: 0, down: false, id: -1, moved: 0 };
canvas.addEventListener('pointerdown', (ev) => {
  ptr.down = true; ptr.id = ev.pointerId;
  ptr.x = ev.clientX; ptr.y = ev.clientY; ptr.moved = 0;
  canvas.setPointerCapture(ev.pointerId);
});
canvas.addEventListener('pointermove', (ev) => {
  if (!ptr.down || ev.pointerId !== ptr.id) return;
  const dx = ev.clientX - ptr.x, dy = ev.clientY - ptr.y;
  ptr.moved += Math.abs(dx) + Math.abs(dy);
  ptr.x = ev.clientX; ptr.y = ev.clientY;
  camState.theta -= dx * 0.005;
  camState.phi = THREE.MathUtils.clamp(camState.phi - dy * 0.005, 0.18, 1.35);
});
canvas.addEventListener('pointerup', (ev) => {
  if (ev.pointerId !== ptr.id) return;
  ptr.down = false;
  if (ptr.moved < 8) tryClickSea(ev.clientX, ev.clientY);
});
canvas.addEventListener('pointercancel', () => { ptr.down = false; });
canvas.addEventListener('wheel', (ev) => {
  ev.preventDefault();
  camState.dist = THREE.MathUtils.clamp(camState.dist * (1 + ev.deltaY * 0.0012), 5, 28);
}, { passive: false });
canvas.addEventListener('contextmenu', (ev) => ev.preventDefault());

const ray = new THREE.Raycaster();
const ndc = new THREE.Vector2();
function tryClickSea(cx, cy) {
  ndc.x = (cx / window.innerWidth) * 2 - 1;
  ndc.y = -(cy / window.innerHeight) * 2 + 1;
  ray.setFromCamera(ndc, camera);
  const hit = ray.intersectObject(sea);
  if (!hit.length) return;
  const p = hit[0].point;
  rippleData.push({ x: p.x, z: p.z, t0: simTime.t });
  if (rippleData.length > MAX_RIPPLES) rippleData.shift();
}

function updateRippleUniforms(t) {
  for (let i = 0; i < MAX_RIPPLES; i++) {
    const v = rippleUniforms[i].value;
    const r = rippleData[i];
    const alive = r && (t - r.t0) < RIPPLE_LIFE;
    v.set(r ? r.x : 0, r ? r.z : 0, r ? r.t0 : -1, alive ? 1 : 0);
  }
}

function updateCamera() {
  const off = new THREE.Vector3(
    Math.sin(camState.theta) * Math.sin(camState.phi),
    Math.cos(camState.phi),
    Math.cos(camState.theta) * Math.sin(camState.phi)
  ).multiplyScalar(camState.dist);
  const target = ship.position.clone();
  target.y += 1.1;
  camera.position.copy(target).add(off);
  camera.lookAt(target);
}

// ---------------------------------------------------------------------------
// Clock display
// ---------------------------------------------------------------------------
function clockLabel(t) {
  const phase = dayPhase(t);
  let minutes = Math.floor(phase * 24 * 60);
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  const isNight = h < 5 || h >= 21;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')} ${isNight ? '· night' : h < 7 ? '· dawn' : h < 19 ? '· day' : '· dusk'}`;
}

// ---------------------------------------------------------------------------
// Expose debug state
// ---------------------------------------------------------------------------
window.__sim = {
  get state() {
    const phase = dayPhase(simTime.t);
    const sunElevDeg = Math.asin(THREE.MathUtils.clamp(sunDir.y, -1, 1)) * 180 / Math.PI;
    const live = rippleData.filter(r => simTime.t - r.t0 < RIPPLE_LIFE).length;
    return {
      time: simTime.t,
      phase,
      sunElevation: sunElevDeg,
      shipPos: { x: +ship.position.x.toFixed(2), y: +ship.position.y.toFixed(3), z: +ship.position.z.toFixed(2) },
      ripples: { total: rippleData.length, live },
      fps: fps,
      renderer: renderer.info.render,
    };
  },
  triggerRipple(x = ship.position.x + 8, z = ship.position.z + 8) {
    rippleData.push({ x, z, t0: simTime.t });
    if (rippleData.length > MAX_RIPPLES) rippleData.shift();
    return rippleData.length;
  },
  setPhase(p) { simTime.t = (p % 1) * DAY_LENGTH - T0_PHASE * DAY_LENGTH; if (simTime.t < 0) simTime.t += DAY_LENGTH; },
  setSpeed(mult) { timeScale = mult; },
};

// ---------------------------------------------------------------------------
// Main loop
// ---------------------------------------------------------------------------
let last = performance.now();
let fps = 60;
let timeScale = 1;

function frame(now) {
  const dt = Math.min(0.05, (now - last) / 1000);
  last = now;
  simTime.t += dt * timeScale;
  fps = fps * 0.95 + (1 / Math.max(dt, 1e-4)) * 0.05;

  updateRippleUniforms(simTime.t);
  seaUniforms.uTime.value = simTime.t;
  seaUniforms.uCam.value.copy(camera.position);
  updateEnvironment(simTime.t);
  updateShip(simTime.t, rippleData, dt);
  updateCamera();

  // clouds drift
  for (const c of clouds.children) {
    c.position.x += c.userData.speed * dt;
    if (c.position.x > 420) c.position.x = -420;
  }

  clockEl.textContent = clockLabel(simTime.t);
  renderer.render(scene, camera);
  requestAnimationFrame(frame);
}

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

requestAnimationFrame(frame);
