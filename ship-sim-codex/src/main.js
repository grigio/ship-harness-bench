import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Ocean } from './ocean.js';
import { SkyDome } from './sky.js';
import { Ship } from './ship.js';

const HOURS_PER_SEC = 24 / 180; // a full day every ~3 minutes
const container = document.body;

// ---- Renderer -----------------------------------------------------------
const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.15;
container.appendChild(renderer.domElement);

// ---- Scene / camera / controls -------------------------------------------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0a1428);

const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 9000);
camera.position.set(26, 9, 32);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 1.5, 0);
controls.enableDamping = true;
controls.dampingFactor = 0.06;
controls.minDistance = 9;
controls.maxDistance = 260;
controls.maxPolarAngle = Math.PI * 0.495;

// ---- World ---------------------------------------------------------------
const sky = new SkyDome(scene);
const ocean = new Ocean();
scene.add(ocean.group);
const ship = new Ship();
scene.add(ship.group);
scene.add(ship.smokeGroup);

// Gentle gulls circling the ship.
const gullMat = new THREE.MeshStandardMaterial({ color: 0xf6f8fa, roughness: 0.8 });
const gulls = [];
for (let i = 0; i < 5; i++) {
  const g = new THREE.Group();
  g.add(new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.12, 0.22), gullMat));
  const wingGeo = new THREE.BoxGeometry(0.2, 0.02, 0.62);
  const l = new THREE.Mesh(wingGeo, gullMat);
  l.position.set(0, 0, 0.34);
  const r = new THREE.Mesh(wingGeo, gullMat);
  r.position.set(0, 0, -0.34);
  g.add(l, r);
  scene.add(g);
  gulls.push({
    g, l, r,
    phase: Math.random() * 10,
    radius: 26 + Math.random() * 22,
    ang: Math.random() * Math.PI * 2,
    speed: 0.12 + Math.random() * 0.16,
    height: 13 + Math.random() * 6,
  });
}

// ---- Interaction: click the sea -> wave -----------------------------------
const raycaster = new THREE.Raycaster();
const ndc = new THREE.Vector2();
let downX = 0;
let downY = 0;
let downT = 0;

renderer.domElement.addEventListener('pointerdown', (e) => {
  downX = e.clientX;
  downY = e.clientY;
  downT = performance.now();
});
renderer.domElement.addEventListener('pointerup', (e) => {
  const moved = Math.hypot(e.clientX - downX, e.clientY - downY);
  const dt = performance.now() - downT;
  if (moved > 6 || dt > 900) return;
  ndc.set((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1);
  raycaster.setFromCamera(ndc, camera);
  const hits = raycaster.intersectObject(ocean.mesh, false);
  if (hits.length > 0) {
    ocean.addRipple(hits[0].point, ocean.rippleStrength);
  }
});
renderer.domElement.addEventListener('contextmenu', (e) => e.preventDefault());

// ---- Day / night clock ----------------------------------------------------
let hour = 8.5;
let autoDay = true;

clockLabel();
function clockLabel() {
  const h = Math.floor(hour);
  const m = Math.floor((hour - h) * 60);
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

// ---- UI --------------------------------------------------------------------
const el = {
  play: document.getElementById('play'),
  slider: document.getElementById('hour'),
  value: document.getElementById('hourValue'),
  wave: document.getElementById('wave'),
  panel: document.getElementById('panel'),
  toggle: document.getElementById('panelToggle'),
  hint: document.getElementById('hint'),
  waveValue: document.getElementById('waveValue'),
  sat: document.getElementById('sat'),
};

function syncUI() {
  el.slider.value = hour.toFixed(2);
  el.value.textContent = clockLabel();
  el.play.textContent = autoDay ? '❚❚' : '▶';
}
syncUI();

el.play.addEventListener('click', () => {
  autoDay = !autoDay;
  syncUI();
});
el.slider.addEventListener('input', () => {
  autoDay = false;
  hour = parseFloat(el.slider.value);
  syncUI();
});
el.wave.addEventListener('input', () => {
  ocean.rippleStrength = parseFloat(el.wave.value);
  el.waveValue.textContent = parseFloat(el.wave.value).toFixed(1) + '×';
});
for (const btn of el.sat.querySelectorAll('[data-hour]')) {
  btn.addEventListener('click', () => {
    hour = parseFloat(btn.dataset.hour);
    syncUI();
  });
}
el.toggle.addEventListener('click', () => {
  el.panel.classList.toggle('hidden');
});

setTimeout(() => el.hint.classList.add('fade'), 9000);

// ---- Resize -----------------------------------------------------------------
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// ---- Main loop ----------------------------------------------------------------
const clock = new THREE.Clock();

function tick() {
  const dt = Math.min(clock.getDelta(), 0.05);

  if (autoDay) {
    hour = (hour + dt * HOURS_PER_SEC) % 24;
    syncUI();
  }

  const lightState = sky.update(hour, dt);
  ocean.setLighting(lightState);

  ship.update(dt);
  const st = ship.getState();
  ocean.uniforms.uShipPos.value.copy(st.pos);
  ocean.uniforms.uShipDir.value.copy(st.dir);
  ocean.follow(camera);
  ocean.update(dt);

  // gulls
  for (const gg of gulls) {
    gg.ang += dt * gg.speed;
    const a = gg.ang;
    gg.phase += dt;
    gg.g.position.set(
      st.pos.x + Math.cos(a) * gg.radius,
      gg.height + Math.sin(gg.phase * 0.7) * 2,
      st.pos.z + Math.sin(a) * gg.radius
    );
    gg.g.rotation.set(0, -a, Math.sin(a) * 0.15);
    const flap = -0.35 - Math.sin(gg.phase * 6.0) * 0.35;
    gg.l.rotation.x = flap + 0.2;
    gg.r.rotation.x = flap + 0.2;
  }

  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
}

requestAnimationFrame(tick);

// Expose a little handle for tinkering.
window.__ship = { scene, camera, ocean, ship, sky, hour: () => hour };
