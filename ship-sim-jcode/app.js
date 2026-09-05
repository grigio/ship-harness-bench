// Voyager - a relaxing 3D ship simulator
// - The sun travels across the sky, alternating day and night.
// - It sits right in the horizon at sunrise and sunset (golden hour).
// - Click the sea and the water rises into a gentle wave.
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------
const CFG = {
  dayLength: 150,     // seconds for a full day/night cycle
  startHour: 6,       // simulation starts at sunrise
  waveHeight: 0.22,
  oceanSize: 1800,
  oceanSegs: 240,
  rippleRadius: 56,
  rippleSegs: 96,
  rippleLifetime: 8,
  maxRipples: 8,
};

// ---------------------------------------------------------------------------
// Renderer / scene / camera
// ---------------------------------------------------------------------------
const canvas = document.getElementById('c');
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  powerPreference: 'high-performance',
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.1;

// If a shader ever fails to compile, surface it in the console instead of a
// silent black screen.
window.__shaderErrors = 0;
if (renderer.debug) {
  renderer.debug.onShaderError = (gl, program, vs, fs) => {
    window.__shaderErrors++;
    console.warn('Voyager: a shader failed to compile', gl.getProgramInfoLog(program) || '');
  };
}

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x04121f, 0.00055);

const camera = new THREE.PerspectiveCamera(55, innerWidth / innerHeight, 0.1, 5000);
camera.position.set(14, 6.5, -17);
camera.lookAt(0, 2.5, 0);

// Lights
scene.add(new THREE.HemisphereLight(0x8899cc, 0x0a1620, 0.6));
const sunLight = new THREE.DirectionalLight(0xfff2d8, 1.2);
scene.add(sunLight);
const moonLight = new THREE.DirectionalLight(0x6677aa, 0.5);
scene.add(moonLight);

// ---------------------------------------------------------------------------
// Small GLSL helpers shared by the custom shaders.
// NOTE: we never declare a function named `saturate` - three's prefix already
// defines it as a macro in some chunks and it is a built-in under GLSL3, so a
// manual definition collides. We use clamp() directly instead.
// ---------------------------------------------------------------------------

// Present custom-shader colors the same way the renderer presents the built-in
// materials: a soft filmic rolloff followed by sRGB gamma.
const TONEMAP_GAMMA = `
  vec3 present(vec3 c){
    c = vec3(1.0) - exp(-c * 1.25);
    c = clamp(c, 0.0, 1.0);
    return pow(c, vec3(1.0 / 2.2));
  }
`;

// ---------------------------------------------------------------------------
// Sky dome (horizon sits at y = 0)
// ---------------------------------------------------------------------------
const skyMat = new THREE.ShaderMaterial({
  depthWrite: false,
  side: THREE.BackSide,
  uniforms: {
    uTime: { value: 0 },
    uSunDir: { value: new THREE.Vector3(0, 1, 0) },
    uMoonDir: { value: new THREE.Vector3(0, -1, 0) },
    uNight: { value: 0 },
    uTwilight: { value: 0 },
    uDay: { value: 0 },
  },
  vertexShader: `
    varying vec3 vWorld;
    void main() {
      vec4 wp = modelMatrix * vec4(position, 1.0);
      vWorld = wp.xyz;
      gl_Position = projectionMatrix * viewMatrix * wp;
    }
  `,
  fragmentShader: `

    ${TONEMAP_GAMMA}
    uniform float uTime;
    uniform vec3 uSunDir;
    uniform vec3 uMoonDir;
    uniform float uNight;
    uniform float uTwilight;
    uniform float uDay;
    varying vec3 vWorld;

    float hash(vec3 p){
      p = fract(p * 0.3183099 + 0.1);
      p *= 17.0;
      return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
    }

    void main(){
      vec3 dir = normalize(vWorld);
      float up = clamp(dir.y, 0.0, 1.0);

      float sunD = dot(dir, uSunDir);
      float sunDisk = smoothstep(0.99935, 0.9997, sunD);
      float sunGlow = pow(clamp(sunD, 0.0, 1.0), 120.0) * 0.55 * (uDay + uTwilight);

      float mD = dot(dir, uMoonDir);
      float mDisk = smoothstep(0.9994, 0.99965, mD);

      // graceful sky gradient: blends by elevation and time-of-day
      vec3 zenith = mix(vec3(0.010, 0.022, 0.045), vec3(0.13, 0.34, 0.62), uDay);
      zenith = mix(zenith, vec3(0.013, 0.026, 0.065), uNight);

      vec3 horizon = vec3(0.60, 0.42, 0.20);                       // dawn/dusk base
      horizon = mix(horizon, vec3(1.00, 0.68, 0.38), uTwilight * 0.55);
      horizon = mix(horizon, vec3(0.32, 0.50, 0.84), uDay);
      horizon = mix(horizon, vec3(0.035, 0.055, 0.105), uNight);

      vec3 sky = mix(zenith, horizon, pow(up, 0.72));

      // stars (fade in at night)
      vec3 sp = dir * 500.0;
      float n = hash(floor(sp));
      float tw = 0.55 + 0.45 * sin(uTime * (1.0 + n * 4.0) + n * 90.0);
      float star = step(0.996, n) * tw * step(0.02, up) * smoothstep(0.05, 0.5, up);
      sky += vec3(1.0, 0.98, 0.94) * star * uNight;

      // sun disc + glow
      sky += vec3(1.0, 0.93, 0.66) * sunDisk * (uDay + uTwilight);
      sky += vec3(1.0, 0.50, 0.24) * sunGlow;

      // wide warm band near the light during twilight
      float band = pow(clamp(sunD, 0.0, 1.0), 22.0) * uTwilight * 0.55;
      sky += vec3(1.0, 0.42, 0.18) * band * (0.35 + 0.65 * up);

      // rising warm blanket over the water at dawn/dusk
      float rise = pow(1.0 - up, 5.0) * uTwilight * 0.45;
      sky += vec3(1.0, 0.55, 0.30) * rise;

      // moon disc
      sky += vec3(0.88, 0.91, 1.0) * mDisk * (0.15 + 0.85 * uNight);

      // never show white below the horizon (the ocean lives there)
      sky *= smoothstep(-0.05, 0.02, up);

      gl_FragColor = vec4(present(sky), 1.0);
    }
  `,
});
scene.add(new THREE.Mesh(new THREE.SphereGeometry(1500, 48, 24), skyMat));

// ---------------------------------------------------------------------------
// Celestial body meshes (fog-less discs that follow the lights)
// ---------------------------------------------------------------------------
function makeCelestial(radius, color) {
  const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(radius, 24, 16),
    new THREE.MeshBasicMaterial({ color, toneMapped: false, fog: false })
  );
  mesh.renderOrder = -1;
  scene.add(mesh);
  return mesh;
}
const sunMesh = makeCelestial(16, 0xffd9a0);
const moonMesh = makeCelestial(10, 0xdfe7ff);

// ---------------------------------------------------------------------------
// Shared rolling-wave height function (keeps ocean + ripples seamless)
// ---------------------------------------------------------------------------
const HEIGHT_FN = `
  float hgt(vec2 p, float t){
    float w1 = sin(p.x * 0.50 + t * 1.10) + sin(p.y * 0.60 + t * 0.90);
    float w2 = sin(p.x * 1.30 + t * 2.40) * 0.35 + sin(p.y * 1.35 + t * 2.10) * 0.35;
    float w3 = sin(dot(p, vec2(0.70, 0.90)) + t * 0.70) * 0.20;
    return w1 * 0.28 + w2 + w3;
  }
`;

const XZ_OCEAN_UVARS = `
  uniform float uTime;
  uniform float uWave;
  uniform vec3 uSunDir;
  uniform vec3 uCamPos;
  uniform float uNight;
  uniform float uTwilight;
`;

const OCEAN_PRESENT = `
  vec3 present(vec3 c){
    c = vec3(1.0) - exp(-c * 1.3);
    c = clamp(c, 0.0, 1.0);
    return pow(c, vec3(1.0 / 2.2));
  }
`;

// ---------------------------------------------------------------------------
// Ocean (big, low-frequency rolling swells)
// ---------------------------------------------------------------------------
const oceanUniforms = {
  uTime: { value: 0 },
  uWave: { value: CFG.waveHeight },
  uSunDir: { value: new THREE.Vector3(0, 1, 0) },
  uCamPos: { value: new THREE.Vector3() },
  uNight: { value: 0 },
  uTwilight: { value: 0 },
};

const oceanMat = new THREE.ShaderMaterial({
  uniforms: oceanUniforms,
  vertexShader: `

    ${XZ_OCEAN_UVARS}
    ${HEIGHT_FN}
    varying vec3 vWorld;
    varying vec3 vNormal;
    varying float vFoam;

    void main(){
      vec2 pp = position.xz;
      float t = uTime;
      float h = hgt(pp, t) * uWave * 0.72;
      vec3 p = vec3(position.x, h, position.z);

      // finite-difference normal from the height field
      float e = 1.4;
      float gx = hgt(pp + vec2(e, 0.0), t) - hgt(pp - vec2(e, 0.0), t);
      float gz = hgt(pp + vec2(0.0, e), t) - hgt(pp - vec2(0.0, e), t);
      vec3 nrm = normalize(vec3(-gx, 1.0, -gz));

      vWorld = (modelMatrix * vec4(p, 1.0)).xyz;
      vNormal = nrm;
      vFoam = clamp(h * 2.2 + 0.25, 0.0, 1.0);

      gl_Position = projectionMatrix * viewMatrix * vec4(p, 1.0);
    }
  `,
  fragmentShader: `

    ${OCEAN_PRESENT}
    uniform vec3 uSunDir;
    uniform vec3 uCamPos;
    uniform float uNight;
    uniform float uTwilight;
    varying vec3 vWorld;
    varying vec3 vNormal;
    varying float vFoam;

    void main(){
      vec3 N = normalize(vNormal);
      vec3 V = normalize(uCamPos - vWorld);
      vec3 H = normalize(uSunDir + V);
      float ndh = max(dot(N, H), 0.0);
      float ndv = max(dot(N, V), 0.0);

      vec3 deep = vec3(0.010, 0.045, 0.080) * (0.55 + 0.45 * uNight);
      vec3 shallow = mix(vec3(0.030, 0.19, 0.28), vec3(0.07, 0.30, 0.44), 1.0 - uNight);

      vec3 col = mix(deep, shallow, pow(ndv, 2.0)) + vec3(0.004, 0.010, 0.025);

      // sun glitter
      float sun = pow(ndh, 520.0);
      col += vec3(1.0, 0.80, 0.50) * sun * 3.0 * (0.15 + 0.85 * uTwilight + (1.0 - uNight) * 0.6);

      // warm ambience at golden hour
      col += vec3(1.0, 0.5, 0.25) * pow(ndv, 1.5) * uTwilight * 0.12;

      // faint foam on crests
      col += vec3(0.6, 0.68, 0.74) * vFoam * 0.04 * (1.0 - uNight);

      // distance fade toward the horizon (hides the plane's far edge)
      float d = length(uCamPos - vWorld);
      vec3 horizon = mix(vec3(0.02, 0.03, 0.06), vec3(0.045, 0.06, 0.11), 1.0 - uNight);
      horizon += vec3(1.0, 0.5, 0.2) * uTwilight * 0.10;
      col = mix(col, horizon, smoothstep(200.0, 900.0, d));

      gl_FragColor = vec4(present(col), 1.0);
    }
  `,
  side: THREE.DoubleSide,
});

const oceanGeo = new THREE.PlaneGeometry(CFG.oceanSize, CFG.oceanSize, CFG.oceanSegs, CFG.oceanSegs);
oceanGeo.rotateX(-Math.PI / 2);
const ocean = new THREE.Mesh(oceanGeo, oceanMat);
ocean.position.y = -0.45;
scene.add(ocean);

// ---------------------------------------------------------------------------
// Click ripples: small high-res patches with a rising and expanding ring
// ---------------------------------------------------------------------------
const rippleGeo = new THREE.PlaneGeometry(CFG.rippleRadius, CFG.rippleRadius, CFG.rippleSegs, CFG.rippleSegs);
rippleGeo.rotateX(-Math.PI / 2);

const ripples = [];

function makeRippleMesh(worldPos, strength) {
  const mat = new THREE.ShaderMaterial({
    uniforms: {
      uAge: { value: 0 },
      uTime: { value: 0 },
      uWave: { value: CFG.waveHeight },
      uSunDir: { value: new THREE.Vector3(0, 1, 0) },
      uCamPos: { value: new THREE.Vector3() },
      uNight: { value: 0 },
      uTwilight: { value: 0 },
      uStrength: { value: strength },
    },
    vertexShader: `

      ${XZ_OCEAN_UVARS}
      ${HEIGHT_FN}
      uniform float uAge;
      uniform float uStrength;
      varying vec3 vWorld;
      varying vec3 vNormal;
      varying float vCrest;
      varying float vDist;

      float rippleAt(vec2 q, float age, float t){
        float dist = length(q);
        float rad = max(age * 4.2, 1.0);
        float g = dist - rad;
        float amp = uStrength * 2.4 * exp(-age * 0.75)
                    * smoothstep(0.0, 0.35, age)
                    * (1.0 - smoothstep(30.0, 48.0, dist));
        return sin(g * 3.2) * exp(-(g * g) * 0.45) * amp;
      }

      void main(){
        vec2 pp = position.xz;
        float t = uTime;
        float ring = rippleAt(pp, uAge, t);
        float h = hgt(pp, t) * uWave * 0.72 + ring;
        vec3 p = vec3(position.x, h, position.z);

        float e = 1.0;
        float gx = (hgt(pp + vec2(e, 0.0), t) + rippleAt(pp + vec2(e, 0.0), uAge, t))
                 - (hgt(pp - vec2(e, 0.0), t) + rippleAt(pp - vec2(e, 0.0), uAge, t));
        float gz = (hgt(pp + vec2(0.0, e), t) + rippleAt(pp + vec2(0.0, e), uAge, t))
                 - (hgt(pp - vec2(0.0, e), t) + rippleAt(pp - vec2(0.0, e), uAge, t));
        vec3 nrm = normalize(vec3(-gx, 1.0, -gz));

        vWorld = (modelMatrix * vec4(p, 1.0)).xyz;
        vNormal = nrm;
        vCrest = clamp(ring * 1.6, 0.0, 1.0);
        vDist = length(pp);
        gl_Position = projectionMatrix * viewMatrix * vec4(p, 1.0);
      }
    `,
    fragmentShader: `

      ${OCEAN_PRESENT}
      uniform vec3 uSunDir;
      uniform vec3 uCamPos;
      uniform float uNight;
      uniform float uTwilight;
      varying vec3 vWorld;
      varying vec3 vNormal;
      varying float vCrest;
      varying float vDist;

      void main(){
        vec3 N = normalize(vNormal);
        vec3 V = normalize(uCamPos - vWorld);
        vec3 H = normalize(uSunDir + V);
        float ndh = max(dot(N, H), 0.0);
        float ndv = max(dot(N, V), 0.0);

        vec3 deep = vec3(0.010, 0.045, 0.080) * (0.55 + 0.45 * uNight);
        vec3 shallow = mix(vec3(0.030, 0.19, 0.28), vec3(0.07, 0.30, 0.44), 1.0 - uNight);
        vec3 col = mix(deep, shallow, pow(ndv, 2.0)) + vec3(0.004, 0.010, 0.025);

        float sun = pow(ndh, 520.0);
        col += vec3(1.0, 0.80, 0.50) * sun * 3.0 * (0.15 + 0.85 * uTwilight + (1.0 - uNight) * 0.6);
        col += vec3(1.0, 0.5, 0.25) * pow(ndv, 1.5) * uTwilight * 0.12;

        // bright foam ringing the wave crest
        col = mix(col, vec3(0.92, 0.96, 1.0), vCrest * 0.85);
        // softer sheen behind the ring
        col += vec3(0.7, 0.85, 1.0) * smoothstep(1.2, 3.5, vDist) * uTwilight * 0.04;

        float d = length(uCamPos - vWorld);
        vec3 horizon = mix(vec3(0.02, 0.03, 0.06), vec3(0.045, 0.06, 0.11), 1.0 - uNight);
        horizon += vec3(1.0, 0.5, 0.2) * uTwilight * 0.10;
        col = mix(col, horizon, smoothstep(200.0, 900.0, d));

        gl_FragColor = vec4(present(col), 1.0);
      }
    `,
  });

  const mesh = new THREE.Mesh(rippleGeo, mat);
  mesh.position.set(worldPos.x, -0.45, worldPos.z);
  mesh.renderOrder = 1;
  mesh.userData.born = simTime;
  scene.add(mesh);
  ripples.push(mesh);
}

// ---------------------------------------------------------------------------
// Boat
// ---------------------------------------------------------------------------
function buildBoat() {
  const boat = new THREE.Group();

  // Hull: a sweeping ship silhouette (top view) extruded up.
  const outline = new THREE.Shape();
  outline.moveTo(-3.2, 0);                                   // stern
  outline.lineTo(-2.6, 0.95);
  outline.quadraticCurveTo(0.2, 1.38, 2.5, 1.12);            // port side
  outline.quadraticCurveTo(3.2, 0.55, 3.3, 0);               // bow
  outline.quadraticCurveTo(3.2, -0.55, 2.5, -1.12);          // starboard side
  outline.quadraticCurveTo(0.2, -1.38, -2.6, -0.95);
  outline.closePath();
  const hullGeo = new THREE.ExtrudeGeometry(outline, {
    depth: 0.85,
    bevelEnabled: true,
    bevelThickness: 0.1,
    bevelSize: 0.08,
    bevelSegments: 2,
    steps: 2,
  });
  hullGeo.rotateX(-Math.PI / 2);      // lay flat, extrusion becomes the height
  hullGeo.translate(0, -0.12, 0);     // small submerge so the deck lines sit at water
  const hull = new THREE.Mesh(hullGeo, new THREE.MeshStandardMaterial({
    color: 0x8a3c14,
    roughness: 0.6,
    metalness: 0.05,
    flatShading: true,
  }));
  boat.add(hull);

  // Deck
  const deck = new THREE.Mesh(
    new THREE.CylinderGeometry(1.02, 0.96, 0.22, 28),
    new THREE.MeshStandardMaterial({ color: 0xf0e0bf, roughness: 0.85 })
  );
  deck.position.y = 0.45;
  boat.add(deck);

  // Cabin + roof
  const cabin = new THREE.Mesh(
    new THREE.BoxGeometry(0.72, 0.55, 1.05),
    new THREE.MeshStandardMaterial({ color: 0xf5efe2, roughness: 0.5 })
  );
  cabin.position.set(-1.0, 0.9, 0);
  boat.add(cabin);
  const roof = new THREE.Mesh(
    new THREE.BoxGeometry(0.82, 0.1, 1.15),
    new THREE.MeshStandardMaterial({ color: 0x6e4a26, roughness: 0.8 })
  );
  roof.position.set(-1.0, 1.2, 0);
  boat.add(roof);

  // Mast (a little forward of the cabin)
  const mast = new THREE.Mesh(
    new THREE.CylinderGeometry(0.07, 0.09, 3.3, 8),
    new THREE.MeshStandardMaterial({ color: 0x7a5230, roughness: 0.75 })
  );
  mast.position.set(0.55, 2.15, 0.05);
  boat.add(mast);

  // Sails (fore-and-aft, in the boat's length/height plane)
  const sailMat = new THREE.MeshStandardMaterial({
    color: 0xf2e6cc,
    roughness: 0.9,
    side: THREE.DoubleSide,
    emissive: 0x2a2418,
    emissiveIntensity: 0.15,
  });

  const mainShape = new THREE.Shape();
  mainShape.moveTo(0, 0);
  mainShape.quadraticCurveTo(-0.7, 1.5, -1.15, 3.05);   // leech up and aft
  mainShape.lineTo(0.1, 3.15);                          // head at the mast
  mainShape.quadraticCurveTo(0, 1.5, 0, 0);             // luff on the mast
  const mainSail = new THREE.Mesh(new THREE.ShapeGeometry(mainShape), sailMat);
  mainSail.position.set(0.55, 0.5, -0.02);
  mainSail.rotation.y = 0.08;
  boat.add(mainSail);

  const jibShape = new THREE.Shape();
  jibShape.moveTo(0, 0);
  jibShape.quadraticCurveTo(1.3, 1.5, 1.75, 2.95);      // foot + leech forward
  jibShape.lineTo(0, 3.05);                             // head at the mast
  jibShape.quadraticCurveTo(-0.05, 1.4, 0, 0);          // luff on the mast
  const jib = new THREE.Mesh(new THREE.ShapeGeometry(jibShape), sailMat);
  jib.position.set(0.55, 0.62, 0.12);
  jib.rotation.y = -0.12;
  boat.add(jib);

  // Red pennant
  const flagMat = new THREE.MeshStandardMaterial({
    color: 0xd94f4a, side: THREE.DoubleSide, roughness: 0.8,
  });
  const flag = new THREE.Mesh(new THREE.PlaneGeometry(0.62, 0.34), flagMat);
  flag.position.set(0.55, 3.72, 0.02);
  boat.add(flag);

  return { boat, flag };
}

const { boat, flag } = buildBoat();
boat.scale.setScalar(1.4);
// The sun arcs within the XZ=0 plane (east overhead west). Sail planes face
// +/-Z by default, which is edge-on to the sun all day; turn the boat so the
// sails catch the light and sit at a pretty 3/4 angle to the camera.
boat.rotation.y = Math.PI / 2 + 0.35;
scene.add(boat);

// ---------------------------------------------------------------------------
// Clouds
// ---------------------------------------------------------------------------
const clouds = [];
for (let i = 0; i < 8; i++) {
  const g = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({
    color: 0xffffff, roughness: 1, transparent: true, opacity: 0.92,
  });
  const puffs = 5 + (i % 4);
  for (let p = 0; p < puffs; p++) {
    const s = 4 + Math.abs(Math.sin(i * 13.7 + p * 1.7)) * 5.5;
    const m = new THREE.Mesh(new THREE.SphereGeometry(s, 12, 10), mat);
    m.position.set(
      (p - puffs / 2) * s * 1.15,
      Math.sin(i + p) * 0.2,
      Math.sin(i * 3 + p * 2) * 1.5
    );
    m.scale.y = 0.5;
    g.add(m);
  }
  g.position.set(Math.random() * 700 - 350, 26 + Math.random() * 12, Math.random() * 500 - 250);
  scene.add(g);
  clouds.push({ mesh: g, speed: 0.25 + (i % 5) * 0.07, baseAlt: g.position.y, seed: i });
}

// ---------------------------------------------------------------------------
// Seagulls
// ---------------------------------------------------------------------------
function buildGull() {
  const g = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({ color: 0xf7f7f7, roughness: 0.9 });
  const lw = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.06, 0.5), mat);
  lw.position.set(-1.7, 0, 0); lw.rotation.z = 0.18; g.add(lw);
  const rw = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.06, 0.5), mat);
  rw.position.set(1.7, 0, 0); rw.rotation.z = -0.18; g.add(rw);
  g.add(new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.24, 0.5), mat));
  return g;
}
const gulls = [];
for (let i = 0; i < 5; i++) {
  const mesh = buildGull();
  mesh.position.set(Math.random() * 40 - 20, 11 + Math.random() * 6, Math.random() * 40 - 20);
  scene.add(mesh);
  gulls.push({
    mesh,
    angle: Math.random() * Math.PI * 2,
    radius: 16 + Math.random() * 16,
    alt: 9 + Math.random() * 6,
    speed: 0.35 + Math.random() * 0.35,
    phase: Math.random() * 10,
  });
}

// ---------------------------------------------------------------------------
// Orbit controls
// ---------------------------------------------------------------------------
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.06;
controls.target.set(0, 2.5, 0);
controls.maxPolarAngle = Math.PI * 0.49;
controls.minDistance = 6;
controls.maxDistance = 130;
controls.enablePan = false;
controls.autoRotate = true;      // gentle sweeping intro
controls.autoRotateSpeed = 0.8;

// ---------------------------------------------------------------------------
// Click the sea -> a wave
// ---------------------------------------------------------------------------
const clickPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0.45); // ~water level
const raycaster = new THREE.Raycaster();
const pointerNdc = new THREE.Vector2();
let downPos = null;

function makeRippleAt(worldPos, strength) {
  // cap concurrent ripples so the scene stays calm
  while (ripples.length >= CFG.maxRipples) {
    const old = ripples.shift();
    scene.remove(old);
    old.material.dispose();
  }
  makeRippleMesh(worldPos, strength);
}

function onPointerDown(e) {
  if (document.body.classList.contains('intro')) return;
  downPos = { x: e.clientX, y: e.clientY };
}

function onPointerUp(e) {
  if (document.body.classList.contains('intro')) return;
  if (!downPos) return;
  const dragged =
    Math.abs(e.clientX - downPos.x) > 6 || Math.abs(e.clientY - downPos.y) > 6;
  downPos = null;
  if (dragged) return; // it was an orbit drag, not a click

  const rect = renderer.domElement.getBoundingClientRect();
  pointerNdc.set(
    ((e.clientX - rect.left) / rect.width) * 2 - 1,
    -((e.clientY - rect.top) / rect.height) * 2 + 1
  );
  raycaster.setFromCamera(pointerNdc, camera);
  const hit = new THREE.Vector3();
  if (raycaster.ray.intersectPlane(clickPlane, hit)) {
    if (Math.abs(hit.x) > 500 || Math.abs(hit.z) > 500) return;
    makeRippleAt(hit, 0.75 + Math.random() * 0.5);
  }
}
renderer.domElement.addEventListener('pointerdown', onPointerDown);
renderer.domElement.addEventListener('pointerup', onPointerUp);

// ---------------------------------------------------------------------------
// Day / night model
// ---------------------------------------------------------------------------
const clock = new THREE.Clock();
let simTime = 0;      // running simulation seconds (0 == sunrise on day one)

function hourOfDay(t) {
  return ((t / CFG.dayLength + CFG.startHour / 24) % 1) * 24;
}

// the sun sits in the horizon at dawn and dusk, arcs overhead by noon
const sunVec = new THREE.Vector3();
const moonVec = new THREE.Vector3();
const colTemp = new THREE.Color();

function orbitDir(t, offset) {
  const p = ((t / CFG.dayLength) + offset) % 1;
  const ang = p * Math.PI * 2;
  return new THREE.Vector3(Math.cos(ang), Math.sin(ang), 0);
}

// ---------------------------------------------------------------------------
// Intro state
// ---------------------------------------------------------------------------
// Optional URL control for testing / sharing a moment:
//   ?time=0.5     start at a moment in the day cycle (0=sunrise, .25=noon,
//                 .5=sunset, .75=midnight)
//   ?autostart=1  skip the intro overlay
//   ?wave=1       raise a friendly wave shortly after load
const urlParams = new URLSearchParams(location.search);
const startFrac = parseFloat(urlParams.get('time') || '0') || 0;
simTime = startFrac * CFG.dayLength;
const autoStart = urlParams.get('autostart') === '1';
const autoWave = urlParams.get('wave') === '1';

function beginSailing() {
  if (!document.body.classList.contains('intro')) return;
  document.body.classList.remove('intro');
  document.body.classList.add('sailing');
  controls.autoRotate = false;
}
document.getElementById('start').addEventListener('click', (e) => {
  e.stopPropagation();
  beginSailing();
});
document.getElementById('overlay-wrap').addEventListener('click', beginSailing);

if (autoStart) beginSailing();
if (autoWave) {
  setTimeout(() => makeRippleAt(new THREE.Vector3(6, 0, -4), 1.0), 1200);
}

// ---------------------------------------------------------------------------
// Render loop
// ---------------------------------------------------------------------------
function tick() {
  requestAnimationFrame(tick);
  const dt = Math.min(clock.getDelta(), 0.05);
  simTime += dt;

  // ---- time of day ----
  const sunPhase = (simTime / CFG.dayLength) % 1;
  const sunAng = sunPhase * Math.PI * 2;
  const sunElev = Math.sin(sunAng);
  const dayCap = THREE.MathUtils.clamp(sunElev * 1.6, 0, 1);
  const nightCap = THREE.MathUtils.clamp(-sunElev * 1.4 - 0.1, 0, 1);
  const twilight = THREE.MathUtils.clamp(1 - Math.abs(sunElev) * 4.2, 0, 1);
  const hour = hourOfDay(simTime);

  // ---- sun & moon ----
  sunVec.set(Math.cos(sunAng), sunElev, 0).multiplyScalar(900);
  moonVec.copy(orbitDir(simTime, 0.5)).multiplyScalar(900);

  sunMesh.position.copy(sunVec);
  sunMesh.visible = sunElev > -0.05;
  moonMesh.position.copy(moonVec);
  moonMesh.visible = nightCap > 0.05;

  sunLight.position.copy(sunVec);
  sunLight.color.copy(colTemp.setHSL(0.09, 0.8, 0.4 + twilight * 0.5 + dayCap * 0.42));
  sunLight.intensity = 0.25 + twilight * 0.5 + dayCap * 1.1;

  moonLight.position.copy(moonVec);
  moonLight.intensity = nightCap * 0.55;

  // ---- sky ----
  skyMat.uniforms.uTime.value = simTime;
  skyMat.uniforms.uSunDir.value.copy(sunVec).normalize();
  skyMat.uniforms.uMoonDir.value.copy(moonVec).normalize();
  skyMat.uniforms.uNight.value = nightCap;
  skyMat.uniforms.uTwilight.value = twilight;
  skyMat.uniforms.uDay.value = dayCap;

  // ---- ocean ----
  const ou = oceanUniforms;
  ou.uTime.value = simTime;
  ou.uSunDir.value.copy(sunVec).normalize();
  ou.uCamPos.value.copy(camera.position);
  ou.uNight.value = nightCap;
  ou.uTwilight.value = twilight;

  // ---- ripples ----
  for (let i = ripples.length - 1; i >= 0; i--) {
    const r = ripples[i];
    const age = simTime - r.userData.born;
    const mu = r.material.uniforms;
    mu.uTime.value = simTime;
    mu.uSunDir.value.copy(sunVec).normalize();
    mu.uCamPos.value.copy(camera.position);
    mu.uNight.value = nightCap;
    mu.uTwilight.value = twilight;
    mu.uAge.value = age;
    if (age > CFG.rippleLifetime) {
      scene.remove(r);
      r.geometry = undefined;
      r.material.dispose();
      ripples.splice(i, 1);
    }
  }

  // ---- boat ----
  boat.position.y = -0.34 + Math.sin(simTime * 1.3) * 0.13 + Math.sin(simTime * 0.7 + 1) * 0.08;
  boat.rotation.z = Math.sin(simTime * 0.85) * 0.02;
  boat.rotation.x = Math.sin(simTime * 0.7 + 1.2) * 0.015;
  flag.rotation.z = Math.sin(simTime * 5.5) * 0.25 + 0.1;

  // ---- clouds ----
  for (const c of clouds) {
    c.mesh.position.x += c.speed * dt;
    if (c.mesh.position.x > 380) c.mesh.position.x = -380;
    c.mesh.position.y = c.baseAlt + Math.sin(simTime * 0.05 + c.seed * 7) * 3;
  }

  // ---- seagulls ----
  for (const g of gulls) {
    g.angle += g.speed * dt * 0.12;
    g.mesh.position.set(
      Math.cos(g.angle) * g.radius,
      g.alt + Math.sin(simTime * g.speed + g.phase) * 1.2,
      Math.sin(g.angle) * g.radius
    );
    g.mesh.lookAt(g.mesh.position.x * 1.2, g.mesh.position.y - 3, g.mesh.position.z * 1.2);
    g.mesh.children[0].rotation.z = Math.sin(simTime * 7 + g.phase) * 0.55;
    g.mesh.children[1].rotation.z = Math.sin(simTime * 7 + g.phase + Math.PI) * 0.55;
  }

  controls.update();

  // ---- HUD ----
  const hh = Math.floor(hour) % 24;
  const mm = Math.floor((hour % 1) * 60);
  document.getElementById('clock').textContent =
    `Day ${Math.floor(simTime / CFG.dayLength) + 1} · ${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;

  let status;
  if (hh >= 19 || hh < 5) status = 'Night';
  else if (hh >= 5 && hh < 8) status = 'Sunrise';
  else if (hh >= 16 && hh < 19) status = 'Sunset';
  else if (hh >= 13 && hh < 16) status = 'Golden hour';
  else status = 'Day';
  document.getElementById('status').textContent = status;

  renderer.render(scene, camera);
}
tick();

// debug + verification hooks (used by automated screenshots)
window.__sim = {
  now: () => simTime,
  setTime: (t) => { simTime = t; },
  start: beginSailing,
  rippleCount: () => ripples.length,
};
window.__sunVis = () => ({ sun: sunMesh.visible, moon: moonMesh.visible, sunY: sunMesh.position.y });
window.__sceneInfo = () => ({
  boatY: boat.position.y,
  boatRotZ: boat.rotation.z,
  flagRotZ: flag.rotation.z,
  gulls: gulls.length,
  clouds: clouds.length,
});

// ---------------------------------------------------------------------------
// Resize
// ---------------------------------------------------------------------------
window.addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});