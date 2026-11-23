import * as THREE from 'three';

// ---------- renderer / scene / camera ----------
const container = document.getElementById('app');
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
container.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 3000);

// ---------- palettes ----------
const PAL = {
  day:   { sky: new THREE.Color(0x7fb2e5), horizon: new THREE.Color(0xd9e6ef), deep: new THREE.Color(0x0c3a5c), shallow: new THREE.Color(0x2f7d9a), sun: new THREE.Color(0xfff2d0), fog: new THREE.Color(0xc6d8e6), hemi: new THREE.Color(0xbcd6ea), amb: 0.85 },
  golden:{ sky: new THREE.Color(0x6f86b8), horizon: new THREE.Color(0xffb066), deep: new THREE.Color(0x14304e), shallow: new THREE.Color(0x3d6d8a), sun: new THREE.Color(0xffc069), fog: new THREE.Color(0xe0a877), hemi: new THREE.Color(0xe6b183), amb: 0.6 },
  night: { sky: new THREE.Color(0x060a18), horizon: new THREE.Color(0x0e1a2e), deep: new THREE.Color(0x050d1c), shallow: new THREE.Color(0x0d2136), sun: new THREE.Color(0xbfd0ff), fog: new THREE.Color(0x080f1d), hemi: new THREE.Color(0x22304e), amb: 0.32 },
};

// ---------- lights ----------
const sunLight = new THREE.DirectionalLight(0xffffff, 2.2);
sunLight.castShadow = true;
sunLight.shadow.mapSize.set(2048, 2048);
sunLight.shadow.camera.left = -30; sunLight.shadow.camera.right = 30;
sunLight.shadow.camera.top = 30; sunLight.shadow.camera.bottom = -30;
sunLight.shadow.camera.far = 300;
scene.add(sunLight); scene.add(sunLight.target);

const hemi = new THREE.HemisphereLight(0xbcd6ea, 0x0c2438, 0.7);
scene.add(hemi);

const fill = new THREE.DirectionalLight(0x8fb0d8, 0.35);
fill.position.set(-40, 20, -30);
scene.add(fill);

// ---------- sky dome ----------
const skyUniforms = {
  uZenith: { value: new THREE.Color(0x7fb2e5) },
  uHorizon: { value: new THREE.Color(0xd9e6ef) },
  uSunDir: { value: new THREE.Vector3(0, 1, 0) },
  uSunColor: { value: new THREE.Color(0xfff2d0) },
  uDayFactor: { value: 1 },
  uTime: { value: 0 },
};
const skyMat = new THREE.ShaderMaterial({
  side: THREE.BackSide,
  depthWrite: false,
  fog: false,
  uniforms: skyUniforms,
  vertexShader: `
    varying vec3 vDir;
    void main() {
      vDir = normalize(position);
      vec4 mv = modelViewMatrix * vec4(position, 1.0);
      gl_Position = projectionMatrix * mv;
    }`,
  fragmentShader: `
    varying vec3 vDir;
    uniform vec3 uZenith, uHorizon, uSunColor, uSunDir;
    uniform float uDayFactor, uTime;
    float hash(vec3 p) {
      p = fract(p * vec3(443.897, 441.423, 437.195));
      p += dot(p, p.yzx + 19.19);
      return fract((p.x + p.y) * p.z);
    }
    void main() {
      vec3 dir = normalize(vDir);
      float h = dir.y;
      vec3 col = mix(uHorizon, uZenith, pow(clamp(h, 0.0, 1.0), 0.55));
      if (h < 0.0) col = mix(uHorizon, uHorizon * 0.55, clamp(-h * 4.0, 0.0, 1.0));
      // sun disc + halo
      float s = dot(dir, normalize(uSunDir));
      col += uSunColor * (pow(clamp(s, 0.0, 1.0), 1400.0) * 3.0 + pow(clamp(s, 0.0, 1.0), 10.0) * 0.35);
      // stars, only at night
      if (uDayFactor < 0.5) {
        vec3 g = floor(dir * 220.0);
        float star = hash(g);
        float tw = 0.6 + 0.4 * sin(uTime * 2.0 + star * 40.0);
        float sAmt = step(0.9975, star) * (1.0 - uDayFactor * 2.0) * tw * clamp(h * 3.0, 0.0, 1.0);
        col += vec3(0.9, 0.93, 1.0) * sAmt;
      }
      gl_FragColor = vec4(col, 1.0);
    }`,
});
const sky = new THREE.Mesh(new THREE.SphereGeometry(1200, 32, 16), skyMat);
scene.add(sky);

// faint moon sprite (plain glowing sphere in the sky)
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(38, 24, 24),
  new THREE.MeshBasicMaterial({ color: 0xe8edff, fog: false })
);
scene.add(moon);

// ---------- ocean ----------
const MAX_RIPPLES = 16;
const rippleData = new Array(MAX_RIPPLES).fill(null).map(() => new THREE.Vector4(0, 0, -100, 0));
let rippleIndex = 0;

const oceanUniforms = {
  uTime: { value: 0 },
  uSunDir: { value: new THREE.Vector3(0, 1, 0) },
  uLightDir: { value: new THREE.Vector3(0, 1, 0) },
  uLightColor: { value: new THREE.Color(0xffffff) },
  uDeep: { value: new THREE.Color(0x0c3a5c) },
  uShallow: { value: new THREE.Color(0x2f7d9a) },
  uHorizon: { value: new THREE.Color(0xd9e6ef) },
  uRipples: { value: rippleData },
};

const oceanMat = new THREE.ShaderMaterial({
  uniforms: oceanUniforms,
  fog: false,
  vertexShader: `
    uniform float uTime;
    uniform vec4 uRipples[${MAX_RIPPLES}];
    varying vec3 vWorldPos;
    varying vec3 vNormal;

    float waveH(vec2 p, float t) {
      float h = 0.0;
      h += sin(p.x * 0.115 + t * 0.85) * 0.42;
      h += sin(p.y * 0.085 - t * 0.62 + p.x * 0.045) * 0.52;
      h += sin((p.x + p.y) * 0.19 + t * 1.45) * 0.16;
      h += sin(p.x * 0.5 - t * 2.1 + p.y * 0.3) * 0.09;
      for (int i = 0; i < ${MAX_RIPPLES}; i++) {
        vec4 r = uRipples[i];
        float age = t - r.z;
        if (age < 0.0 || age > 8.0 || r.w <= 0.0) continue;
        float d = distance(p, r.xy);
        float radius = age * 7.5;
        float band = exp(-pow((d - radius) * 0.5, 2.0));
        float fade = exp(-age * 0.85) * exp(-d * 0.010);
        h += sin(d * 1.7 - age * 8.5) * band * fade * r.w * 0.55;
      }
      return h;
    }

    void main() {
      vec3 pos = position;
      vec4 wp = modelMatrix * vec4(pos, 1.0);
      float h = waveH(wp.xz, uTime);
      wp.y += h;
      float e = 0.9;
      float hx = waveH(wp.xz + vec2(e, 0.0), uTime);
      float hz = waveH(wp.xz + vec2(0.0, e), uTime);
      vec3 nrm = normalize(vec3(h - hx, e, h - hz));
      vNormal = nrm;
      vWorldPos = wp.xyz;
      gl_Position = projectionMatrix * viewMatrix * wp;
    }`,
  fragmentShader: `
    uniform vec3 uDeep, uShallow, uHorizon, uLightColor, uLightDir;
    varying vec3 vWorldPos;
    varying vec3 vNormal;

    void main() {
      vec3 N = normalize(vNormal);
      vec3 V = normalize(cameraPosition - vWorldPos);
      vec3 L = normalize(uLightDir);

      float ndl = max(dot(N, L), 0.0);
      float heightMix = clamp(N.y * 0.5 + 0.1, 0.0, 1.0);
      vec3 col = mix(uDeep, uShallow, heightMix * 0.9);

      // sun glint
      vec3 H = normalize(L + V);
      float spec = pow(max(dot(N, H), 0.0), 240.0) * 2.4;
      col += uLightColor * spec;

      // fresnel toward horizon
      float fres = pow(1.0 - max(dot(N, V), 0.0), 3.0);
      col = mix(col, uHorizon, clamp(fres * 0.85, 0.0, 1.0));

      // gentle vertical gradient
      col += uLightColor * ndl * 0.08;

      gl_FragColor = vec4(col, 1.0);
    }`,
});

const oceanGeo = new THREE.PlaneGeometry(1400, 1400, 190, 190);
const ocean = new THREE.Mesh(oceanGeo, oceanMat);
ocean.rotation.x = -Math.PI / 2;
ocean.position.y = 0;
scene.add(ocean);

// ---------- ship ----------
const ship = new THREE.Group();
scene.add(ship);

const hullMat = new THREE.MeshStandardMaterial({ color: 0x7a4630, roughness: 0.75, metalness: 0.1, flatShading: true });
const trimMat = new THREE.MeshStandardMaterial({ color: 0xe8d9b0, roughness: 0.6, flatShading: true });
const woodMat = new THREE.MeshStandardMaterial({ color: 0x5c3a24, roughness: 0.85, flatShading: true });
const sailMat = new THREE.MeshStandardMaterial({ color: 0xf3ead6, roughness: 0.9, side: THREE.DoubleSide, flatShading: true });

// hull: tapered elongated box via extruded top-view outline
const hullShape = new THREE.Shape();
hullShape.moveTo(-3.2, 0);
hullShape.quadraticCurveTo(-3.0, 1.05, 0.6, 1.0);
hullShape.quadraticCurveTo(2.6, 0.95, 3.6, 0.0);
hullShape.quadraticCurveTo(2.6, -0.95, 0.6, -1.0);
hullShape.quadraticCurveTo(-3.0, -1.05, -3.2, 0);
const hullGeo = new THREE.ExtrudeGeometry(hullShape, { depth: 1.15, bevelEnabled: true, bevelThickness: 0.55, bevelSize: 0.32, bevelSegments: 2, steps: 1 });
hullGeo.rotateX(-Math.PI / 2);
hullGeo.translate(0, 0.55, 0);
const hull = new THREE.Mesh(hullGeo, hullMat);
hull.castShadow = true;
ship.add(hull);

// deck strip
const deck = new THREE.Mesh(new THREE.BoxGeometry(5.6, 0.12, 1.5), trimMat);
deck.position.set(-0.2, 1.62, 0);
deck.castShadow = true;
ship.add(deck);

// bowsprit
const bowsprit = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.12, 2.6, 6), woodMat);
bowsprit.rotation.z = Math.PI / 2 - 0.22;
bowsprit.position.set(3.9, 1.95, 0);
bowsprit.castShadow = true;
ship.add(bowsprit);

// cabin
const cabin = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.9, 1.15), woodMat);
cabin.position.set(-1.75, 2.1, 0);
cabin.castShadow = true;
ship.add(cabin);
const cabinRoof = new THREE.Mesh(new THREE.BoxGeometry(1.95, 0.14, 1.3), trimMat);
cabinRoof.position.set(-1.75, 2.6, 0);
ship.add(cabinRoof);

// masts + sails
function makeSail(w, h, curve) {
  const g = new THREE.PlaneGeometry(w, h, 6, 6);
  const pos = g.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), y = pos.getY(i);
    pos.setZ(i, Math.sin((x / w + 0.5) * Math.PI) * curve * (1 - Math.abs(y / h)));
  }
  g.computeVertexNormals();
  const m = new THREE.Mesh(g, sailMat);
  m.castShadow = true;
  return m;
}
function makeMast(x, height, sailW, sailH) {
  const g = new THREE.Group();
  const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.16, height, 8), woodMat);
  mast.position.y = height / 2;
  mast.castShadow = true;
  g.add(mast);
  const sail = makeSail(sailW, sailH, 0.55);
  sail.position.set(0, height * 0.52, 0.02);
  g.add(sail);
  const yard = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, sailW * 0.55, 6), woodMat);
  yard.rotation.z = Math.PI / 2;
  yard.position.y = height * 0.78;
  g.add(yard);
  g.position.set(x, 1.55, 0);
  return g;
}
ship.add(makeMast(0.4, 5.4, 2.9, 2.7));
ship.add(makeMast(-2.1, 4.2, 2.1, 2.0));

// flag
const flagGeo = new THREE.PlaneGeometry(0.85, 0.5, 6, 1);
const flag = new THREE.Mesh(flagGeo, new THREE.MeshStandardMaterial({ color: 0xe4572e, side: THREE.DoubleSide }));
flag.position.set(0.4, 7.15, 0);
ship.add(flag);

// lantern glow at night
const lantern = new THREE.PointLight(0xffb36b, 0, 9, 2);
lantern.position.set(-1.75, 3.1, 0);
ship.add(lantern);
const lanternGlow = new THREE.Mesh(new THREE.SphereGeometry(0.16, 8, 8), new THREE.MeshBasicMaterial({ color: 0xffd9a0, fog: false }));
lanternGlow.position.copy(lantern.position);
ship.add(lanternGlow);

// wake particles (simple trailing foam)
const wakeCanvas = document.createElement('canvas');
wakeCanvas.width = wakeCanvas.height = 64;
const wakeCtx = wakeCanvas.getContext('2d');
const grad = wakeCtx.createRadialGradient(32, 32, 2, 32, 32, 32);
grad.addColorStop(0, 'rgba(255,255,255,0.9)');
grad.addColorStop(1, 'rgba(255,255,255,0)');
wakeCtx.fillStyle = grad;
wakeCtx.fillRect(0, 0, 64, 64);
const wakeTex = new THREE.CanvasTexture(wakeCanvas);
const wakeGroup = new THREE.Group();
scene.add(wakeGroup);
const wakePool = [];
for (let i = 0; i < 60; i++) {
  const mat = new THREE.SpriteMaterial({ map: wakeTex, transparent: true, depthWrite: false, opacity: 0 });
  const sp = new THREE.Sprite(mat);
  sp.scale.set(1, 1, 1);
  sp.visible = false;
  scene.add(sp);
  wakePool.push({ sp, life: 0, max: 1 });
}
let wakeCursor = 0;
let wakeTimer = 0;

// ---------- wave height mirror (JS) ----------
function waveH(px, pz, t) {
  let h = 0;
  h += Math.sin(px * 0.115 + t * 0.85) * 0.42;
  h += Math.sin(pz * 0.085 - t * 0.62 + px * 0.045) * 0.52;
  h += Math.sin((px + pz) * 0.19 + t * 1.45) * 0.16;
  h += Math.sin(px * 0.5 - t * 2.1 + pz * 0.3) * 0.09;
  for (const r of rippleData) {
    const age = t - r.z;
    if (age < 0 || age > 8 || r.w <= 0) continue;
    const d = Math.hypot(px - r.x, pz - r.y);
    const radius = age * 7.5;
    const band = Math.exp(-Math.pow((d - radius) * 0.5, 2));
    const fade = Math.exp(-age * 0.85) * Math.exp(-d * 0.010);
    h += Math.sin(d * 1.7 - age * 8.5) * band * fade * r.w * 0.55;
  }
  return h;
}

// ---------- state / input ----------
const state = {
  heading: 0, speed: 0, targetSpeed: 0, steer: 0,
  camYaw: 0, camPitch: 0.32, camDist: 16,
  dragging: false, lastX: 0, lastY: 0,
  downX: 0, downY: 0, downTime: 0,
};
const keys = {};
window.addEventListener('keydown', e => { keys[e.code] = true; });
window.addEventListener('keyup', e => { keys[e.code] = false; });

const raycaster = new THREE.Raycaster();
const ndc = new THREE.Vector2();
const dom = renderer.domElement;
let hintHidden = false;
function hideHint() { hintHidden = true; document.getElementById('hint').classList.add('hidden'); }

dom.addEventListener('pointerdown', e => {
  state.dragging = true;
  state.lastX = e.clientX; state.lastY = e.clientY;
  state.downX = e.clientX; state.downY = e.clientY;
  state.downTime = performance.now();
  dom.setPointerCapture(e.pointerId);
  hideHint();
});
dom.addEventListener('pointermove', e => {
  if (!state.dragging) return;
  const dx = e.clientX - state.lastX, dy = e.clientY - state.lastY;
  state.lastX = e.clientX; state.lastY = e.clientY;
  state.camYaw -= dx * 0.005;
  state.camPitch = THREE.MathUtils.clamp(state.camPitch + dy * 0.004, 0.08, 1.1);
});
dom.addEventListener('pointerup', e => {
  state.dragging = false;
  const moved = Math.hypot(e.clientX - state.downX, e.clientY - state.downY);
  const dt = performance.now() - state.downTime;
  if (moved < 6 && dt < 400) tryRipple(e.clientX, e.clientY);
});
dom.addEventListener('wheel', e => {
  state.camDist = THREE.MathUtils.clamp(state.camDist + e.deltaY * 0.02, 9, 34);
}, { passive: true });

function tryRipple(cx, cy) {
  ndc.set((cx / window.innerWidth) * 2 - 1, -(cy / window.innerHeight) * 2 + 1);
  raycaster.setFromCamera(ndc, camera);
  // intersect the sea plane y=0
  const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  const hit = new THREE.Vector3();
  if (raycaster.ray.intersectPlane(plane, hit)) {
    const r = rippleData[rippleIndex];
    r.set(hit.x, hit.z, clockTime, 1.0);
    rippleIndex = (rippleIndex + 1) % MAX_RIPPLES;
  }
}

// ---------- HUD / palette helpers ----------
const clockSky = document.getElementById('clockSky');
const phaseLabel = document.getElementById('phaseLabel');
const phaseSub = document.getElementById('phaseSub');
const DAY_CYCLE = 120; // seconds per full day
let clockTime = 0;

function lerp(a, b, t) { return a + (b - a) * t; }
function mixPalette(e) {
  // 0 = night, 1 = golden, 2 = day
  const night = PAL.night, golden = PAL.golden, day = PAL.day;
  if (e > 0.28) {
    const t = THREE.MathUtils.clamp((e - 0.28) / 0.45, 0, 1);
    return {
      sky: night.sky.clone().lerp(day.sky, Math.max(t, 0.35)).lerp(day.sky, 0), // fallback
    };
  }
  return null;
}
function mixPal(e) {
  // e = sun elevation; piecewise lerp night->golden->day
  const n = PAL.night, g = PAL.golden, d = PAL.day;
  let sky, horizon, deep, shallow, sun, fog, hemi, amb;
  if (e < 0.0) {
    const t = THREE.MathUtils.clamp((e + 0.55) / 0.55, 0, 1); // -0.55..0 -> 0..1
    sky = n.sky.clone().lerp(g.sky, t);
    horizon = n.horizon.clone().lerp(g.horizon, t);
    deep = n.deep.clone().lerp(g.deep, t);
    shallow = n.shallow.clone().lerp(g.shallow, t);
    sun = n.sun.clone().lerp(g.sun, t);
    fog = n.fog.clone().lerp(g.fog, t);
    hemi = n.hemi.clone().lerp(g.hemi, t);
    amb = lerp(n.amb, g.amb, t);
  } else if (e < 0.32) {
    const t = THREE.MathUtils.clamp(e / 0.32, 0, 1);
    sky = g.sky.clone().lerp(d.sky, t);
    horizon = g.horizon.clone().lerp(d.horizon, t);
    deep = g.deep.clone().lerp(d.deep, t);
    shallow = g.shallow.clone().lerp(d.shallow, t);
    sun = g.sun.clone().lerp(d.sun, t);
    fog = g.fog.clone().lerp(d.fog, t);
    hemi = g.hemi.clone().lerp(d.hemi, t);
    amb = lerp(g.amb, d.amb, t);
  } else {
    const t = THREE.MathUtils.clamp((e - 0.32) / 0.68, 0, 1);
    sky = d.sky.clone().lerp(d.sky, t);
    horizon = d.horizon.clone().lerp(d.horizon, t);
    deep = d.deep.clone().lerp(d.deep, t);
    shallow = d.shallow.clone().lerp(d.shallow, t);
    sun = d.sun.clone().lerp(d.sun, t);
    fog = d.fog.clone().lerp(d.fog, t);
    hemi = d.hemi.clone().lerp(d.hemi, t);
    amb = lerp(d.amb, d.amb, t);
  }
  return { sky, horizon, deep, shallow, sun, fog, hemi, amb };
}

function phaseName(e) {
  if (e < -0.35) return ['Deep night', 'the stars are out'];
  if (e < -0.05) return ['Dawn', 'the sky is waking'];
  if (e < 0.28) return ['Golden hour', 'the light is warm'];
  if (e < 0.75) return ['Midday', 'bright and calm'];
  return ['High sun', 'the sky is clear'];
}

// ---------- ship physics + camera + animation ----------
const tmpV = new THREE.Vector3();
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  const dt = Math.min(clock.getDelta(), 0.05);
  clockTime += dt;

  const fwd = (keys.KeyW || keys.ArrowUp) ? 1 : 0;
  const back = (keys.KeyS || keys.ArrowDown) ? 1 : 0;
  const left = (keys.KeyA || keys.ArrowLeft) ? 1 : 0;
  const right = (keys.KeyD || keys.ArrowRight) ? 1 : 0;
  const targetSpeed = (fwd - back) * 5.5;
  state.targetSpeed = targetSpeed;
  state.speed = THREE.MathUtils.lerp(state.speed, state.targetSpeed, 1 - Math.exp(-dt * 1.2));
  const steerInput = (left - right);
  state.steer = THREE.MathUtils.lerp(state.steer, steerInput, 1 - Math.exp(-dt * 4));
  state.heading += state.steer * dt * 0.55 * Math.min(1, Math.abs(state.speed) / 3 + 0.25);
  ship.position.x += Math.sin(state.heading) * state.speed * dt;
  ship.position.z += Math.cos(state.heading) * state.speed * dt;
  ship.rotation.y = state.heading;

  const t = clockTime;
  const px = ship.position.x, pz = ship.position.z;
  const heading = state.heading;
  const fx = Math.sin(heading), fz = Math.cos(heading);
  const rx = Math.cos(heading), rz = -Math.sin(heading);
  const hC = waveH(px, pz, t);
  const hBow = waveH(px + fx * 2.6, pz + fz * 2.6, t);
  const hStern = waveH(px - fx * 2.6, pz - fz * 2.6, t);
  const hPort = waveH(px - rx * 1.1, pz - rz * 1.1, t);
  const hStar = waveH(px + rx * 1.1, pz + rz * 1.1, t);
  ship.position.y = hC * 0.85;
  ship.rotation.x = Math.atan2(hStern - hBow, 5.2);
  ship.rotation.z = Math.atan2(hPort - hStar, 2.2);

  const camYaw = state.camYaw;
  const dist = state.camDist;
  const pitchC = state.camPitch;
  const offX = Math.sin(camYaw) * Math.cos(pitchC) * dist;
  const offY = Math.sin(pitchC) * dist;
  const offZ = Math.cos(camYaw) * Math.cos(pitchC) * dist;
  const desired = tmpV.set(ship.position.x + offX, ship.position.y + offY + 1.2, ship.position.z + offZ);
  camera.position.lerp(desired, 1 - Math.exp(-dt * 5));
  camera.lookAt(ship.position.x, ship.position.y + 2.2, ship.position.z);

  const ang = (clockTime / DAY_CYCLE) * Math.PI * 2 - Math.PI / 2;
  const sunElev = Math.sin(ang);
  const sunAz = ang * 0.6;
  const sunDir = new THREE.Vector3(Math.cos(sunAz) * 0.8, sunElev, Math.sin(sunAz) * 0.8).normalize();
  const dayFactor = THREE.MathUtils.clamp((sunElev + 0.15) / 0.4, 0, 1);
  const pal = mixPal(sunElev);

  scene.fog = scene.fog || new THREE.Fog(0xc6d8e6, 60, 900);
  scene.fog.color.copy(pal.fog);
  renderer.setClearColor(pal.horizon);

  skyUniforms.uZenith.value.copy(pal.sky);
  skyUniforms.uHorizon.value.copy(pal.horizon);
  skyUniforms.uSunColor.value.copy(pal.sun);
  skyUniforms.uSunDir.value.copy(sunDir);
  skyUniforms.uDayFactor.value = dayFactor;
  skyUniforms.uTime.value = clockTime;
  sky.position.copy(ship.position);

  const sunOn = sunElev > -0.12;
  const effSunDir = sunOn ? sunDir : new THREE.Vector3(-sunDir.x, Math.abs(sunDir.y) * 0.4 + 0.3, -sunDir.z).normalize();
  sunLight.position.copy(ship.position).addScaledVector(effSunDir, 120);
  sunLight.target.position.copy(ship.position);
  sunLight.color.copy(sunOn ? pal.sun : new THREE.Color(0x9db8e8));
  sunLight.intensity = sunOn ? lerp(0.6, 2.6, dayFactor) : 0.5;

  hemi.color.copy(pal.hemi);
  hemi.groundColor.copy(pal.deep);
  hemi.intensity = lerp(0.25, 0.8, dayFactor);

  fill.color.set(sunOn ? 0x8fb0d8 : 0x3a4a6e);
  fill.intensity = lerp(0.15, 0.4, dayFactor);

  moon.visible = sunElev < 0.1;
  moon.position.copy(ship.position).addScaledVector(new THREE.Vector3(-effSunDir.x, Math.abs(effSunDir.y) * 0.5 + 0.35, -effSunDir.z).normalize(), 1000);

  oceanUniforms.uTime.value = t;
  oceanUniforms.uSunDir.value.copy(sunDir);
  oceanUniforms.uLightDir.value.copy(effSunDir);
  oceanUniforms.uLightColor.value.copy(sunOn ? pal.sun : new THREE.Color(0x9db8e8));
  oceanUniforms.uDeep.value.copy(pal.deep);
  oceanUniforms.uShallow.value.copy(pal.shallow);
  oceanUniforms.uHorizon.value.copy(pal.horizon);
  ocean.position.x = ship.position.x;
  ocean.position.z = ship.position.z;

  lantern.intensity = (1 - dayFactor) * 1.6;
  lanternGlow.material.opacity = 1 - dayFactor * 0.5;

  flag.rotation.y = Math.sin(t * 3.2) * 0.35;
  flag.scale.x = 1 + Math.sin(t * 5.5) * 0.12;

  wakeTimer -= dt;
  if (Math.abs(state.speed) > 1.2 && wakeTimer <= 0) {
    wakeTimer = 0.12;
    const rear = 2.4;
    const wx = px - fx * rear, wz = pz - fz * rear;
    const item = wakePool[wakeCursor];
    item.sp.position.set(wx + (Math.random() - 0.5) * 0.8, 0.35, wz + (Math.random() - 0.5) * 0.8);
    item.life = item.max = 1.6 + Math.random() * 0.6;
    item.sp.visible = true;
    item.sp.material.rotation = Math.random() * Math.PI * 2;
    wakeCursor = (wakeCursor + 1) % wakePool.length;
  }
  for (const item of wakePool) {
    if (!item.sp.visible) continue;
    item.life -= dt;
    if (item.life <= 0) { item.sp.visible = false; continue; }
    const k = 1 - item.life / item.max;
    item.sp.scale.setScalar(1.2 + k * 5.5);
    item.sp.material.opacity = (1 - k) * 0.45;
    item.sp.position.y = 0.32;
  }

  const [label, sub] = phaseName(sunElev);
  phaseLabel.textContent = label;
  phaseSub.textContent = sub;
  const sunPct = THREE.MathUtils.clamp((sunElev + 0.6) / 1.6, 0, 1);
  clockSky.style.setProperty('--sun-y', `${sunPct * 100}%`);
  clockSky.style.background = sunElev > 0.4
    ? 'linear-gradient(to bottom,#3f74c9,#a8c8e8)'
    : sunElev > -0.05
      ? 'linear-gradient(to bottom,#7a5a8f,#ff9a5c)'
      : 'linear-gradient(to bottom,#0a1024,#1a2440)';

  renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

renderer.setSize(window.innerWidth, window.innerHeight);
animate();
