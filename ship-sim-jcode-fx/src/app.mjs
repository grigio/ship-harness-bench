
  import * as THREE from 'three';
  import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

  const clamp = THREE.MathUtils.clamp;
  const lerp = THREE.MathUtils.lerp;
  const smoothstep = (a, b, x) => {
    const t = clamp((x - a) / (b - a), 0, 1);
    return t * t * (3 - 2 * t);
  };
  const rand = (a, b) => a + Math.random() * (b - a);

  // ------------------------------------------------------------------ setup
  const warnEl = () => document.getElementById('warn');
  const canWebGL = (() => {
    try {
      const c = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (c.getContext('webgl') || c.getContext('experimental-webgl') || c.getContext('webgl2')));
    } catch (e) { return false; }
  })();

  if (!canWebGL) {
    warnEl().hidden = false;
    throw new Error('WebGL not available');
  }

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  document.body.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xbfd2ec, 260, 720);

  const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 3000);
  camera.position.set(46, 16, 58);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.06;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.25;
  controls.minDistance = 18;
  controls.maxDistance = 420;
  controls.maxPolarAngle = Math.PI * 0.495;
  controls.target.set(0, 2, 0);

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // ------------------------------------------------------------ day/night model
  const DAY_PERIOD = 110;      // seconds for a full day-night cycle
  const SUN_R = 720;
  const SUN_ELEV = 250;

  let simTime = 0;
  let simStart = Date.now() / 1000;

  function sunDirection(t) {
    const a = (t / DAY_PERIOD) * Math.PI * 2;
    return new THREE.Vector3(Math.cos(a), SUN_ELEV / SUN_R * Math.sin(a), Math.sin(a)).normalize();
  }
  const sunDay = dir => smoothstep(-0.05, 0.22, dir.y);            // 0 night .. 1 day
  const sunSunset = dir => Math.exp(-(dir.y / 0.16) * (dir.y / 0.16));

  function phaseLabel(dir, day, rising) {
    if (day >= 0.99) return { c: '#ffd76a', s: 'DAY' };
    if (day <= 0.01) return { c: '#9fb4ff', s: 'NIGHT' };
    if (rising) return { c: '#ffb36b', s: 'SUNRISE' };
    return { c: '#c98be0', s: 'SUNSET' };
  }

  // ---------------------------------------------------------------- lighting
  const sunLight = new THREE.DirectionalLight(0xfff2dc, 0);
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.set(2048, 2048);
  sunLight.shadow.camera.near = 10;
  sunLight.shadow.camera.far = 500;
  sunLight.shadow.camera.left = -60;
  sunLight.shadow.camera.right = 60;
  sunLight.shadow.camera.top = 60;
  sunLight.shadow.camera.bottom = -60;
  sunLight.shadow.bias = -0.0005;
  scene.add(sunLight);
  scene.add(sunLight.target);

  const moonLight = new THREE.DirectionalLight(0x9fb4ff, 0);
  scene.add(moonLight);
  scene.add(moonLight.target);

  const hemi = new THREE.HemisphereLight(0xbfdcff, 0x1b3350, 0.35);
  scene.add(hemi);

  // ------------------------------------------------------------------- textures
  function softTexture(inner, mid, outer) {
    const c = document.createElement('canvas');
    c.width = c.height = 128;
    const g = c.getContext('2d');
    const grad = g.createRadialGradient(64, 64, 4, 64, 64, 62);
    grad.addColorStop(0, inner);
    grad.addColorStop(0.45, mid);
    grad.addColorStop(1, outer);
    g.fillStyle = grad;
    g.fillRect(0, 0, 128, 128);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }
  const sunTex = softTexture('rgba(255,255,255,1)', 'rgba(255,240,200,0.55)', 'rgba(255,220,150,0)');
  const starTex = softTexture('rgba(255,255,255,1)', 'rgba(255,255,255,0.35)', 'rgba(255,255,255,0)');
  const cloudTex = softTexture('rgba(255,255,255,0.95)', 'rgba(255,255,255,0.55)', 'rgba(255,255,255,0)');

  // ------------------------------------------------------------------ sky dome
  const skyMat = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    uniforms: {
      uDay:    { value: 1.0 },
      uSunset: { value: 0.0 },
      uSunDir: { value: new THREE.Vector3(0, 1, 0) },
      uNight:  { value: 0.0 }
    },
    vertexShader: `
      varying vec3 vDir;
      void main() {
        vDir = normalize(position);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec3 vDir;
      uniform float uDay;
      uniform float uSunset;
      uniform vec3  uSunDir;
      uniform float uNight;

      void main() {
        vec3 dir = normalize(vDir);
        float up = max(dir.y, 0.0);

        vec3 zenithDay  = vec3(0.16, 0.34, 0.66);
        vec3 horizonDay = vec3(0.74, 0.83, 0.93);
        vec3 zenithNgt  = vec3(0.020, 0.040, 0.11);
        vec3 horizonNgt = vec3(0.09, 0.12, 0.21);
        vec3 sunLow     = vec3(1.0, 0.64, 0.30);
        vec3 sunHigh    = vec3(1.0, 0.97, 0.88);

        vec3 zenith = mix(zenithNgt, zenithDay, uDay);
        vec3 horizon = mix(horizonNgt, horizonDay, uDay);

        vec3 sky = mix(zenith, horizon, pow(up, 0.55));

        // warm band near the horizon when the sun is low
        sky += vec3(1.0, 0.42, 0.22) * uSunset * (1.0 - abs(dir.y)) * (0.35 + 0.55 * up) * 0.8;

        // sun disk + halo
        float sunDot = max(dot(dir, uSunDir), 0.0);
        float disk = smoothstep(0.9990, 0.9996, sunDot);
        float halo = pow(sunDot, 26.0) * 0.9;
        float glow = pow(sunDot, 3.5) * 0.22;
        vec3 sunTint = mix(sunLow, sunHigh, smoothstep(0.25, 0.8, uSunDir.y));
        sky += sunTint * (disk * 3.0 + halo + glow);

        // faint moon haze opposite the sun
        sky += vec3(0.38, 0.46, 0.80) * uNight * 0.10 * (1.0 - abs(dir.y));

        gl_FragColor = vec4(sky, 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `
  });
  const sky = new THREE.Mesh(new THREE.SphereGeometry(1200, 32, 16), skyMat);
  scene.add(sky);

  // stars
  const STAR_COUNT = 1100;
  const starPos = new Float32Array(STAR_COUNT * 3);
  const starCol = new Float32Array(STAR_COUNT * 3);
  for (let i = 0; i < STAR_COUNT; i++) {
    const th = rand(0, Math.PI * 2);
    const ph = Math.acos(rand(-1, 1));
    const r = rand(760, 810);
    starPos[i * 3] = r * Math.sin(ph) * Math.cos(th);
    starPos[i * 3 + 1] = Math.abs(r * Math.cos(ph)) * 0.96 + 8;
    starPos[i * 3 + 2] = r * Math.sin(ph) * Math.sin(th);
    const b = rand(0.25, 1);
    starCol[i * 3] = starCol[i * 3 + 1] = starCol[i * 3 + 2] = b;
  }
  const starGeo = new THREE.BufferGeometry();
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
  starGeo.setAttribute('color', new THREE.BufferAttribute(starCol, 3));
  const starMat = new THREE.PointsMaterial({
    size: 3.2, map: starTex, blending: THREE.AdditiveBlending,
    depthWrite: false, transparent: true, vertexColors: true, sizeAttenuation: false
  });
  const stars = new THREE.Points(starGeo, starMat);
  starMat.opacity = 0;
  scene.add(stars);

  // ------------------------------------------------------------------ ocean
  const OCEAN_SIZE = 620;
  const MAX_SPLASH = 16;
  const splashPos = Array.from({ length: MAX_SPLASH }, () => new THREE.Vector3(0, 0, 0));
  const splashTime = new Float32Array(MAX_SPLASH);
  const splashAmp = new Float32Array(MAX_SPLASH);
  let splashCur = 0;
  let splashCount = 0;

  function addSplash(x, z, amp) {
    const slot = splashCur % MAX_SPLASH;
    splashPos[slot].set(x, 0, z);
    splashTime[slot] = simTime;
    splashAmp[slot] = amp || rand(1.3, 2.0);
    splashCur++;
    splashCount = Math.min(splashCount + 1, MAX_SPLASH);
  }

  const WATER_VERT = `
    uniform float uTime;
    uniform vec3  uSplashPos[16];
    uniform float uSplashTime[16];
    uniform float uSplashAmp[16];
    uniform float uSplashCount;

    varying vec3 vWorldPos;
    varying vec3 vNormal;

    float baseH(vec2 p) {
      float h = 0.0;
      h += 2.2 * sin(dot(vec2( 0.819,  0.574), p) * (6.28318 / 60.0) + uTime * 0.55);
      h += 1.6 * sin(dot(vec2(-0.342,  0.940), p) * (6.28318 / 34.0) + uTime * 0.85);
      h += 1.1 * sin(dot(vec2(-0.985, -0.174), p) * (6.28318 / 19.0) + uTime * 1.35);
      h += 0.7 * sin(dot(vec2( 0.500, -0.866), p) * (6.28318 / 12.0) + uTime * 2.10);
      h += 0.45 * sin(dot(vec2( 0.660,  0.750), p) * (6.28318 / 7.5) + uTime * 3.10);
      return h;
    }

    float splashH(vec2 p, int i) {
      vec2 c = uSplashPos[i].xz;
      float age = uTime - uSplashTime[i];
      float r = distance(p, c);
      float wl = 11.0;
      return uSplashAmp[i] * sin(r * (6.28318 / wl) - age * 7.5) * exp(-age * 1.15) * exp(-r * r * 0.0032);
    }

    float H(vec2 p) {
      float h = baseH(p);
      for (int i = 0; i < 16; i++) {
        if (float(i) < uSplashCount) h += splashH(p, i);
      }
      return h;
    }

    void main() {
      vec2 p = position.xz;
      float eps = 0.8;
      float h = H(p);
      float dx = (H(p + vec2(eps, 0.0)) - H(p - vec2(eps, 0.0))) / (2.0 * eps);
      float dz = (H(p + vec2(0.0, eps)) - H(p - vec2(0.0, eps))) / (2.0 * eps);
      vec3 n = normalize(vec3(-dx, 1.0, -dz));

      vec4 world = modelMatrix * vec4(position.x, h, position.z, 1.0);
      vWorldPos = world.xyz;
      vNormal = normalize(mat3(modelMatrix) * n);
      gl_Position = projectionMatrix * viewMatrix * world;
    }
  `;

  const WATER_FRAG = `
    uniform float uTime;
    uniform float uDay;
    uniform float uSunset;
    uniform vec3  uSunDir;
    uniform vec3  uSunColor;
    uniform float uSunIntensity;
    uniform vec3  uMoonDir;
    uniform vec3  uMoonColor;
    uniform float uMoonIntensity;
    uniform vec3  uFogColor;
    uniform vec3  uSeaShallow;
    uniform vec3  uSeaDeep;

    varying vec3 vWorldPos;
    varying vec3 vNormal;

    void main() {
      vec3 V = normalize(cameraPosition - vWorldPos);
      vec3 N = normalize(vNormal);

      float depth = clamp(1.0 - vWorldPos.y / 14.0, 0.0, 1.0);
      vec3 base = mix(uSeaShallow, uSeaDeep, depth);

      vec3 Ls = normalize(uSunDir);
      float sunDiff = max(dot(N, Ls), 0.0);
      float specS = pow(max(dot(reflect(-Ls, N), V), 0.0), 90.0);
      vec3 sunCol = uSunColor * uSunIntensity;

      vec3 Lm = normalize(uMoonDir);
      float moonDiff = max(dot(N, Lm), 0.0);
      float specM = pow(max(dot(reflect(-Lm, N), V), 0.0), 70.0);
      vec3 moonCol = uMoonColor * uMoonIntensity;

      // fresnel reflection picks up the sky/horizon colors
      float fres = pow(1.0 - max(dot(N, V), 0.0), 3.5);
      vec3 horizon = mix(vec3(0.09, 0.12, 0.21), uFogColor, uDay);
      vec3 refl = mix(base, horizon, clamp(fres * 0.85, 0.0, 1.0));

      refl += sunCol * (specS * 2.2 + sunDiff * 0.14 + 0.05);
      refl += moonCol * (specM * 1.6 + moonDiff * 0.06);

      float dist = distance(cameraPosition, vWorldPos);
      float fogF = 1.0 - exp(-pow(dist / 420.0, 1.6));
      vec3 col = mix(refl, uFogColor, clamp(fogF, 0.0, 1.0));

      gl_FragColor = vec4(col, 1.0);
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }
  `;

  const waterUniforms = {
    uTime:         { value: 0 },
    uSplashPos:    { value: splashPos },
    uSplashTime:   { value: splashTime },
    uSplashAmp:    { value: splashAmp },
    uSplashCount:  { value: 0 },
    uDay:          { value: 1 },
    uSunset:       { value: 0 },
    uSunDir:       { value: new THREE.Vector3(0, 1, 0) },
    uSunColor:     { value: new THREE.Color(1.0, 0.94, 0.82) },
    uSunIntensity: { value: 1.0 },
    uMoonDir:      { value: new THREE.Vector3(0, -1, 0) },
    uMoonColor:    { value: new THREE.Color(0.62, 0.70, 1.0) },
    uMoonIntensity:{ value: 0 },
    uFogColor:     { value: new THREE.Color(0xbfd2ec) },
    uSeaShallow:   { value: new THREE.Color(0x1f7fae) },
    uSeaDeep:      { value: new THREE.Color(0x093a63) }
  };

  const waterMat = new THREE.ShaderMaterial({
    uniforms: waterUniforms,
    vertexShader: WATER_VERT,
    fragmentShader: WATER_FRAG
  });

  const OCEAN_SEG = 280;
  const oceanGeo = new THREE.PlaneGeometry(OCEAN_SIZE, OCEAN_SIZE, OCEAN_SEG, OCEAN_SEG);
  oceanGeo.rotateX(-Math.PI / 2);   // lie flat in the XZ plane (local y becomes world y)
  const ocean = new THREE.Mesh(oceanGeo, waterMat);
  ocean.name = 'ocean';
  scene.add(ocean);

  // CPU wave model used to make the ship ride the swell
  const WAVES = [
    { a: 2.2, k: (Math.PI * 2) / 60.0, d: new THREE.Vector2( 0.819,  0.574), w: 0.55 },
    { a: 1.6, k: (Math.PI * 2) / 34.0, d: new THREE.Vector2(-0.342,  0.940), w: 0.85 },
    { a: 1.1, k: (Math.PI * 2) / 19.0, d: new THREE.Vector2(-0.985, -0.174), w: 1.35 },
    { a: 0.7, k: (Math.PI * 2) / 12.0, d: new THREE.Vector2( 0.500, -0.866), w: 2.10 },
    { a: 0.45, k: (Math.PI * 2) / 7.5, d: new THREE.Vector2( 0.660,  0.750), w: 3.10 }
  ];
  function sampleWave(x, z, t) {
    let h = 0;
    for (const w of WAVES) h += w.a * Math.sin((x * w.d.x + z * w.d.y) * w.k + t * w.w);
    return h;
  }

  // ------------------------------------------------------------------ ship
  const ship = new THREE.Group();
  ship.name = 'ship';
  const mat = (color, rough = 0.55, metal = 0.0) =>
    new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: metal });
  const Wood = mat(0xb9894f, 0.8);
  const WoodDark = mat(0x7c5330, 0.85);
  const HullCream = mat(0xf2ead8, 0.45);
  const HullRed = mat(0xb03a2e, 0.5);
  const DeckWood = mat(0xd8b078, 0.85);
  const MastWood = mat(0x8a5a2b, 0.8);
  const SailMat = new THREE.MeshStandardMaterial({ color: 0xf7f2e6, roughness: 0.9, side: THREE.DoubleSide });
  const RoofMat = mat(0x6d4a2b, 0.7);

  function hullGeometry() {
    const s = new THREE.Shape();
    s.moveTo(-13, -2.6);
    s.lineTo(-8, -3.6);
    s.lineTo(0, -3.9);
    s.lineTo(8, -3.6);
    s.lineTo(13, -3.0);
    s.lineTo(16, -1.6);
    s.lineTo(17, -0.35);
    s.lineTo(16.6, 0.1);
    s.lineTo(15, 0.5);
    s.lineTo(8, 0.62);
    s.lineTo(-6, 0.62);
    s.lineTo(-14, 0.5);
    s.lineTo(-16.6, 0.12);
    s.lineTo(-16.8, -0.5);
    s.lineTo(-15, -2.1);
    s.closePath();
    const g = new THREE.ExtrudeGeometry(s, {
      depth: 4.6,
      bevelEnabled: true, bevelThickness: 1.1, bevelSize: 0.9, bevelSegments: 5, curveSegments: 24
    });
    g.translate(0, 0, -2.3);
    return g;
  }

  const hullMesh = new THREE.Mesh(hullGeometry(), HullCream);
  hullMesh.castShadow = hullMesh.receiveShadow = true;
  ship.add(hullMesh);

  const waterline = new THREE.Mesh(hullGeometry(), HullRed);
  waterline.scale.set(0.985, 0.42, 1.015);
  waterline.position.y = -1.55;
  ship.add(waterline);

  const deck = new THREE.Mesh(new THREE.BoxGeometry(30, 0.35, 4.5), DeckWood);
  deck.position.y = 0.66;
  deck.castShadow = deck.receiveShadow = true;
  ship.add(deck);

  for (const sx of [-11, 11]) {
    const rail = new THREE.Mesh(new THREE.BoxGeometry(15, 0.8, 0.18), WoodDark);
    rail.position.set(sx, 0.35, 0);
    ship.add(rail);
  }

  const cabin = new THREE.Mesh(new THREE.BoxGeometry(7, 2.6, 3.4), Wood);
  cabin.position.set(2.4, 2.2, 0);
  cabin.castShadow = cabin.receiveShadow = true;
  ship.add(cabin);
  const roof = new THREE.Mesh(new THREE.BoxGeometry(7.6, 0.42, 3.9), RoofMat);
  roof.position.set(2.4, 3.7, 0);
  roof.castShadow = true;
  ship.add(roof);
  const windows = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.5, 3.0), mat(0x224466, 0.2, 0.4));
  windows.position.set(5.75, 2.3, 0);
  ship.add(windows);

  const bowsprit = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.24, 10, 8), MastWood);
  bowsprit.position.set(-17.4, 2.2, 0);
  bowsprit.rotation.z = -0.35;
  ship.add(bowsprit);

  function addMast(x, y, h, r) {
    const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r * 1.25, h, 10), MastWood);
    m.position.set(x, y, 0);
    m.castShadow = true;
    ship.add(m);
    return m;
  }
  addMast(-7.5, 8.5, 17, 0.34);
  addMast(7.5, 5.8, 12, 0.28);

  function makeSail(w, hgt, billow) {
    const geo = new THREE.PlaneGeometry(w, hgt, 20, 20);
    geo.rotateY(Math.PI / 2);          // plane now in ZY, normal +X
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const z = pos.getZ(i);
      const y = pos.getY(i);
      const fz = (z / w) * 2;          // -1..1
      const fy = (y / hgt) * 2;        // -1..1
      const xB = billow * Math.sin(Math.abs(fz) * Math.PI * 0.5) * Math.sin(Math.abs(fy) * Math.PI);
      pos.setX(i, xB);
    }
    pos.needsUpdate = true;
    geo.computeVertexNormals();
    const mesh = new THREE.Mesh(geo, SailMat);
    mesh.castShadow = true;
    return mesh;
  }

  const foreSail = makeSail(5.4, 10.5, 2.1);
  foreSail.position.set(-7.5, 5.6, 0);
  foreSail.rotation.y = 0.14;
  ship.add(foreSail);

  const mainSail = makeSail(5.8, 8.0, 1.9);
  mainSail.position.set(7.5, 3.4, 0);
  mainSail.rotation.y = -0.1;
  ship.add(mainSail);

  const boom = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 5.8, 8), MastWood);
  boom.position.set(7.5, 0.4, 0);
  boom.rotation.z = Math.PI / 2;
  ship.add(boom);

  // triangular staysail from the foremast area toward the bow
  function makeTri(height, topHalf, botHalf, billow) {
    const rows = 10, cols = 8;
    const pos = [], idx = [];
    for (let r = 0; r <= rows; r++) {
      const ty = r / rows;
      const y = -height / 2 + ty * height;
      const half = lerp(botHalf, topHalf, ty);
      for (let c = 0; c <= cols; c++) {
        const tx = c / cols;
        const z = lerp(-half, half, tx);
        const bulge = Math.sin(ty * Math.PI) * 0.6 + 0.4;
        const x = billow * (Math.sin(tx * Math.PI) * bulge + 0.15 * Math.sin(ty * Math.PI));
        pos.push(x, y, z);
      }
    }
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const a = r * (cols + 1) + c, b = a + 1;
        const d = a + cols + 1, e = d + 1;
        idx.push(a, d, b, b, d, e);
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(pos), 3));
    geo.setIndex(idx);
    geo.computeVertexNormals();
    return new THREE.Mesh(geo, SailMat);
  }
  const jib = makeTri(9.0, 0.7, 2.9, 2.2);
  jib.position.set(-11, 5.0, 0);
  jib.rotation.y = 0.22;
  ship.add(jib);

  // flag that waves in the breeze
  const flagGeo = new THREE.PlaneGeometry(1.7, 0.9, 1, 1);
  flagGeo.translate(0.85, 0, 0);
  const flag = new THREE.Mesh(flagGeo, new THREE.MeshStandardMaterial({ color: 0xffd23f, side: THREE.DoubleSide, roughness: 0.8 }));
  flag.position.set(-7.5, 17.0, 0);
  ship.add(flag);

  scene.add(ship);

  // ------------------------------------------------------------------ birds
  const birdMat = new THREE.MeshBasicMaterial({ color: 0x2b2f3a, side: THREE.DoubleSide });
  function makeBird() {
    const g = new THREE.Group();
    const wingGeo = new THREE.BufferGeometry();
    wingGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array([
      -0.7, 0.05, 0,  0, 0, 0,  -0.35, 0, 0.45,
      -0.7, 0.05, 0,  0, 0, 0,  -0.35, 0, -0.45
    ]), 3));
    const w1 = new THREE.Mesh(wingGeo, birdMat);
    const w2 = new THREE.Mesh(wingGeo, birdMat);
    w2.rotation.y = Math.PI;
    g.add(w1, w2);
    return g;
  }
  const birds = [];
  for (let i = 0; i < 4; i++) {
    const b = makeBird();
    b.userData = { r: rand(60, 160), speed: rand(0.05, 0.12), phase: rand(0, Math.PI * 2), y: rand(26, 40), flap: rand(3, 5) };
    scene.add(b);
    birds.push(b);
  }

  // ------------------------------------------------------------------ clouds
  const clouds = [];
  for (let i = 0; i < 8; i++) {
    const sp = new THREE.Sprite(new THREE.SpriteMaterial({
      map: cloudTex, transparent: true, opacity: 0, depthWrite: false
    }));
    const cl = rand(90, 150);
    sp.scale.set(cl * rand(1.4, 2.4), cl * rand(0.55, 0.8), 1);
    sp.position.set(rand(-420, 420), rand(70, 150), rand(-420, 420));
    sp.userData = { vx: rand(-3, 3), vz: rand(-3, 3) };
    scene.add(sp);
    clouds.push(sp);
  }

  // ------------------------------------------------------------ sun / moon sprites
  const sunSprite = new THREE.Sprite(new THREE.SpriteMaterial({
    map: sunTex, color: 0xfff3dc, transparent: true, depthWrite: false, fog: false,
    blending: THREE.AdditiveBlending
  }));
  sunSprite.scale.set(46, 46, 1);
  scene.add(sunSprite);

  const moonSprite = new THREE.Sprite(new THREE.SpriteMaterial({
    map: sunTex, color: 0xcfd8ff, transparent: true, depthWrite: false, fog: false,
    blending: THREE.AdditiveBlending
  }));
  moonSprite.scale.set(20, 20, 1);
  scene.add(moonSprite);

  // ------------------------------------------------------------------ HUD
  const phaseDot = document.getElementById('phaseDot');
  const phaseText = document.getElementById('phaseText');

  // ------------------------------------------------------------------ animate
  const clock = new THREE.Clock();
  let shipYaw = Math.PI * 0.25;

  function updateShip(dt, t) {
    shipYaw += dt * 0.05;
    const p = ship.position;

    // ride the swell: move up/down smoothly
    const py = sampleWave(p.x, p.z, t);
    ship.userData.py = ship.userData.py === undefined ? py : lerp(ship.userData.py, py, clamp(dt * 4, 0, 1));
    ship.position.y = ship.userData.py;

    // pitch and roll from the swell sampled along the hull
    const off = 6;
    const left = sampleWave(p.x - off * Math.cos(shipYaw + Math.PI / 2), p.z - off * Math.sin(shipYaw + Math.PI / 2), t);
    const right = sampleWave(p.x + off * Math.cos(shipYaw + Math.PI / 2), p.z + off * Math.sin(shipYaw + Math.PI / 2), t);
    const fore = sampleWave(p.x + 12 * Math.cos(shipYaw), p.z + 12 * Math.sin(shipYaw), t);
    const aft = sampleWave(p.x - 12 * Math.cos(shipYaw), p.z - 12 * Math.sin(shipYaw), t);

    ship.rotation.order = 'YXZ';
    ship.rotation.y = shipYaw;
    ship.rotation.x = clamp((right - left) / (2 * off), -0.3, 0.3);
    ship.rotation.z = clamp((fore - aft) / (2 * 12), -0.3, 0.3);

    // wave the flag
    const wf = flag.geometry.attributes.position;
    for (let i = 0; i < wf.count; i++) {
      const xx = wf.getX(i);
      wf.setZ(i, Math.sin(t * 6 + xx * 9) * 0.28 * (xx + 0.2) + xx * 0.4);
    }
    wf.needsUpdate = true;
    flag.geometry.computeVertexNormals();
  }

  function updateBirds(dt, t) {
    for (const b of birds) {
      const u = b.userData;
      u.phase += dt * u.flap;
      const ang = t * u.speed + u.phase;
      b.position.set(Math.cos(ang) * u.r, u.y + Math.sin(t * 0.8 + u.phase) * 2, Math.sin(ang) * u.r);
      b.rotation.y = -ang + Math.PI / 2 + Math.sin(t * 0.5) * 0.2;
      b.rotation.z = Math.sin(u.phase * 1.4) * 0.5;
    }
  }

  function updateClouds(dt) {
    for (const c of clouds) {
      c.position.x += c.userData.vx * dt;
      c.position.z += c.userData.vz * dt;
      if (Math.abs(c.position.x) > 460) c.userData.vx *= -1;
      if (Math.abs(c.position.z) > 460) c.userData.vz *= -1;
    }
  }

  function animate() {
    requestAnimationFrame(animate);
    const dt = Math.min(clock.getDelta(), 0.1);
    if (simTime === 0) simTime = Date.now() / 1000 - simStart;
    simTime += dt;
    const t = simTime;

    const sunDir = sunDirection(t);
    const day = sunDay(sunDir);
    const sunset = sunSunset(sunDir) * smoothstep(-0.35, 0.3, sunDir.y);
    const night = 1 - day;
    const moonDir = sunDir.clone().negate();

    // sun & moon sprites on their orbit
    const sunTrack = sunDir.clone().multiplyScalar(1180);
    sunSprite.position.copy(sunTrack);
    sunSprite.material.opacity = day > 0.004 ? 1 : 0;
    sunSprite.scale.setScalar(day > 0.004 ? 46 : 0.01);
    sunSprite.material.color.setScalar(lerp(1.0, 1.35, sunset));

    moonSprite.position.copy(sunTrack.clone().negate());
    moonSprite.material.opacity = night > 0.02 ? 0.85 : 0;
    moonSprite.scale.setScalar(night > 0.02 ? 20 : 0.01);

    starMat.opacity = night;

    // lighting
    const sunColor = new THREE.Color().lerpColors(
      new THREE.Color(1.0, 0.55, 0.3), new THREE.Color(1.0, 0.96, 0.86),
      smoothstep(0.05, 0.7, sunDir.y)
    );
    sunLight.intensity = 1.6 * day;
    sunLight.color.copy(sunColor);
    sunLight.position.copy(sunDir).multiplyScalar(120);

    moonLight.intensity = 0.8 * night;
    const moonColorC = new THREE.Color(0.7, 0.78, 1.0);
    moonColorC.lerp(new THREE.Color(1.0, 1.0, 1.0), sunset * 0.3);
    moonLight.color.copy(moonColorC);
    moonLight.position.copy(moonDir).multiplyScalar(120);

    hemi.intensity = lerp(0.10, 0.5, day) + night * 0.08;

    // fog follows the horizon glow
    const fogCol = new THREE.Color().lerpColors(new THREE.Color(0x0c1020), new THREE.Color(0xbfd2ec), day);
    fogCol.lerp(new THREE.Color(0xff9a62), sunset * 0.45);
    scene.fog.color.copy(fogCol);

    // sky
    skyMat.uniforms.uDay.value = day;
    skyMat.uniforms.uSunset.value = sunset;
    skyMat.uniforms.uSunDir.value.copy(sunDir);
    skyMat.uniforms.uNight.value = night;

    // water
    const wu = waterUniforms;
    wu.uTime.value = t;
    wu.uDay.value = day;
    wu.uSunset.value = sunset;
    wu.uSunDir.value.copy(sunDir);
    wu.uSunColor.value.copy(sunColor);
    wu.uSunIntensity.value = 1.1 + 0.4 * day;
    wu.uMoonDir.value.copy(moonDir);
    wu.uMoonColor.value.copy(moonColorC);
    wu.uMoonIntensity.value = 0.5 * night;
    wu.uFogColor.value.copy(scene.fog.color);
    wu.uSplashCount.value = splashCount;

    for (const c of clouds) c.material.opacity = 0.42 * (0.4 + 0.6 * day);

    updateShip(dt, t);
    updateBirds(dt, t);
    updateClouds(dt);
    controls.update();

    const label = phaseLabel(sunDir, day, Math.cos((t / DAY_PERIOD) * Math.PI * 2) > 0);
    phaseDot.style.background = label.c;
    phaseText.textContent = label.s;

    renderer.render(scene, camera);
  }

  // --------------------------------------------------------------- interaction
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  let dragDist = 0;
  let lastP = null;
  let pointerIsDown = false;

  renderer.domElement.addEventListener('pointerdown', () => {
    pointerIsDown = true;
    dragDist = 0;
    lastP = null;
  });

  renderer.domElement.addEventListener('pointermove', (e) => {
    if (pointerIsDown) {
      if (lastP) dragDist += Math.hypot(e.clientX - lastP.x, e.clientY - lastP.y);
      lastP = { x: e.clientX, y: e.clientY };
    }
  });

  function onPointerUp(e) {
    if (pointerIsDown && dragDist < 8) {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObject(ocean, false);
      if (hits.length && hits[0].object.name === 'ocean') {
        addSplash(hits[0].point.x, hits[0].point.z);
      }
    }
    pointerIsDown = false;
    dragDist = 0;
    lastP = null;
  }
  renderer.domElement.addEventListener('pointerup', onPointerUp);
  renderer.domElement.addEventListener('pointercancel', onPointerUp);

  // ------------------------------------------------------------------ debug API
  window.__SHIP_DEBUG = () => {
    const sd = sunDirection(simTime);
    const dy = sunDay(sd);
    return {
      splashCount,
      splashAmp: Array.from(splashAmp).map(v => +v.toFixed(3)),
      splashTime: Array.from(splashTime).map(v => +v.toFixed(2)),
      simTime: +simTime.toFixed(2),
      sunDirY: +sd.y.toFixed(4),
      day: +dy.toFixed(4),
      skyUday: +skyMat.uniforms.uDay.value.toFixed(4),
      skyUSunset: +skyMat.uniforms.uSunset.value.toFixed(4),
      starOpacity: +starMat.opacity.toFixed(4),
      phase: phaseText.textContent,
      oceanVerts: ocean.geometry.attributes.position.count,
      maxSplash: MAX_SPLASH
    };
  };

  window.__SHIP_JUMP = (s) => { simTime = s; return simTime; };

  animate();
  