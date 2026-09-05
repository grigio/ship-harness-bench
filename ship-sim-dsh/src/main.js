// ─────────────────────────────────────────────────────────────────────────────
//  Relaxing 3D ship simulator
//  • Sun on the horizon driving a smooth day / night cycle
//  • Procedural shader ocean with expandable ripple waves
//  • Click the sea to make a wave
//  • Drag to orbit, scroll to zoom, gentle auto-sway when idle
// ─────────────────────────────────────────────────────────────────────────────
import * as THREE from 'three';

// ── Tiny helpers ─────────────────────────────────────────────────────────────
const clamp01 = (v) => Math.max(0, Math.min(1, v));
const lerp = (a, b, t) => a + (b - a) * t;
const lerp3 = (a, b, t) => [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
const smoothstep = (e0, e1, x) => {
  const t = clamp01((x - e0) / (e1 - e0));
  return t * t * (3 - 2 * t);
};

// diagnostics (only active with ?d=1, used for headless verification)
const diag = /[?&]d=1/.test(location.search);
function badgeLog(m) {
  if (typeof dump === 'function') { try { dump('DIAG::' + m + '\n'); } catch (_) {} }
}
function diagMark(m) {
  badgeLog(m);
  if (!diag) return;
  const e = document.getElementById('diag');
  if (e) e.textContent = m;
  const ov = document.getElementById('diag-ov');
  if (ov) {
    const map = {
      'renderer': 'rgb(200,40,40)', 'setup': 'rgb(215,200,40)',
      'frame': 'rgb(40,215,40)',
    };
    if (map[m]) ov.style.background = map[m];
    else if (m.startsWith('ERR')) ov.style.background = 'rgb(40,40,230)';
  }
}
function diagBadge(init) {
  if (!diag) return null;
  const ov = document.createElement('div');
  ov.id = 'diag-ov';
  ov.setAttribute('style', `position:fixed;inset:0;z-index:2147483000;pointer-events:none;background:${init};`);
  document.body.appendChild(ov);
  return ov;
}
diagBadge('rgb(10,10,10)');
badgeLog('module-start');
window.addEventListener('error', (e) => { badgeLog('ERRCATCH:' + (e.message || e)); diagMark('ERR:' + (e.message || e)); });
window.addEventListener('unhandledrejection', (e) => { badgeLog('REJCATCH:' + ((e.reason && e.reason.message) || e.reason)); diagMark('REJ:' + ((e.reason && e.reason.message) || e.reason)); });

// ── Renderer ─────────────────────────────────────────────────────────────────
const LOW = /[?&]low=1/.test(location.search); // fidelity switch (headless tests)
const OCEAN_SEG = LOW ? 56 : 480;
const canvas = document.createElement('canvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, LOW ? 1 : 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.NoToneMapping;

document.body.appendChild(renderer.domElement);
renderer.domElement.style.touchAction = 'none';
diagMark('renderer');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 6000);

// ── Texture factories (all generated, no assets) ─────────────────────────────
function glowTexture() {
  const c = document.createElement('canvas'); c.width = c.height = 128;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0.0, 'rgba(255,255,255,1)');
  g.addColorStop(0.2, 'rgba(255,255,255,0.8)');
  g.addColorStop(0.5, 'rgba(255,255,255,0.18)');
  g.addColorStop(1.0, 'rgba(255,255,255,0)');
  ctx.fillStyle = g; ctx.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(c);
}

function cloudTexture() {
  const c = document.createElement('canvas'); c.width = 256; c.height = 128;
  const ctx = c.getContext('2d');
  ctx.fillStyle = 'rgba(0,0,0,0)'; ctx.fillRect(0, 0, 256, 128);
  const blobs = [[64, 70, 34], [108, 58, 40], [150, 64, 36], [188, 74, 26], [124, 92, 24]];
  for (const [x, y, r] of blobs) {
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, 'rgba(255,255,255,0.95)');
    g.addColorStop(0.7, 'rgba(255,255,255,0.45)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
  }
  return new THREE.CanvasTexture(c);
}

// ── Time & cycle ─────────────────────────────────────────────────────────────
const DAY_LENGTH = 240;            // seconds for one full day + night
const SUN_AZ = -1.15;              // fixed compass azimuth of the sun's path
let timeOfDay = parseFloat(new URLSearchParams(location.search).get('t')) || 0.285; // start just after sunrise
const clock = new THREE.Clock();

function sunState(tod) {
  const s = (tod - 0.25) * Math.PI * 2;   // sunrise at 0.25, noon 0.5, sunset 0.75
  const sunY = Math.sin(s);
  const sunXZ = Math.cos(s);
  const dir = new THREE.Vector3(
    sunXZ * Math.cos(SUN_AZ),
    sunY,
    sunXZ * Math.sin(SUN_AZ),
  ).normalize();
  const day = smoothstep(-0.10, 0.32, sunY);          // 0 night → 1 day
  const warm = Math.exp(-Math.abs(sunY) / 0.24);       // peaks near horizon
  const moonY = -sunY;
  const moon = new THREE.Vector3(-sunXZ * Math.cos(SUN_AZ), moonY, -sunXZ * Math.sin(SUN_AZ)).normalize();
  return { s, dir, sunY, day, warm, moon };
}

// Palette (linear-ish rgb used directly by custom shaders)
const PAL = {
  nightTop:  [0.014, 0.020, 0.075],
  nightBot:  [0.028, 0.040, 0.130],
  dawnTop:   [0.110, 0.100, 0.300],
  dayTop:    [0.110, 0.365, 0.760],
  dayBot:    [0.680, 0.840, 0.940],
  warm:      [1.00,  0.500, 0.235],
  pale:      [0.700, 0.860, 0.960],
  sunLow:    [1.00,  0.660, 0.350],
  sunHigh:   [1.00,  0.985, 0.930],
};

const skyUniforms = {
  uCamPos: { value: new THREE.Vector3() },
  uSunDir: { value: new THREE.Vector3(0, 1, 0) },
  uMoonDir: { value: new THREE.Vector3(0, -1, 0) },
  uTopColor: { value: new THREE.Vector3() },
  uBottomColor: { value: new THREE.Vector3() },
  uHorizonColor: { value: new THREE.Vector3() },
  uHorizonStrength: { value: 0.5 },
  uHorizonPower: { value: 5 },
  uSunColor: { value: new THREE.Vector3(1, 1, 1) },
  uSunGlow: { value: 1 },
  uSunSide: { value: 0 },
  uMoonGlow: { value: 0 },
};

const SKY_VERT = /* glsl */`
  uniform vec3 uCamPos;
  varying vec3 vDir;
  void main() {
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vDir = normalize(wp.xyz - uCamPos);
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;

const SKY_FRAG = /* glsl */`
  uniform vec3 uSunDir;
  uniform vec3 uMoonDir;
  uniform vec3 uTopColor;
  uniform vec3 uBottomColor;
  uniform vec3 uHorizonColor;
  uniform float uHorizonStrength;
  uniform float uHorizonPower;
  uniform vec3 uSunColor;
  uniform float uSunGlow;
  uniform float uSunSide;
  uniform float uMoonGlow;
  varying vec3 vDir;
  void main() {
    vec3 dir = normalize(vDir);
    float y = clamp(dir.y, -1.0, 1.0);
    vec3 col = mix(uBottomColor, uTopColor, pow(0.5 + 0.5 * y, 0.55));

    // broad warm band hugging the horizon (wider & brighter at dusk/dawn)
    float band = pow(1.0 - abs(y), uHorizonPower);
    col += uHorizonColor * band * uHorizonStrength;

    // extra warmth gathered toward the sun's bearing
    vec3 dirFlat  = normalize(vec3(dir.x, 0.0001, dir.z));
    vec3 sunFlat  = normalize(vec3(uSunDir.x, 0.0001, uSunDir.z));
    float toward = clamp(dot(dirFlat, sunFlat), 0.0, 1.0);
    col += uSunColor * band * pow(toward, 2.5) * uSunSide * 1.2;

    // sun disc + halo
    float sdot = clamp(dot(dir, uSunDir), 0.0, 1.0);
    col += uSunColor * (pow(sdot, 220.0) * uSunGlow * 2.2
                      + pow(sdot, 30.0)  * uSunGlow * 0.7
                      + pow(sdot, 6.0)   * uSunGlow * 0.18);

    // gentle moon glow at night
    float mdot = clamp(dot(dir, uMoonDir), 0.0, 1.0);
    col += vec3(0.55, 0.62, 0.85) * pow(mdot, 8.0) * uMoonGlow * 0.5;

    col *= 1.4; // gentle lift so the sky stays luminous & calming
    gl_FragColor = vec4(col, 1.0);
  }
`;

const skyMat = new THREE.ShaderMaterial({
  uniforms: skyUniforms,
  vertexShader: SKY_VERT,
  fragmentShader: SKY_FRAG,
  side: THREE.BackSide,
  depthWrite: false,
  fog: false,
});
const skyDome = new THREE.Mesh(new THREE.SphereGeometry(4000, LOW ? 12 : 40, LOW ? 8 : 30), skyMat);
skyDome.frustumCulled = false;
scene.add(skyDome);

// ── Stars ────────────────────────────────────────────────────────────────────
const starCount = LOW ? 300 : 1800;
const starPos = new Float32Array(starCount * 3);
for (let i = 0; i < starCount; i++) {
  const v = new THREE.Vector3().randomDirection().multiplyScalar(3800);
  if (Math.abs(v.y) < 60) v.y = (v.y >= 0 ? 1 : -1) * 80; // keep horizon clear of stars
  starPos[i * 3] = v.x; starPos[i * 3 + 1] = v.y; starPos[i * 3 + 2] = v.z;
}
const starGeo = new THREE.BufferGeometry();
starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
const starTexture = glowTexture();
const starMat = new THREE.PointsMaterial({
  size: 3,
  sizeAttenuation: false,
  map: starTexture,
  transparent: true,
  opacity: 0,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
});
const stars = new THREE.Points(starGeo, starMat);
stars.frustumCulled = false;
scene.add(stars);

// ── Sun / Moon sprites ───────────────────────────────────────────────────────
const sunSprite = new THREE.Sprite(new THREE.SpriteMaterial({
  map: glowTexture(),
  transparent: true,
  opacity: 0,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
}));
sunSprite.scale.setScalar(150);
sunSprite.renderOrder = 10;
scene.add(sunSprite);

const moonSprite = new THREE.Sprite(new THREE.SpriteMaterial({
  map: glowTexture(),
  transparent: true,
  opacity: 0,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
}));
moonSprite.scale.setScalar(90);
moonSprite.renderOrder = 9;
scene.add(moonSprite);

// ── Clouds (soft drifting sprites, visible by day) ───────────────────────────
const cloudMat = new THREE.SpriteMaterial({
  map: cloudTexture(),
  transparent: true,
  opacity: 0,
  depthWrite: false,
});
const clouds = [];
for (let i = 0; i < 9; i++) {
  const c = new THREE.Sprite(cloudMat);
  const a = Math.random() * Math.PI * 2;
  const r = 180 + Math.random() * 260;
  c.position.set(Math.cos(a) * r, 60 + Math.random() * 140, Math.sin(a) * r);
  const s = 90 + Math.random() * 150;
  c.scale.set(s, s * 0.55, 1);
  clouds.push(c);
  scene.add(c);
}

// ── Ripple management (shared between JS & shader) ───────────────────────────
const MAX_RIPPLES = 16;
const RIPPLE_LIFE = 6.0;
const RIPPLE_SPEED = 6.0;
const RIPPLE_AMP = 1.7;
const ripples = [];                                   // {x, z, t0}
const rippleData = new Float32Array(MAX_RIPPLES * 3);
let rippleUploadDirty = false;

const RIPPLE_CODE = /* glsl */`
  uniform vec3 uRipples[${MAX_RIPPLES}];
  uniform int uRippleCount;
  float rippleHeight(vec2 p, float t) {
    float h = 0.0;
    for (int i = 0; i < ${MAX_RIPPLES}; i++) {
      if (i >= uRippleCount) continue;
      vec3 r = uRipples[i];
      float age = t - r.z;
      if (age <= 0.0 || age > ${RIPPLE_LIFE.toFixed(1)}) continue;
      float dist = distance(p, r.xy);
      float radius = age * ${RIPPLE_SPEED.toFixed(1)};
      float ring = dist - radius;
      float amp = ${RIPPLE_AMP.toFixed(1)} * exp(-age / 2.2);
      h += amp * exp(-ring * ring * 0.9) * cos(ring * 2.2 - age * 4.0);
    }
    return h;
  }
`;

const BASE_WAVE_CODE = /* glsl */`
  float baseHeight(vec2 p, float t) {
    return 1.10 * sin(p.x * 0.050 + t * 0.80) * cos(p.y * 0.032 + t * 0.55)
         + 0.62 * sin(p.x * 0.110 + p.y * 0.060 + t * 1.40)
         + 0.35 * sin(p.x * 0.030 - p.y * 0.085 + t * 1.10);
  }
  float heightOf(vec2 p, float t) { return baseHeight(p, t) + rippleHeight(p, t); }
`;

function addRipple(x, z, t) {
  ripples.push({ x, z, t0: t });
  if (ripples.length > MAX_RIPPLES) ripples.shift();
  rippleUploadDirty = true;
}

function uploadRipples(t) {
  // prune expired quietly (keep painter order cheap; fill dead slots with t0=-1)
  const alive = ripples.filter((r) => t - r.t0 < RIPPLE_LIFE);
  ripples.length = 0; ripples.push(...alive);
  for (let i = 0; i < MAX_RIPPLES; i++) {
    const r = ripples[i];
    rippleData[i * 3] = r ? r.x : 0;
    rippleData[i * 3 + 1] = r ? r.z : 0;
    rippleData[i * 3 + 2] = r ? r.t0 : -1;
  }
  oceanUniforms.uRippleCount.value = ripples.length;
  oceanUniforms.uRipples.value = rippleData.slice(); // new ref → force re-upload
}

// ── Ocean ────────────────────────────────────────────────────────────────────
const oceanUniforms = {
  uTime: { value: 0 },
  uSunDir: { value: new THREE.Vector3(0, 1, 0) },
  uSunColor: { value: new THREE.Vector3(1, 1, 1) },
  uCamPos: { value: new THREE.Vector3() },
  uFogColor: { value: new THREE.Vector3(0.68, 0.84, 0.94) },
  uFogDensity: { value: 0.0016 },
  uRippleCount: { value: 0 },
  uRipples: { value: new Float32Array(MAX_RIPPLES * 3) },
};

const OCEAN_VERT = /* glsl */`
  uniform float uTime;
  ${RIPPLE_CODE}
  ${BASE_WAVE_CODE}
  varying vec3 vWorldPos;
  varying vec3 vNormal;
  varying float vRippleEnergy;

  void main() {
    vec2 hp = vec2(position.x, position.z);
    float h = heightOf(hp, uTime);
    float rip = rippleHeight(hp, uTime);
    float eps = 2.0;
    float hx = heightOf(hp + vec2(eps, 0.0), uTime);
    float hz = heightOf(hp + vec2(0.0, eps), uTime);
    vec3 nrm = normalize(vec3(-(hx - h) / eps, 1.0, -(hz - h) / eps));

    vWorldPos = vec3(position.x, h, position.z);
    vNormal = nrm;
    vRippleEnergy = abs(rip);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(vWorldPos, 1.0);
  }
`;

const OCEAN_FRAG = /* glsl */`
  uniform vec3 uSunDir;
  uniform vec3 uSunColor;
  uniform vec3 uCamPos;
  uniform vec3 uFogColor;
  uniform float uFogDensity;
  varying vec3 vWorldPos;
  varying vec3 vNormal;
  varying float vRippleEnergy;

  void main() {
    vec3 N = normalize(vNormal);
    if (N.y < 0.0) N = -N;
    vec3 V = normalize(uCamPos - vWorldPos);
    vec3 H = normalize(V + uSunDir);

    // water base colour (deep teal-blue)
    vec3 deep = vec3(0.024, 0.090, 0.145);
    vec3 mid  = vec3(0.034, 0.170, 0.255);
    float fres = pow(1.0 - max(dot(N, V), 0.0), 3.0);
    vec3 base = mix(mid, deep, fres * 0.65 + 0.10);

    // sun glint (tight spec + broad sheen + sky reflection)
    vec3 glint = uSunColor * (pow(max(dot(N, H), 0.0), 140.0) * 3.2
                            + pow(max(dot(N, H), 0.0), 14.0)  * 0.45
                            + pow(max(dot(N, H), 0.0), 2.5)   * 0.10);

    // soft white foam where ripple crests are sharp
    float foam = smoothstep(0.10, 0.30, vRippleEnergy) * 0.55
               + smoothstep(0.55, 0.85, vRippleEnergy) * 0.45;
    vec3 col = base + glint + vec3(1.0, 0.96, 0.88) * foam;

    // gentle distance fog toward horizon colour
    float d = length(uCamPos - vWorldPos);
    float fog = 1.0 - exp(-uFogDensity * uFogDensity * d * d);
    col = mix(col, uFogColor, fog);

    col *= 1.12;
    gl_FragColor = vec4(col, 1.0);
  }
`;

const oceanGeo = new THREE.PlaneGeometry(1000, 1000, OCEAN_SEG, OCEAN_SEG);
oceanGeo.rotateX(-Math.PI / 2); // full-screen XZ plane; local y stays 0
const oceanMat = new THREE.ShaderMaterial({
  uniforms: oceanUniforms,
  vertexShader: OCEAN_VERT,
  fragmentShader: OCEAN_FRAG,
});
const ocean = new THREE.Mesh(oceanGeo, oceanMat);
ocean.frustumCulled = false;
scene.add(ocean);

// ── Lights for the ship ──────────────────────────────────────────────────────
const sunLight = new THREE.DirectionalLight(0xffffff, 2.2);
sunLight.position.set(100, 100, 0);
scene.add(sunLight);

const hemi = new THREE.HemisphereLight(0x88aaff, 0x334455, 0.6);
scene.add(hemi);

const cabinLight = new THREE.PointLight(0xffb366, 0, 60, 2);
cabinLight.position.set(0, 3.2, -3.4);
scene.add(cabinLight);

// ── Ship ─────────────────────────────────────────────────────────────────────
let shipWindowMat = null;
function buildShip() {
  const ship = new THREE.Group();

  // Hull: extruded deck footprint (length ~24, beam ~7), depth ~4
  const L = 11.0, W = 3.5;
  const foot = new THREE.Shape();
  foot.moveTo(0, L);
  foot.quadraticCurveTo(W * 0.38, L * 0.62, W, L * 0.22);   // bow flare
  foot.lineTo(W, -L * 0.5);
  foot.quadraticCurveTo(W, -L, W * 0.45, -L);
  foot.quadraticCurveTo(0, -L * 1.12, -W * 0.45, -L);        // rounded stern
  foot.quadraticCurveTo(-W, -L, -W, -L * 0.5);
  foot.lineTo(-W, L * 0.22);
  foot.quadraticCurveTo(-W * 0.38, L * 0.62, 0, L);

  const hullGeo = new THREE.ExtrudeGeometry(foot, {
    depth: -5, steps: 1,
    bevelEnabled: true, bevelThickness: 0.55, bevelSize: 0.45, bevelSegments: 3,
  });
  hullGeo.rotateX(-Math.PI / 2);   // shape plane → XZ, extrusion → -Y
  hullGeo.rotateY(Math.PI);        // bow now faces +Z
  const hull = new THREE.Mesh(hullGeo, new THREE.MeshStandardMaterial({
    color: 0x8a4a24, roughness: 0.85, metalness: 0.05,
  }));
  hull.castShadow = false;
  ship.add(hull);

  // gunwale (light rubbing strip)
  const gunwaleGeo = new THREE.BoxGeometry(0.32, 0.45, 23);
  const gunwaleMat = new THREE.MeshStandardMaterial({ color: 0xdfe8ea, roughness: 0.5, metalness: 0.2 });
  const gunwaleL = new THREE.Mesh(gunwaleGeo, gunwaleMat); gunwaleL.position.set(-3.3, 0.45, 0); ship.add(gunwaleL);
  const gunwaleR = new THREE.Mesh(gunwaleGeo, gunwaleMat); gunwaleR.position.set(3.3, 0.45, 0); ship.add(gunwaleR);

  const cabinMat = new THREE.MeshStandardMaterial({ color: 0xefe8d4, roughness: 0.7, metalness: 0.0 });
  const windowMat = new THREE.MeshStandardMaterial({ color: 0x2e4250, roughness: 0.2, metalness: 0.5, emissive: new THREE.Color(1.0, 0.5, 0.18) });
  shipWindowMat = windowMat;

  // sun deck (low, aft half)
  const deck = new THREE.Mesh(new THREE.BoxGeometry(6.2, 0.7, 8), cabinMat);
  deck.position.set(0, 1.15, -3.2);
  ship.add(deck);

  // wheelhouse
  const wheel = new THREE.Mesh(new THREE.BoxGeometry(4.6, 1.5, 4.4), cabinMat);
  wheel.position.set(0, 2.25, -3.0);
  ship.add(wheel);
  const wheelWindows = new THREE.Mesh(new THREE.BoxGeometry(4.55, 0.75, 0.12), windowMat);
  wheelWindows.position.set(0, 2.3, -0.82); // front glazing band
  ship.add(wheelWindows);

  // flybridge deck + windscreen
  const fly = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.5, 3.2), cabinMat);
  fly.position.set(0, 3.4, -2.6);
  ship.add(fly);
  const screen = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.9, 3.1), windowMat);
  screen.position.set(0, 3.9, -1.15);
  ship.add(screen);

  // funnel
  const funnel = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.72, 2.6, 20), new THREE.MeshStandardMaterial({ color: 0xbf4526, roughness: 0.6, metalness: 0.1 }));
  funnel.position.set(0, 4.4, -4.4);
  ship.add(funnel);
  const funnelBand = new THREE.Mesh(new THREE.CylinderGeometry(0.64, 0.64, 0.35, 20), new THREE.MeshStandardMaterial({ color: 0x20303a, roughness: 0.6 }));
  funnelBand.position.set(0, 5.1, -4.4);
  ship.add(funnelBand);

  const mastMat = new THREE.MeshStandardMaterial({ color: 0x6b4a2f, roughness: 0.75 });

  // main mast + boom
  const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.2, 13, 10), mastMat);
  mast.position.set(0, 7.0, 5.2);
  ship.add(mast);
  const boom = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 6.4, 8), mastMat);
  boom.rotation.z = Math.PI / 2;
  boom.position.set(0, 3.6, 4.6);
  ship.add(boom);

  // sails — softly bellied planes
  const sailMat = new THREE.MeshStandardMaterial({
    color: 0xf3eeda, roughness: 0.9, metalness: 0.0, side: THREE.DoubleSide,
  });
  const sailGeo = new THREE.PlaneGeometry(5.2, 7.4, 18, 1);
  const pos = sailGeo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const u = (pos.getX(i) / 2.6 * 0.5) + 0.5;
    pos.setZ(i, Math.sin(u * Math.PI) * 0.9);
  }
  sailGeo.computeVertexNormals();

  const mainsail = new THREE.Mesh(sailGeo, sailMat);
  mainsail.rotation.y = Math.PI / 2;   // vertical sheet in the YZ plane
  mainsail.position.set(1.7, 7.2, 4.9);
  ship.add(mainsail);

  // mizzen mast + sail (aft)
  const mizzen = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.16, 9, 10), mastMat);
  mizzen.position.set(0, 5.2, -5.2);
  ship.add(mizzen);
  const jib = new THREE.Mesh(sailGeo, sailMat);
  jib.scale.set(0.62, 0.7, 1);
  jib.rotation.y = Math.PI / 2;
  jib.position.set(1.5, 5.4, -4.9);
  ship.add(jib);

  // bowsprit + tiny jib sail
  const bowsprit = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 7, 8), mastMat);
  bowsprit.rotation.x = Math.PI / 2;
  bowsprit.position.set(0, 1.4, 11.5);
  ship.add(bowsprit);

  // stern flag pole + pennant
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 2.6, 6), mastMat);
  pole.position.set(0, 1.8, -8.6);
  ship.add(pole);
  const pennant = new THREE.Mesh(new THREE.ConeGeometry(0.55, 1.6, 3), new THREE.MeshStandardMaterial({ color: 0xd6402e, roughness: 0.6, side: THREE.DoubleSide }));
  pennant.rotation.y = Math.PI;
  pennant.position.set(0, 3.05, -8.0);
  ship.add(pennant);

  return ship;
}

const ship = buildShip();
scene.add(ship);

// ── Camera orbit control (relaxing, damped, idle auto-sway) ──────────────────
const ORBIT = { yaw: 0.9, pitch: 0.16, dist: 60 }; // pitch = elevation above horizon (rad)
const follow = ship.position.clone();      // camera look target
let idleT = 0, lastInputT = 0;
let lastPointer = null, downXY = null, downTime = 0;
let orbitDirty = false;

function pointerNDC(e) {
  const r = renderer.domElement.getBoundingClientRect();
  return new THREE.Vector2(
    ((e.clientX - r.left) / r.width) * 2 - 1,
    -((e.clientY - r.top) / r.height) * 2 + 1,
  );
}

function onPointerDown(e) {
  lastPointer = pointerNDC(e);
  downXY = lastPointer.clone();
  downTime = performance.now();
  lastInputT = idleT; idleT = 0;
  renderer.domElement.setPointerCapture(e.pointerId);
}
function onPointerMove(e) {
  if (!lastPointer) return;
  const ndc = pointerNDC(e);
  const dx = ndc.x - lastPointer.x, dy = ndc.y - lastPointer.y;
  ORBIT.yaw -= dx * 0.6;
  ORBIT.pitch = Math.max(0.0, Math.min(1.35, ORBIT.pitch + dy * 0.5));
  lastPointer = ndc;
  lastInputT = performance.now(); idleT = 0;
}
function onPointerUp(e) {
  if (lastPointer) {
    const moved = Math.hypot(pointerNDC(e).x - downXY.x, pointerNDC(e).y - downXY.y);
    if (moved < 0.01 && performance.now() - downTime < 600) handleTap(pointerNDC(e));
  }
  lastPointer = null;
}
renderer.domElement.addEventListener('pointerdown', onPointerDown);
renderer.domElement.addEventListener('pointermove', onPointerMove);
renderer.domElement.addEventListener('pointerup', onPointerUp);
renderer.domElement.addEventListener('pointercancel', () => { lastPointer = null; });

renderer.domElement.addEventListener('wheel', (e) => {
  e.preventDefault();
  ORBIT.dist = Math.max(8, Math.min(240, ORBIT.dist * (1 + e.deltaY * 0.0012)));
  lastInputT = performance.now(); idleT = 0;
}, { passive: false });

// --- clicking the sea → spawn a wave ------------------------------------------
const waterPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
const raycaster = new THREE.Raycaster();
const shipMeshes = [];
ship.traverse((o) => { if (o.isMesh) shipMeshes.push(o); });

function handleTap(ndc) {
  raycaster.setFromCamera(ndc, camera);
  const hitShip = raycaster.intersectObjects(shipMeshes, false)[0];
  const hit = raycaster.ray.intersectPlane(waterPlane, new THREE.Vector3());
  if (!hit) return;
  if (hitShip && hitShip.distance < (hit ? raycaster.ray.origin.distanceTo(hit) : Infinity)) return;
  addRipple(hit.x, hit.z, elapsed);
}

// ── Per-frame ocean sample (JS mirror of the shader, for ship physics) ──────
function baseHeight(p, t) {
  return 1.10 * Math.sin(p[0] * 0.050 + t * 0.80) * Math.cos(p[1] * 0.032 + t * 0.55)
       + 0.62 * Math.sin(p[0] * 0.110 + p[1] * 0.060 + t * 1.40)
       + 0.35 * Math.sin(p[0] * 0.030 - p[1] * 0.085 + t * 1.10);
}
function rippleHeightJS(p, t) {
  let h = 0;
  for (const r of ripples) {
    const age = t - r.t0;
    if (age <= 0 || age > RIPPLE_LIFE) continue;
    const dist = Math.hypot(p[0] - r.x, p[1] - r.z);
    const ring = dist - age * RIPPLE_SPEED;
    const amp = RIPPLE_AMP * Math.exp(-age / 2.2);
    h += amp * Math.exp(-ring * ring * 0.9) * Math.cos(ring * 2.2 - age * 4.0);
  }
  return h;
}
function sampleOcean(p, t) { return baseHeight(p, t) + rippleHeightJS(p, t); }

const shipNav = { radius: 16, speed: 0.028, a: 1.2 };

// ── UI overlay ───────────────────────────────────────────────────────────────
function phaseName(sunY) {
  if (sunY > 0.42) return 'Midday';
  if (sunY > 0.10) return 'Morning';
  if (sunY > -0.04) return sunY > 0 ? 'Sunrise' : 'Sunset';
  if (sunY > -0.38) return 'Dusk';
  return 'Night';
}
const clockEl = document.createElement('div');
clockEl.id = 'clock';
document.body.appendChild(clockEl);

const hintEl = document.createElement('div');
hintEl.id = 'hint';
hintEl.innerHTML = 'Drag to orbit &nbsp;·&nbsp; scroll to zoom &nbsp;·&nbsp; click the sea to make waves';
document.body.appendChild(hintEl);

const vignette = document.createElement('div');
vignette.id = 'vignette';
document.body.appendChild(vignette);

// ── Main loop ────────────────────────────────────────────────────────────────
let elapsed = 0;
let diagFramed = false, rafId = 0;

// STABLE: test hook — awaited frames near the end of the file.


function animate() {
  rafId = requestAnimationFrame(animate);
  const dt = Math.min(clock.getDelta(), 0.05);
  elapsed += dt;
  timeOfDay = (timeOfDay + dt / DAY_LENGTH) % 1;

  const sun = sunState(timeOfDay);

  // sky palette each frame
  const day = sun.day, warm = sun.warm;
  const dusk = clamp01(warm * (0.55 + 0.45 * day)); // 1 around sunrise/sunset, fades at noon/midnight
  let top = lerp3(PAL.nightTop, PAL.dayTop, day);
  top = lerp3(top, PAL.dawnTop, clamp01(warm * (1 - day)) * 0.7 + clamp01(warm * day) * 0.14);
  let bot = lerp3(PAL.nightBot, PAL.dayBot, day);
  bot = lerp3(bot, PAL.warm, clamp01(warm * (0.35 + 0.25 * day)) * 0.85);
  const horColor = lerp3(PAL.pale, PAL.warm, clamp01(warm * (0.5 + 0.5 * day)));
  const horizonStrength = 0.18 + dusk * 1.6 + day * 0.10;
  const horizonPower = lerp(7.0, 2.6, dusk);
  const sunCol = lerp3(PAL.sunHigh, PAL.sunLow, clamp01(warm) * 0.85);
  const sunGlow = clamp01(day) * 0.9 + warm * 0.7 + clamp01(-sun.sunY / 0.05) * 0.06; // faint afterglow
  const moonGlow = (1 - day);
  const starOpacity = clamp01((-sun.sunY - 0.04) / 0.16);

  set3(skyUniforms.uTopColor, top);
  set3(skyUniforms.uBottomColor, bot);
  set3(skyUniforms.uHorizonColor, horColor);
  skyUniforms.uHorizonStrength.value = horizonStrength;
  skyUniforms.uHorizonPower.value = horizonPower;
  set3(skyUniforms.uSunColor, sunCol);
  skyUniforms.uSunGlow.value = sunGlow;
  skyUniforms.uSunSide.value = dusk * 1.1 + day * 0.15;
  skyUniforms.uMoonGlow.value = moonGlow * 0.5;
  skyUniforms.uSunDir.value.copy(sun.dir);
  skyUniforms.uMoonDir.value.copy(sun.moon);
  skyUniforms.uCamPos.value.copy(camera.position);

  // star / sun / moon sprites
  starMat.opacity = starOpacity;
  const sunVisible = clamp01(sun.sunY / 0.06);
  sunSprite.material.opacity = sunVisible * 0.95;
  sunSprite.position.copy(sun.dir).multiplyScalar(3700);
  sunSprite.material.color.setRGB(sunCol[0], sunCol[1], sunCol[2]);
  moonSprite.material.opacity = moonGlow * 0.8;
  moonSprite.position.copy(sun.moon).multiplyScalar(3700);

  // clouds (warm-tinted at dawn/dusk)
  const cloudVis = day * (0.30 + 0.35 * Math.sin(timeOfDay * Math.PI * 2 + 1)); // fuller mid-day
  cloudMat.color.setRGB(lerp(1, 1, dusk), lerp(1, 0.72, dusk), lerp(1, 0.52, dusk));
  for (let i = 0; i < clouds.length; i++) {
    const c = clouds[i];
    c.material.opacity = clamp01(cloudVis);
    c.position.x += dt * (0.6 + i * 0.05);
    if (c.position.x > 700) c.position.x = -700;
  }

  // lights
  sunLight.position.copy(sun.dir).multiplyScalar(400);
  sunLight.intensity = 2.3 * clamp01(sun.sunY / 0.32) + 0.02;
  sunLight.color.setRGB(sunCol[0], sunCol[1], sunCol[2]);
  hemi.intensity = 0.18 + day * 0.55;
  hemi.color.setRGB(lerp(0.05, 0.55, day), lerp(0.08, 0.72, day), lerp(0.20, 0.95, day));
  hemi.groundColor.setRGB(lerp(0.01, 0.16, day), lerp(0.02, 0.24, day), lerp(0.05, 0.30, day));
  const night = 1 - day;
  cabinLight.intensity = night * 1.6 + 0.06;
  if (shipWindowMat) shipWindowMat.emissiveIntensity = night * 1.1;

  // ocean uniforms
  oceanUniforms.uTime.value = elapsed;
  oceanUniforms.uSunDir.value.copy(sun.dir);
  set3(oceanUniforms.uSunColor, sunCol);
  oceanUniforms.uCamPos.value.copy(camera.position);
  const fog = lerp3(bot, PAL.warm, clamp01(warm * (0.5 + 0.3 * day)));
  set3(oceanUniforms.uFogColor, fog);
  if (rippleUploadDirty) { uploadRipples(elapsed); rippleUploadDirty = false; }

  // ship motion: gentle circle, riding the waves (including ripples)
  shipNav.a += dt * shipNav.speed;
  const sx = Math.sin(shipNav.a) * shipNav.radius;
  const sz = Math.cos(shipNav.a) * shipNav.radius;
  const p = [sx, sz];
  const h = sampleOcean(p, elapsed);
  const eps = 2.0;
  const hx = sampleOcean([sx + eps, sz], elapsed);
  const hz = sampleOcean([sx, sz + eps], elapsed);
  ship.position.set(sx, h - 0.9, sz);
  const heading = Math.atan2(Math.cos(shipNav.a), -Math.sin(shipNav.a));
  const pitch = Math.atan2(-(hx - h) / eps, 1.0) * 0.9;
  const roll = Math.atan2(-(hz - h) / eps, 1.0) * 0.9;
  ship.rotation.order = 'YXZ';
  ship.rotation.set(pitch, heading, roll);

  // camera: follow ship gently; idle sway; damped orbit
  follow.lerp(ship.position, 1 - Math.exp(-dt * 0.6));
  idleT += dt;
  if (performance.now() - lastInputT > 6000) {
    ORBIT.yaw += dt * 0.045; // gentle idle drift
  }
  const cp = new THREE.Vector3(
    Math.sin(ORBIT.yaw) * Math.cos(ORBIT.pitch),
    Math.sin(ORBIT.pitch),
    Math.cos(ORBIT.yaw) * Math.cos(ORBIT.pitch),
  ).multiplyScalar(ORBIT.dist).add(follow);
  camera.position.lerp(cp, 1 - Math.exp(-dt * 3.0));
  camera.lookAt(follow);

  renderer.render(scene, camera);
  if (!diagFramed) {
    diagFramed = true;
    diagMark('frame');
    if (/[?&]ripple=1/.test(location.search)) {
      // headless test: drop a couple of ripples right in front of the ship
      addRipple(sx, sz + 14, elapsed);
      addRipple(sx + 18, sz - 6, elapsed);
    }
    if (diag) cancelAnimationFrame(rafId); // freeze so a headless --dump-dom can exit
  }

  // UI
  const hours = ((timeOfDay * 24 + 6) % 24);
  const hh = Math.floor(hours), mm = Math.floor((hours - hh) * 60);
  clockEl.textContent =
    `${phaseName(sun.sunY)} · ${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
}

function set3(u, [r, g, b]) { u.value.set(r, g, b); }

diagMark('setup');
animate();

// Test hook: for headless screenshots, hold this module open for a couple of
// rendered frames. A deferred module that is still awaiting keeps the document
// "load" event pending, so Firefox --screenshot reliably captures content.
const STABLE = /[?&]stable=1/.test(location.search);
if (STABLE) {
  await new Promise((res) => requestAnimationFrame(() => requestAnimationFrame(res)));
}

// ── Resize ───────────────────────────────────────────────────────────────────
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});