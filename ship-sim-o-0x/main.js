import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// ---------------------------------------------------------------------------
// Wave field (single source of truth for GPU + CPU buoyancy)
// ---------------------------------------------------------------------------
const WAVES = [
  [-0.84, -0.54, 64, 0.26, 1.00, 0.0],
  [ 0.58, -0.82, 34, 0.17, 1.05, 1.7],
  [ 0.95,  0.31, 21, 0.11, 0.95, 4.1],
  [ 0.32,  0.95, 12, 0.06, 1.10, 2.3],
  [-0.71,  0.70,  7, 0.03, 1.15, 5.5],
].map(([dx, dz, L, a, sp, ph]) => {
  const len = Math.hypot(dx, dz);
  const k = (2 * Math.PI) / L;
  return { dx: dx / len, dz: dz / len, k, a, om: Math.sqrt(9.81 * k) * sp, ph };
});

// Ripple constants (mirrored in GLSL below)
const RIP = { N: 24, SPEED: 3.4, K: 1.5, W: 1.7, LIFE: 8.0, DECAY: 0.9, ATTN: 0.010 };
const RIP_2W2 = (2 * RIP.W * RIP.W).toFixed(4);

// Palette shared between GLSL strings and JS fog/light mirroring
const PAL = {
  dayZen:   [0.19, 0.44, 0.74],
  dayHor:   [0.62, 0.79, 0.89],
  nightZen: [0.012, 0.02, 0.05],
  nightHor: [0.04, 0.07, 0.125],
  sunset:   [1.00, 0.48, 0.20],
};
const v3 = (a) => `vec3(${a.map((n) => n.toFixed(4)).join(', ')})`;

// Analytic swell: returns vec3(dh/dx, dh/dz, h)
const SWELL_GLSL = /* glsl */ `
vec3 swell(vec2 p) {
  vec2 g = vec2(0.0);
  float h = 0.0;
${WAVES.map((w) => `  {
    float f = dot(p, vec2(${w.dx.toFixed(6)}, ${w.dz.toFixed(6)})) * ${w.k.toFixed(6)}
            + uTime * ${w.om.toFixed(6)} + ${w.ph.toFixed(6)};
    h += ${w.a.toFixed(6)} * sin(f);
    g += ${(w.a * w.k).toFixed(6)} * cos(f) * vec2(${w.dx.toFixed(6)}, ${w.dz.toFixed(6)});
  }`).join('\n')}
  return vec3(g.x, g.y, h);
}
`;

// Click ripples: xy=center, z=start time, w=amplitude
const RIPPLE_GLSL = /* glsl */ `
#define RIP_N ${RIP.N}
uniform vec4 uRipples[RIP_N];

vec3 rippleV(vec2 p) {
  vec2 g = vec2(0.0);
  float h = 0.0;
  for (int i = 0; i < RIP_N; i++) {
    vec4 r = uRipples[i];
    float age = uTime - r.z;
    if (r.w == 0.0 || age < 0.0 || age > ${RIP.LIFE.toFixed(1)}) continue;
    vec2 d = p - r.xy;
    float dist = length(d) + 1e-4;
    float R = ${RIP.SPEED.toFixed(2)} * age;
    float env = exp(-(dist - R) * (dist - R) / ${RIP_2W2});
    float att = exp(-age * ${RIP.DECAY.toFixed(2)}) * exp(-dist * ${RIP.ATTN.toFixed(4)});
    float arg = ${RIP.K.toFixed(2)} * (dist - R);
    float A = r.w * env * att * min(age / 0.12, 1.0);
    h += A * sin(arg);
    g += (d / dist) * (${RIP.K.toFixed(2)} * A * cos(arg));
  }
  return vec3(g.x, g.y, h);
}
`;

// Procedural sky (shared by sky dome and water reflections)
const SKY_GLSL = /* glsl */ `
uniform float uTime;
uniform vec3 uSunDir;
uniform vec3 uMoonDir;

float hash13(vec3 p) {
  p = fract(p * 0.1031);
  p += dot(p, p.zyx + 31.32);
  return fract((p.x + p.y) * p.z);
}

vec3 skyColor(vec3 dir) {
  float sy = uSunDir.y;
  float dayn = smoothstep(-0.08, 0.15, sy);
  float night = 1.0 - dayn;

  vec3 zen = mix(${v3(PAL.nightZen)}, ${v3(PAL.dayZen)}, dayn);
  vec3 hor = mix(${v3(PAL.nightHor)}, ${v3(PAL.dayHor)}, dayn);

  float horiz = pow(clamp(1.0 - max(dir.y, 0.0), 0.0, 1.0), 3.0);
  vec3 col = mix(zen, hor, horiz);

  float sunsetAmt = exp(-abs(sy) * 6.0);
  vec2 sd = normalize(uSunDir.xz + vec2(1e-4));
  vec2 dd = normalize(dir.xz + vec2(1e-4));
  float sunAz = max(dot(sd, dd), 0.0);
  col = mix(col, ${v3(PAL.sunset)}, sunsetAmt * 0.85 * pow(sunAz, 3.0) * horiz);

  col = mix(col, hor * 0.8, smoothstep(0.0, -0.12, dir.y));

  float sa = max(dot(dir, uSunDir), 0.0);
  vec3 sunTint = mix(vec3(1.0, 0.42, 0.15), vec3(1.0, 0.93, 0.75), clamp(sy * 3.0, 0.0, 1.0));
  float sunVis = smoothstep(-0.10, 0.02, sy);
  col += sunTint * (smoothstep(0.99938, 0.99965, sa) * 4.0
                  + pow(sa, 160.0) * 0.55
                  + pow(sa, 7.0) * 0.14) * sunVis;

  float ma = max(dot(dir, uMoonDir), 0.0);
  col += vec3(0.86, 0.91, 1.0) * (smoothstep(0.99965, 0.99985, ma) * 2.6
                                + pow(ma, 220.0) * 0.35) * night;

  vec3 sp = floor(dir * 260.0);
  float hs = hash13(sp);
  float tw = 0.55 + 0.45 * sin(uTime * 2.4 + hs * 61.0);
  float star = smoothstep(0.9975, 0.999, hs) * tw;
  col += vec3(star) * night * smoothstep(0.02, 0.28, dir.y) * 0.9;

  return col;
}
`;

// ---------------------------------------------------------------------------
// Renderer / scene / camera
// ---------------------------------------------------------------------------
let renderer;
try {
  renderer = new THREE.WebGLRenderer({ antialias: true });
} catch (err) {
  document.getElementById('fallback').style.display = 'grid';
  throw err;
}
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.12;
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 2500);
camera.position.set(13, 5.5, 11);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 1.6, 0);
controls.enableDamping = true;
controls.dampingFactor = 0.06;
controls.minDistance = 6;
controls.maxDistance = 60;
controls.maxPolarAngle = 1.45;
controls.enablePan = false;
controls.autoRotateSpeed = 0.5;

// ---------------------------------------------------------------------------
// Shared uniforms
// ---------------------------------------------------------------------------
const shared = {
  uTime: { value: 0 },
  uSunDir: { value: new THREE.Vector3(0, 1, 0) },
  uMoonDir: { value: new THREE.Vector3(0, -1, 0) },
};

// ---------------------------------------------------------------------------
// Sky dome
// ---------------------------------------------------------------------------
const skyMat = new THREE.ShaderMaterial({
  uniforms: shared,
  side: THREE.BackSide,
  depthWrite: false,
  vertexShader: /* glsl */ `
    varying vec3 vDir;
    void main() {
      vDir = position;
      gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    varying vec3 vDir;
    ${SKY_GLSL}
    void main() {
      vec3 col = skyColor(normalize(vDir));
      gl_FragColor = vec4(col, 1.0);
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }
  `,
});
const sky = new THREE.Mesh(new THREE.SphereGeometry(900, 48, 24), skyMat);
sky.renderOrder = -1;
scene.add(sky);

// ---------------------------------------------------------------------------
// Ocean
// ---------------------------------------------------------------------------
const rippleData = Array.from({ length: RIP.N }, () => new THREE.Vector4(0, 0, -1000, 0));

const waterMat = new THREE.ShaderMaterial({
  uniforms: {
    ...shared,
    uRipples: { value: rippleData },
    uCamPos: { value: new THREE.Vector3() },
    uFogColor: { value: new THREE.Color() },
    uFogDensity: { value: 0.0026 },
  },
  vertexShader: /* glsl */ `
    uniform float uTime;
    varying vec3 vWorld;
    ${SWELL_GLSL}
    ${RIPPLE_GLSL}
    void main() {
      vec3 p = position;
      vec3 sw = swell(p.xz);
      vec3 rp = rippleV(p.xz);
      p.y += sw.z + rp.z;
      vWorld = p;
      gl_Position = projectionMatrix * viewMatrix * vec4(p, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    uniform vec3 uCamPos;
    uniform vec3 uFogColor;
    uniform float uFogDensity;
    varying vec3 vWorld;
    ${SKY_GLSL}
    ${SWELL_GLSL}
    ${RIPPLE_GLSL}

    void main() {
      vec2 xz = vWorld.xz;
      vec3 sw = swell(xz);
      vec3 rp = rippleV(xz);
      vec2 grad = sw.xy + rp.xy;
      vec3 N = normalize(vec3(-grad.x, 1.0, -grad.y));

      vec3 toCam = uCamPos - vWorld;
      float dist = length(toCam);
      vec3 V = toCam / dist;
      vec3 R = reflect(-V, N);
      R.y = abs(R.y);
      vec3 refl = skyColor(normalize(R));

      float dayn = smoothstep(-0.08, 0.15, uSunDir.y);
      vec3 deep  = mix(vec3(0.008, 0.030, 0.062), vec3(0.016, 0.115, 0.196), dayn);
      vec3 crest = mix(vec3(0.030, 0.100, 0.140), vec3(0.055, 0.400, 0.450), dayn);
      float crestMix = smoothstep(-0.35, 0.55, sw.z + rp.z * 2.0);
      vec3 base = mix(deep, crest, crestMix);

      float fres = 0.02 + 0.98 * pow(1.0 - max(dot(N, V), 0.0), 5.0);
      vec3 col = mix(base, refl, fres);

      float sunA = max(dot(R, uSunDir), 0.0);
      float moonA = max(dot(R, uMoonDir), 0.0);
      vec3 sunTint = mix(vec3(1.0, 0.45, 0.18), vec3(1.0, 0.92, 0.72), clamp(uSunDir.y * 3.0, 0.0, 1.0));
      col += sunTint * pow(sunA, 420.0) * 2.4 * smoothstep(-0.06, 0.03, uSunDir.y);
      col += vec3(0.75, 0.85, 1.0) * pow(moonA, 480.0) * 1.1 * (1.0 - dayn);

      float foam = smoothstep(0.35, 0.95, length(grad)) * 0.22
                 + smoothstep(0.45, 0.70, sw.z) * 0.05;
      col += vec3(0.90, 0.95, 1.0) * foam;

      float fogF = 1.0 - exp(-pow(dist * uFogDensity, 1.6));
      col = mix(col, uFogColor, clamp(fogF, 0.0, 1.0));

      gl_FragColor = vec4(col, 1.0);
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }
  `,
});

const waterGeo = new THREE.PlaneGeometry(1500, 1500, 330, 330);
waterGeo.rotateX(-Math.PI / 2);
const water = new THREE.Mesh(waterGeo, waterMat);
water.frustumCulled = false;
scene.add(water);

// ---------------------------------------------------------------------------
// Ship
// ---------------------------------------------------------------------------
function sailGeometry(a, b, c, bulge) {
  const seg = 5;
  const A = new THREE.Vector3(...a), B = new THREE.Vector3(...b), C = new THREE.Vector3(...c);
  const n = new THREE.Vector3().subVectors(B, A).cross(new THREE.Vector3().subVectors(C, A)).normalize();
  const verts = [];
  const idx = [];
  for (let i = 0; i <= seg; i++) {
    for (let j = 0; j <= seg - i; j++) {
      const u = i / seg, v = j / seg, w = 1 - u - v;
      const p = new THREE.Vector3()
        .addScaledVector(A, w).addScaledVector(B, u).addScaledVector(C, v);
      const f = 27 * w * u * v;
      p.addScaledVector(n, bulge * f);
      verts.push(p.x, p.y, p.z);
    }
  }
  let off = 0;
  for (let i = 0; i < seg; i++) {
    const rowCount = seg - i + 1;
    const nextCount = seg - i;
    for (let j = 0; j < nextCount; j++) {
      const a0 = off + j, b0 = off + j + 1, c0 = off + rowCount + j;
      idx.push(a0, c0, b0);
      if (j < nextCount - 1) idx.push(b0, c0, off + rowCount + j + 1);
    }
    off += rowCount;
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}

function buildShip() {
  const ship = new THREE.Group();

  const hullGeo = new THREE.BoxGeometry(5.6, 1.15, 1.9, 6, 1, 2);
  {
    const pos = hullGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      let x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
      const nx = x / 5.6 + 0.5;
      let taper = 1.0;
      if (nx > 0.45) taper = 1.0 - 0.88 * Math.pow((nx - 0.45) / 0.55, 1.5);
      if (nx < 0.12) taper = Math.min(taper, 0.82 + (nx / 0.12) * 0.18);
      z *= taper;
      if (y < 0) y += 0.34 * Math.pow(Math.max(nx - 0.4, 0) / 0.6, 2.0);
      pos.setXYZ(i, x, y, z);
    }
    hullGeo.computeVertexNormals();
  }
  const hull = new THREE.Mesh(hullGeo,
    new THREE.MeshStandardMaterial({ color: 0x6e3b23, roughness: 0.62, metalness: 0.05, flatShading: true }));
  hull.position.y = 0.42;
  ship.add(hull);

  const deck = new THREE.Mesh(new THREE.BoxGeometry(4.9, 0.12, 1.52),
    new THREE.MeshStandardMaterial({ color: 0xc9a36a, roughness: 0.8, flatShading: true }));
  deck.position.y = 1.04;
  ship.add(deck);

  const cabinMat = new THREE.MeshStandardMaterial({ color: 0xf2ede2, roughness: 0.7, flatShading: true });
  const cabin = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.85, 1.15), cabinMat);
  cabin.position.set(-1.05, 1.52, 0);
  ship.add(cabin);

  const roof = new THREE.Mesh(new THREE.BoxGeometry(1.68, 0.1, 1.33),
    new THREE.MeshStandardMaterial({ color: 0x8a4a32, roughness: 0.75, flatShading: true }));
  roof.position.set(-1.05, 2.0, 0);
  ship.add(roof);

  const windowMat = new THREE.MeshStandardMaterial({
    color: 0x241a12, roughness: 0.4,
    emissive: 0xffc37a, emissiveIntensity: 0,
  });
  for (const zs of [-1, 1]) {
    const win = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.32, 0.06), windowMat);
    win.position.set(-1.05, 1.58, zs * 0.59);
    ship.add(win);
  }

  const woodMat = new THREE.MeshStandardMaterial({ color: 0x503018, roughness: 0.65, flatShading: true });

  const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.09, 7.2, 8), woodMat);
  mast.position.set(0.95, 4.65, 0);
  ship.add(mast);

  const boom = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 3.4, 8), woodMat);
  boom.rotation.z = Math.PI / 2;
  boom.position.set(-0.6, 2.35, 0);
  ship.add(boom);

  const sailMat = new THREE.MeshStandardMaterial({
    color: 0xf7f2e4, roughness: 0.85, side: THREE.DoubleSide,
  });
  ship.add(new THREE.Mesh(
    sailGeometry([0.95, 8.05, 0], [0.95, 2.45, 0], [-2.3, 2.45, 0], 0.35), sailMat));
  ship.add(new THREE.Mesh(
    sailGeometry([0.92, 7.85, 0], [2.72, 1.35, 0], [1.15, 2.35, 0], 0.25), sailMat));

  const flagGeo = new THREE.PlaneGeometry(0.9, 0.4, 8, 2);
  flagGeo.translate(0.45, 0, 0);
  const flag = new THREE.Mesh(flagGeo, new THREE.MeshStandardMaterial({
    color: 0xd64541, roughness: 0.9, side: THREE.DoubleSide,
  }));
  flag.rotation.y = Math.PI;
  flag.position.set(0.95, 8.3, 0);
  ship.add(flag);
  flag.userData.base = flagGeo.attributes.position.array.slice();

  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.2, 6), woodMat);
  pole.position.set(-2.55, 1.6, 0);
  pole.rotation.z = 0.12;
  ship.add(pole);

  const lanternMat = new THREE.MeshStandardMaterial({
    color: 0xffe6b0, roughness: 0.3,
    emissive: 0xffb45e, emissiveIntensity: 0.15,
  });
  const lantern = new THREE.Mesh(new THREE.SphereGeometry(0.11, 10, 8), lanternMat);
  lantern.position.set(-2.62, 2.2, 0);
  ship.add(lantern);

  const lanternLight = new THREE.PointLight(0xffb46a, 0, 18, 2);
  lanternLight.position.copy(lantern.position);
  ship.add(lanternLight);

  return { ship, flag, windowMat, lanternMat, lanternLight };
}

const { ship, flag, windowMat, lanternMat, lanternLight } = buildShip();
ship.rotation.y = -0.4;
scene.add(ship);

// ---------------------------------------------------------------------------
// Lights
// ---------------------------------------------------------------------------
const hemi = new THREE.HemisphereLight(0xbfd8ea, 0x0a2e40, 0.85);
const dirLight = new THREE.DirectionalLight(0xffffff, 2.2);
scene.add(hemi, dirLight);

// ---------------------------------------------------------------------------
// Interaction: click -> ripple
// ---------------------------------------------------------------------------
const cpuRipples = [];
let rippleIdx = 0;
const raycaster = new THREE.Raycaster();
const seaPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
const hitV = new THREE.Vector3();
const ndc = new THREE.Vector2();
let downX = 0, downY = 0, downT = 0;

function spawnRipple(x, z, tSim) {
  const amp = 0.36 + Math.random() * 0.15;
  rippleData[rippleIdx].set(x, z, tSim, amp);
  rippleIdx = (rippleIdx + 1) % RIP.N;
  cpuRipples.push({ x, z, t0: tSim, a: amp });
  if (cpuRipples.length > RIP.N) cpuRipples.shift();
}

renderer.domElement.addEventListener('pointerdown', (e) => {
  downX = e.clientX; downY = e.clientY; downT = performance.now();
});
renderer.domElement.addEventListener('pointerup', (e) => {
  if (performance.now() - downT > 600) return;
  if (Math.hypot(e.clientX - downX, e.clientY - downY) > 7) return;
  ndc.set((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1);
  raycaster.setFromCamera(ndc, camera);
  if (raycaster.ray.intersectPlane(seaPlane, hitV)) {
    const d = Math.hypot(hitV.x, hitV.z);
    if (d < 700) spawnRipple(hitV.x, hitV.z, simT);
  }
});

// Auto-rotate pauses while user interacts, resumes after a pause
let holding = false, lastRelease = -10;
controls.addEventListener('start', () => { holding = true; });
controls.addEventListener('end', () => { holding = false; lastRelease = simT; });

// ---------------------------------------------------------------------------
// CPU-side water height (mirror of the shaders) for buoyancy
// ---------------------------------------------------------------------------
function seaHeightAt(x, z, t) {
  let h = 0;
  for (const w of WAVES) h += w.a * Math.sin(w.k * (w.dx * x + w.dz * z) + w.om * t + w.ph);
  for (const r of cpuRipples) {
    const age = t - r.t0;
    if (age < 0 || age > RIP.LIFE) continue;
    const dx = x - r.x, dz = z - r.z;
    const dist = Math.hypot(dx, dz) + 1e-4;
    const Rr = RIP.SPEED * age;
    const env = Math.exp(-((dist - Rr) ** 2) / (2 * RIP.W * RIP.W));
    const att = Math.exp(-age * RIP.DECAY) * Math.exp(-dist * RIP.ATTN);
    h += r.a * env * Math.sin(RIP.K * (dist - Rr)) * Math.min(age / 0.12, 1) * att;
  }
  return h;
}

// ---------------------------------------------------------------------------
// Day / night cycle
// ---------------------------------------------------------------------------
const CYCLE = 96;          // seconds for a full day+night
const ELEV_MAX = (38 * Math.PI) / 180;
const AZIM = (195 * Math.PI) / 180;
const PHASE0 = 0.985;      // start just before sunrise

const sunDir = new THREE.Vector3();
const moonDir = new THREE.Vector3();

const cDayHor = new THREE.Color(...PAL.dayHor);
const cNightHor = new THREE.Color(...PAL.nightHor);
const cSunset = new THREE.Color(...PAL.sunset);
const fogColor = new THREE.Color();
const cHemiDay = new THREE.Color(0xbfd8ea);
const cHemiNight = new THREE.Color(0x1c2438);
const cGroundDay = new THREE.Color(0x0a3048);
const cGroundNight = new THREE.Color(0x02060c);
const cSunLow = new THREE.Color(0xff9a4d);
const cSunHigh = new THREE.Color(0xfff3dd);
const cMoon = new THREE.Color(0xbdd0ff);
const tmpColor = new THREE.Color();

function updateCycle(t) {
  const phase = (PHASE0 + t / CYCLE) % 1;
  const elev = ELEV_MAX * Math.sin(phase * Math.PI * 2);
  const ce = Math.cos(elev);
  sunDir.set(ce * Math.sin(AZIM), Math.sin(elev), ce * Math.cos(AZIM)).normalize();
  moonDir.copy(sunDir).negate();
  shared.uSunDir.value.copy(sunDir);
  shared.uMoonDir.value.copy(moonDir);

  const dayness = THREE.MathUtils.smoothstep(sunDir.y, -0.08, 0.15);
  const nightness = 1 - dayness;

  // Fog mirrors the shader's horizon colour
  fogColor.copy(cNightHor).lerp(cDayHor, dayness);
  fogColor.lerp(cSunset, Math.exp(-Math.abs(sunDir.y) * 6) * 0.45);
  waterMat.uniforms.uFogColor.value.copy(fogColor);

  // Directional light: sun by day, moon by night
  const sunI = 2.3 * THREE.MathUtils.smoothstep(sunDir.y, -0.02, 0.10);
  const moonI = 0.55 * THREE.MathUtils.smoothstep(-sunDir.y, -0.02, 0.10);
  if (sunI >= moonI) {
    dirLight.position.copy(sunDir).multiplyScalar(100);
    dirLight.intensity = sunI;
    dirLight.color.copy(cSunLow).lerp(cSunHigh, THREE.MathUtils.clamp(sunDir.y * 2.5, 0, 1));
  } else {
    dirLight.position.copy(moonDir).multiplyScalar(100);
    dirLight.intensity = moonI;
    dirLight.color.copy(cMoon);
  }

  hemi.intensity = 0.25 + 0.75 * dayness;
  hemi.color.copy(cHemiNight).lerp(cHemiDay, dayness);
  hemi.groundColor.copy(cGroundNight).lerp(cGroundDay, dayness);

  windowMat.emissiveIntensity = nightness * 1.4;
  lanternMat.emissiveIntensity = 0.15 + nightness * 2.2;
  lanternLight.intensity = nightness * (1.7 + 0.25 * Math.sin(t * 7.3) + 0.15 * Math.sin(t * 13.1));
}

// ---------------------------------------------------------------------------
// Resize
// ---------------------------------------------------------------------------
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// ---------------------------------------------------------------------------
// Main loop
// ---------------------------------------------------------------------------
const clock = new THREE.Clock();
let simT = 0;
const qTarget = new THREE.Quaternion();
const eTarget = new THREE.Euler();

function animate() {
  requestAnimationFrame(animate);
  const dt = Math.min(clock.getDelta(), 0.05);
  simT += dt;

  shared.uTime.value = simT;
  waterMat.uniforms.uCamPos.value.copy(camera.position);
  updateCycle(simT);

  // Buoyancy: sample the wave field around the hull
  const hC = seaHeightAt(0, 0, simT);
  const hBow = seaHeightAt(2.7, 0, simT);
  const hStern = seaHeightAt(-2.7, 0, simT);
  const hPort = seaHeightAt(0, 1.0, simT);
  const hStbd = seaHeightAt(0, -1.0, simT);
  const ease = 1 - Math.exp(-4 * dt);

  ship.position.y += ((0.42 + hC * 0.9) - ship.position.y) * ease;
  eTarget.set(
    -Math.atan2(hPort - hStbd, 2.0),
    -0.4 + 0.05 * Math.sin(simT * 0.23),
    Math.atan2(hBow - hStern, 5.4),
  );
  qTarget.setFromEuler(eTarget);
  ship.quaternion.slerp(qTarget, ease);

  // Fluttering flag
  {
    const pos = flag.geometry.attributes.position;
    const base = flag.userData.base;
    for (let i = 0; i < pos.count; i++) {
      const bx = base[i * 3];
      pos.setZ(i, Math.sin(bx * 7 - simT * 9) * 0.07 * (bx / 0.9));
    }
    pos.needsUpdate = true;
  }

  controls.autoRotate = !holding && simT - lastRelease > 6;
  controls.update();
  renderer.render(scene, camera);
}
animate();
