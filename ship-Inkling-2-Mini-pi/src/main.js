import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const app = document.getElementById('app');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(55, innerWidth / innerHeight, 0.1, 2000);
camera.position.set(0, 8, 30);
camera.lookAt(0, 3.2, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.1;
app.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 3.2, 0);
controls.enableDamping = true;
controls.dampingFactor = 0.06;
controls.minDistance = 10;
controls.maxDistance = 90;
controls.maxPolarAngle = Math.PI * 0.49;
controls.minPolarAngle = Math.PI * 0.12;
controls.enablePan = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.5;
let idleTimer;
controls.addEventListener('start', () => { controls.autoRotate = false; clearTimeout(idleTimer); });
controls.addEventListener('end', () => { clearTimeout(idleTimer); idleTimer = setTimeout(() => controls.autoRotate = true, 6000); });

// ---------- lights ----------
const sunLight = new THREE.DirectionalLight(0xffe0b0, 2.2);
sunLight.position.set(40, 18, -60);
sunLight.castShadow = true;
sunLight.shadow.mapSize.set(2048, 2048);
sunLight.shadow.camera.left = -40; sunLight.shadow.camera.right = 40;
sunLight.shadow.camera.top = 40; sunLight.shadow.camera.bottom = -40;
sunLight.shadow.camera.far = 200;
scene.add(sunLight, sunLight.target);
const hemi = new THREE.HemisphereLight(0xbdd8ff, 0x16324a, 0.9);
scene.add(hemi);

// ---------- sky dome (gradient shader) ----------
const skyUniforms = {
  topDay: { value: new THREE.Color(0x3f7fd4) },
  horizonDay: { value: new THREE.Color(0xffd9a0) },
  topNight: { value: new THREE.Color(0x050a1c) },
  horizonNight: { value: new THREE.Color(0x1b2a4a) },
  mixAmt: { value: 0 } // 0 = day, 1 = night
};
const sky = new THREE.Mesh(
  new THREE.SphereGeometry(800, 32, 20),
  new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false,
    uniforms: skyUniforms,
    vertexShader: `varying vec3 vPos; void main(){ vPos = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
    fragmentShader: `
      uniform vec3 topDay, horizonDay, topNight, horizonNight; uniform float mixAmt;
      varying vec3 vPos;
      void main(){
        float h = normalize(vPos).y;
        float t = smoothstep(-0.05, 0.45, h);
        vec3 day = mix(horizonDay, topDay, t);
        vec3 night = mix(horizonNight, topNight, t);
        gl_FragColor = vec4(mix(day, night, mixAmt), 1.0);
      }`
  })
);
scene.add(sky);

// ---------- sun & moon ----------
const sun = new THREE.Mesh(new THREE.SphereGeometry(26, 32, 32),
  new THREE.MeshBasicMaterial({ color: 0xffe6b0, fog: false }));
const sunGlow = new THREE.Mesh(new THREE.SphereGeometry(38, 32, 32),
  new THREE.MeshBasicMaterial({ color: 0xffd98a, transparent: true, opacity: 0.25, fog: false }));
scene.add(sun, sunGlow);
const moon = new THREE.Mesh(new THREE.SphereGeometry(14, 32, 32),
  new THREE.MeshBasicMaterial({ color: 0xe8ecf5, fog: false }));
scene.add(moon);

// ---------- stars ----------
const starGeo = new THREE.BufferGeometry();
const starCount = 700, pos = new Float32Array(starCount * 3);
for (let i = 0; i < starCount; i++) {
  const a = Math.random() * Math.PI * 2, e = Math.random() * Math.PI * 0.45 + 0.08;
  const r = 700;
  pos[i*3] = Math.cos(a) * Math.cos(e) * r;
  pos[i*3+1] = Math.sin(e) * r;
  pos[i*3+2] = Math.sin(a) * Math.cos(e) * r;
}
starGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 2.2, sizeAttenuation: false, transparent: true, opacity: 0, fog: false });
const stars = new THREE.Points(starGeo, starMat);
scene.add(stars);

// ---------- ocean ----------
const SEA_SIZE = 600, SEG = 170;
const seaGeo = new THREE.PlaneGeometry(SEA_SIZE, SEA_SIZE, SEG, SEG);
seaGeo.rotateX(-Math.PI / 2);
const seaMat = new THREE.MeshStandardMaterial({
  color: 0x1d5f86, roughness: 0.32, metalness: 0.55,
  transparent: true, opacity: 0.96
});
const sea = new THREE.Mesh(seaGeo, seaMat);
sea.receiveShadow = true;
scene.add(sea);
const basePos = seaGeo.attributes.position.array.slice();
const ripples = []; // {x, z, t0}
const MAX_RIPPLES = 24;

function waveHeight(x, z, t) {
  let y = 0;
  y += Math.sin(x * 0.10 + t * 1.1) * 0.45;
  y += Math.sin(z * 0.13 + t * 0.8) * 0.35;
  y += Math.sin((x + z) * 0.055 + t * 0.55) * 0.55;
  y += Math.sin(x * 0.21 - t * 1.4 + z * 0.07) * 0.18;
  for (const r of ripples) {
    const age = t - r.t0;
    if (age < 0 || age > 5) continue;
    const d = Math.hypot(x - r.x, z - r.z);
    const wavefront = age * 14;
    const spread = 3.2;
    const band = Math.exp(-Math.pow((d - wavefront) / spread, 2));
    y += Math.sin((d - wavefront) * 1.4) * band * Math.max(0, 1 - age / 5) * 1.6;
  }
  return y;
}

// ripple visual ring (expanding torus on the surface)
const rings = [];
function spawnRing(x, z) {
  const geo = new THREE.RingGeometry(0.9, 1.15, 48);
  const mat = new THREE.MeshBasicMaterial({ color: 0xdff3ff, transparent: true, opacity: 0.85, side: THREE.DoubleSide, depthWrite: false });
  const ring = new THREE.Mesh(geo, mat);
  ring.rotation.x = -Math.PI / 2;
  ring.position.set(x, 0.4, z);
  scene.add(ring);
  rings.push({ mesh: ring, t0: clockTime });
}

// ---------- ship ----------
const ship = new THREE.Group();
const hullMat = new THREE.MeshStandardMaterial({ color: 0x5a3b28, roughness: 0.6, metalness: 0.1 });
const hullShape = new THREE.Shape();
hullShape.moveTo(-4.4, 0);
hullShape.quadraticCurveTo(-4.6, -1.7, -3.2, -2.1);
hullShape.lineTo(3.0, -2.1);
hullShape.quadraticCurveTo(4.6, -1.7, 4.8, 0);
hullShape.lineTo(3.9, 0.9); hullShape.lineTo(-3.7, 0.9);
hullShape.closePath();
const hullGeo = new THREE.ExtrudeGeometry(hullShape, { depth: 1.7, bevelEnabled: true, bevelThickness: 0.35, bevelSize: 0.35, bevelSegments: 3, curveSegments: 12 });
hullGeo.center();
const hull = new THREE.Mesh(hullGeo, hullMat);
hull.rotation.y = Math.PI / 2;
hull.castShadow = true;
ship.add(hull);

const deckMat = new THREE.MeshStandardMaterial({ color: 0xc9a86a, roughness: 0.8 });
const deck = new THREE.Mesh(new THREE.BoxGeometry(6.4, 0.25, 1.9), deckMat);
deck.position.y = 1.05; deck.castShadow = true;
ship.add(deck);

const cabin = new THREE.Mesh(new THREE.BoxGeometry(1.9, 1.15, 1.4),
  new THREE.MeshStandardMaterial({ color: 0xf2e8d5, roughness: 0.7 }));
cabin.position.set(-1.6, 1.7, 0); cabin.castShadow = true;
ship.add(cabin);

const mastMat = new THREE.MeshStandardMaterial({ color: 0x4a3220, roughness: 0.7 });
const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.12, 7.4, 10), mastMat);
mast.position.set(0.9, 4.6, 0); mast.castShadow = true;
ship.add(mast);
const yard = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 4.6, 8), mastMat);
yard.rotation.x = Math.PI / 2; yard.position.set(0.9, 6.6, 0);
ship.add(yard);
const boom = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 3.6, 8), mastMat);
boom.position.set(-1.2, 1.7, 0); boom.rotation.z = 1.25;
ship.add(boom);

// sails
const sailMat = new THREE.MeshStandardMaterial({ color: 0xf7efe0, roughness: 0.9, side: THREE.DoubleSide });
const sailGeo = new THREE.PlaneGeometry(2.6, 4.2, 10, 10);
{
  const p = sailGeo.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), y = p.getY(i);
    p.setZ(i, Math.sin((y + 2.1) / 4.2 * Math.PI) * 0.5);
  }
  sailGeo.computeVertexNormals();
}
const sail = new THREE.Mesh(sailGeo, sailMat);
sail.position.set(0.9, 4.0, 0);
sail.rotation.y = Math.PI / 2 + 0.12;
sail.castShadow = true;
ship.add(sail);
const jibGeo = new THREE.PlaneGeometry(2.2, 2.6, 8, 8);
{
  const p = jibGeo.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), y = p.getY(i);
    p.setZ(i, Math.sin((y + 1.3) / 2.6 * Math.PI) * 0.35);
    p.setX(i, x * (1 - (y + 1.3) / 4.5)); // triangular taper
  }
  jibGeo.computeVertexNormals();
}
const jib = new THREE.Mesh(jibGeo, sailMat);
jib.position.set(2.9, 2.6, 0);
jib.rotation.y = Math.PI / 2 - 0.35;
ship.add(jib);

// lantern on the mast — glows at night
const lantern = new THREE.Mesh(new THREE.SphereGeometry(0.22, 12, 12),
  new THREE.MeshBasicMaterial({ color: 0xffe2a8 }));
lantern.position.set(0.9, 8.45, 0);
ship.add(lantern);
const lanternLight = new THREE.PointLight(0xffc47a, 0, 12);
lanternLight.position.set(0.9, 8.45, 0);
ship.add(lanternLight);

// little flag
const flag = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 0.65),
  new THREE.MeshBasicMaterial({ color: 0xe4572e, side: THREE.DoubleSide }));
flag.position.set(1.5, 8.35, 0);
ship.add(flag);

ship.position.set(0, 0.4, 0);
scene.add(ship);

// distant island silhouettes
const islandMat = new THREE.MeshStandardMaterial({ color: 0x1c3a4a, roughness: 1 });
for (const [ix, iz, s, h] of [[-170, -320, 60, 22], [190, -380, 90, 30], [40, -460, 120, 40]]) {
  const isl = new THREE.Mesh(new THREE.ConeGeometry(s, h, 7), islandMat);
  isl.position.set(ix, h * 0.18, iz);
  scene.add(isl);
}

// ---------- interaction: click the sea ----------
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const hint = document.getElementById('hint');
let clicks = 0;
let downX = 0, downY = 0;
renderer.domElement.addEventListener('pointerdown', (e) => { downX = e.clientX; downY = e.clientY; });
renderer.domElement.addEventListener('pointerup', (e) => {
  if (Math.hypot(e.clientX - downX, e.clientY - downY) > 6) return; // it was a drag
  pointer.x = (e.clientX / innerWidth) * 2 - 1;
  pointer.y = -(e.clientY / innerHeight) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObject(sea);
  if (hits.length) {
    const p = hits[0].point;
    ripples.push({ x: p.x, z: p.z, t0: clockTime });
    if (ripples.length > MAX_RIPPLES) ripples.shift();
    spawnRing(p.x, p.z);
    clicks++;
    if (clicks >= 3) hint.style.opacity = '0';
  }
});

// ---------- day / night cycle ----------
const DAY_LENGTH = 90; // seconds for a full cycle
let clockTime = 0;
const phaseDot = document.getElementById('phaseDot');
const phaseLabel = document.getElementById('phaseLabel');
const daySkyTop = new THREE.Color(0x3f7fd4), daySkyHor = new THREE.Color(0xffd9a0);
const nightSkyTop = new THREE.Color(0x050a1c), nightSkyHor = new THREE.Color(0x22304f);
const dayLight = new THREE.Color(0xffe0b0), nightLight = new THREE.Color(0x8fa8d8);
const cTmp = new THREE.Color();

function cycleFactor(t) {
  // 0..1, 0=full day, 1=full night; smooth sine
  return 0.5 - 0.5 * Math.cos((t / DAY_LENGTH) * Math.PI * 2);
}

// ---------- animation loop ----------
const clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);
  const dt = Math.min(clock.getDelta(), 0.05);
  clockTime += dt;
  const t = clockTime;

  const night = cycleFactor(t);

  // sky
  skyUniforms.mixAmt.value = night;
  // sun path: arc from horizon to horizon, day half = above horizon
  const sunAng = (t / DAY_LENGTH) * Math.PI * 2;
  const sunElev = Math.sin(sunAng); // >0 day, <0 night
  sun.position.set(Math.cos(sunAng) * 700, Math.max(sunElev * 320, -60), -650);
  sunGlow.position.copy(sun.position);
  const sunVis = THREE.MathUtils.clamp(sunElev * 3 + 0.4, 0, 1);
  sun.material.opacity = sunVis; sun.material.transparent = true;
  sunGlow.material.opacity = 0.25 * sunVis;
  const moonAng = sunAng + Math.PI;
  moon.position.set(Math.cos(moonAng) * 700, Math.max(Math.sin(moonAng) * 320, -60), -650);
  moon.material.opacity = THREE.MathUtils.clamp(Math.sin(moonAng) * 3 + 0.3, 0, 1);
  moon.material.transparent = true;

  // light
  sunLight.position.set(sun.position.x * 0.1, Math.max(sun.position.y * 0.1, 6), sun.position.z * 0.1);
  sunLight.color.copy(cTmp.copy(dayLight).lerp(nightLight, night));
  sunLight.intensity = THREE.MathUtils.lerp(2.2, 0.5, night);
  hemi.intensity = THREE.MathUtils.lerp(0.9, 0.28, night);
  hemi.color.copy(cTmp.set(0xbdd8ff).lerp(new THREE.Color(0x2a3a5e), night));
  renderer.toneMappingExposure = THREE.MathUtils.lerp(1.15, 0.85, night);
  seaMat.color.copy(cTmp.set(0x1d5f86).lerp(new THREE.Color(0x0d2a44), night));
  starMat.opacity = night * 0.95;
  lanternLight.intensity = night * 6;
  lantern.material.color.set(night > 0.4 ? 0xffe2a8 : 0xcfc4ae);

  // HUD
  const isNight = night > 0.5;
  phaseLabel.textContent = isNight ? 'Night' : 'Day';
  phaseDot.style.background = isNight ? '#c9d6ff' : '#ffd98a';
  phaseDot.style.boxShadow = isNight ? '0 0 14px 3px rgba(201,214,255,.8)' : '0 0 14px 3px rgba(255,217,138,.8)';

  // ocean geometry
  const p = seaGeo.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const x = basePos[i * 3], z = basePos[i * 3 + 2];
    p.setY(i, waveHeight(x, z, t));
  }
  p.needsUpdate = true;
  seaGeo.computeVertexNormals();

  // ship bobbing
  const bob = waveHeight(ship.position.x, ship.position.z, t) * 0.35;
  ship.position.y = 0.4 + bob;
  ship.rotation.z = Math.sin(t * 0.7) * 0.045;
  ship.rotation.x = Math.sin(t * 0.55 + 1.3) * 0.035;
  ship.rotation.y = Math.sin(t * 0.18) * 0.06;
  flag.rotation.y = Math.sin(t * 2.2) * 0.35;

  // ripple rings
  for (let i = rings.length - 1; i >= 0; i--) {
    const r = rings[i];
    const age = t - r.t0;
    if (age > 5) { scene.remove(r.mesh); r.mesh.geometry.dispose(); r.mesh.material.dispose(); rings.splice(i, 1); continue; }
    const s = 1 + age * 11;
    r.mesh.scale.set(s, s, s);
    r.mesh.material.opacity = 0.85 * Math.max(0, 1 - age / 5);
    r.mesh.position.y = waveHeight(r.mesh.position.x, r.mesh.position.z, t) + 0.45;
  }

  // prune old ripples
  for (let i = ripples.length - 1; i >= 0; i--) if (t - ripples[i].t0 > 5) ripples.splice(i, 1);

  controls.update();

  renderer.render(scene, camera);
}
animate();

addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});
