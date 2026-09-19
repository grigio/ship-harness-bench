import * as THREE from 'three';

// ---------------------------------------------------------------------------
// Setup
// ---------------------------------------------------------------------------
const canvas = document.getElementById('scene');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.1;
renderer.outputColorSpace = THREE.SRGBColorSpace;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 2000);

const clock = new THREE.Clock();
let time = 0;

// Day/night cycle — one full day in 60 seconds
const DAY_LENGTH = 60;

// ---------------------------------------------------------------------------
// Palette
// ---------------------------------------------------------------------------
const C = {
  dayTop: new THREE.Color('#3a76c4'),
  dayHorizon: new THREE.Color('#cfe6ee'),
  nightTop: new THREE.Color('#040a16'),
  nightHorizon: new THREE.Color('#12233c'),
  duskHorizon: new THREE.Color('#ff9e5e'),
  dawnHorizon: new THREE.Color('#ffb98a'),
  dayDeep: new THREE.Color('#0d4a63'),
  dayShallow: new THREE.Color('#6cc4c9'),
  nightDeep: new THREE.Color('#050f1c'),
  nightShallow: new THREE.Color('#17385a'),
  sunDay: new THREE.Color('#fff3d8'),
  sunLow: new THREE.Color('#ff9a4d'),
  moon: new THREE.Color('#8fb3d9'),
  cloudDay: new THREE.Color('#ffffff'),
  cloudNight: new THREE.Color('#2a3a52'),
  cloudDusk: new THREE.Color('#ffc9a0'),
};

// ---------------------------------------------------------------------------
// Lights
// ---------------------------------------------------------------------------
const hemi = new THREE.HemisphereLight(0xbfd8ff, 0x2a3a2a, 0.6);
scene.add(hemi);

const sunLight = new THREE.DirectionalLight(0xfff0d0, 1.2);
sunLight.position.set(50, 30, 10);
scene.add(sunLight);

const moonLight = new THREE.DirectionalLight(0x7fa8d0, 0.0);
scene.add(moonLight);

// ---------------------------------------------------------------------------
// Sky dome
// ---------------------------------------------------------------------------
const skyUniforms = {
  uTop: { value: new THREE.Color('#3a76c4') },
  uHorizon: { value: new THREE.Color('#cfe6ee') },
  uSunDir: { value: new THREE.Vector3(1, 0.3, 0.2) },
  uSunColor: { value: new THREE.Color('#fff3d8') },
  uDaylight: { value: 1.0 },
};

const sky = new THREE.Mesh(
  new THREE.SphereGeometry(600, 32, 24),
  new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    fog: false,
    uniforms: skyUniforms,
    vertexShader: /* glsl */`
      varying vec3 vDir;
      void main() {
        vDir = normalize(position);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */`
      varying vec3 vDir;
      uniform vec3 uTop;
      uniform vec3 uHorizon;
      uniform vec3 uSunDir;
      uniform vec3 uSunColor;
      uniform float uDaylight;
      void main() {
        vec3 d = normalize(vDir);
        float up = clamp(d.y, 0.0, 1.0);
        vec3 col = mix(uHorizon, uTop, pow(up, 0.55));
        // below-horizon fade
        col = mix(uHorizon * 0.85, col, smoothstep(-0.12, 0.06, d.y));
        // sun disc + glow
        vec3 sd = normalize(uSunDir);
        float sunDot = max(dot(d, sd), 0.0);
        float disc = smoothstep(0.99935, 0.99985, sunDot);
        float glow = pow(sunDot, 32.0) * 0.45 + pow(sunDot, 6.0) * 0.16;
        float sunVisible = smoothstep(-0.18, 0.05, sd.y);
        col += uSunColor * (disc * 1.6 + glow * (0.35 + 0.65 * uDaylight)) * sunVisible;
        gl_FragColor = vec4(col, 1.0);
      }
    `,
  })
);
scene.add(sky);

// ---------------------------------------------------------------------------
// Stars
// ---------------------------------------------------------------------------
const STAR_COUNT = 900;
const starPos = new Float32Array(STAR_COUNT * 3);
const starPhase = new Float32Array(STAR_COUNT);
const starSize = new Float32Array(STAR_COUNT);
for (let i = 0; i < STAR_COUNT; i++) {
  // random point on upper hemisphere of a dome r=580
  const theta = Math.random() * Math.PI * 2;
  const phi = Math.acos(Math.random() * 0.92); // mostly above horizon
  const r = 580;
  starPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
  starPos[i * 3 + 1] = Math.max(r * Math.cos(phi), 20);
  starPos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
  starPhase[i] = Math.random() * Math.PI * 2;
  starSize[i] = Math.random();
}
const starGeo = new THREE.BufferGeometry();
starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
starGeo.setAttribute('aPhase', new THREE.BufferAttribute(starPhase, 1));
starGeo.setAttribute('aSize', new THREE.BufferAttribute(starSize, 1));

const starUniforms = { uOpacity: { value: 0.0 }, uTime: { value: 0 } };
const stars = new THREE.Points(starGeo, new THREE.ShaderMaterial({
  transparent: true,
  depthWrite: false,
  fog: false,
  uniforms: starUniforms,
  vertexShader: /* glsl */`
    attribute float aPhase;
    attribute float aSize;
    uniform float uTime;
    varying float vTw;
    void main() {
      vTw = 0.65 + 0.35 * sin(uTime * 1.4 + aPhase);
      vec4 mv = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = (1.2 + 2.2 * aSize);
      gl_Position = projectionMatrix * mv;
    }
  `,
  fragmentShader: /* glsl */`
    uniform float uOpacity;
    varying float vTw;
    void main() {
      float d = length(gl_PointCoord - 0.5);
      float a = smoothstep(0.5, 0.05, d) * vTw * uOpacity;
      if (a < 0.01) discard;
      gl_FragColor = vec4(0.88, 0.93, 1.0, a);
    }
  `,
}));
scene.add(stars);

// ---------------------------------------------------------------------------
// Water
// ---------------------------------------------------------------------------
const MAX_RIPPLES = 8;
const rippleData = Array.from({ length: MAX_RIPPLES }, () => new THREE.Vector4(0, 0, 0, -100));

const waterUniforms = {
  uTime: { value: 0 },
  uRipples: { value: rippleData },
  uDeep: { value: new THREE.Color('#0d4a63') },
  uShallow: { value: new THREE.Color('#6cc4c9') },
  uSunDir: { value: new THREE.Vector3(1, 0.3, 0.2) },
  uSunColor: { value: new THREE.Color('#fff3d8') },
  uMoonDir: { value: new THREE.Vector3(-1, -0.3, -0.2) },
  uDaylight: { value: 1.0 },
  uFogColor: { value: new THREE.Color('#cfe6ee') },
};

const waterGeo = new THREE.PlaneGeometry(900, 900, 240, 240);
waterGeo.rotateX(-Math.PI / 2);

const water = new THREE.Mesh(waterGeo, new THREE.ShaderMaterial({
  uniforms: waterUniforms,
  vertexShader: /* glsl */`
    #define MAX_R ${MAX_RIPPLES}
    uniform float uTime;
    uniform vec4 uRipples[MAX_R];
    varying vec3 vWorldPos;
    varying vec3 vNormal;
    varying float vHeight;

    float baseHeight(vec2 p) {
      float h = 0.0;
      h += sin(p.x * 0.10 + uTime * 0.55) * 0.28;
      h += sin(p.y * 0.08 - uTime * 0.40) * 0.24;
      h += sin((p.x * 0.6 + p.y * 0.4) * 0.09 + uTime * 0.32) * 0.34;
      h += sin(length(p) * 0.045 - uTime * 0.5) * 0.22;
      return h;
    }

    float rippleHeight(vec2 p, vec4 r) {
      float age = uTime - r.w;
      if (age < 0.0 || age > 12.0) return 0.0;
      float d = distance(p, r.xy);
      float radius = age * 13.0;
      float width = 2.5 + age * 1.3;
      float ring = exp(-pow((d - radius) / width, 2.0));
      float fade = exp(-age * 0.5) * smoothstep(0.0, 1.2, age) * (1.0 - smoothstep(8.5, 12.0, age));
      float osc = sin(d * 1.1 - age * 7.0);
      return osc * ring * fade * 1.5;
    }

    float totalHeight(vec2 p) {
      float h = baseHeight(p);
      for (int i = 0; i < MAX_R; i++) {
        vec4 r = uRipples[i];
        if (r.w > -90.0) h += rippleHeight(p, r);
      }
      return h;
    }

    void main() {
      vec3 pos = position;
      float h = totalHeight(pos.xz);
      pos.y += h;
      float e = 0.55;
      float hx = totalHeight(pos.xz + vec2(e, 0.0));
      float hz = totalHeight(pos.xz + vec2(0.0, e));
      vec3 n = normalize(vec3(-(hx - h) / e, 1.0, -(hz - h) / e));
      vHeight = h;
      vec4 wp = modelMatrix * vec4(pos, 1.0);
      vWorldPos = wp.xyz;
      vNormal = normalize(mat3(modelMatrix) * n);
      gl_Position = projectionMatrix * viewMatrix * wp;
    }
  `,
  fragmentShader: /* glsl */`
    uniform vec3 uDeep;
    uniform vec3 uShallow;
    uniform vec3 uSunDir;
    uniform vec3 uSunColor;
    uniform vec3 uMoonDir;
    uniform float uDaylight;
    uniform vec3 uFogColor;
    varying vec3 vWorldPos;
    varying vec3 vNormal;
    varying float vHeight;
    void main() {
      vec3 viewDir = normalize(cameraPosition - vWorldPos);
      vec3 n = normalize(vNormal);
      float hN = clamp(vHeight * 0.45 + 0.5, 0.0, 1.0);
      vec3 col = mix(uDeep, uShallow, hN);
      // fresnel sky reflection
      float fres = pow(1.0 - max(dot(viewDir, n), 0.0), 3.0);
      vec3 skyRefl = mix(vec3(0.04, 0.08, 0.15), vec3(0.55, 0.75, 0.88), uDaylight);
      col = mix(col, skyRefl, fres * 0.55);
      // sun specular (path of light)
      vec3 hs = normalize(viewDir + normalize(uSunDir));
      float spec = pow(max(dot(n, hs), 0.0), 140.0);
      float specWide = pow(max(dot(n, hs), 0.0), 28.0);
      col += uSunColor * (spec * 1.4 + specWide * 0.18) * (0.12 + uDaylight * 0.9);
      // moon glint at night
      vec3 hm = normalize(viewDir + normalize(uMoonDir));
      float mspec = pow(max(dot(n, hm), 0.0), 100.0);
      col += vec3(0.55, 0.7, 0.9) * mspec * 0.5 * (1.0 - uDaylight);
      // foam on crests
      float foam = smoothstep(0.62, 0.92, hN);
      col = mix(col, vec3(0.88, 0.96, 0.98), foam * (0.12 + 0.4 * uDaylight));
      // fog
      float dist = length(cameraPosition - vWorldPos);
      float fogF = 1.0 - exp(-dist * dist * 2.2e-6);
      col = mix(col, uFogColor, clamp(fogF, 0.0, 1.0));
      gl_FragColor = vec4(col, 1.0);
    }
  `,
}));
scene.add(water);

// scene fog (for the ship & clouds)
scene.fog = new THREE.Fog(0xcfe6ee, 40, 320);

// ---------------------------------------------------------------------------
// Ripples
// ---------------------------------------------------------------------------
let rippleIndex = 0;
const foamRings = [];
const foamGeo = new THREE.RingGeometry(0.72, 1.0, 48);
foamGeo.rotateX(-Math.PI / 2);
for (let i = 0; i < 4; i++) {
  const m = new THREE.Mesh(foamGeo, new THREE.MeshBasicMaterial({
    color: 0xf2fbfc, transparent: true, opacity: 0, side: THREE.DoubleSide, depthWrite: false,
  }));
  m.visible = false;
  scene.add(m);
  foamRings.push({ mesh: m, t0: -10, dur: 1.7 });
}
let foamIndex = 0;

function addRipple(x, z) {
  rippleData[rippleIndex % MAX_RIPPLES].set(x, z, 0, time);
  rippleIndex++;
  const ring = foamRings[foamIndex % foamRings.length];
  ring.t0 = time;
  ring.mesh.visible = true;
  ring.mesh.position.set(x, 0.15, z);
  foamIndex++;
}

// JS mirror of the shader baseHeight (so the ship rides the same waves)
function baseHeightJS(x, z, t) {
  return (
    Math.sin(x * 0.10 + t * 0.55) * 0.28 +
    Math.sin(z * 0.08 - t * 0.40) * 0.24 +
    Math.sin((x * 0.6 + z * 0.4) * 0.09 + t * 0.32) * 0.34 +
    Math.sin(Math.hypot(x, z) * 0.045 - t * 0.5) * 0.22
  );
}

// ---------------------------------------------------------------------------
// Ship
// ---------------------------------------------------------------------------
const ship = new THREE.Group();
scene.add(ship);

const hullMat = new THREE.MeshStandardMaterial({ color: '#a34e2c', roughness: 0.55, metalness: 0.05 });
const hullDarkMat = new THREE.MeshStandardMaterial({ color: '#7c3a20', roughness: 0.6, metalness: 0.05 });
const creamMat = new THREE.MeshStandardMaterial({ color: '#f0e7d4', roughness: 0.7 });
const woodMat = new THREE.MeshStandardMaterial({ color: '#b98d5e', roughness: 0.8 });
const darkMat = new THREE.MeshStandardMaterial({ color: '#39424c', roughness: 0.5, metalness: 0.2 });
const sailMat = new THREE.MeshStandardMaterial({ color: '#f6f2e6', roughness: 0.9, side: THREE.DoubleSide });
const windowMat = new THREE.MeshStandardMaterial({ color: '#2a3038', roughness: 0.3, emissive: '#ffcf7d', emissiveIntensity: 0 });

// hull — side profile extruded
const hullShape = new THREE.Shape();
hullShape.moveTo(3.0, 1.05);        // bow top
hullShape.quadraticCurveTo(2.6, 0.35, 1.6, 0.12);
hullShape.quadraticCurveTo(0.2, -0.12, -1.4, 0.05);
hullShape.lineTo(-2.35, 0.25);      // stern bottom
hullShape.lineTo(-2.55, 1.0);       // stern top
hullShape.quadraticCurveTo(-1.0, 1.12, 3.0, 1.05);
const hullGeo = new THREE.ExtrudeGeometry(hullShape, {
  depth: 1.5, bevelEnabled: true, bevelThickness: 0.18, bevelSize: 0.16, bevelSegments: 4, curveSegments: 16,
});
hullGeo.translate(0, 0, -0.75 - 0.18);
hullGeo.scale(1, 1, 1);
const hull = new THREE.Mesh(hullGeo, hullMat);
ship.add(hull);

// gunwale stripe (top rim accent)
const stripeGeo = new THREE.BoxGeometry(5.4, 0.09, 1.78);
const stripe = new THREE.Mesh(stripeGeo, hullDarkMat);
stripe.position.set(0.1, 1.12, 0);
ship.add(stripe);

// deck
const deck = new THREE.Mesh(new THREE.BoxGeometry(4.9, 0.1, 1.42), woodMat);
deck.position.set(0.15, 1.13, 0);
ship.add(deck);

// cabin
const cabin = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.85, 1.2), creamMat);
cabin.position.set(-0.9, 1.62, 0);
ship.add(cabin);
const cabinRoof = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.12, 1.3), hullDarkMat);
cabinRoof.position.set(-0.9, 2.1, 0);
ship.add(cabinRoof);

// cabin windows (glow at night)
for (let i = -1; i <= 1; i++) {
  const w = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.26, 0.02), windowMat);
  w.position.set(-0.9 + i * 0.45, 1.66, 0.61);
  ship.add(w);
  const w2 = w.clone();
  w2.position.z = -0.61;
  ship.add(w2);
}

// funnel
const funnel = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.2, 0.75, 12), darkMat);
funnel.position.set(-0.55, 2.55, 0);
ship.add(funnel);
const funnelBand = new THREE.Mesh(new THREE.CylinderGeometry(0.165, 0.165, 0.16, 12), new THREE.MeshStandardMaterial({ color: '#c2452e', roughness: 0.5 }));
funnelBand.position.set(-0.55, 2.78, 0);
ship.add(funnelBand);

// mast + boom
const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.08, 3.4, 8), woodMat);
mast.position.set(1.35, 3.0, 0);
ship.add(mast);
const boom = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.3, 6), woodMat);
boom.rotation.z = Math.PI / 2;
boom.position.set(1.35, 1.9, 0);
ship.add(boom);

// main sail — gently curved
function makeSail(w, h, segs = 10) {
  const g = new THREE.PlaneGeometry(w, h, segs, segs);
  const p = g.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const u = p.getX(i) / w + 0.5;
    p.setZ(i, Math.sin(u * Math.PI) * 0.28);
  }
  g.computeVertexNormals();
  return g;
}
const mainSail = new THREE.Mesh(makeSail(1.9, 2.0), sailMat);
mainSail.position.set(1.35, 2.95, 0);
ship.add(mainSail);
// jib
const jib = new THREE.Mesh(makeSail(1.3, 1.5), sailMat);
jib.position.set(2.25, 2.5, 0);
jib.rotation.y = -0.12;
ship.add(jib);

// flag (animated vertices)
const flagGeo = new THREE.PlaneGeometry(0.5, 0.3, 8, 4);
const flag = new THREE.Mesh(flagGeo, new THREE.MeshStandardMaterial({ color: '#274a68', roughness: 0.9, side: THREE.DoubleSide }));
flag.position.set(1.35, 4.85, 0);
ship.add(flag);
const flagBase = flagGeo.attributes.position.array.slice();

// smoke puffs
const puffCanvas = document.createElement('canvas');
puffCanvas.width = puffCanvas.height = 64;
{
  const ctx = puffCanvas.getContext('2d');
  const grd = ctx.createRadialGradient(32, 32, 2, 32, 32, 30);
  grd.addColorStop(0, 'rgba(255,255,255,0.85)');
  grd.addColorStop(0.5, 'rgba(255,255,255,0.35)');
  grd.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, 64, 64);
}
const puffTex = new THREE.CanvasTexture(puffCanvas);
const PUFFS = 10;
const puffs = [];
for (let i = 0; i < PUFFS; i++) {
  const s = new THREE.Sprite(new THREE.SpriteMaterial({
    map: puffTex, transparent: true, opacity: 0, depthWrite: false, color: '#d8dce2',
  }));
  s.scale.setScalar(0.4);
  ship.add(s);
  puffs.push(s);
}

// ---------------------------------------------------------------------------
// Clouds
// ---------------------------------------------------------------------------
function cloudTexture() {
  const cv = document.createElement('canvas');
  cv.width = 256; cv.height = 128;
  const ctx = cv.getContext('2d');
  const blob = (x, y, r) => {
    const g = ctx.createRadialGradient(x, y, r * 0.1, x, y, r);
    g.addColorStop(0, 'rgba(255,255,255,0.9)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);
  };
  blob(90, 70, 42); blob(140, 60, 50); blob(180, 72, 38); blob(60, 78, 30); blob(120, 80, 46);
  return new THREE.CanvasTexture(cv);
}
const cloudTex = cloudTexture();
const clouds = [];
for (let i = 0; i < 7; i++) {
  const m = new THREE.SpriteMaterial({ map: cloudTex, transparent: true, opacity: 0.28 + Math.random() * 0.22, depthWrite: false });
  const c = new THREE.Sprite(m);
  c.position.set(-320 + Math.random() * 640, 55 + Math.random() * 45, -140 - Math.random() * 180);
  const sx = 70 + Math.random() * 90;
  c.scale.set(sx, sx * 0.42, 1);
  c.userData.speed = 1.2 + Math.random() * 1.4;
  scene.add(c);
  clouds.push(c);
}

// ---------------------------------------------------------------------------
// Interaction — click the sea
// ---------------------------------------------------------------------------
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
let downPos = null;

canvas.addEventListener('pointerdown', (e) => { downPos = { x: e.clientX, y: e.clientY }; });
canvas.addEventListener('pointerup', (e) => {
  if (!downPos) return;
  const dx = e.clientX - downPos.x, dy = e.clientY - downPos.y;
  downPos = null;
  if (Math.hypot(dx, dy) > 6) return; // it was a drag
  pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObject(water);
  if (hits.length) {
    const p = hits[0].point;
    addRipple(p.x, p.z);
    const hint = document.getElementById('hint');
    if (hint) hint.classList.add('hidden');
  }
});

// mouse parallax
const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
window.addEventListener('pointermove', (e) => {
  mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
  mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
});

// ---------------------------------------------------------------------------
// Resize
// ---------------------------------------------------------------------------
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// ---------------------------------------------------------------------------
// Day/night + frame loop
// ---------------------------------------------------------------------------
const skyTop = new THREE.Color();
const skyHorizon = new THREE.Color();
const sunColorMix = new THREE.Color();
const waterDeep = new THREE.Color();
const waterShallow = new THREE.Color();
const cloudCol = new THREE.Color();
const sunDir = new THREE.Vector3();
const moonDir = new THREE.Vector3();
const phaseEl = document.getElementById('phase');
let lastPhase = '';
let fps = 60, fpsAccum = 0, fpsFrames = 0;

function setPhase(t) {
  let label;
  const e = sunDir.y;
  if (e > 0.45) label = 'day';
  else if (e > 0.08) label = sunDir.x > 0 ? 'dawn' : 'dusk';
  else if (e > -0.45) label = 'night';
  else label = 'deep night';
  if (label !== lastPhase) { lastPhase = label; if (phaseEl) phaseEl.textContent = label; }
}

function animate() {
  requestAnimationFrame(animate);
  const dt = Math.min(clock.getDelta(), 0.05);
  time += dt;

  fpsAccum += dt; fpsFrames++;
  if (fpsAccum > 0.5) { fps = Math.round(fpsFrames / fpsAccum); fpsAccum = 0; fpsFrames = 0; }

  // --- sun position (arc across the sky) ---
  const theta = (time / DAY_LENGTH) * Math.PI * 2;
  sunDir.set(Math.cos(theta), Math.sin(theta), 0.38).normalize();
  moonDir.copy(sunDir).multiplyScalar(-1);
  const daylight = THREE.MathUtils.smoothstep(sunDir.y, -0.14, 0.3);
  const duskGlow = Math.exp(-Math.pow(sunDir.y / 0.22, 2));

  // --- sky ---
  skyTop.copy(C.nightTop).lerp(C.dayTop, daylight);
  skyHorizon.copy(C.nightHorizon).lerp(C.dayHorizon, daylight);
  // warm horizon at dawn/dusk: dawn (sun rising, +x) pinker, dusk (−x) more orange
  const warm = sunDir.x > 0 ? C.dawnHorizon : C.duskHorizon;
  skyHorizon.lerp(warm, duskGlow * 0.75 * (1.0 - daylight * 0.4));
  skyUniforms.uTop.value.copy(skyTop);
  skyUniforms.uHorizon.value.copy(skyHorizon);
  skyUniforms.uSunDir.value.copy(sunDir);
  sunColorMix.copy(C.sunLow).lerp(C.sunDay, THREE.MathUtils.clamp(sunDir.y * 1.6 + 0.15, 0, 1));
  skyUniforms.uSunColor.value.copy(sunColorMix);
  skyUniforms.uDaylight.value = daylight;

  // stars
  starUniforms.uTime.value = time;
  starUniforms.uOpacity.value = THREE.MathUtils.smoothstep(-sunDir.y, 0.02, 0.42);

  // --- lights ---
  sunLight.position.copy(sunDir).multiplyScalar(80);
  sunLight.color.copy(sunColorMix);
  sunLight.intensity = 0.15 + 1.35 * daylight;
  moonLight.position.copy(moonDir).multiplyScalar(80);
  moonLight.color.copy(C.moon);
  moonLight.intensity = 0.22 * (1 - daylight);
  hemi.intensity = 0.22 + 0.55 * daylight;
  hemi.color.copy(skyTop).lerp(new THREE.Color(0xffffff), 0.3);
  hemi.groundColor.set('#1d2b22');

  // --- water uniforms ---
  waterUniforms.uTime.value = time;
  waterDeep.copy(C.nightDeep).lerp(C.dayDeep, daylight);
  waterShallow.copy(C.nightShallow).lerp(C.dayShallow, daylight);
  waterUniforms.uDeep.value.copy(waterDeep);
  waterUniforms.uShallow.value.copy(waterShallow);
  waterUniforms.uSunDir.value.copy(sunDir);
  waterUniforms.uSunColor.value.copy(sunColorMix);
  waterUniforms.uMoonDir.value.copy(moonDir);
  waterUniforms.uDaylight.value = daylight;
  waterUniforms.uFogColor.value.copy(skyHorizon);
  scene.fog.color.copy(skyHorizon);

  // --- ship motion ---
  const shipAngle = time * 0.11;
  const pathR = 4.5;
  const sx = Math.cos(shipAngle) * pathR;
  const sz = Math.sin(shipAngle) * pathR;
  ship.position.x += (sx - ship.position.x) * Math.min(1, dt * 2.0);
  ship.position.z += (sz - ship.position.z) * Math.min(1, dt * 2.0);

  const h0 = baseHeightJS(ship.position.x, ship.position.z, time);
  ship.position.y = h0 - 0.55 + Math.sin(time * 0.9) * 0.03;
  const hx = (baseHeightJS(ship.position.x + 1.2, ship.position.z, time) - baseHeightJS(ship.position.x - 1.2, ship.position.z, time)) / 2.4;
  const hz = (baseHeightJS(ship.position.x, ship.position.z + 1.2, time) - baseHeightJS(ship.position.x, ship.position.z - 1.2, time)) / 2.4;
  const heading = shipAngle + Math.PI / 2 + Math.sin(time * 0.07) * 0.08;
  ship.rotation.y += (heading - ship.rotation.y) * Math.min(1, dt * 1.5);
  ship.rotation.x += ((-hx * 0.55) - ship.rotation.x) * Math.min(1, dt * 2.2);
  ship.rotation.z += ((hz * 0.45 + Math.sin(time * 0.6) * 0.015) - ship.rotation.z) * Math.min(1, dt * 2.2);

  // flag wave
  {
    const p = flagGeo.attributes.position;
    for (let i = 0; i < p.count; i++) {
      const bx = flagBase[i * 3];
      p.setZ(i, Math.sin(bx * 6 + time * 5) * 0.05 * (bx + 0.25) * 4);
    }
    p.needsUpdate = true;
    flagGeo.computeVertexNormals();
  }

  // smoke puffs
  for (let i = 0; i < PUFFS; i++) {
    const s = puffs[i];
    const age = (time * 0.22 + i / PUFFS) % 1;
    s.position.set(
      -0.55 + Math.sin(time * 0.7 + i * 1.7) * 0.22 + age * 0.5,
      2.95 + age * 2.6,
      Math.cos(time * 0.6 + i * 2.3) * 0.2
    );
    s.scale.setScalar(0.35 + age * 1.5);
    s.material.opacity = Math.sin(age * Math.PI) * 0.4 * (0.4 + 0.6 * daylight);
  }

  // window glow at night
  windowMat.emissiveIntensity = (1 - daylight) * 1.6;

  // clouds drift + tint
  for (const c of clouds) {
    c.position.x += c.userData.speed * dt;
    if (c.position.x > 340) c.position.x = -340;
    c.material.color.copy(C.cloudNight).lerp(C.cloudDay, daylight);
    c.material.color.lerp(C.cloudDusk, duskGlow * 0.5 * (1 - daylight * 0.5));
  }

  // foam rings
  for (const ring of foamRings) {
    const age = time - ring.t0;
    if (age < 0 || age > ring.dur) { ring.mesh.visible = age === 0 ? false : ring.mesh.visible; continue; }
    ring.mesh.visible = true;
    const k = age / ring.dur;
    ring.mesh.scale.setScalar(0.4 + k * 9);
    ring.mesh.material.opacity = Math.sin(k * Math.PI) * 0.55 * (0.5 + 0.5 * daylight);
    ring.mesh.position.y = baseHeightJS(ring.mesh.position.x, ring.mesh.position.z, time) + 0.1;
  }

  // --- camera: slow orbit + gentle parallax ---
  mouse.x += (mouse.tx - mouse.x) * Math.min(1, dt * 2.5);
  mouse.y += (mouse.ty - mouse.y) * Math.min(1, dt * 2.5);
  const camAngle = time * 0.028 + 0.4;
  const camR = 11.5;
  const camX = Math.cos(camAngle) * camR + mouse.x * 1.4;
  const camZ = Math.sin(camAngle) * camR - mouse.y * 0.6;
  const camY = 4.6 - mouse.y * 1.1 + Math.sin(time * 0.13) * 0.25;
  camera.position.set(camX, camY, camZ);
  camera.lookAt(ship.position.x * 0.7, 1.6, ship.position.z * 0.7);

  // debug state
  window.__ship = {
    t: +time.toFixed(2),
    sunElevation: +sunDir.y.toFixed(3),
    daylight: +daylight.toFixed(3),
    ripplesActive: rippleData.filter(r => r.w > -90 && time - r.w < 12).length,
    fps,
  };

  setPhase();
  renderer.render(scene, camera);
}
animate();
