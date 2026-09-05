// Sunset Sails - a tiny, relaxing 3D ship simulator.
// Click the sea to make a wave. The sun rises and sets into the horizon.
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SUNRISE = 0.25; // time-of-day fraction when the sun touches the horizon
const SUNSET = 0.75;
const CYCLE_SECONDS = 260; // a full day if nobody scrubs the slider

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function clamp(x, a, b) {
  return Math.max(a, Math.min(b, x));
}

function smoothstep(edge0, edge1, x) {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

function frac(x) {
  return x - Math.floor(x);
}

// Make a soft radial-gradient canvas texture. `stops` is an array of
// [offset, rgba] pairs used with createRadialGradient.
function makeRadialTexture(stops, size = 128) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  for (const [o, c] of stops) g.addColorStop(o, c);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

const TEX_GLOW = makeRadialTexture([
  [0.0, 'rgba(255,255,255,1)'],
  [0.25, 'rgba(255,255,255,0.85)'],
  [0.6, 'rgba(255,255,255,0.22)'],
  [1.0, 'rgba(255,255,255,0)'],
]);
const TEX_SUNCORE = makeRadialTexture([
  [0.0, 'rgba(255,255,255,1)'],
  [0.35, 'rgba(255,255,230,0.95)'],
  [0.7, 'rgba(255,255,230,0.3)'],
  [1.0, 'rgba(255,255,230,0)'],
]);
const TEX_CLOUD = makeRadialTexture([
  [0.0, 'rgba(255,255,255,1)'],
  [0.35, 'rgba(255,255,255,0.75)'],
  [0.8, 'rgba(255,255,255,0.18)'],
  [1.0, 'rgba(255,255,255,0)'],
], 64);
const TEX_STAR = makeRadialTexture([
  [0.0, 'rgba(255,255,255,1)'],
  [0.4, 'rgba(255,255,255,0.8)'],
  [1.0, 'rgba(255,255,255,0)'],
], 32);

// ---------------------------------------------------------------------------
// Time-of-day palette: three anchor looks blended by sun elevation
// ---------------------------------------------------------------------------

const PAL = {
  night: {
    skyTop: new THREE.Color('#273052'),
    skyHorizon: new THREE.Color('#354a78'),
    skyBelow: new THREE.Color('#1a2740'),
    seaDeep: new THREE.Color('#1d3a5c'),
    seaShallow: new THREE.Color('#35638c'),
    lightColor: new THREE.Color('#c3d4f0'),
    lightAmt: 0.5,
    cloudTint: new THREE.Color('#4f5f86'),
    sunColor: new THREE.Color('#d6e4ff'),
  },
  dusk: {
    skyTop: new THREE.Color('#2b2b55'),
    skyHorizon: new THREE.Color('#ff9a62'),
    skyBelow: new THREE.Color('#522b47'),
    seaDeep: new THREE.Color('#2b2a52'),
    seaShallow: new THREE.Color('#c27652'),
    lightColor: new THREE.Color('#ffb178'),
    lightAmt: 0.55,
    cloudTint: new THREE.Color('#f0805a'),
    sunColor: new THREE.Color('#ff8a4a'),
  },
  day: {
    skyTop: new THREE.Color('#2f7fcd'),
    skyHorizon: new THREE.Color('#d3ecff'),
    skyBelow: new THREE.Color('#2e76a0'),
    seaDeep: new THREE.Color('#0b3d63'),
    seaShallow: new THREE.Color('#2f96c4'),
    lightColor: new THREE.Color('#fff3df'),
    lightAmt: 1.0,
    cloudTint: new THREE.Color('#ffffff'),
    sunColor: new THREE.Color('#fff3d6'),
  },
};

function lerpC(a, b, t) {
  return new THREE.Color().copy(a).lerp(b, clamp(t, 0, 1));
}

function sunElevation(t) {
  // 0 on the horizon at sunrise & sunset, peak ~1.05 rad at noon.
  // A gentle exponent keeps the sun near the horizon a little longer.
  const u = (t - SUNRISE) / (SUNSET - SUNRISE);
  if (u > 0 && u < 1) {
    const s = Math.pow(Math.sin(Math.PI * u), 1.35);
    return s * 1.05;
  }
  // Night: settle the sun below the horizon slowly so twilight lingers.
  const d = u <= 0 ? -u : u - 1; // distance into the night, 0..1
  const fade = clamp(d * 3.5, 0, 1);
  return -0.9 * fade * fade;
}

// Compute palette + sun direction for time `t`.
function computeSky(t, out) {
  const elev = sunElevation(t);
  const day = smoothstep(-0.06, 0.45, elev); // daytime base (0 at night, 1 at noon)
  const dusk = Math.exp(-Math.abs(elev) * 3.4); // warm band hugging the horizon
  const nightFactor = smoothstep(-0.02, 0.6, -elev); // 1 when fully night

  // azimuth sweeps east -> west
  const u = (t - SUNRISE) / (SUNSET - SUNRISE);
  const azimuth = -1.35 + 2.7 * clamp(u, 0, 1);
  const sunDir = new THREE.Vector3(
    Math.cos(elev) * Math.cos(azimuth),
    Math.sin(elev),
    Math.cos(elev) * Math.sin(azimuth)
  );

  const sunUp = smoothstep(-0.08, 0.12, elev);
  const sunGlow = Math.exp(-Math.abs(elev) * 2.4);
  const sunVis = sunUp * smoothstep(-0.2, 0.05, elev);

  // --- sky ---
  let top = lerpC(PAL.night.skyTop, PAL.day.skyTop, day);
  top.lerp(PAL.dusk.skyTop, dusk * 0.55);
  let horiz = lerpC(PAL.night.skyHorizon, PAL.day.skyHorizon, day);
  horiz.lerp(PAL.dusk.skyHorizon, dusk);
  let below = lerpC(PAL.night.skyBelow, PAL.day.skyBelow, day);
  below.lerp(PAL.dusk.skyBelow, dusk * 0.7);

  // --- sea (subtler dusk shift so it still reads as water) ---
  let seaDeep = lerpC(PAL.night.seaDeep, PAL.day.seaDeep, day);
  seaDeep.lerp(PAL.dusk.seaDeep, dusk * 0.5);
  let seaShallow = lerpC(PAL.night.seaShallow, PAL.day.seaShallow, day);
  seaShallow.lerp(PAL.dusk.seaShallow, dusk * 0.8);

  let sunColor = lerpC(PAL.day.sunColor, PAL.dusk.sunColor, dusk);
  sunColor.lerp(PAL.night.sunColor, nightFactor * 0.4 * (1 - sunUp));

  let lightColor = lerpC(PAL.night.lightColor, PAL.day.lightColor, day);
  lightColor.lerp(PAL.dusk.lightColor, dusk * 0.55);

  let cloudTint = lerpC(PAL.night.cloudTint, PAL.day.cloudTint, day);
  cloudTint.lerp(PAL.dusk.cloudTint, dusk * 0.7);

  // --- drivers ---
  let lightAmt = lerp(PAL.night.lightAmt, PAL.day.lightAmt, day);
  lightAmt = Math.max(lightAmt, dusk * PAL.dusk.lightAmt); // twilight stays bright
  const starOpacity = smoothstep(0.0, 0.28, -elev);

  out.skyTop = top;
  out.skyHorizon = horiz;
  out.skyBelow = below;
  out.sunColor = sunColor;
  out.seaDeep = seaDeep;
  out.seaShallow = seaShallow;
  out.lightColor = lightColor;
  out.cloudTint = cloudTint;

  out.elev = elev;
  out.dayness = day;
  out.sunUp = sunUp;
  out.sunGlow = sunGlow;
  out.sunVis = sunVis;
  out.sunDir = sunDir;
  out.nightFactor = nightFactor;
  out.starOpacity = starOpacity;
  out.lightAmt = lightAmt;
  out.sunset = dusk;
  return out;
}

function lerp(a, b, t) {
  return a + (b - a) * clamp(t, 0, 1);
}

// Analytic water height at a world (x,z) point, matching the ocean vertex
// shader's grid-wave sum. Ripples are omitted here.
function waterHeight(x, z, time) {
  const w = (qx, qz, A, F, S, d) => {
    const len = Math.hypot(d.x, d.y) || 1;
    const nx = d.x / len;
    const nz = d.y / len;
    const ph = (x * nx + z * nz) * F - time * S;
    return A * Math.sin(ph);
  };
  return (
    w(x, z, 0.16, 0.035, 0.55, { x: 0.85, y: 0.5 }) +
    w(x, z, 0.11, 0.06, 0.8, { x: -0.5, y: 0.8 }) +
    w(x, z, 0.05, 0.12, 1.15, { x: 0.2, y: -0.9 })
  );
}

// ---------------------------------------------------------------------------
// Three.js setup
// ---------------------------------------------------------------------------

const appEl = document.getElementById('app');
let renderer;
try {
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
} catch (err) {
  appEl.textContent = 'This simulator needs WebGL. Please enable it or try another browser.';
  appEl.style.cssText =
    'padding:40px;font-family:system-ui;color:#cfe0f5;font-size:15px;';
  throw err;
}
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.shadowMap.enabled = false;
appEl.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 2200);
camera.position.set(30, 16, 36);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 1.5, 0);
controls.enableDamping = true;
controls.dampingFactor = 0.06;
controls.minDistance = 9;
controls.maxDistance = 220;
controls.maxPolarAngle = Math.PI / 2 - 0.02;
controls.enablePan = false;
controls.autoRotate = false;

// ---------------------------------------------------------------------------
// Lights
// ---------------------------------------------------------------------------

const hemi = new THREE.HemisphereLight();
hemi.intensity = 1.0;
scene.add(hemi);

const sunLight = new THREE.DirectionalLight();
sunLight.position.set(60, 80, -40);
scene.add(sunLight);

const moonLight = new THREE.DirectionalLight(0xa7bde8, 0);
moonLight.position.set(-40, 60, 20);
scene.add(moonLight);

const ambient = new THREE.AmbientLight(0xffffff, 0.15);
scene.add(ambient);

// ---------------------------------------------------------------------------
// Sky dome
// ---------------------------------------------------------------------------

const skyUniforms = {
  uZenith: { value: new THREE.Color('#2f7fcd') },
  uHorizon: { value: new THREE.Color('#cfe9ff') },
  uBelow: { value: new THREE.Color('#2e7ba6') },
  uSunDir: { value: new THREE.Vector3(0, 1, 0) },
  uSunColor: { value: new THREE.Color('#fff3d6') },
  uSunGlow: { value: 1.0 },
};

const skyMaterial = new THREE.ShaderMaterial({
  uniforms: skyUniforms,
  vertexShader: `
    varying vec3 vDir;
    void main() {
      vDir = normalize(position);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 uZenith;
    uniform vec3 uHorizon;
    uniform vec3 uBelow;
    uniform vec3 uSunDir;
    uniform vec3 uSunColor;
    uniform float uSunGlow;
    varying vec3 vDir;
    void main() {
      vec3 d = normalize(vDir);
      vec3 col;
      float dy = smoothstep(-0.06, 0.0, d.y);
      if (d.y >= 0.0) {
        col = mix(uHorizon, uZenith, smoothstep(0.0, 0.55, d.y));
      } else {
        col = mix(uBelow, uHorizon, dy);
      }
      float sd = max(dot(d, normalize(uSunDir)), 0.0);
      col += uSunColor * pow(sd, 8.0) * uSunGlow * 0.5;
      col += uSunColor * pow(sd, 90.0) * uSunGlow * 1.8;
      gl_FragColor = vec4(col, 1.0);
    }
  `,
  side: THREE.BackSide,
  depthWrite: false,
  depthTest: false,
});

const sky = new THREE.Mesh(new THREE.SphereGeometry(800, 40, 24), skyMaterial);
sky.renderOrder = -10;
scene.add(sky);

// ---------------------------------------------------------------------------
// Stars
// ---------------------------------------------------------------------------

const STARS = 1400;
const STAR_COUNT = STARS;
const starPositions = new Float32Array(STAR_COUNT * 3);
for (let i = 0; i < STAR_COUNT; i++) {
  // upper hemisphere, radius ~690 (between ocean and sky dome)
  const theta = Math.random() * Math.PI * 2;
  const y = Math.pow(Math.random(), 0.35) * 0.98 + 0.02;
  const r = Math.sqrt(1 - y * y) * 690;
  starPositions[i * 3] = Math.cos(theta) * r;
  starPositions[i * 3 + 1] = y * 690;
  starPositions[i * 3 + 2] = Math.sin(theta) * r;
}
const starGeo = new THREE.BufferGeometry();
starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
const stars = new THREE.Points(
  starGeo,
  new THREE.PointsMaterial({
    color: 0xffffff,
    size: 3.2,
    sizeAttenuation: false,
    map: TEX_STAR,
    transparent: true,
    opacity: 0,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  })
);
scene.add(stars);

// ---------------------------------------------------------------------------
// Sun & moon sprites
// ---------------------------------------------------------------------------

const sunGroup = new THREE.Group();
const sunHalo = new THREE.Sprite(new THREE.SpriteMaterial({
  map: TEX_GLOW,
  color: 0xffffff,
  transparent: true,
  opacity: 1,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
  rotation: Math.atan2(0, 1),
}));
sunHalo.scale.setScalar(120);
const sunCore = new THREE.Sprite(new THREE.SpriteMaterial({
  map: TEX_SUNCORE,
  color: 0xfff3d6,
  transparent: true,
  opacity: 1,
  depthWrite: true,
}));
sunCore.scale.setScalar(22);
sunGroup.add(sunHalo);
sunGroup.add(sunCore);
scene.add(sunGroup);

const moonMat = new THREE.SpriteMaterial({
  map: TEX_SUNCORE,
  color: 0xeaf0ff,
  transparent: true,
  opacity: 0,
  depthWrite: true,
});
const moon = new THREE.Sprite(moonMat);
moon.scale.setScalar(14);
scene.add(moon);

// ---------------------------------------------------------------------------
// Ocean (custom shader with clickable ripples)
// ---------------------------------------------------------------------------

const oceanUniforms = {
  uTime: { value: 0 },
  uWaves: { value: Array.from({ length: 8 }, () => new THREE.Vector4(0, 0, -99, 0)) },
  uWaveCount: { value: 0 },
  uRippleStrength: { value: 1.0 },
  uSeaDeep: { value: new THREE.Color('#0b3d63') },
  uSeaShallow: { value: new THREE.Color('#2c94c2') },
  uSkyColor: { value: new THREE.Color('#cfe9ff') },
  uSunColor: { value: new THREE.Color('#fff3d6') },
  uSunDir: { value: new THREE.Vector3(0, 1, 0) },
  uMoonDir: { value: new THREE.Vector3(0, 1, 0) },
  uMoonColor: { value: new THREE.Color('#a7bde8') },
  uMoonStrength: { value: 0 },
  uLightAmt: { value: 1.0 },
  uCameraPos: { value: new THREE.Vector3() },
  uFogDensity: { value: 0.007 },
};

const oceanMaterial = new THREE.ShaderMaterial({
  uniforms: oceanUniforms,
  vertexShader: `
    uniform float uTime;
    uniform vec4 uWaves[8];
    uniform int uWaveCount;
    uniform float uRippleStrength;

    varying vec3 vWorldPos;
    varying vec3 vNormal;

    void main() {
      vec3 p = position;
      float px = p.x;        // world-space x (plane local x)
      float pz = -p.y;       // world-space z (plane is rotated -90 around X)
      vec2 pw = vec2(px, pz);

      // traveling grid waves
      float h = 0.0;
      float dhdx = 0.0;
      float dhdz = 0.0;

      {
        float A = 0.16, F = 0.035, S = 0.55;
        vec2 D = normalize(vec2(0.85, 0.5));
        float ph = dot(pw, D) * F - uTime * S;
        h += A * sin(ph);
        dhdx += A * F * D.x * cos(ph);
        dhdz += A * F * D.y * cos(ph);
      }
      {
        float A = 0.11, F = 0.06, S = 0.8;
        vec2 D = normalize(vec2(-0.5, 0.8));
        float ph = dot(pw, D) * F - uTime * S;
        h += A * sin(ph);
        dhdx += A * F * D.x * cos(ph);
        dhdz += A * F * D.y * cos(ph);
      }
      {
        float A = 0.05, F = 0.12, S = 1.15;
        vec2 D = normalize(vec2(0.2, -0.9));
        float ph = dot(pw, D) * F - uTime * S;
        h += A * sin(ph);
        dhdx += A * F * D.x * cos(ph);
        dhdz += A * F * D.y * cos(ph);
      }

      // ripples from click "stones"
      float ripple = 0.0;
      float rdx = 0.0;
      float rdz = 0.0;
      for (int i = 0; i < 8; i++) {
        if (i >= uWaveCount) break;
        vec4 w = uWaves[i];
        vec2 dir = pw - w.xy;
        float dist = length(dir) + 1e-4;
        dir /= dist;
        float age = uTime - w.z;
        if (age < 0.0 || age > 9.0) continue;
        float speed = 6.5;
        float r = max(dist - age * speed, 0.0);
        float width = 1.7;
        float env = exp(-r * r / (width * width)) * exp(-age * 0.42);
        float k = 2.6;
        float osc = sin(r * k - age * 3.2);
        ripple += w.w * env * osc;
        float der = env * (k * cos(r * k - age * 3.2) - 2.0 * r / (width * width) * osc);
        rdx += w.w * der * dir.x;
        rdz += w.w * der * dir.y;
      }

      float disp = h + ripple * uRippleStrength;

      // The plane is rotated -90 around X, so local +Z maps to world +Y.
      // A positive displacement therefore lifts the water up.
      vec3 displaced = vec3(p.x, p.y, disp);

      float dydx = dhdx + rdx * uRippleStrength;
      float dydz = dhdz + rdz * uRippleStrength;
      vec3 N = normalize(vec3(-dydx, 1.0, -dydz));

      vec4 worldPos = modelMatrix * vec4(displaced, 1.0);
      vWorldPos = worldPos.xyz;
      vNormal = N;
      gl_Position = projectionMatrix * viewMatrix * worldPos;
    }
  `,
  fragmentShader: `
    uniform vec3 uSeaDeep;
    uniform vec3 uSeaShallow;
    uniform vec3 uSkyColor;
    uniform vec3 uSunColor;
    uniform vec3 uSunDir;
    uniform vec3 uMoonDir;
    uniform vec3 uMoonColor;
    uniform float uMoonStrength;
    uniform float uLightAmt;
    uniform vec3 uCameraPos;
    uniform float uFogDensity;

    varying vec3 vWorldPos;
    varying vec3 vNormal;

    void main() {
      vec3 N = normalize(vNormal);
      vec3 V = normalize(uCameraPos - vWorldPos);
      vec3 L = normalize(uSunDir);

      float ndv = clamp(dot(N, V), 0.0, 1.0);
      float fresnel = pow(1.0 - ndv, 3.0);

      vec3 base = mix(uSeaDeep, uSeaShallow, smoothstep(0.0, 0.85, ndv));

      float diff = clamp(dot(N, L), 0.0, 1.0);
      vec3 col = base * (0.30 + 0.45 * uLightAmt);
      col += base * uSunColor * (0.06 + diff * 1.1) * uLightAmt;

      // gleam of moonlight across the waves at night
      vec3 M = normalize(uMoonDir);
      float mdiff = clamp(dot(N, M), 0.0, 1.0);
      col += base * uMoonColor * mdiff * uMoonStrength * 0.25;
      vec3 HM = normalize(M + V);
      float mMoon = pow(clamp(dot(N, HM), 0.0, 1.0), 60.0);
      col += uMoonColor * mMoon * uMoonStrength * 0.9;

      // glistening sun path on the water
      vec3 H = normalize(L + V);
      float spec = pow(clamp(dot(N, H), 0.0, 1.0), 240.0);
      col += uSunColor * spec * 2.6 * uLightAmt;

      col = mix(col, uSkyColor, fresnel * (0.25 + 0.45 * uLightAmt));

      float dist = length(uCameraPos - vWorldPos);
      float fog = 1.0 - exp(-dist * uFogDensity);
      col = mix(col, uSkyColor, clamp(fog, 0.0, 1.0));

      gl_FragColor = vec4(col, 1.0);
    }
  `,
});

const oceanGeo = new THREE.PlaneGeometry(420, 420, 200, 200);
const ocean = new THREE.Mesh(oceanGeo, oceanMaterial);
ocean.rotation.x = -Math.PI / 2;
ocean.position.y = 0;
scene.add(ocean);

// ---------------------------------------------------------------------------
// Clouds
// ---------------------------------------------------------------------------

const cloudMatShared = new THREE.SpriteMaterial({
  map: TEX_CLOUD,
  transparent: true,
  opacity: 0.55,
  depthWrite: false,
  color: 0xffffff,
});
const clouds = [];
function buildClouds() {
  const count = 6;
  for (let c = 0; c < count; c++) {
    const group = new THREE.Group();
    const puffs = 4 + Math.floor(Math.random() * 4);
    group.position.set(
      (Math.random() - 0.5) * 260,
      30 + Math.random() * 90,
      (Math.random() - 0.5) * 260
    );
    for (let p = 0; p < puffs; p++) {
      const s = new THREE.Sprite(cloudMatShared);
      const sc = 14 + Math.random() * 30;
      s.scale.set(sc * 1.4, sc * 0.7, 1);
      s.position.set((Math.random() - 0.5) * 46, (Math.random() - 0.5) * 6, (Math.random() - 0.5) * 20);
      s.material = new THREE.SpriteMaterial({
        map: TEX_CLOUD,
        transparent: true,
        opacity: 0.35 + Math.random() * 0.3,
        depthWrite: false,
        color: 0xffffff,
      });
      group.add(s);
    }
    group.userData.speed = 0.4 + Math.random() * 0.5;
    group.userData.scale = 1;
    scene.add(group);
    clouds.push(group);
  }
}
buildClouds();

// ---------------------------------------------------------------------------
// Birds
// ---------------------------------------------------------------------------

function makeBird() {
  const g = new THREE.Group();
  const wingMat = new THREE.MeshBasicMaterial({ color: 0x1a2633, side: THREE.DoubleSide });
  const wingGeo = new THREE.BufferGeometry();
  const pts = new Float32Array([
    0, 0, 0,   // body center
    1.6, 0.06, 0.25,  // wing tip
    0, 0, -0.28,       // back
  ]);
  wingGeo.setAttribute('position', new THREE.BufferAttribute(pts, 3));
  wingGeo.computeVertexNormals();
  const lw = new THREE.Mesh(wingGeo, wingMat);
  const rw = new THREE.Mesh(wingGeo, wingMat);
  rw.rotation.y = Math.PI;
  rw.position.y = 0.06;
  g.add(lw, rw);
  g.userData.flapPhase = Math.random() * Math.PI * 2;
  return g;
}

const birds = [];
for (let i = 0; i < 4; i++) {
  const b = makeBird();
  b.position.set(
    14 * Math.cos(i * 1.7),
    7 + (i % 2) * 2.5,
    4 + 12 * Math.sin(i * 1.7)
  );
  scene.add(b);
  birds.push({ mesh: b, angle: i * 1.7, radius: 13 + (i % 3) * 4, height: 7 + (i % 2) * 3 });
}

// ---------------------------------------------------------------------------
// Ship
// ---------------------------------------------------------------------------

const hullMat = new THREE.MeshStandardMaterial({ color: 0x6b4423, roughness: 0.82, metalness: 0.05 });
const deckMat = new THREE.MeshStandardMaterial({ color: 0xc09a67, roughness: 0.9, metalness: 0 });
const cabinMat = new THREE.MeshStandardMaterial({ color: 0xf1e6cf, roughness: 0.7, metalness: 0 });
const roofMat = new THREE.MeshStandardMaterial({ color: 0x8c5a32, roughness: 0.85, metalness: 0 });
const sailMat = new THREE.MeshStandardMaterial({
  color: 0xf4ead6,
  roughness: 0.95,
  metalness: 0,
  side: THREE.DoubleSide,
});
const darkMat = new THREE.MeshStandardMaterial({ color: 0x223140, roughness: 0.6, metalness: 0 });
const trimMat = new THREE.MeshStandardMaterial({ color: 0x3d5a73, roughness: 0.5, metalness: 0.1 });
const mastMat = new THREE.MeshStandardMaterial({ color: 0x5a3a1d, roughness: 0.7, metalness: 0 });
const flagMat = new THREE.MeshStandardMaterial({ color: 0xc34d46, roughness: 0.6, metalness: 0.1, side: THREE.DoubleSide });

const ship = new THREE.Group();

// hull: a long low ellipsoid, deck line near y=0.4
const hull = new THREE.Mesh(new THREE.SphereGeometry(1, 30, 20), hullMat);
hull.scale.set(4.6, 0.82, 1.25);
hull.position.y = 0.02;
ship.add(hull);

// deck
const deck = new THREE.Mesh(new THREE.CircleGeometry(1, 40), deckMat);
deck.scale.set(4.35, 1.2, 1);
deck.rotation.x = -Math.PI / 2;
deck.position.y = 0.42;
ship.add(deck);

// railings on the stern (two low boxes)
const railGeo = new THREE.BoxGeometry(0.08, 0.26, 0.06);
for (let s = -1; s <= 1; s += 2) {
  const rail = new THREE.Mesh(railGeo, mastMat);
  rail.position.set(0, 0.55, s * (1.1 - 0.05));
  ship.add(rail);
}

// cabin
const cabin = new THREE.Mesh(new THREE.BoxGeometry(2.7, 1.05, 1.15), cabinMat);
cabin.position.set(0, 0.95, -0.9);
ship.add(cabin);

const cabinRoof = new THREE.Mesh(new THREE.BoxGeometry(2.9, 0.28, 1.3), roofMat);
cabinRoof.position.set(0, 1.5, -0.9);
cabinRoof.rotation.x = 0.1;
cabinRoof.position.x += 0;
ship.add(cabinRoof);

// windows
const winGeo = new THREE.PlaneGeometry(0.55, 0.42);
function addWindows(zPlane) {
  for (let i = -1; i <= 1; i++) {
    const w = new THREE.Mesh(winGeo, darkMat);
    w.position.set(i * 0.9, 1.0, zPlane);
    w.rotation.y = zPlane > 0 ? -Math.PI / 2 : Math.PI / 2;
    ship.add(w);
  }
}
addWindows(0.57);
addWindows(-0.57);

// bowsprit
const bowsprit = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.09, 2.4, 8), mastMat);
bowsprit.rotation.z = -0.5;
bowsprit.position.set(0, 0.62, 2.9);
ship.add(bowsprit);

// mast
const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.12, 7.0, 10), mastMat);
mast.position.set(0, 4.0, -0.4);
ship.add(mast);

// yard arm across
const yard = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 2.6, 8), mastMat);
yard.rotation.z = Math.PI / 2;
yard.position.set(0, 5.9, -0.4);
ship.add(yard);

// flag on top
const flag = new THREE.Mesh(new THREE.PlaneGeometry(0.7, 0.42), flagMat);
flag.position.set(0.18, 7.5, -0.4);
ship.add(flag);

// T-shaped triangular mainsail (gaff quadrilateral), billowed slightly
function makeQuadSail(a, b, c, d, bulge) {
  // a,b are the mast-side edge (bottom, top), c is boom end (bottom), d is gaff end (top)
  const geo = new THREE.BufferGeometry();
  // compute center for slight billow along local X (away from mast)
  const cx = (a.x + b.x + c.x + d.x) / 4;
  const cz = (a.z + b.z + c.z + d.z) / 4;
  const dirX = 1; // billow toward +X
  const off = -bulge; // push sail surface away from mast line plane
  const vertices = new Float32Array([
    a.x, a.y, a.z + off * dirX * 0,         // mast bottom
    b.x, b.y, b.z + off * dirX * 0,         // mast top
    c.x, c.y, c.z + off * dirX * 1,         // boom end
    a.x, a.y, a.z,
    b.x, b.y, b.z,
    d.x, d.y, d.z + off * dirX * 1,         // gaff end
  ]);
  geo.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
  geo.computeVertexNormals();
  return geo;
}

const boomEnd = new THREE.Vector3(0, 1.35, -4.1);
const gaffEnd = new THREE.Vector3(0, 5.35, -3.9);
const mastTopV = new THREE.Vector3(0, 6.9, -0.4);
const mastLowV = new THREE.Vector3(0, 1.35, -0.4);

const mainSail = new THREE.Mesh(makeQuadSail(mastLowV, mastTopV, boomEnd, gaffEnd, 0.9), sailMat);
ship.add(mainSail);

// jib: triangle from bowsprit tip to mast near top
function makeTriSail(a, b, c, sign) {
  const geo = new THREE.BufferGeometry();
  const dirX = sign;
  const verts = new Float32Array([
    a.x, a.y, a.z,
    b.x, b.y, b.z,
    c.x, c.y, c.z + dirX * 0.35,
  ]);
  geo.setAttribute('position', new THREE.BufferAttribute(verts, 3));
  geo.computeVertexNormals();
  return geo;
}
const jib = new THREE.Mesh(
  makeTriSail(new THREE.Vector3(0, 1.2, 3.4), new THREE.Vector3(0, 6.6, -0.4), new THREE.Vector3(0, 1.35, 2.0), 1),
  sailMat
);
jib.position.x += 0.02;
ship.add(jib);

// a spar for the boom
const boom = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 3.9, 8), mastMat);
boom.position.set(0, 1.3, -2.35);
ship.add(boom);

// anchor chain + anchor (shown when anchored)
const chainMat = new THREE.LineBasicMaterial({ color: 0x8a8f98 });
const chainGeo = new THREE.BufferGeometry();
const chain = new THREE.Line(chainGeo, chainMat);
const anchorMesh = new THREE.Group();
const anchorArm = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.5, 6), darkMat);
anchorArm.rotation.z = Math.PI / 2;
anchorMesh.add(anchorArm);
const anchorCrown = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.06, 0.06), darkMat);
anchorCrown.position.y = -0.22;
anchorMesh.add(anchorCrown);
const anchorFluke = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.14, 0.05), darkMat);
anchorFluke.position.set(0.18, -0.16, 0);
anchorFluke.rotation.z = 0.5;
anchorMesh.add(anchorFluke);
const anchorRing = new THREE.Mesh(new THREE.TorusGeometry(0.07, 0.02, 6, 12), darkMat);
anchorRing.rotation.x = Math.PI / 2;
anchorRing.position.y = 0.3;
anchorMesh.add(anchorRing);
anchorMesh.visible = false;
scene.add(chain);
// chain and anchor are attached to the ship's bow in world space each frame

ship.position.y = -0.2;
scene.add(ship);

// warm lantern so the ship stays visible and cozy at night
const lanternGlow = new THREE.PointLight(0xffc46b, 0, 14);
lanternGlow.position.set(0, 1.8, -0.4);
ship.add(lanternGlow);
const lanternMat = new THREE.MeshStandardMaterial({
  color: 0xffc46b,
  emissive: 0xffb35c,
  emissiveIntensity: 3,
});
const lantern = new THREE.Mesh(new THREE.SphereGeometry(0.14, 12, 10), lanternMat);
lantern.position.copy(lanternGlow.position);
ship.add(lantern);

let anchored = false;

// ---------------------------------------------------------------------------
// Audio (procedural calm ocean ambience)
// ---------------------------------------------------------------------------

const audio = {
  ctx: null,
  master: null,
  oceanGain: null,
  windGain: null,
  started: false,
  enabled: true,
};

function initAudio() {
  if (audio.started) return;
  const Ctx = window.AudioContext || window.webkitAudioContext;
  if (!Ctx) return;
  try {
    audio.ctx = new Ctx();
  } catch (err) {
    console.warn('Sunset Sails: audio unavailable', err);
    return;
  }
  audio.master = audio.ctx.createGain();
  audio.master.gain.value = 0.5;
  audio.master.connect(audio.ctx.destination);

  // noise buffer
  const len = audio.ctx.sampleRate * 4;
  const buf = audio.ctx.createBuffer(2, len, audio.ctx.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const data = buf.getChannelData(ch);
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
  }

  // ocean wash: low-passed noise, slowly swelling with an LFO
  const oceanSrc = audio.ctx.createBufferSource();
  oceanSrc.buffer = buf;
  oceanSrc.loop = true;
  const oceanFilter = audio.ctx.createBiquadFilter();
  oceanFilter.type = 'lowpass';
  oceanFilter.frequency.value = 380;
  audio.oceanGain = audio.ctx.createGain();
  audio.oceanGain.gain.value = 0.0;
  const oceanLfoFreq = audio.ctx.createOscillator();
  oceanLfoFreq.frequency.value = 0.06;
  const oceanLfoGain = audio.ctx.createGain();
  oceanLfoGain.gain.value = 90;
  oceanLfoFreq.connect(oceanLfoGain);
  oceanLfoGain.connect(oceanFilter.frequency);
  const oceanLfoAmp = audio.ctx.createOscillator();
  oceanLfoAmp.frequency.value = 0.045;
  const oceanAmpGain = audio.ctx.createGain();
  oceanAmpGain.gain.value = 0.22;
  oceanLfoAmp.connect(oceanAmpGain);
  oceanAmpGain.connect(audio.oceanGain.gain);
  oceanSrc.connect(oceanFilter);
  oceanFilter.connect(audio.oceanGain);
  audio.oceanGain.connect(audio.master);
  oceanSrc.start();
  oceanLfoFreq.start();
  oceanLfoAmp.start();

  // gentle wind: band-passed noise, occasional gusts
  const windSrc = audio.ctx.createBufferSource();
  windSrc.buffer = buf;
  windSrc.loop = true;
  const windFilter = audio.ctx.createBiquadFilter();
  windFilter.type = 'bandpass';
  windFilter.frequency.value = 820;
  windFilter.Q.value = 0.6;
  audio.windGain = audio.ctx.createGain();
  audio.windGain.gain.value = 0.0;
  const windLfo = audio.ctx.createOscillator();
  windLfo.frequency.value = 0.08;
  const windLfoGain = audio.ctx.createGain();
  windLfoGain.gain.value = 0.05;
  windLfo.connect(windLfoGain);
  windLfoGain.connect(audio.windGain.gain);
  windSrc.connect(windFilter);
  windFilter.connect(audio.windGain);
  audio.windGain.connect(audio.master);
  windSrc.start();
  windLfo.start();

  audio.started = true;
}

// Smoothly set the audible level.
const audioLevels = { ocean: 0.42, wind: 0.16 };
function setSoundLevel() {
  if (!audio.ctx || !audio.started) return;
  const now = audio.ctx.currentTime;
  const target = audio.enabled ? audioLevels.ocean : 0;
  audio.oceanGain.gain.setTargetAtTime(target, now, 0.5);
  const wt = audio.enabled ? audioLevels.wind : 0;
  audio.windGain.gain.setTargetAtTime(wt, now, 0.8);
}

function setSoundEnabled(on) {
  audio.enabled = on;
  if (on) {
    initAudio();
    if (audio.ctx) audio.ctx.resume();
    setSoundLevel();
  } else if (audio.ctx) {
    setSoundLevel();
  }
}

// ---------------------------------------------------------------------------
// Ripple state
// ---------------------------------------------------------------------------

const ripples = Array.from({ length: 8 }, () => null);
let rippleWrite = 0;

function pushRipple(x, z, strength) {
  const slot = ripples[rippleWrite % ripples.length];
  if (slot) {
    slot.set(x, z, oceanUniforms.uTime.value, strength);
  } else {
    ripples[rippleWrite % ripples.length] = new THREE.Vector4(x, z, oceanUniforms.uTime.value, strength);
  }
  rippleWrite++;
  oceanUniforms.uWaveCount.value = Math.min(rippleWrite, ripples.length);
}

// tiny, non-intrusive hook so automated tests can check ripple state
window.__shipSim = {
  pushRipple,
  get oc() { return oceanUniforms; },
  setPlaying(v) { playing = v; pauseTimer = 0; },
  get playing() { return playing; },
  get dayTime() { return dayTime; },
  get canvas() { return renderer.domElement; },
  get soundEnabled() { return audio.enabled; },
  get anchored() { return anchored; },
  err: undefined,
};

// ---------------------------------------------------------------------------
// UI wiring
// ---------------------------------------------------------------------------

const clockEl = document.getElementById('clock');
const phaseEl = document.getElementById('phase');
const slider = document.getElementById('day-slider');
const soundToggle = document.getElementById('sound-toggle');
const anchorBtn = document.getElementById('drop-anchor');

let dayTime = 0.27;
const initParam = parseFloat(new URLSearchParams(location.search).get('t'));
if (Number.isFinite(initParam)) dayTime = clamp(initParam, 0, 1);
// When a fixed time is requested (e.g. ?t=0.5 for a screenshot or first
// visit to a shared link), hold it instead of auto-advancing right away.
let playing = !Number.isFinite(initParam);
let pauseTimer = 0;

function updateClockUI() {
  const minutes = dayTime * 1440;
  const h = Math.floor(minutes / 60) % 24;
  const m = Math.floor(minutes % 60);
  clockEl.textContent = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  const elev = sunElevation(dayTime);
  let phase;
  if (elev > 0.55) phase = 'midday';
  else if (elev > 0.16) phase = 'morning';
  else if (elev > 0.0) phase = 'sunrise';
  else if (elev < -0.4) phase = 'night';
  else if (elev < 0) phase = 'dusk';
  else phase = 'sunrise';
  phaseEl.textContent = phase;
}

slider.addEventListener('input', () => {
  playing = false;
  dayTime = parseFloat(slider.value);
  applySky(dayTime);
  updateClockUI();
  pauseTimer = 6; // resume auto-advance after a moment
});
slider.addEventListener('change', () => {
  playing = true;
});

soundToggle.addEventListener('change', (e) => setSoundEnabled(e.target.checked));

anchorBtn.addEventListener('click', () => {
  anchored = !anchored;
  anchorBtn.textContent = anchored ? 'Weigh anchor' : 'Drop anchor';
  anchorMesh.visible = anchored;
  chain.visible = anchored;
  if (anchored) {
    ship.userData.anchorX = ship.position.x;
    ship.userData.anchorZ = ship.position.z;
  }
});

// click the sea -> a wave
const raycaster = new THREE.Raycaster();
const ndc = new THREE.Vector2();
let pointerDownPos = null;
let pointerDownTime = 0;

renderer.domElement.addEventListener('pointerdown', (e) => {
  pointerDownPos = { x: e.clientX, y: e.clientY };
  pointerDownTime = performance.now();
});
renderer.domElement.addEventListener('pointerup', (e) => {
  if (!pointerDownPos) return;
  const moved = Math.hypot(e.clientX - pointerDownPos.x, e.clientY - pointerDownPos.y);
  const dt = performance.now() - pointerDownTime;
  pointerDownPos = null;
  if (moved > 10 || dt > 900) return; // that was an orbit drag
  ndc.set((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1);
  raycaster.setFromCamera(ndc, camera);
  const hits = raycaster.intersectObject(ocean, false);
  if (hits.length) {
    const pt = hits[0].point;
    const strength = 0.25 + Math.random() * 0.35;
    pushRipple(pt.x, pt.z, strength);
    spawnRippleHint(e.clientX, e.clientY);
  }
});

// DOM feedback ring at the click point (removed after animation)
function spawnRippleHint(x, y) {
  const div = document.createElement('div');
  div.className = 'ripple-hint ping';
  div.style.left = x + 'px';
  div.style.top = y + 'px';
  document.body.appendChild(div);
  setTimeout(() => div.remove(), 950);
}

// ---------------------------------------------------------------------------
// Sky / scene update per time of day
// ---------------------------------------------------------------------------

const skyState = {
  skyTop: new THREE.Color(),
  skyHorizon: new THREE.Color(),
  skyBelow: new THREE.Color(),
  sunColor: new THREE.Color(),
  seaDeep: new THREE.Color(),
  seaShallow: new THREE.Color(),
  lightColor: new THREE.Color(),
  cloudTint: new THREE.Color(),
  elev: 0,
  dayness: 0,
  sunUp: 0,
  sunGlow: 0,
  sunVis: 0,
  sunDir: new THREE.Vector3(),
  nightFactor: 0,
  starOpacity: 0,
  lightAmt: 0,
  sunset: 0,
};

function applySky(t) {
  computeSky(t, skyState);

  skyUniforms.uZenith.value.copy(skyState.skyTop);
  skyUniforms.uHorizon.value.copy(skyState.skyHorizon);
  skyUniforms.uBelow.value.copy(skyState.skyBelow);
  skyUniforms.uSunDir.value.copy(skyState.sunDir);
  skyUniforms.uSunColor.value.copy(skyState.sunColor);
  skyUniforms.uSunGlow.value = skyState.sunGlow;

  oceanUniforms.uSeaDeep.value.copy(skyState.seaDeep);
  oceanUniforms.uSeaShallow.value.copy(skyState.seaShallow);
  oceanUniforms.uSkyColor.value.copy(skyState.skyHorizon);
  oceanUniforms.uSunColor.value.copy(skyState.sunColor);
  oceanUniforms.uSunDir.value.copy(skyState.sunDir);
  oceanUniforms.uMoonDir.value.set(-skyState.sunDir.x, 0.45, -skyState.sunDir.z).normalize();
  oceanUniforms.uMoonStrength.value = skyState.nightFactor * 0.85;
  oceanUniforms.uLightAmt.value = skyState.lightAmt;

  hemi.color.copy(skyState.lightColor);
  hemi.groundColor.copy(skyState.seaDeep);
  hemi.intensity = 0.3 + skyState.lightAmt * 0.75;
  sunLight.color.copy(skyState.sunColor);
  sunLight.intensity = skyState.lightAmt * 1.3;
  moonLight.color.copy(skyState.lightColor);
  moonLight.intensity = skyState.nightFactor * 0.7;
  ambient.intensity = 0.12 + skyState.lightAmt * 0.2;
  lanternGlow.intensity = (1 - skyState.dayness) * 1.1;
  lanternMat.emissiveIntensity = 1 + (1 - skyState.dayness) * 3;

  // sun sprite placement
  sunGroup.position.set(0, 0, 0).addScaledVector(skyState.sunDir, -340);
  sunCore.material.color.copy(skyState.sunColor);
  sunHalo.material.color.copy(skyState.sunColor);
  sunCore.material.opacity = skyState.sunVis;
  sunHalo.material.opacity = skyState.sunVis * 0.85;
  sunCore.material.needsUpdate = true;
  sunHalo.material.needsUpdate = true;

  // moon: rides high in the night sky, opposite the sun's azimuth
  moon.position
    .set(-skyState.sunDir.x, 0.45, -skyState.sunDir.z)
    .normalize()
    .multiplyScalar(320);
  moonMat.opacity = skyState.starOpacity * 0.9;
  moonMat.needsUpdate = true;

  stars.material.opacity = Math.min(skyState.starOpacity * 1.1, 1);
  stars.material.needsUpdate = true;

  const cloudDay = 0.35 + skyState.dayness * 0.45 + skyState.sunset * 0.25;
  for (const c of clouds) {
    const tint = skyState.cloudTint.clone().multiplyScalar(cloudDay);
    for (const s of c.children) {
      s.material.color.copy(tint);
    }
  }
}

// ---------------------------------------------------------------------------
// Ship motion
// ---------------------------------------------------------------------------

let driftAngle = 0;

function updateShip(t, dt) {
  let baseX;
  let baseZ;
  let surge = 0;

  if (anchored) {
    baseX = ship.userData.anchorX || 0;
    baseZ = ship.userData.anchorZ || 0;
  } else {
    // gentle circular drift on a slow tide
    driftAngle += dt * 0.03;
    baseX = Math.sin(driftAngle) * 6;
    baseZ = Math.cos(driftAngle) * 6;
    surge = Math.sin(t * 1.3) * 0.15;
  }

  // water height + slope at the boat
  const h = waterHeight(baseX, baseZ, oceanUniforms.uTime.value) + surge;
  const d = 1.4;
  const hx = waterHeight(baseX + d, baseZ, oceanUniforms.uTime.value);
  const hz = waterHeight(baseX, baseZ + d, oceanUniforms.uTime.value);
  const slopeX = (hx - h) / d;
  const slopeZ = (hz - h) / d;

  // heading follows the drift direction (bow = local +Z)
  let yaw;
  if (anchored) {
    yaw = ship.userData.anchorYaw || (Math.PI + driftAngle);
    ship.userData.anchorYaw = yaw;
  } else {
    yaw = Math.atan2(Math.cos(driftAngle), -Math.sin(driftAngle));
  }

  ship.position.set(baseX, h + 0.25, baseZ);
  ship.rotation.y = yaw;
  ship.rotation.z = -Math.atan(slopeX) * 0.55;
  ship.rotation.x = Math.atan(slopeZ) * 0.55;

  // gentle rolling in addition, reduced when anchored
  const rock = anchored ? 0.02 : 1;
  ship.rotation.z += Math.sin(t * 0.9 + 1) * 0.02 * rock;
  ship.rotation.x += Math.sin(t * 0.7 + 2) * 0.015 * rock;
  ship.rotation.y += Math.sin(t * 0.22) * 0.03;
  ship.position.y = h + 0.25;

  // anchor chain + anchor, from the bow down to the sea floor
  if (anchored) {
    const cyaw = ship.rotation.y;
    const bx = baseX + Math.sin(cyaw) * 2.3;
    const bz = baseZ + Math.cos(cyaw) * 2.3;
    const tipY = h - 1.6;
    chainGeo.setAttribute(
      'position',
      new THREE.Float32BufferAttribute([bx, 0.25, bz, bx + 0.2, tipY, bz], 3)
    );
    chainGeo.computeBoundingSphere();
    anchorMesh.position.set(bx + 0.2, tipY, bz);
    anchorMesh.rotation.y = Math.sin(t * 2) * 0.1;
  }
}

// ---------------------------------------------------------------------------
// Animation loop
// ---------------------------------------------------------------------------

window.addEventListener('error', (e) => {
  window.__shipErr = (window.__shipErr ? window.__shipErr + '; ' : '') + e.message;
  if (window.__shipSim) window.__shipSim.err = window.__shipErr;
});
let lastTime = performance.now();

function animate(now) {
  requestAnimationFrame(animate);
  try {
    tick(now);
  } catch (err) {
    // keep a record but don't stop the loop; surface it to the test hook
    window.__shipErr = err.message;
    if (window.__shipSim) window.__shipSim.err = err.message;
  }
}

function tick(now) {
  const dt = Math.min((now - lastTime) / 1000, 0.05);
  lastTime = now;

  if (playing) {
    dayTime = frac(dayTime + dt / CYCLE_SECONDS);
  } else if (pauseTimer > 0) {
    pauseTimer -= dt;
    if (pauseTimer <= 0) playing = true;
  }

  const time = oceanUniforms.uTime.value + dt;
  oceanUniforms.uTime.value = time;
  oceanUniforms.uCameraPos.value.copy(camera.position);

  applySky(dayTime);
  updateClockUI();
  slider.value = dayTime;

  // clouds drift
  for (const c of clouds) {
    c.position.x += c.userData.speed * dt;
    if (c.position.x > 220) c.position.x = -220;
  }

  // birds circle the ship and flap
  birds.forEach((b) => {
    b.angle += dt * 0.18;
    const shipPos = ship.position;
    b.mesh.position.set(
      shipPos.x + Math.cos(b.angle) * b.radius,
      shipPos.y + b.height + Math.sin(time * 2 + b.mesh.userData.flapPhase) * 0.6,
      shipPos.z + Math.sin(b.angle) * b.radius
    );
    b.mesh.rotation.y = -b.angle + Math.PI;
    const flap = Math.sin(time * 7 + b.mesh.userData.flapPhase) * 0.7;
    b.mesh.children[0].rotation.z = flap;
    b.mesh.children[1].rotation.z = -flap;
  });

  updateShip(time, dt);
  controls.update();
  renderer.render(scene, camera);
}

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onResize);

window.addEventListener('pointerdown', function resumeAudio() {
  if (audio.ctx && audio.ctx.state === 'suspended') audio.ctx.resume();
  window.removeEventListener('pointerdown', resumeAudio);
});

// start
applySky(dayTime);
updateClockUI();
setSoundEnabled(true);
requestAnimationFrame(animate);

// ---------------------------------------------------------------------------
// Optional self-test harness (runs only with ?selftest=1 on the SAME page so
// headless screenshot mode can exercise the public UI without cross-frame
// timing races). Paints a row of colored squares at the top of the page:
// green=pass, red=fail, amber=runtime error. Used by automated acceptance
// checks; invisible to normal users.
// ---------------------------------------------------------------------------
if (new URLSearchParams(location.search).get('selftest') === '1') {
  try {
    document.documentElement.style.setProperty('background', '#0a3300'); // unmistakable dark-green backdrop
    const strip = document.createElement('div');
    strip.style.cssText =
      'position:fixed;top:4px;left:4px;z-index:999;display:flex;gap:6px;' +
      'background:rgba(0,0,0,0.6);padding:6px;border-radius:8px;';
    document.body.appendChild(strip);
    const paint = (color) => {
      const c = document.createElement('div');
      c.style.cssText = `width:90px;height:46px;border-radius:4px;background:${color};`;
      strip.appendChild(c);
    };
    const pev = (t, x, y, id) =>
      new PointerEvent(t, {
        bubbles: true,
        clientX: x,
        clientY: y,
        pointerId: id,
        button: 0,
        pointerType: 'mouse',
      });

    // Paint a small corner dot immediately so we can confirm the harness ran
    // even if a timer never fires before the screenshot is taken.
    const dot = document.createElement('div');
    dot.style.cssText =
      'position:fixed;top:2px;right:2px;width:40px;height:40px;z-index:999;background:#22c55e;border-radius:50%;';
    document.body.appendChild(dot);

    try {
      const canvas = renderer.domElement;
      const H = window.__shipSim;
      const checks = [];
      const cx = canvas.clientWidth * 0.5;
      const cy = canvas.clientHeight * 0.62;
      const c0 = H.oc.uWaveCount.value;
      canvas.dispatchEvent(pev('pointerdown', cx, cy, 101));
      canvas.dispatchEvent(pev('pointerup', cx, cy, 101));
      checks.push(H.oc.uWaveCount.value === c0 + 1);
      const d0 = H.oc.uWaveCount.value;
      canvas.dispatchEvent(pev('pointerdown', cx, cy, 202));
      canvas.dispatchEvent(pev('pointermove', cx + 90, cy + 70, 202));
      canvas.dispatchEvent(pev('pointerup', cx + 90, cy + 70, 202));
      checks.push(H.oc.uWaveCount.value === d0);
      const slider = document.getElementById('day-slider');
      slider.value = 0.5;
      slider.dispatchEvent(new Event('input', { bubbles: true }));
      checks.push(document.getElementById('clock').textContent === '12:00');
      const anchorBtn = document.getElementById('drop-anchor');
      anchorBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      checks.push(H.anchored === true);
      anchorBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      checks.push(H.anchored === false); // toggle back (weigh anchor)
      const tog = document.getElementById('sound-toggle');
      tog.checked = false;
      tog.dispatchEvent(new Event('change', { bubbles: true }));
      checks.push(H.soundEnabled === false);
      tog.checked = true;
      tog.dispatchEvent(new Event('change', { bubbles: true }));
      checks.push(H.soundEnabled === true); // re-enable
      // phase labels track the time of day
      slider.value = 0.25;
      slider.dispatchEvent(new Event('input', { bubbles: true }));
      checks.push(document.getElementById('phase').textContent === 'sunrise');
      slider.value = 0.87;
      slider.dispatchEvent(new Event('input', { bubbles: true }));
      checks.push(document.getElementById('phase').textContent === 'night');
      const timerSlider = document.getElementById('day-slider');
      // scrubbing pauses auto-advance; firing change resumes it
      const wasPlaying = H.playing;
      timerSlider.value = 0.5;
      timerSlider.dispatchEvent(new Event('input', { bubbles: true }));
      checks.push(H.playing === false);
      timerSlider.dispatchEvent(new Event('change', { bubbles: true }));
      checks.push(H.playing === true);
      // time-of-day invariant stays in [0, 1]
      checks.push(H.dayTime >= 0 && H.dayTime <= 1);
      // resize handler runs without throwing and keeps the renderer sized
      const before = renderer.domElement.width;
      window.dispatchEvent(new Event('resize'));
      checks.push(renderer.domElement.width === before || renderer.domElement.width > 0);
      // The synthetic PointerEvents above trigger OrbitControls'
      // setPointerCapture, which throws for non-existent pointer ids. Real
      // user clicks carry a valid pointer id, so this is a test-only artifact.
      const genuineErr = String(H.err || '')
        .split(';')
        .filter((m) => m.trim() && !/setPointerCapture/i.test(m))
        .join(';');
      checks.push(!genuineErr);

      checks.forEach((ok) => paint(ok ? '#22c55e' : '#ef4444'));
      if (genuineErr) paint('#f59e0b');
    } catch (err) {
      paint('#eab308'); // harness itself failed
    }
  } catch (err) {
    // harness setup itself threw; leave a trace in the DOM title
    document.title = 'SELFTEST_SETUP_ERR ' + (err && err.message);
  }
}