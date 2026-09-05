/* Sunset Sail — a slow, relaxing 3D ship simulator.
 * Day / night cycle with the sun low over the horizon,
 * a shader ocean, and click-to-ripple waves. */
(function () {
'use strict';

/* ---------------------------------------------------------------- setup */

const MAX_ELEV   = 0.55;      // rad — max sun elevation above horizon
const DAY_LENGTH = 90;        // seconds per full day/night cycle
const OCEAN_SIZE = 1000;
const OCEAN_SEGS = 420;
const SHIP_SPEED = 5.2;       // units per second
const MAX_RIPPLES = 8;

let renderer;
try {
  renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
} catch (e) {
  const n = document.getElementById('nogl');
  if (n) n.classList.add('show');
  return;
}
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.08;
const canvas = renderer.domElement;
canvas.style.touchAction = 'none';
document.body.appendChild(canvas);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.5, 3200);
scene.fog = new THREE.FogExp2(0x05070d, 0.0028);

/* Linearize a color for use in my own GLSL uniforms (my fragment shaders
 * convert back to sRGB via `colorspace_fragment`, mirroring three.js). */
function lin(r, g, b) {
  return new THREE.Color(r, g, b).convertSRGBToLinear();
}

/* --------------------------------------------------------------- colors */

const C = {
  // sky
  skyZenDay:    new THREE.Color(0x2e8fd0),
  skyZenNight:  new THREE.Color(0x04060f),
  skyHorDay:    new THREE.Color(0xcfe8f2),
  skyHorNight:  new THREE.Color(0x0a0f24),
  skyBelow:     new THREE.Color(0x02040a),
  skyWarm:      new THREE.Color(0xff8c3a),
  skyGlow:      new THREE.Color(0xffd9a0),
  // ocean
  seaDeepDay:   new THREE.Color(0x0a2f4e),
  seaDeepNight: new THREE.Color(0x030b16),
  seaShalDay:   new THREE.Color(0x1c7f9e),
  seaShalNight: new THREE.Color(0x06121e),
  seaRefDay:    new THREE.Color(0xcfe8f2),
  seaRefNight:  new THREE.Color(0x0a0f22),
  seaWarm:      new THREE.Color(0xff9d5a),
  // fog (mixed in sRGB space — matches three.js fog rendering)
  fogNight:     new THREE.Color(0x05070d),
  fogDay:       new THREE.Color(0xcfe8f2),
  fogWarm:      new THREE.Color(0xe8a05a),
  // lights
  sunWarm:      new THREE.Color(0xff8c33),
  sunHigh:      new THREE.Color(0xfff3da),
  moon:         new THREE.Color(0x6f8fd8),
  hemiSkyNight: new THREE.Color(0x0b1230),
  hemiSkyDay:   new THREE.Color(0x8fc3ff),
  groundNight:  new THREE.Color(0x03101c),
  groundDay:    new THREE.Color(0x0b2c47),
  ambNight:     new THREE.Color(0x1a2440),
  ambDay:       new THREE.Color(0xffffff),
};

const _cA = new THREE.Color();

/* -------------------------------------------------------------- the sky */

const skyUniforms = {
  uSunDir:  { value: new THREE.Vector3(0, 0.3, -1) },
  uDay:     { value: 1 },
  uSunLow:  { value: 0 },
  uZenDay:  { value: lin(0.18, 0.56, 0.82) },
  uZenNight:{ value: lin(0.016, 0.024, 0.06) },
  uHorDay:  { value: lin(0.81, 0.91, 0.95) },
  uHorNight:{ value: lin(0.04, 0.06, 0.14) },
  uBelow:   { value: lin(0.008, 0.016, 0.04) },
  uWarm:    { value: lin(1.0, 0.55, 0.23) },
  uGlow:    { value: lin(1.0, 0.85, 0.62) },
};

const skyMat = new THREE.ShaderMaterial({
  side: THREE.BackSide,
  depthWrite: false,
  uniforms: skyUniforms,
  vertexShader: [
    'varying vec3 vDir;',
    'void main() {',
    '  vDir = position;',
    '  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);',
    '}',
  ].join('\n'),
  fragmentShader: [
    'uniform vec3 uSunDir;',
    'uniform float uDay;',
    'uniform float uSunLow;',
    'uniform vec3 uZenDay;',
    'uniform vec3 uZenNight;',
    'uniform vec3 uHorDay;',
    'uniform vec3 uHorNight;',
    'uniform vec3 uBelow;',
    'uniform vec3 uWarm;',
    'uniform vec3 uGlow;',
    'varying vec3 vDir;',
    'void main() {',
    '  vec3 d = normalize(vDir);',
    '  float hgt = d.y;',
    '  vec3 zen = mix(uZenNight, uZenDay, uDay);',
    '  vec3 hor = mix(uHorNight, uHorDay, uDay);',
    '  vec3 col = mix(hor, zen, pow(clamp(hgt, 0.0, 1.0), 0.55));',
    '  col = mix(uBelow, col, smoothstep(-0.05, 0.0, hgt));',
    '  col = mix(col, hor, pow(clamp(1.0 - hgt * 2.4, 0.0, 1.0), 2.0) * 0.3);',
    '  vec3 dir2 = normalize(vec3(d.x, 0.0, d.z) + vec3(1e-5, 0.0, 0.0));',
    '  vec3 sun2 = normalize(vec3(uSunDir.x, 0.0, uSunDir.z) + vec3(1e-5, 0.0, 0.0));',
    '  float sunAz = max(dot(dir2, sun2), 0.0);',
    '  float horiz = pow(clamp(1.0 - hgt * 2.2, 0.0, 1.0), 1.6);',
    '  col += uWarm * sunAz * horiz * uSunLow * (0.3 + 0.7 * uDay);',
    '  float g = pow(max(dot(d, uSunDir), 0.0), 24.0);',
    '  col += uGlow * g * (0.25 + 0.9 * uDay);',
    '  gl_FragColor = vec4(col, 1.0);',
    '  #include <tonemapping_fragment>',
    '  #include <encodings_fragment>',
    '}',
  ].join('\n'),
});

const skyDome = new THREE.Mesh(new THREE.SphereGeometry(800, 40, 24), skyMat);
skyDome.frustumCulled = false;
scene.add(skyDome);

/* sun disc + glows */
const sunMat = new THREE.MeshBasicMaterial({ color: 0xfff3da, toneMapped: false });
const sunMesh = new THREE.Mesh(new THREE.SphereGeometry(34, 24, 16), sunMat);
scene.add(sunMesh);

function radialTexture(stops, size) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  for (const s of stops) g.addColorStop(s[0], s[1]);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const t = new THREE.CanvasTexture(c);
  t.encoding = THREE.sRGBEncoding;
  return t;
}
const glowCoreTex = radialTexture([
  [0, 'rgba(255,255,255,1)'],
  [0.3, 'rgba(255,244,214,0.85)'],
  [1, 'rgba(255,244,214,0)'],
], 256);
const glowHaloTex = radialTexture([
  [0, 'rgba(255,190,110,0.8)'],
  [0.35, 'rgba(255,160,80,0.35)'],
  [1, 'rgba(255,140,60,0)'],
], 256);
function makeGlow(tex, scale, opacity) {
  const m = new THREE.MeshBasicMaterial({
    map: tex, transparent: true, opacity: opacity,
    blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false,
  });
  const s = new THREE.Sprite(m);
  s.scale.setScalar(scale);
  scene.add(s);
  return s;
}
const glowCore = makeGlow(glowCoreTex, 110, 0.85);
const glowHalo = makeGlow(glowHaloTex, 480, 0.45);

/* stars */
let starsMat = null;
(function () {
  const n = 900;
  const pos = new Float32Array(n * 3);
  const col = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const th = Math.random() * Math.PI * 2;
    const ph = Math.acos(Math.sqrt(Math.random()));
    const rad = 740 + Math.random() * 60;
    pos[i * 3]     = rad * Math.sin(ph) * Math.cos(th);
    pos[i * 3 + 1] = rad * Math.cos(ph);
    pos[i * 3 + 2] = rad * Math.sin(ph) * Math.sin(th);
    const b = 0.45 + Math.random() * 0.55;
    const warm = Math.random() < 0.18;
    col[i * 3]     = warm ? 1.0 * b : 0.8 * b;
    col[i * 3 + 1] = warm ? 0.9 * b : 0.85 * b;
    col[i * 3 + 2] = b;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  const m = new THREE.PointsMaterial({
    size: 2.4, sizeAttenuation: true, vertexColors: true,
    transparent: true, opacity: 0, depthWrite: false, fog: false,
  });
  starsMat = m;
  const pts = new THREE.Points(geo, m);
  pts.frustumCulled = false;
  scene.add(pts);
})();

/* clouds */
const cloudTex = radialTexture([
  [0, 'rgba(255,255,255,0.85)'],
  [0.5, 'rgba(255,255,255,0.4)'],
  [1, 'rgba(255,255,255,0)'],
], 128);
const cloudDay = new THREE.Color(0xffffff);
const cloudNight = new THREE.Color(0x1b2238);
const clouds = [];
(function () {
  const geo = new THREE.PlaneGeometry(1, 1);
  for (let i = 0; i < 14; i++) {
    const m = new THREE.MeshBasicMaterial({
      map: cloudTex, transparent: true, depthWrite: false, opacity: 0.5,
    });
    const c = new THREE.Mesh(geo, m);
    c.rotation.x = -Math.PI / 2;
    c.position.set(
      (Math.random() - 0.5) * 700,
      55 + Math.random() * 45,
      (Math.random() - 0.5) * 700
    );
    const s = 45 + Math.random() * 80;
    c.scale.set(s * (0.8 + Math.random() * 0.8), 1, s * 0.5);
    c.userData = { speed: 0.4 + Math.random() * 0.5, phase: Math.random() * 10, height: c.position.y };
    scene.add(c);
    clouds.push(c);
  }
})();

/* ----------------------------------------------------------- the ocean */

const oceanUniforms = {
  uTime:      { value: 0 },
  uRipples:   { value: new Float32Array(MAX_RIPPLES * 4) },
  uSunDir:    { value: new THREE.Vector3(0, 0.3, -1) },
  uDay:       { value: 1 },
  uSunLow:    { value: 0 },
  uSunColor:  { value: lin(1.0, 0.95, 0.85) },
  uDeepColor: { value: lin(0.05, 0.2, 0.33) },
  uShallowColor: { value: lin(0.1, 0.47, 0.6) },
  uSkyColor:  { value: lin(0.8, 0.9, 0.95) },
  uFogColor:  { value: new THREE.Color(0.81, 0.91, 0.95) },
  uFogDensity:{ value: scene.fog.density },
};

const waveGLSL = [
  'uniform float uTime;',
  'uniform vec4 uRipples[8];',
  'float wave(vec2 p) {',
  '  float t = uTime;',
  '  float h = 0.0;',
  '  h += 0.55 * sin(p.x * 0.045 + t * 0.75) * cos(p.y * 0.05 + t * 0.6);',
  '  h += 0.30 * sin((p.x + p.y) * 0.085 + t * 1.2);',
  '  h += 0.18 * sin((p.y - p.x * 0.7) * 0.12 + t * 1.7);',
  '  h += 0.10 * sin((p.x * 0.7 + p.y) * 0.2 + t * 2.3);',
  '  return h;',
  '}',
  'float rippleAt(vec2 p, vec4 r) {',
  '  float t = uTime;',
  '  float age = t - r.z;',
  '  if (age <= 0.0 || age >= 6.0) return 0.0;',
  '  float d = length(p - r.xy);',
  '  float rad = age * 6.2;',
  '  float ring = exp(-pow((d - rad) * 0.3, 2.0));',
  '  float bump = exp(-pow(d * 0.08, 2.0)) * exp(-age * 1.6);',
  '  float life = exp(-age * 0.45);',
  '  return (ring * 0.85 + bump * 1.4) * life * r.w;',
  '}',
  'float totalH(vec2 p) {',
  '  float h = wave(p);',
  '  for (int i = 0; i < 8; i++) h += rippleAt(p, uRipples[i]);',
  '  return h;',
  '}',
].join('\n');

const oceanMat = new THREE.ShaderMaterial({
  uniforms: oceanUniforms,
  vertexShader: waveGLSL + '\n' + [
    'varying vec3 vWorldPos;',
    'varying vec3 vNormalW;',
    'varying float vHeight;',
    'varying float vFogDepth;',
    'void main() {',
    '  vec2 p = position.xy;',
    '  float h = totalH(p);',
    '  vec3 pos = vec3(p.x, p.y, h);',
    '  float e = 0.5;',
    '  float hx = totalH(p + vec2(e, 0.0));',
    '  float hy = totalH(p + vec2(0.0, e));',
    '  vec3 n = normalize(vec3(h - hx, h - hy, e));',
    '  vNormalW = normalize(mat3(modelMatrix) * n);',
    '  vWorldPos = (modelMatrix * vec4(pos, 1.0)).xyz;',
    '  vHeight = vWorldPos.y;',
    '  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);',
    '  vFogDepth = -mvPosition.z;',
    '  gl_Position = projectionMatrix * mvPosition;',
    '}',
  ].join('\n'),
  fragmentShader: [
    'uniform vec3 uSunDir;',
    'uniform float uDay;',
    'uniform float uSunLow;',
    'uniform vec3 uSunColor;',
    'uniform vec3 uDeepColor;',
    'uniform vec3 uShallowColor;',
    'uniform vec3 uSkyColor;',
    'uniform vec3 uFogColor;',
    'uniform float uFogDensity;',
    'varying vec3 vWorldPos;',
    'varying vec3 vNormalW;',
    'varying float vHeight;',
    'varying float vFogDepth;',
    'void main() {',
    '  vec3 V = normalize(cameraPosition - vWorldPos);',
    '  vec3 N = normalize(vNormalW);',
    '  vec3 R = reflect(-V, N);',
    '  float fres = pow(1.0 - max(dot(N, V), 0.0), 3.0);',
    '  float hN = clamp(vHeight * 0.22 + 0.42, 0.0, 1.0);',
    '  vec3 base = mix(uDeepColor, uShallowColor, hN);',
    '  vec3 col = mix(base, uSkyColor, fres * 0.8);',
    '  float spec = pow(max(dot(R, uSunDir), 0.0), 100.0);',
    '  col += uSunColor * spec * (0.35 + 2.6 * uDay);',
    '  float glitter = pow(max(dot(R, uSunDir), 0.0), 6.0);',
    '  col += uSunColor * glitter * 0.05 * uDay;',
    '  float hotspot = pow(max(dot(R, uSunDir), 0.0), 1200.0);',
    '  col += uSunColor * hotspot * 3.0 * uDay;',
    '  gl_FragColor = vec4(col, 1.0);',
    '  #include <tonemapping_fragment>',
    '  #include <encodings_fragment>',
    '  float fogF = 1.0 - exp(-uFogDensity * uFogDensity * vFogDepth * vFogDepth);',
    '  gl_FragColor = mix(gl_FragColor, vec4(uFogColor, gl_FragColor.w), fogF);',
    '}',
  ].join('\n'),
});

const oceanMesh = new THREE.Mesh(
  new THREE.PlaneGeometry(OCEAN_SIZE, OCEAN_SIZE, OCEAN_SEGS, OCEAN_SEGS),
  oceanMat
);
oceanMesh.rotation.x = -Math.PI / 2;
oceanMesh.frustumCulled = false;
scene.add(oceanMesh);

/* ripples */
const ripples = [];
function addRipple(x, z, amp) {
  if (ripples.length >= MAX_RIPPLES) ripples.shift();
  ripples.push({ x: x, y: -z, t0: 0, amp: amp });
  const r = ripples[ripples.length - 1];
  r.t0 = sceneTime;
}
function pushRippleUniforms() {
  const buf = oceanUniforms.uRipples.value;
  for (let i = 0; i < MAX_RIPPLES; i++) {
    const r = ripples[i];
    if (r) {
      buf[i * 4] = r.x;
      buf[i * 4 + 1] = r.y;
      buf[i * 4 + 2] = r.t0;
      buf[i * 4 + 3] = r.amp;
    } else {
      buf[i * 4 + 2] = -1e4;
    }
  }
}

/* --------------------------------------------------------------- lights */

const hemi = new THREE.HemisphereLight(0x8fc3ff, 0x0b2c47, 1.1);
scene.add(hemi);
const sunLight = new THREE.DirectionalLight(0xfff3da, 2.4);
scene.add(sunLight);
const moonLight = new THREE.DirectionalLight(0x6f8fd8, 0);
scene.add(moonLight);
const ambient = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambient);

/* ---------------------------------------------------------------- ship */

const ship = new THREE.Group();
ship.rotation.order = 'YXZ';
scene.add(ship);

const mat = {
  hull:   new THREE.MeshStandardMaterial({ color: 0xf4f6f8, roughness: 0.45, metalness: 0.08 }),
  teak:   new THREE.MeshStandardMaterial({ color: 0x8a5a33, roughness: 0.85 }),
  glass:  new THREE.MeshStandardMaterial({ color: 0x0b1c33, roughness: 0.12, metalness: 0.9 }),
  navy:   new THREE.MeshStandardMaterial({ color: 0x1c3a5e, roughness: 0.5 }),
  red:    new THREE.MeshStandardMaterial({ color: 0xd8432f, roughness: 0.55 }),
  gray:   new THREE.MeshStandardMaterial({ color: 0xd8dde4, roughness: 0.6 }),
  orange: new THREE.MeshStandardMaterial({ color: 0xe8652f, roughness: 0.6 }),
  black:  new THREE.MeshStandardMaterial({ color: 0x14161a, roughness: 0.7 }),
  emissiveRed: new THREE.MeshStandardMaterial({ color: 0x331111, emissive: 0xff2a1a, emissiveIntensity: 0 }),
};

function box(w, h, d, material, x, y, z) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
  m.position.set(x, y, z);
  ship.add(m);
  return m;
}
function cyl(rt, rb, h, material, x, y, z, rx) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, 20), material);
  m.position.set(x, y, z);
  if (rx) m.rotation.x = rx;
  ship.add(m);
  return m;
}

/* hull — extruded outline, bow toward -Z */
(function () {
  const s = new THREE.Shape();
  s.moveTo(0, -9);
  s.quadraticCurveTo(2.35, -8.2, 2.35, -4.5);
  s.lineTo(2.35, 6.5);
  s.quadraticCurveTo(2.35, 8.4, 1.5, 8.8);
  s.lineTo(-1.5, 8.8);
  s.quadraticCurveTo(-2.35, 8.4, -2.35, 6.5);
  s.lineTo(-2.35, -4.5);
  s.quadraticCurveTo(-2.35, -8.2, 0, -9);
  const geo = new THREE.ExtrudeGeometry(s, {
    depth: 1.6, bevelEnabled: true, bevelThickness: 0.7, bevelSize: 0.32,
    bevelSegments: 4, steps: 1, curveSegments: 20,
  });
  const hull = new THREE.Mesh(geo, mat.hull);
  hull.rotation.x = Math.PI / 2;      // extrude +Z -> -Y (down)
  hull.position.y = 0.5;
  ship.add(hull);
})();

/* deck, trim, details */
box(4.2, 0.2, 15.8, mat.teak, 0, 0.62, 0.2);                 // deck
box(4.76, 0.16, 18.4, mat.navy, 0, 0.52, 0.2);               // rub rail
box(6.0, 2.0, 4.2, mat.hull, 0, 1.85, 1.6);                  // main cabin
box(6.4, 0.22, 4.6, mat.hull, 0, 2.96, 1.6);                 // cabin roof
box(5.2, 0.85, 0.08, mat.glass, 0, 1.9, 3.72);               // front windows
box(0.1, 0.72, 3.0, mat.glass, 3.02, 1.85, 1.7);             // port windows
box(0.1, 0.72, 3.0, mat.glass, -3.02, 1.85, 1.7);            // starboard windows
box(4.4, 1.4, 3.0, mat.hull, 0, 3.8, -0.3);                  // bridge deck
box(4.8, 0.2, 3.4, mat.hull, 0, 4.6, -0.3);                  // bridge roof
box(3.8, 0.6, 0.08, mat.glass, 0, 3.85, -1.82);              // bridge windows
cyl(0.7, 0.52, 2.4, mat.hull, 0, 4.3, 3.4, -0.12);           // funnel
cyl(0.74, 0.56, 0.5, mat.red, 0, 5.25, 3.55, -0.12);         // funnel band
cyl(0.085, 0.085, 5.8, mat.gray, 0, 3.7, -4.6);              // mast
cyl(0.04, 0.04, 1.4, mat.gray, 0, 5.35, 0.9);                // antenna
box(0.07, 0.55, 5.4, mat.hull, 2.0, 1.15, -5.8);             // port rail
box(0.07, 0.55, 5.4, mat.hull, -2.0, 1.15, -5.8);            // starboard rail
box(2.8, 0.1, 1.2, mat.hull, 0, 0.32, 8.75);                 // swim platform
cyl(0.15, 0.15, 0.85, mat.black, 2.4, 0.75, 0.8);            // fender
cyl(0.15, 0.15, 0.85, mat.black, -2.4, 0.75, 0.8);           // fender

/* cross-arm */
(function () {
  const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 2.2, 8), mat.gray);
  arm.position.set(0, 5.9, -4.6);
  arm.rotation.z = Math.PI / 2;
  ship.add(arm);
})();

/* lifebuoy */
(function () {
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.36, 0.09, 10, 22), mat.orange);
  ring.position.set(3.25, 2.05, 1.6);
  ring.rotation.set(0.3, 0.5, 0);
  ship.add(ring);
})();

/* flag */
(function () {
  const flag = new THREE.Mesh(
    new THREE.PlaneGeometry(0.85, 0.5),
    new THREE.MeshBasicMaterial({ color: 0xe8a33c, side: THREE.DoubleSide })
  );
  flag.position.set(0, 6.55, -4.5);
  flag.rotation.set(0, 0, -0.2);
  flag.userData.flag = true;
  ship.add(flag);
})();

/* running lights */
const runningLights = [];
(function () {
  const r = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 8), mat.emissiveRed);
  r.position.set(2.2, 3.9, -1.8);
  ship.add(r);
  const g = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 8), mat.emissiveRed.clone());
  g.position.set(-2.2, 3.9, -1.8);
  g.material.emissive.set(0x2aff3a);
  ship.add(g);
  runningLights.push(r.material, g.material);
})();

/* ship state */
let shipX = 0, shipZ = 0, shipY = 0, heading = 0.6, shipPitch = 0, shipRoll = 0;

/* ------------------------------------------------------------ wake foam */

const foamTex = radialTexture([
  [0, 'rgba(255,255,255,1)'],
  [0.35, 'rgba(255,255,255,0.65)'],
  [1, 'rgba(255,255,255,0)'],
], 128);
const foamDay = new THREE.Color(0xffffff);
const foamNight = new THREE.Color(0x24304a);
const foams = [];
const foamGeo = new THREE.PlaneGeometry(1, 1);
foamGeo.rotateX(-Math.PI / 2);
let foamTimer = 0;
function spawnFoam(t) {
  const Fx = -Math.sin(heading), Fz = -Math.cos(heading);
  const Px = Math.cos(heading), Pz = -Math.sin(heading);
  const back = 9.6;
  const off = (Math.random() - 0.5) * 3.0;
  const x = shipX + Fx * back + Px * off;
  const z = shipZ + Fz * back + Pz * off;
  const f = {
    mesh: null,
    life: 2.6 + Math.random() * 0.8,
    maxLife: 0,
    vx: -Fx * (0.6 + Math.random() * 1.4) + Px * (Math.random() - 0.5) * 1.2,
    vz: -Fz * (0.6 + Math.random() * 1.4) + Pz * (Math.random() - 0.5) * 1.2,
    grow: 0.85 + Math.random() * 0.5,
    x: x, z: z,
  };
  f.maxLife = f.life;
  const m = new THREE.Mesh(foamGeo, new THREE.MeshBasicMaterial({
    map: foamTex, transparent: true, depthWrite: false,
  }));
  m.scale.setScalar(0.8 + Math.random() * 0.9);
  f.mesh = m;
  foams.push(f);
  scene.add(m);
}
function updateFoam(dt, t) {
  foamTimer += dt;
  while (foamTimer > 0.11) {
    foamTimer -= 0.11;
    spawnFoam(t);
  }
  const night = 1 - oceanUniforms.uDay.value;
  _cA.lerpColors(foamDay, foamNight, night);
  for (let i = foams.length - 1; i >= 0; i--) {
    const f = foams[i];
    f.life -= dt;
    if (f.life <= 0 || (foams.length > 150 && i === 0)) {
      scene.remove(f.mesh);
      f.mesh.material.dispose();
      foams.splice(i, 1);
      continue;
    }
    f.x += f.vx * dt;
    f.z += f.vz * dt;
    const k = f.life / f.maxLife;
    f.mesh.position.set(f.x, waveH(f.x, -f.z, t) + 0.02, f.z);
    f.mesh.scale.addScalar(f.grow * dt);
    f.mesh.material.opacity = 0.55 * Math.min(1, (1 - k) * 3) * k;
    f.mesh.material.color.copy(_cA);
  }
}

/* --------------------------------------------------------------- buoys */

const buoys = [];
(function () {
  const geo = new THREE.Group();
  const float = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.65, 1.0, 14), mat.orange);
  float.position.y = 0.5;
  geo.add(float);
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 1.6, 8), mat.gray);
  pole.position.y = 1.7;
  geo.add(pole);
  const cap = new THREE.Mesh(new THREE.SphereGeometry(0.16, 10, 10), mat.emissiveRed.clone());
  cap.position.y = 2.6;
  geo.add(cap);
  const spots = [[200, -120], [-240, 90], [160, 260]];
  for (const [x, z] of spots) {
    const b = geo.clone();
    b.position.set(x, 0, z);
    b.userData.home = new THREE.Vector3(x, 0, z);
    scene.add(b);
    buoys.push(b);
  }
})();

/* ------------------------------------------------------------- camera */

const controls = new THREE.OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.dampingFactor = 0.06;
controls.minDistance = 12;
controls.maxDistance = 90;
controls.maxPolarAngle = Math.PI / 2 - 0.05;
controls.target.set(0, 2, 0);
camera.position.set(-Math.sin(0.9) * 26, 3.2, -Math.cos(0.9) * 26); // low, level view — the sun rides the sky

/* ---------------------------------------------------------------- input */

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
let downX = 0, downY = 0;

canvas.addEventListener('pointerdown', (e) => {
  downX = e.clientX;
  downY = e.clientY;
});
canvas.addEventListener('pointerup', (e) => {
  const dx = e.clientX - downX, dy = e.clientY - downY;
  if (dx * dx + dy * dy > 25) return;
  pointer.set((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1);
  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObject(oceanMesh, false);
  if (hits.length) {
    const p = hits[0].point;
    addRipple(p.x, p.z, 0.55 + Math.random() * 0.6);
  }
});

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

/* ----------------------------------------------------------- UI wiring */

const speedEl = document.getElementById('speed');
const speedVal = document.getElementById('speedVal');
const pauseBtn = document.getElementById('pauseBtn');
const phaseEl = document.getElementById('phase');
const dayFill = document.getElementById('dayFill');
let daySpeed = 1, paused = false;

speedEl.addEventListener('input', () => {
  daySpeed = parseFloat(speedEl.value);
  speedVal.textContent = daySpeed.toFixed(2).replace(/\.?0+$/, '') + '×';
});
pauseBtn.addEventListener('click', () => {
  paused = !paused;
  pauseBtn.textContent = paused ? '▶ Resume' : '⏸ Pause';
});
window.addEventListener('keydown', (e) => {
  if (e.code === 'Space' || e.code === 'KeyP') {
    e.preventDefault();
    pauseBtn.click();
  }
});

function phaseOf(el, rising) {
  if (el < -0.02) return 'Night';
  if (el < 0.04) return rising ? 'Dawn' : 'Dusk';
  if (el < 0.16) return rising ? 'Sunrise' : 'Sunset';
  if (el < 0.42) return 'Golden Hour';
  return rising ? 'Morning' : 'Afternoon';
}

/* ------------------------------------------------------------- the loop */

function waveH(x, y, t) {
  let h = 0;
  h += 0.55 * Math.sin(x * 0.045 + t * 0.75) * Math.cos(y * 0.05 + t * 0.6);
  h += 0.30 * Math.sin((x + y) * 0.085 + t * 1.2);
  h += 0.18 * Math.sin((y - x * 0.7) * 0.12 + t * 1.7);
  h += 0.10 * Math.sin((x * 0.7 + y) * 0.2 + t * 2.3);
  return h;
}

let dayAngle = 0.9;
let sceneTime = 0;

function wrapPi(a) {
  a = ((a + Math.PI) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI) - Math.PI;
  return a;
}

function updateSky(el, day, night, sunLow) {
  const sinEl = Math.sin(el);

  /* sun position */
  skyUniforms.uSunDir.value.set(
    Math.cos(dayAngle) * Math.cos(el),
    sinEl,
    Math.sin(dayAngle) * Math.cos(el)
  );
  oceanUniforms.uSunDir.value.copy(skyUniforms.uSunDir.value);
  skyUniforms.uDay.value = day;
  skyUniforms.uSunLow.value = sunLow;
  oceanUniforms.uDay.value = day;
  oceanUniforms.uSunLow.value = sunLow;

  sunMesh.visible = el > 0.01;
  glowCore.visible = sunMesh.visible;
  glowHalo.visible = sunMesh.visible;
  if (sunMesh.visible) {
    sunMesh.position.copy(skyUniforms.uSunDir.value).multiplyScalar(620);
    glowCore.position.copy(sunMesh.position);
    glowHalo.position.copy(sunMesh.position);
    _cA.lerpColors(C.sunWarm, C.sunHigh, THREE.MathUtils.clamp(el / 0.45, 0, 1));
    sunMat.color.copy(_cA);
    glowCore.material.opacity = 0.6 + 0.3 * sunLow + 0.08 * Math.sin(sceneTime * 2.1);
    glowHalo.material.opacity = 0.3 + 0.35 * sunLow;
  }

  /* lights */
  sunLight.position.copy(skyUniforms.uSunDir.value).multiplyScalar(400);
  sunLight.color.copy(_cA);
  sunLight.intensity = 0.12 + 2.5 * day;
  moonLight.position.copy(skyUniforms.uSunDir.value).multiplyScalar(-400);
  moonLight.intensity = 0.35 * night;
  hemi.intensity = 0.22 + 0.95 * day;
  _cA.lerpColors(C.hemiSkyNight, C.hemiSkyDay, day);
  hemi.color.copy(_cA);
  _cA.lerpColors(C.groundNight, C.groundDay, day);
  hemi.groundColor.copy(_cA);
  ambient.intensity = 0.06 + 0.26 * day;
  _cA.lerpColors(C.ambNight, C.ambDay, day);
  ambient.color.copy(_cA);

  /* fog — mix in sRGB, hand to three.js in working (linear) space */
  _cA.lerpColors(C.fogNight, C.fogDay, day);
  _cA.lerp(C.fogWarm, sunLow * 0.5);
  scene.fog.color.copy(_cA).convertSRGBToLinear();
  oceanUniforms.uFogColor.value.copy(_cA);

  /* ocean colors (linear) */
  _cA.lerpColors(C.seaDeepNight, C.seaDeepDay, day);
  oceanUniforms.uDeepColor.value.copy(_cA).convertSRGBToLinear();
  _cA.lerpColors(C.seaShalNight, C.seaShalDay, day);
  oceanUniforms.uShallowColor.value.copy(_cA).convertSRGBToLinear();
  _cA.lerpColors(C.seaRefNight, C.seaRefDay, day);
  _cA.lerp(C.seaWarm, sunLow * 0.35);
  oceanUniforms.uSkyColor.value.copy(_cA).convertSRGBToLinear();
  _cA.lerpColors(C.sunWarm, C.sunHigh, THREE.MathUtils.clamp(el / 0.45, 0, 1));
  oceanUniforms.uSunColor.value.copy(_cA).convertSRGBToLinear();

  /* stars, clouds, buoy lights */
  if (starsMat) starsMat.opacity = THREE.MathUtils.clamp(1 - day * 1.3, 0, 1) * 0.95;
  _cA.lerpColors(cloudDay, cloudNight, night);
  for (const c of clouds) {
    c.material.color.copy(_cA);
    c.material.opacity = 0.32 * (0.15 + 0.85 * day);
  }
  const glow = night * 1.3;
  for (const b of buoys) {
    const cap = b.children[2];
    cap.material.emissiveIntensity = glow;
  }
  for (const m of runningLights) m.emissiveIntensity = glow;
}

function updateShip(dt, t) {
  const Fx = -Math.sin(heading), Fz = -Math.cos(heading);
  shipX += Fx * SHIP_SPEED * dt;
  shipZ += Fz * SHIP_SPEED * dt;

  const turn = 0.08 * Math.sin(t * 0.045) + 0.004;
  heading += turn * dt;

  const r = Math.hypot(shipX, shipZ);
  if (r > 140) {
    const desired = Math.atan2(shipX, shipZ);
    heading += THREE.MathUtils.clamp(wrapPi(desired - heading), -0.6, 0.6) * 0.1 * dt;
  }

  const s = 2.0;
  const h0 = waveH(shipX, -shipZ, t);
  const gx = (waveH(shipX + s, -shipZ, t) - h0) / s;
  const gz = (waveH(shipX, -(shipZ + s), t) - h0) / s;
  const slopeAlong = gx * Fx + gz * Fz;
  const slopePerp = gx * Math.cos(heading) + gz * -Math.sin(heading);
  const targetY = h0;
  const targetPitch = THREE.MathUtils.clamp(slopeAlong * 0.55, -0.4, 0.4);
  const targetRoll = THREE.MathUtils.clamp(slopePerp * 0.6, -0.5, 0.5);

  const k = Math.min(1, dt * 5);
  shipY += (targetY - shipY) * k;
  shipPitch += (targetPitch - shipPitch) * k;
  shipRoll += (targetRoll - shipRoll) * k;

  ship.position.set(shipX, shipY, shipZ);
  ship.rotation.set(shipPitch, heading, shipRoll);

  const flag = ship.children.find((c) => c.userData.flag);
  if (flag) flag.rotation.z = -0.2 + Math.sin(t * 3.1 + 1) * 0.09;
}

function updateBuoys(dt, t) {
  for (const b of buoys) {
    const hx = b.userData.home.x, hz = b.userData.home.z;
    const y = waveH(hx, -hz, t);
    b.position.y = y;
    const s = 2.0;
    const gx = (waveH(hx + s, -hz, t) - y) / s;
    const gz = (waveH(hx, -(hz + s), t) - y) / s;
    b.rotation.x = THREE.MathUtils.clamp(gz * 0.3, -0.3, 0.3);
    b.rotation.z = THREE.MathUtils.clamp(-gx * 0.3, -0.3, 0.3);
  }
}

function updateClouds(dt, t) {
  for (const c of clouds) {
    c.position.x += c.userData.speed * dt;
    if (c.position.x > 420) c.position.x = -420 - Math.random() * 60;
    c.position.y = c.userData.height + Math.sin(t * 0.3 + c.userData.phase) * 4;
  }
}

function tick() {
  requestAnimationFrame(tick);
  const dt = Math.min(clock.getDelta(), 0.25);
  const t = sceneTime;

  if (!paused) dayAngle += (Math.PI * 2 / DAY_LENGTH) * daySpeed * dt;
  sceneTime += dt;

  const el = MAX_ELEV * Math.sin(dayAngle);
  const sinEl = Math.sin(el);
  const day = THREE.MathUtils.smoothstep(sinEl, -0.06, 0.32);
  const night = 1 - day;
  const sunLow = el > 0.003 ? THREE.MathUtils.clamp(1 - el / 0.45, 0, 1) : 0;

  updateSky(el, day, night, sunLow);
  updateShip(dt, t);
  updateFoam(dt, t);
  updateBuoys(dt, t);
  updateClouds(dt, t);

  oceanUniforms.uTime.value = t;
  pushRippleUniforms();

  /* camera follows the ship */
  skyDome.position.copy(camera.position);
  const Fx = -Math.sin(heading), Fz = -Math.cos(heading);
  controls.target.set(shipX + Fx * 7, shipY + 1.6, shipZ + Fz * 7);
  controls.update();

  /* HUD */
  const rising = Math.cos(dayAngle) > 0;
  phaseEl.textContent = phaseOf(el, rising);
  dayFill.style.width = (((dayAngle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)) / (Math.PI * 2) * 100 + '%';

  renderer.render(scene, camera);
}

const clock = new THREE.Clock();
tick();

/* tiny debug/test hook */
window.__sim = {
  addRipple,
  getRipples: () => ripples.map(r => ({ x: r.x, y: r.y, t0: r.t0, amp: r.amp })),
  getTime: () => ({ dayAngle, sceneTime, paused, daySpeed }),
  shipPos: () => ship.position.toArray(),
  sunVisible: () => sunMesh.visible,
  starsOpacity: () => (starsMat ? starsMat.opacity : -1),
  phase: () => phaseEl.textContent,
  setPaused: (p) => { paused = !!p; pauseBtn.textContent = paused ? '▶ Resume' : '⏸ Pause'; },
  setDayAngle: (v) => { dayAngle = v; },
  fastForward: (sec) => { sceneTime += sec; },
  clearRipples: () => { ripples.length = 0; },
  projectSun: () => {
    if (!sunMesh.visible) return null;
    const v = sunMesh.position.clone().project(camera);
    if (v.z > 1 || v.z < -1) return null;
    return { x: (v.x + 1) * 0.5 * window.innerWidth, y: (-v.y + 1) * 0.5 * window.innerHeight };
  },
  camInfo: () => ({ pos: camera.position.toArray(), az: controls.getAzimuthalAngle(), pol: controls.getPolarAngle() }),
  setAutoRotate: (v) => { controls.autoRotateSpeed = v; },
};
})();
