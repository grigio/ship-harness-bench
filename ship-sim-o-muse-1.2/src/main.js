import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

// ------------------------------------------------------------
// SCENE SETUP
// ------------------------------------------------------------
const app = document.getElementById('app')
const scene = new THREE.Scene()

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 1.0
renderer.outputColorSpace = THREE.SRGBColorSpace
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
app.appendChild(renderer.domElement)

const camera = new THREE.PerspectiveCamera(58, window.innerWidth / window.innerHeight, 0.1, 2000)
camera.position.set(9, 6.5, 11)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.dampingFactor = 0.055
controls.minDistance = 4.5
controls.maxDistance = 42
controls.maxPolarAngle = Math.PI * 0.495
controls.minPolarAngle = Math.PI * 0.08
controls.target.set(0, 0.35, 0)
controls.rotateSpeed = 0.55
controls.zoomSpeed = 0.9
controls.enablePan = false
controls.autoRotate = false
controls.autoRotateSpeed = 0.22

// Fog will be driven by day/night
scene.fog = new THREE.FogExp2(0x8fb4d8, 0.012)

// ------------------------------------------------------------
// LIGHTS
// ------------------------------------------------------------
const ambient = new THREE.AmbientLight(0xffffff, 0.55)
scene.add(ambient)

const hemi = new THREE.HemisphereLight(0xd8e8ff, 0x0f2a3a, 0.65)
hemi.position.set(0, 50, 0)
scene.add(hemi)

const sunLight = new THREE.DirectionalLight(0xfff4e0, 2.2)
sunLight.position.set(120, 80, -80)
sunLight.castShadow = true
sunLight.shadow.mapSize.set(2048, 2048)
sunLight.shadow.camera.near = 0.5
sunLight.shadow.camera.far = 500
sunLight.shadow.camera.left = -60
sunLight.shadow.camera.right = 60
sunLight.shadow.camera.top = 60
sunLight.shadow.camera.bottom = -60
sunLight.shadow.bias = -0.0006
scene.add(sunLight)
scene.add(sunLight.target)

const moonLight = new THREE.DirectionalLight(0x9ab8ff, 0.28)
moonLight.position.set(-120, 40, -80)
scene.add(moonLight)

// subtle fill for ship at night
const fillLight = new THREE.DirectionalLight(0x8ec8ff, 0.18)
fillLight.position.set(-8, 5, 6)
scene.add(fillLight)

// ------------------------------------------------------------
// SKY — large inverted sphere with custom shader
// ------------------------------------------------------------
const skyGeo = new THREE.SphereGeometry(900, 32, 32)
const skyMat = new THREE.ShaderMaterial({
  side: THREE.BackSide,
  uniforms: {
    uSunDir: { value: new THREE.Vector3(0.3, 0.6, -0.7) },
    uTime: { value: 0 },
    uDayFactor: { value: 1 },
    uSunColor: { value: new THREE.Color('#ffae6d') },
  },
  vertexShader: `
    varying vec3 vWorldPos;
    varying vec3 vDir;
    void main(){
      vec4 wp = modelMatrix * vec4(position, 1.0);
      vWorldPos = wp.xyz;
      vDir = normalize(position);
      gl_Position = projectionMatrix * viewMatrix * wp;
    }
  `,
  fragmentShader: `
    uniform vec3 uSunDir;
    uniform float uDayFactor;
    uniform vec3 uSunColor;
    varying vec3 vWorldPos;
    varying vec3 vDir;

    // palette helpers
    vec3 dayZenith = vec3(0.28, 0.55, 0.84);
    vec3 dayHorizon = vec3(0.78, 0.87, 0.96);
    vec3 daySunHalo = vec3(1.0, 0.78, 0.58);

    vec3 duskZenith = vec3(0.10, 0.12, 0.34);
    vec3 duskHorizon = vec3(0.96, 0.52, 0.32);
    vec3 duskCloud = vec3(0.94, 0.42, 0.48);

    vec3 nightZenith = vec3(0.02, 0.04, 0.12);
    vec3 nightHorizon = vec3(0.06, 0.10, 0.20);

    void main(){
      vec3 dir = normalize(vDir);
      float h = dir.y; // -1 to 1
      float nh = clamp(h * 0.5 + 0.5, 0.0, 1.0); // remap

      // sun proximity
      float sunDot = dot(dir, normalize(uSunDir));
      float sunHalo = pow(max(sunDot, 0.0), 64.0);
      float sunGlow = pow(max(sunDot, 0.0), 8.0) * 0.55;
      float sunDisc = smoothstep(0.995, 0.9985, sunDot) * step(0.0, uSunDir.y);

      // horizon boost
      float horizon = pow(1.0 - abs(h), 2.2);

      // day vs dusk vs night interpolation
      // uDayFactor: 1 = full day, 0 = night, 0.5 around horizon/twilight
      // we derive twilight amount when sun near horizon
      float sunY = uSunDir.y;
      float twilight = 1.0 - smoothstep(-0.22, 0.22, abs(sunY));
      // but emphasize when sunY ~ 0
      float dayMix = smoothstep(-0.18, 0.24, sunY);

      // base sky gradient day
      vec3 skyDay = mix(dayHorizon, dayZenith, pow(nh, 0.75));
      skyDay += daySunHalo * sunGlow * 0.7;
      skyDay = mix(skyDay, vec3(1.0,0.62,0.36), horizon * 0.18 * dayMix);

      vec3 skyDusk = mix(duskHorizon, duskZenith, pow(nh, 0.9));
      skyDusk += vec3(1.0,0.55,0.32) * sunGlow * 0.9;
      skyDusk += duskCloud * horizon * 0.25;

      vec3 skyNight = mix(nightHorizon, nightZenith, pow(nh, 0.85));
      // subtle star tint already handled by stars, keep clean

      vec3 sky = mix(skyNight, skyDay, dayMix);
      // blend dusk at twilight
      sky = mix(sky, skyDusk, twilight * (0.85 + 0.15*dayMix));

      // add sun disc/halo
      sky += sunHalo * vec3(1.0,0.95,0.82) * 1.1 * step(0.0, sunY);
      sky += sunDisc * vec3(1.0);

      // subtle vignette & haze at very low horizon (sea fog)
      float haze = smoothstep(0.02, -0.08, h) * 0.35;
      vec3 hazeColor = mix(vec3(0.88,0.92,0.98), vec3(0.96,0.58,0.42), twilight*0.7) * dayMix
                     + vec3(0.07,0.12,0.22)*(1.0-dayMix);
      sky = mix(sky, hazeColor, haze);

      // gentle grain / band smoothing
      sky += (fract(sin(dot(dir.xz, vec2(12.9898,78.233))) * 43758.5453) - 0.5) * 0.008;

      gl_FragColor = vec4(sky, 1.0);
    }
  `,
})
const sky = new THREE.Mesh(skyGeo, skyMat)
scene.add(sky)

// ------------------------------------------------------------
// SUN & MOON + GLOW
// ------------------------------------------------------------
function makeCelestial(radius, color, intensity) {
  const group = new THREE.Group()
  const geo = new THREE.SphereGeometry(radius, 32, 32)
  const mat = new THREE.MeshBasicMaterial({ color, transparent: true })
  const mesh = new THREE.Mesh(geo, mat)
  group.add(mesh)

  // glow shell
  const glowGeo = new THREE.SphereGeometry(radius * 1.9, 32, 32)
  const glowMat = new THREE.ShaderMaterial({
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    uniforms: {
      uColor: { value: new THREE.Color(color) },
      uIntensity: { value: intensity },
    },
    vertexShader: `varying vec3 vNormal; void main(){ vNormal = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
    fragmentShader: `
      varying vec3 vNormal;
      uniform vec3 uColor;
      uniform float uIntensity;
      void main(){
        float f = pow(0.68 - dot(vNormal, vec3(0.0,0.0,1.0)), 2.0);
        float a = f * uIntensity;
        gl_FragColor = vec4(uColor, a);
      }
    `,
    side: THREE.BackSide,
  })
  const glow = new THREE.Mesh(glowGeo, glowMat)
  group.add(glow)

  // lens flare quad
  const flareGeo = new THREE.PlaneGeometry(radius * 9, radius * 9)
  const flareMat = new THREE.ShaderMaterial({
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    uniforms: {
      uColor: { value: new THREE.Color(color) },
    },
    vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
    fragmentShader: `
      varying vec2 vUv; uniform vec3 uColor;
      void main(){
        vec2 c = vUv - 0.5;
        float d = length(c);
        float a = exp(-d*6.0) * 0.42;
        a *= 1.0 - smoothstep(0.0, 0.5, d*1.8);
        // anamorphic streak
        float streak = exp(-pow(c.y*14.0,2.0)) * 0.12 * (1.0 - smoothstep(0.0,0.42,d));
        gl_FragColor = vec4(uColor, a + streak);
      }
    `,
  })
  const flare = new THREE.Mesh(flareGeo, flareMat)
  group.add(flare)

  group.userData = { mesh, glow, flare, glowMat, flareMat }
  return group
}

const sunGroup = makeCelestial(20, 0xfff0c8, 1.0)
scene.add(sunGroup)
const moonGroup = makeCelestial(13, 0xd6e6ff, 0.55)
scene.add(moonGroup)
// moon darker at day
moonGroup.userData.mesh.material.color.setHex(0xeef2ff)

// ------------------------------------------------------------
// STARS
// ------------------------------------------------------------
const starCount = 3800
const starGeo = new THREE.BufferGeometry()
const starPos = new Float32Array(starCount * 3)
const starSize = new Float32Array(starCount)
const starTwinkle = new Float32Array(starCount)
for (let i = 0; i < starCount; i++) {
  // uniform sphere but only upper hemisphere + some below horizon faded
  const theta = Math.random() * Math.PI * 2
  const phi = Math.acos(THREE.MathUtils.lerp(0.12, 1, Math.random())) // bias to zenith
  const r = 880
  starPos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
  starPos[i * 3 + 1] = r * Math.cos(phi)
  starPos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)
  starSize[i] = Math.pow(Math.random(), 1.8) * 1.35 + 0.25
  starTwinkle[i] = Math.random() * Math.PI * 2
}
starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3))
starGeo.setAttribute('size', new THREE.BufferAttribute(starSize, 1))
starGeo.setAttribute('twinkle', new THREE.BufferAttribute(starTwinkle, 1))

const starMat = new THREE.ShaderMaterial({
  transparent: true,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
  uniforms: {
    uTime: { value: 0 },
    uOpacity: { value: 0 },
  },
  vertexShader: `
    attribute float size;
    attribute float twinkle;
    uniform float uTime;
    varying float vTw;
    void main(){
      vTw = twinkle;
      vec4 mv = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = size * (420.0 / -mv.z);
      gl_Position = projectionMatrix * mv;
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform float uOpacity;
    varying float vTw;
    void main(){
      vec2 c = gl_PointCoord - 0.5;
      float d = length(c);
      if (d > 0.5) discard;
      float tw = 0.78 + 0.22 * sin(uTime * 1.7 + vTw * 6.283);
      float a = exp(-d*4.2) * 1.18 * tw;
      // subtle color temp
      vec3 col = mix(vec3(0.92,0.96,1.0), vec3(1.0,0.96,0.82), fract(vTw*1.37)*0.22);
      gl_FragColor = vec4(col, a * uOpacity);
    }
  `,
})
const stars = new THREE.Points(starGeo, starMat)
scene.add(stars)

// ------------------------------------------------------------
// OCEAN — Shader with Gerstner waves + ripple system
// ------------------------------------------------------------
const OCEAN_SIZE = 800
const OCEAN_SEGS = 280 // 280x280 = 78k verts, beautiful + performant on modern
const oceanGeo = new THREE.PlaneGeometry(OCEAN_SIZE, OCEAN_SIZE, OCEAN_SEGS, OCEAN_SEGS)
oceanGeo.rotateX(-Math.PI / 2)

const MAX_RIPPLES = 12

const oceanUniforms = {
  uTime: { value: 0 },
  uSunDir: { value: new THREE.Vector3(0.3, 0.6, -0.7) },
  uDayFactor: { value: 1 },
  uSunColor: { value: new THREE.Color(0xfff2c0) },
  uWaterDeep: { value: new THREE.Color('#0a3448') },
  uWaterShallow: { value: new THREE.Color('#1e8fa8') },
  uWaterTrough: { value: new THREE.Color('#071d2e') },
  uRippleCenters: { value: Array.from({ length: MAX_RIPPLES }, () => new THREE.Vector2(9999, 9999)) },
  uRippleTimes: { value: new Float32Array(MAX_RIPPLES).fill(-100) },
  uRippleStrengths: { value: new Float32Array(MAX_RIPPLES).fill(0) },
  uRippleCount: { value: MAX_RIPPLES },
}

const oceanMat = new THREE.ShaderMaterial({
  uniforms: oceanUniforms,
  vertexShader: `
    uniform float uTime;
    uniform vec2 uRippleCenters[${MAX_RIPPLES}];
    uniform float uRippleTimes[${MAX_RIPPLES}];
    uniform float uRippleStrengths[${MAX_RIPPLES}];

    varying vec3 vPos;
    varying vec3 vNormal;
    varying float vElevation;
    varying vec2 vUv;
    varying float vRippleFoam;

    // gerstner helper
    float wave(vec2 pos, vec2 dir, float freq, float amp, float speed, float t){
      float d = dot(normalize(dir), pos);
      return sin(d * freq - t * speed) * amp;
    }
    // derivative for approximate normal
    float waveD(vec2 pos, vec2 dir, float freq, float amp, float speed, float t){
      float d = dot(normalize(dir), pos);
      return cos(d * freq - t * speed) * amp * freq;
    }

    void main(){
      vec3 pos = position;
      vec2 p = pos.xz;
      float t = uTime;

      // --- base Gerstner waves (matching JS for ship buoyancy) ---
      float h = 0.0;
      // swell long
      h += sin(p.x * 0.022 + p.y * 0.015 - t * 0.42) * 0.85;
      h += sin(p.x * -0.018 + p.y * 0.028 - t * 0.34) * 0.62;
      // medium wind waves
      h += wave(p, vec2(0.86, 0.51), 0.082, 0.46, 0.72, t);
      h += wave(p, vec2(-0.66, 0.75), 0.124, 0.28, 1.02, t);
      h += wave(p, vec2(0.31, -0.95), 0.178, 0.17, 1.22, t);
      h += wave(p, vec2(0.95, 0.32), 0.048, 0.38, 0.45, t);

      // chop / cross
      h += sin(p.x * 0.11 + t * 1.1) * cos(p.y * 0.09 - t * 0.9) * 0.09;

      float rippleSum = 0.0;
      float foamRipple = 0.0;
      for(int i=0; i<${MAX_RIPPLES}; i++){
        float start = uRippleTimes[i];
        float age = t - start;
        if(age < 0.0 || age > 8.5) continue;
        vec2 center = uRippleCenters[i];
        float strength = uRippleStrengths[i];
        float dist = distance(p, center);
        float front = age * 5.8; // propagation speed
        float ring = abs(dist - front);
        // width expands slightly with age
        float width = 1.35 + age * 0.18;
        float ringF = exp(- (ring*ring) / (width*width*0.62));
        float fadeTime = exp(-age * 0.52);
        float fadeDist = exp(-dist * 0.0085);
        float envelope = ringF * fadeTime * fadeDist * strength;
        // oscillation inside ring
        float osc = sin(dist * 2.55 - age * 7.2) * 0.5 + 0.5;
        // second harmonic for sharper crest
        float osc2 = sin(dist * 4.1 - age * 10.5) * 0.22;
        float rippleH = envelope * (osc + osc2) * 0.95;
        // add depression at center early
        if(dist < 2.2 && age < 1.2){
          rippleH -= (1.0 - smoothstep(0.0, 2.2, dist)) * exp(-age*2.2) * 0.32 * strength;
        }
        h += rippleH;
        rippleSum += rippleH * 0.9;
        foamRipple += envelope * 0.7;
      }

      pos.y = h;
      vElevation = h;
      vPos = pos;
      vUv = uv;
      vRippleFoam = foamRipple;

      // approximate normal via finite diff of Gerstner (cheap: use derivatives)
      float eps = 0.35;
      // sample heights offset for normal (recalc without ripples for performance, plus ripple approx)
      // quick analytic normal
      vec3 normal = normalize(vec3(
        - ( waveD(p+vec2(eps,0.0), vec2(0.86,0.51),0.082,0.46,0.72,t) - waveD(p-vec2(eps,0.0), vec2(0.86,0.51),0.082,0.46,0.72,t) )*0.5
          - (cos((p.x+eps)*0.022 + p.y*0.015 - t*0.42)*0.022*0.85) *0.5,
          1.0,
        - ( waveD(p+vec2(0.0,eps), vec2(-0.66,0.75),0.124,0.28,1.02,t) *0.5 )
          - (cos((p.y+eps)*0.028 - t*0.34)*0.028*0.62)*0.5
      ));
      // ripple normal perturbation (simplified)
      if(foamRipple > 0.001){
        normal.x += foamRipple * 0.08 * sin(p.x*2.2);
        normal.z += foamRipple * 0.08 * cos(p.y*2.2);
        normal = normalize(normal);
      }
      vNormal = normal;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 uSunDir;
    uniform float uDayFactor;
    uniform vec3 uSunColor;
    uniform vec3 uWaterDeep;
    uniform vec3 uWaterShallow;
    uniform vec3 uWaterTrough;

    varying vec3 vPos;
    varying vec3 vNormal;
    varying float vElevation;
    varying vec2 vUv;
    varying float vRippleFoam;

    void main(){
      vec3 N = normalize(vNormal);
      vec3 V = normalize(cameraPosition - vPos);
      vec3 L = normalize(uSunDir);
      float NdotL = max(dot(N, L), 0.0);
      float NdotV = max(dot(N, V), 0.0);

      // Fresnel
      float fresnel = pow(1.0 - NdotV, 3.2) * 0.9 + 0.12;

      // base water color by elevation + view angle
      float height01 = clamp(vElevation * 0.28 + 0.5, 0.0, 1.0);
      // deeper troughs darker
      vec3 base = mix(uWaterTrough, uWaterDeep, smoothstep(-1.2, 0.6, vElevation));
      base = mix(base, uWaterShallow, smoothstep(0.15, 1.1, vElevation) * 0.55);
      // shallow on crests
      base = mix(base, vec3(0.58,0.88,0.92), pow(max(height01-0.62,0.0)*1.9, 1.6) * 0.22);

      // specular sun highlight (Blinn)
      vec3 H = normalize(L + V);
      float spec = pow(max(dot(N, H), 0.0), 82.0) * (0.9 + fresnel*0.6);
      spec *= step(0.0, uSunDir.y) * (0.6 + 0.4 * uDayFactor);
      vec3 sunSpec = uSunColor * spec * 1.35;

      // diffuse sun tint on crests
      float diffuseCrest = NdotL * 0.22 * height01;
      base += uSunColor * diffuseCrest * 0.18 * uDayFactor;

      // foam on crest + ripple
      float crestFoam = smoothstep(0.72, 1.05, vElevation) * 0.42;
      // also foam where slope steep
      float slopeFoam = (1.0 - N.y) * 0.22;
      float foam = max(crestFoam + slopeFoam * 0.35, vRippleFoam * 0.52);
      foam = clamp(foam, 0.0, 1.0);
      // foam sparkle
      float sparkle = fract(sin(dot(vPos.xz, vec2(12.9898,78.233))) * 43758.5453);
      vec3 foamColor = vec3(0.96,0.98,1.0) + sparkle * 0.02;
      base = mix(base, foamColor, foam * 0.86);

      // subsurface scattering tint at horizon grazing (warm)
      float sss = pow(max(dot(V, -L)*0.5+0.5, 0.0), 3.0) * fresnel * 0.22;
      base += vec3(0.22,0.55,0.62) * sss * uDayFactor;

      // depth / distance haze (fake)
      float dist = length(vPos.xz) * 0.0012;
      float haze = clamp(dist, 0.0, 1.0);
      vec3 hazeCol = mix(vec3(0.68,0.82,0.92), vec3(0.96,0.68,0.48), (1.0 - uDayFactor)*0.2);
      // night haze darker blue
      hazeCol = mix(hazeCol, vec3(0.08,0.14,0.28), (1.0 - uDayFactor)*0.55);
      base = mix(base, hazeCol, haze * 0.42 * (0.55 + 0.45*uDayFactor));

      // combine
      vec3 color = base + sunSpec;
      // subtle darkening in troughs for depth
      color = mix(color, color * 0.88, smoothstep(0.2, -0.6, vElevation) * 0.18);

      // night dim + blue shift
      color = mix(color * 0.42 + vec3(0.02,0.06,0.14)*0.35, color, uDayFactor);

      // apply fresnel reflection of sky (already mixed but boost)
      vec3 skyRefl = mix(vec3(0.72,0.86,0.98), uSunColor, fresnel*0.22) * fresnel * 0.38 * uDayFactor;
      color += skyRefl * (0.6 + height01*0.4);

      // vignette not needed; tonemap hint
      float alpha = 1.0;
      gl_FragColor = vec4(color, alpha);
      // include fog blending via Three's fog will be auto? We're ShaderMaterial, so do manual
      // fogExp2 handled via scene.fog is not auto for ShaderMaterial; we apply approximate
      float fogDepth = length(cameraPosition - vPos);
      float fogFactor = 1.0 - exp(- fogDepth * 0.0085 * (1.0 - uDayFactor*0.35));
      // fog color lerp by day
      vec3 fogColorDay = vec3(0.78,0.88,0.96);
      vec3 fogColorNight = vec3(0.07,0.11,0.20);
      vec3 fogColorDusk = vec3(0.82,0.56,0.44);
      float sunY = uSunDir.y;
      float twilightFog = 1.0 - smoothstep(-0.22,0.22, abs(sunY));
      vec3 fogCol = mix(fogColorNight, fogColorDay, uDayFactor);
      fogCol = mix(fogCol, fogColorDusk, twilightFog * 0.55);
      gl_FragColor.rgb = mix(gl_FragColor.rgb, fogCol, fogFactor * 0.92);
    }
  `,
})

const ocean = new THREE.Mesh(oceanGeo, oceanMat)
ocean.receiveShadow = true
scene.add(ocean)

// subtle secondary ocean floor / depth plane slightly below for horizon line
const depthPlane = new THREE.Mesh(
  new THREE.PlaneGeometry(2400, 2400),
  new THREE.MeshBasicMaterial({ color: 0x051423 })
)
depthPlane.rotation.x = -Math.PI / 2
depthPlane.position.y = -3.2
scene.add(depthPlane)

// ------------------------------------------------------------
// CLOUDS — soft puff clusters on distant horizon
// ------------------------------------------------------------
function makeCloudCluster(pos, scale = 1) {
  const g = new THREE.Group()
  const mat = new THREE.MeshLambertMaterial({ color: 0xffffff, transparent: true, opacity: 0.82 })
  const count = 5 + Math.floor(Math.random() * 4)
  for (let i = 0; i < count; i++) {
    const s = (0.9 + Math.random() * 1.35) * scale
    const geo = new THREE.SphereGeometry(s, 8, 6)
    // flatten
    geo.scale(1.7, 0.72, 1.1)
    const m = new THREE.Mesh(geo, mat.clone())
    m.position.set(
      (Math.random() - 0.5) * 6 * scale,
      (Math.random() - 0.5) * 0.9 * scale,
      (Math.random() - 0.5) * 3 * scale
    )
    m.userData.baseY = m.position.y
    m.userData.phase = Math.random() * Math.PI * 2
    g.add(m)
  }
  g.position.copy(pos)
  g.userData.base = pos.clone()
  g.userData.phase = Math.random() * Math.PI * 2
  return g
}
const clouds = []
const cloudPositions = [
  new THREE.Vector3(-140, 28, -210),
  new THREE.Vector3(  95, 32, -260),
  new THREE.Vector3(-40,  24, -340),
  new THREE.Vector3(175, 26, -180),
  new THREE.Vector3(-190,21, -120),
  new THREE.Vector3( 30,  30, -190),
]
cloudPositions.forEach((p, i) => {
  const c = makeCloudCluster(p, 4.5 + (i % 3) * 1.2)
  clouds.push(c)
  scene.add(c)
})

// ------------------------------------------------------------
// SHIP — stylized wooden sailboat
// ------------------------------------------------------------
function createShip() {
  const ship = new THREE.Group()

  // Hull
  const hullGeo = new THREE.BoxGeometry(3.6, 0.78, 1.28, 18, 5, 8)
  const pos = hullGeo.attributes.position
  const v = new THREE.Vector3()
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i)
    let x = v.x // -1.8 stern to +1.8 bow
    let y = v.y
    let z = v.z
    const t = (x + 1.8) / 3.6
    let widthFactor = 1
    if (t > 0.56) {
      const k = (t - 0.56) / 0.44
      widthFactor = 1 - Math.pow(k, 1.45) * 0.96
      if (y > 0) y += k * k * 0.16
    } else if (t < 0.14) {
      const k = (0.14 - t) / 0.14
      widthFactor *= 1 - k * 0.14
    }
    // bottom keel rounding
    if (y < -0.06) {
      const keelDepth = Math.cos((z / 0.64) * Math.PI * 0.5) * 0.16
      y -= keelDepth * (0.6 + t * 0.22)
      // longitudinal rocker
      y -= Math.sin(t * Math.PI) * 0.08
    }
    // flare sides slightly outward at deck
    if (y > 0.12) {
      z *= 1.06
    }
    z *= widthFactor
    // bow rise
    if (t > 0.72 && y > -0.1) {
      y += Math.pow((t - 0.72) / 0.28, 2) * 0.11
    }
    pos.setXYZ(i, x, y, z)
  }
  hullGeo.computeVertexNormals()
  const hullMat = new THREE.MeshStandardMaterial({
    color: 0x6b3d26,
    roughness: 0.68,
    metalness: 0.02,
  })
  const hull = new THREE.Mesh(hullGeo, hullMat)
  hull.castShadow = true
  hull.receiveShadow = true
  hull.position.y = 0.02
  ship.add(hull)

  // deck planks visual: top face slightly lighter box
  const deckGeo = new THREE.BoxGeometry(2.95, 0.04, 0.98, 6, 1, 4)
  const deckMat = new THREE.MeshStandardMaterial({ color: 0xc49a6b, roughness: 0.82 })
  const deck = new THREE.Mesh(deckGeo, deckMat)
  deck.position.set(-0.08, 0.46, 0)
  deck.receiveShadow = true
  ship.add(deck)

  // deck line detail (planks)
  const plankGeo = new THREE.BoxGeometry(2.9, 0.007, 0.012)
  const plankMat = new THREE.MeshStandardMaterial({ color: 0x8f6a3e })
  for (let i = -3; i <= 3; i++) {
    const p = new THREE.Mesh(plankGeo, plankMat)
    p.position.set(-0.08, 0.485, i * 0.13)
    ship.add(p)
  }

  // cabin
  const cabinGeo = new THREE.BoxGeometry(0.9, 0.42, 0.72, 4, 2, 2)
  const cabinMat = new THREE.MeshStandardMaterial({ color: 0xe8ddd0, roughness: 0.9 })
  const cabin = new THREE.Mesh(cabinGeo, cabinMat)
  cabin.position.set(-0.78, 0.68, 0)
  cabin.castShadow = true
  ship.add(cabin)
  // cabin roof
  const roofGeo = new THREE.BoxGeometry(0.96, 0.06, 0.78)
  const roofMat = new THREE.MeshStandardMaterial({ color: 0x6b3d26 })
  const roof = new THREE.Mesh(roofGeo, roofMat)
  roof.position.set(-0.78, 0.92, 0)
  ship.add(roof)
  // small windows
  const winGeo = new THREE.PlaneGeometry(0.18, 0.12)
  const winMat = new THREE.MeshStandardMaterial({ color: 0x2a3a4a, roughness: 0.2, metalness: 0.4 })
  const winL = new THREE.Mesh(winGeo, winMat)
  winL.position.set(-0.78, 0.68, 0.371)
  winL.rotation.y = 0
  ship.add(winL)
  const winR = winL.clone()
  winR.position.z = -0.371
  winR.rotation.y = Math.PI
  ship.add(winR)

  // mast
  const mastGeo = new THREE.CylinderGeometry(0.024, 0.030, 3.35, 10)
  const mastMat = new THREE.MeshStandardMaterial({ color: 0x3d281b, roughness: 0.85 })
  const mast = new THREE.Mesh(mastGeo, mastMat)
  mast.position.set(0.38, 2.02, 0)
  mast.castShadow = true
  ship.add(mast)
  // boom
  const boomGeo = new THREE.CylinderGeometry(0.018, 0.018, 1.42, 8)
  boomGeo.rotateZ(Math.PI / 2)
  const boom = new THREE.Mesh(boomGeo, mastMat)
  boom.position.set(0.02, 1.12, 0)
  ship.add(boom)

  // sail — shape with curve
  const sailShape = new THREE.Shape()
  sailShape.moveTo(0, 0)
  sailShape.lineTo(0, 2.58)
  sailShape.quadraticCurveTo(0.42, 1.45, 1.12, 0.42)
  sailShape.quadraticCurveTo(0.55, 0.18, 0, 0)
  const sailGeo = new THREE.ShapeGeometry(sailShape, 18)
  // add curvature to sail (bulge)
  const sailPos = sailGeo.attributes.position
  for (let i = 0; i < sailPos.count; i++) {
    const sx = sailPos.getX(i)
    const sy = sailPos.getY(i)
    const bulge = Math.sin((sy / 2.58) * Math.PI) * 0.18 * (sx / 1.12)
    sailPos.setZ(i, bulge)
  }
  sailGeo.computeVertexNormals()
  const sailMat = new THREE.MeshStandardMaterial({
    color: 0xfffaf2,
    side: THREE.DoubleSide,
    roughness: 0.88,
    metalness: 0.0,
  })
  const sail = new THREE.Mesh(sailGeo, sailMat)
  sail.position.set(0.38, 1.12, 0.018)
  sail.rotation.y = 0.02
  sail.castShadow = true
  ship.add(sail)
  // sail seam lines
  const seamMat = new THREE.LineBasicMaterial({ color: 0xe8dcc8, transparent: true, opacity: 0.9 })
  for (let y = 0.6; y < 2.45; y += 0.42) {
    const pts = []
    const yy = y
    for (let x = 0; x <= 1.12; x += 0.14) {
      // interpolate width at height
      const t2 = yy / 2.58
      const w = (1 - t2) * 1.12 * (0.86 + 0.14 * Math.sin(t2 * Math.PI))
      if (x > w) break
      const bulge = Math.sin(t2 * Math.PI) * 0.18 * (x / 1.12)
      pts.push(new THREE.Vector3(0.38 + x, 1.12 + yy, 0.022 + bulge))
    }
    const lineGeo = new THREE.BufferGeometry().setFromPoints(pts)
    const line = new THREE.Line(lineGeo, seamMat)
    ship.add(line)
  }
  // jib (front small sail)
  const jibShape = new THREE.Shape()
  jibShape.moveTo(0, 0)
  jibShape.lineTo(0.02, 1.95)
  jibShape.lineTo(1.18, 0.08)
  jibShape.lineTo(0, 0)
  const jibGeo = new THREE.ShapeGeometry(jibShape, 12)
  const jibPos = jibGeo.attributes.position
  for (let i = 0; i < jibPos.count; i++) {
    const sx = jibPos.getX(i)
    const sy = jibPos.getY(i)
    jibPos.setZ(i, Math.sin((sy / 1.95) * Math.PI) * 0.09 * (sx / 1.18))
  }
  jibGeo.computeVertexNormals()
  const jib = new THREE.Mesh(jibGeo, sailMat.clone())
  jib.material.color.setHex(0xfff8ee)
  jib.position.set(0.48, 0.62, 0)
  jib.rotation.y = -0.04
  ship.add(jib)

  // rigging lines (thin)
  const ropeMat = new THREE.LineBasicMaterial({ color: 0x1e120b, transparent: true, opacity: 0.92 })
  function rope(a, b) {
    const g = new THREE.BufferGeometry().setFromPoints([a, b])
    ship.add(new THREE.Line(g, ropeMat))
  }
  rope(new THREE.Vector3(0.38, 3.55, 0), new THREE.Vector3(-1.48, 0.52, 0))
  rope(new THREE.Vector3(0.38, 3.55, 0), new THREE.Vector3(1.68, 0.46, 0))
  rope(new THREE.Vector3(0.38, 2.55, 0), new THREE.Vector3(-0.15, 0.52, 0.52))
  rope(new THREE.Vector3(0.38, 2.55, 0), new THREE.Vector3(-0.15, 0.52, -0.52))

  // bow detail (anchor)
  const anchorGeo = new THREE.TorusGeometry(0.05, 0.012, 6, 10, Math.PI * 1.3)
  const metalMat = new THREE.MeshStandardMaterial({ color: 0x2b2f36, roughness: 0.42, metalness: 0.55 })
  const anchor = new THREE.Mesh(anchorGeo, metalMat)
  anchor.position.set(1.82, 0.14, 0)
  anchor.rotation.z = Math.PI * 0.15
  anchor.rotation.y = Math.PI / 2
  ship.add(anchor)

  // stern rudder
  const rudderGeo = new THREE.BoxGeometry(0.04, 0.42, 0.32)
  const rudder = new THREE.Mesh(rudderGeo, hullMat)
  rudder.position.set(-1.84, -0.08, 0)
  ship.add(rudder)

  // subtle waterline stain
  const stainGeo = new THREE.BoxGeometry(3.55, 0.06, 1.30)
  const stainMat = new THREE.MeshStandardMaterial({ color: 0x3a2516, roughness: 1 })
  const stain = new THREE.Mesh(stainGeo, stainMat)
  stain.position.set(0, -0.12, 0)
  ship.add(stain)

  ship.userData.hull = hull
  ship.userData.sail = sail
  ship.userData.jib = jib

  return ship
}

const ship = createShip()
ship.position.set(0, 0.38, 0)
scene.add(ship)

// small wake / foam ring under ship (procedural disc)
const wakeGeo = new THREE.RingGeometry(0.85, 1.65, 32)
wakeGeo.rotateX(-Math.PI / 2)
const wakeMat = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  transparent: true,
  opacity: 0.0,
  side: THREE.DoubleSide,
})
const wake = new THREE.Mesh(wakeGeo, wakeMat)
wake.position.y = 0.015
ship.add(wake)

// ------------------------------------------------------------
// BIRDS — simple distant V
// ------------------------------------------------------------
function makeBirds() {
  const g = new THREE.Group()
  const birdMat = new THREE.MeshBasicMaterial({ color: 0x1a2333, transparent: true, opacity: 0.72 })
  for (let i = 0; i < 7; i++) {
    const wingGeo = new THREE.BufferGeometry()
    const verts = new Float32Array([
      -0.18, 0, 0,  0, 0.045, 0,  0.18, 0, 0,
    ])
    wingGeo.setAttribute('position', new THREE.BufferAttribute(verts, 3))
    wingGeo.setIndex([0,1,2])
    wingGeo.computeVertexNormals()
    const b = new THREE.Mesh(wingGeo, birdMat)
    b.position.set((Math.random()-0.5)*12, 7+Math.random()*5, (Math.random()-0.5)*8 - 18)
    b.userData.phase = Math.random()*Math.PI*2
    b.userData.speed = 0.7 + Math.random()*0.45
    b.userData.baseY = b.position.y
    b.userData.baseX = b.position.x
    g.add(b)
  }
  return g
}
const birds = makeBirds()
scene.add(birds)

// ------------------------------------------------------------
// RIPPLE SYSTEM
// ------------------------------------------------------------
let rippleIndex = 0
const ripples = Array.from({ length: MAX_RIPPLES }, () => ({ active: false }))

function addRipple(x, z, strength = 1) {
  const i = rippleIndex % MAX_RIPPLES
  oceanUniforms.uRippleCenters.value[i].set(x, z)
  oceanUniforms.uRippleTimes.value[i] = elapsed
  oceanUniforms.uRippleStrengths.value[i] = strength
  rippleIndex++
  // visual ring feedback
  spawnRing(x, z)
  // wake impulse on ship if close
  const dShip = Math.hypot(x - ship.position.x, z - ship.position.z)
  if (dShip < 6) {
    ship.userData.impulse = (ship.userData.impulse || 0) + (1 - dShip/6) * 0.42 * strength
  }
}

// decorative expanding rings ( MeshBasicMaterial rings )
const rings = []
const ringPool = []
function getRingMesh() {
  let m = ringPool.pop()
  if (!m) {
    const g = new THREE.RingGeometry(0.1, 0.16, 36)
    g.rotateX(-Math.PI/2)
    const mat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.55, side: THREE.DoubleSide })
    m = new THREE.Mesh(g, mat)
  }
  return m
}
function spawnRing(x, z) {
  const m = getRingMesh()
  m.position.set(x, 0.04, z)
  m.scale.set(1,1,1)
  m.material.opacity = 0.52
  m.userData.age = 0
  m.userData.maxAge = 3.2 + Math.random()*0.6
  scene.add(m)
  rings.push(m)
  // secondary inner ring
  const m2 = getRingMesh()
  m2.position.set(x, 0.045, z)
  m2.scale.set(0.55,0.55,0.55)
  m2.material.opacity = 0.42
  m2.material.color.setHex(0xfff3cc)
  m2.userData.age = 0
  m2.userData.maxAge = 2.4
  scene.add(m2)
  rings.push(m2)
}

// ------------------------------------------------------------
// RAYCAST CLICK
// ------------------------------------------------------------
const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()
let pointerDown = false

function getIntersectPoint(event) {
  const rect = renderer.domElement.getBoundingClientRect()
  const x = ((event.clientX - rect.left) / rect.width) * 2 - 1
  const y = -((event.clientY - rect.top) / rect.height) * 2 + 1
  mouse.set(x, y)
  raycaster.setFromCamera(mouse, camera)
  const hits = raycaster.intersectObject(ocean)
  if (hits.length) return hits[0].point
  // fallback: plane y=0
  const plane = new THREE.Plane(new THREE.Vector3(0,1,0), 0)
  const pt = new THREE.Vector3()
  raycaster.ray.intersectPlane(plane, pt)
  return pt
}

renderer.domElement.addEventListener('pointerdown', (e) => {
  pointerDown = true
  const p = getIntersectPoint(e)
  if (p) {
    // clamp to ocean size
    if (Math.abs(p.x) < OCEAN_SIZE*0.48 && Math.abs(p.z) < OCEAN_SIZE*0.48) {
      const strength = 1.0 + Math.random()*0.25
      addRipple(p.x, p.z, strength)
    }
  }
})
renderer.domElement.addEventListener('pointerup', () => pointerDown = false)
renderer.domElement.addEventListener('pointermove', (e) => {
  if (pointerDown) {
    // drag to create trail if moving fast? occasional ripple
    if (Math.random() < 0.22) {
      const p = getIntersectPoint(e)
      if (p && Math.abs(p.x) < OCEAN_SIZE*0.48) addRipple(p.x, p.z, 0.65)
    }
  }
})
// also add subtle auto ripples from "fish"
let autoRippleTimer = 0

// prevent context menu on right click to allow interaction
renderer.domElement.addEventListener('contextmenu', e => e.preventDefault())

// ------------------------------------------------------------
// TIME / DAY-NIGHT CYCLE
// ------------------------------------------------------------
const clock = new THREE.Clock()
let elapsed = 18 // start at pleasant morning golden hour
const CYCLE_DURATION = 92 // seconds for full day/night, relaxing slow
// allow user to scrub? we auto proceed
const timeThumb = document.getElementById('time-thumb')
const timeLabel = document.getElementById('time-label')

function updateDayNight(t) {
  const angle = (t / CYCLE_DURATION) * Math.PI * 2 - Math.PI * 0.22 // offset so dawn starts visible
  const radius = 380
  const sunY = Math.sin(angle) * 280
  const sunX = Math.cos(angle) * 260
  const sunZ = -340 // far horizon south
  const sunDir = new THREE.Vector3(sunX, sunY, sunZ).normalize()
  const sunPos = sunDir.clone().multiplyScalar(radius)
  // keep y bias: place horizon at 0, so y is altitude
  // shift sunPos so its direction matches but visual distance fixed
  sunGroup.position.copy(sunPos)
  sunGroup.lookAt(0,0,0)
  // keep flare facing camera
  sunGroup.userData.flare.lookAt(camera.position)

  const moonAngle = angle + Math.PI
  const moonDir = new THREE.Vector3(Math.cos(moonAngle)*260, Math.sin(moonAngle)*280, -340).normalize()
  const moonPos = moonDir.clone().multiplyScalar(radius*0.96)
  moonGroup.position.copy(moonPos)
  moonGroup.userData.flare.lookAt(camera.position)

  // dayFactor based on sunY
  const dayFactor = THREE.MathUtils.clamp(THREE.MathUtils.smoothstep(sunY, -24, 46), 0, 1)
  const twilight = 1 - THREE.MathUtils.smoothstep(-38, 38, Math.abs(sunY))

  // update uniforms
  skyMat.uniforms.uSunDir.value.copy(sunDir)
  skyMat.uniforms.uDayFactor.value = dayFactor
  oceanUniforms.uSunDir.value.copy(sunDir)
  oceanUniforms.uDayFactor.value = dayFactor
  starMat.uniforms.uOpacity.value = THREE.MathUtils.lerp(
    starMat.uniforms.uOpacity.value,
    1 - dayFactor,
    0.03
  )
  // colors interpolation
  const deepDay = new THREE.Color('#082a3d')
  const deepNight = new THREE.Color('#050e1f')
  const deepDusk = new THREE.Color('#1a2740')
  const shallowDay = new THREE.Color('#1f8fae')
  const shallowNight = new THREE.Color('#0d2a42')
  const shallowDusk = new THREE.Color('#2a6b8a')
  let deep = deepDay.clone().lerp(deepNight, 1 - dayFactor)
  let shallow = shallowDay.clone().lerp(shallowNight, 1 - dayFactor)
  if (twilight > 0.01) {
    deep.lerp(deepDusk, twilight * 0.62)
    shallow.lerp(shallowDusk, twilight * 0.45)
  }
  oceanUniforms.uWaterDeep.value.copy(deep)
  oceanUniforms.uWaterShallow.value.copy(shallow)
  oceanUniforms.uWaterTrough.value.copy(deep.clone().multiplyScalar(0.72))

  const sunColDay = new THREE.Color('#fff1c8')
  const sunColDusk = new THREE.Color('#ff8d4a')
  const sunColNight = new THREE.Color('#a8c4ff')
  let sunCol = sunColDay.clone().lerp(sunColNight, 1 - dayFactor)
  sunCol.lerp(sunColDusk, twilight * 0.78)
  oceanUniforms.uSunColor.value.copy(sunCol)
  skyMat.uniforms.uSunColor.value.copy(sunCol)
  sunGroup.userData.glowMat.uniforms.uColor.value.copy(sunCol)
  moonGroup.userData.glowMat.uniforms.uColor.value.copy(new THREE.Color('#d6e6ff'))

  // light intensities
  sunLight.intensity = THREE.MathUtils.lerp(0.0, 2.35, THREE.MathUtils.smoothstep(sunY, -12, 30))
  sunLight.position.copy(sunDir.clone().multiplyScalar(140))
  sunLight.target.position.set(0,0,0)
  sunLight.target.updateMatrixWorld()
  ambient.intensity = THREE.MathUtils.lerp(0.18, 0.62, dayFactor)
  hemi.intensity = THREE.MathUtils.lerp(0.22, 0.72, dayFactor)
  moonLight.intensity = THREE.MathUtils.lerp(0.48, 0.06, dayFactor)
  moonLight.position.copy(moonDir.clone().multiplyScalar(140))
  fillLight.intensity = THREE.MathUtils.lerp(0.06, 0.18, dayFactor) + twilight * 0.08

  // fog
  const fogDay = new THREE.Color('#8fb9db')
  const fogNight = new THREE.Color('#0a1424')
  const fogDusk = new THREE.Color('#b07a5a')
  let fogCol = fogDay.clone().lerp(fogNight, 1 - dayFactor)
  fogCol.lerp(fogDusk, twilight * 0.68)
  scene.fog.color.copy(fogCol)
  scene.fog.density = THREE.MathUtils.lerp(0.0082, 0.0056, dayFactor) + twilight * 0.0025
  renderer.setClearColor(fogCol, 1)

  // sun/moon visibility
  const sunAbove = sunY > -18
  sunGroup.visible = true
  // fade glow when below horizon
  const sunAlpha = THREE.MathUtils.clamp(THREE.MathUtils.smoothstep(sunY, -26, 6), 0, 1)
  sunGroup.userData.mesh.material.opacity = sunAlpha
  sunGroup.userData.glowMat.uniforms.uIntensity.value = sunAlpha * (0.72 + twilight * 0.55)
  sunGroup.userData.flare.material.opacity = sunAlpha * 0.62
  sunGroup.scale.setScalar(THREE.MathUtils.lerp(0.78, 1.18, dayFactor) + twilight * 0.22)

  const moonAlpha = THREE.MathUtils.clamp(THREE.MathUtils.smoothstep(moonDir.y, -0.08, 0.12) , 0, 1)
  moonGroup.visible = moonAlpha > 0.02
  moonGroup.userData.mesh.material.opacity = moonAlpha * 0.92
  moonGroup.userData.glowMat.uniforms.uIntensity.value = moonAlpha * 0.42
  moonGroup.userData.flare.material.opacity = moonAlpha * 0.28
  // scale moon slightly larger at horizon (moon illusion)
  const moonHoriz = 1 - Math.abs(moonDir.y)
  moonGroup.scale.setScalar(1 + moonHoriz * 0.18)

  // clouds color/tint
  clouds.forEach(c => {
    const tint = fogCol.clone().lerp(new THREE.Color(0xffffff), 0.55 + dayFactor*0.34)
    c.children.forEach(m => {
      m.material.color.copy(tint)
      m.material.opacity = THREE.MathUtils.lerp(0.22, 0.86, dayFactor) + twilight * 0.12
    })
  })

  // time UI
  const prog = ((t % CYCLE_DURATION) / CYCLE_DURATION) * 100
  timeThumb.style.left = prog + '%'
  let label = 'day'
  if (dayFactor > 0.78) label = 'day'
  else if (dayFactor > 0.52) label = 'golden'
  else if (dayFactor > 0.32) label = 'dusk'
  else if (dayFactor > 0.14) label = 'twilight'
  else if (dayFactor > 0.05) label = 'night'
  else label = 'midnight'
  // show twilight override when sun near horizon regardless
  if (twilight > 0.65 && dayFactor > 0.08 && dayFactor < 0.76) label = sunY > 0 ? 'sunset' : 'dawn'
  timeLabel.textContent = label
  timeThumb.style.boxShadow = `0 0 10px ${sunCol.getStyle()}, 0 0 22px ${sunCol.getStyle()}`
  timeThumb.style.background = sunCol.getStyle()

  return { sunDir, dayFactor, twilight }
}

// ------------------------------------------------------------
// WAVE HEIGHT JS (mirrors shader for buoyancy)
// ------------------------------------------------------------
function getWaveHeight(x, z, t) {
  let h = 0
  h += Math.sin(x * 0.022 + z * 0.015 - t * 0.42) * 0.85
  h += Math.sin(x * -0.018 + z * 0.028 - t * 0.34) * 0.62
  const w = (pos, dir, freq, amp, speed) => {
    const d = (dir[0]*pos[0] + dir[1]*pos[1]) / Math.hypot(dir[0], dir[1])
    return Math.sin(d * freq - t * speed) * amp
  }
  h += w([x, z], [0.86, 0.51], 0.082, 0.46, 0.72)
  h += w([x, z], [-0.66, 0.75], 0.124, 0.28, 1.02)
  h += w([x, z], [0.31, -0.95], 0.178, 0.17, 1.22)
  h += w([x, z], [0.95, 0.32], 0.048, 0.38, 0.45)
  h += Math.sin(x * 0.11 + t * 1.1) * Math.cos(z * 0.09 - t * 0.9) * 0.09
  // ripples
  for (let i = 0; i < MAX_RIPPLES; i++) {
    const cx = oceanUniforms.uRippleCenters.value[i].x
    const cz = oceanUniforms.uRippleCenters.value[i].y
    const start = oceanUniforms.uRippleTimes.value[i]
    const age = t - start
    if (age < 0 || age > 8.5 || oceanUniforms.uRippleStrengths.value[i] <= 0) continue
    const strength = oceanUniforms.uRippleStrengths.value[i]
    const dx = x - cx
    const dz = z - cz
    const dist = Math.hypot(dx, dz)
    const front = age * 5.8
    const ring = Math.abs(dist - front)
    const width = 1.35 + age * 0.18
    const ringF = Math.exp(-(ring*ring)/(width*width*0.62))
    const fadeTime = Math.exp(-age * 0.52)
    const fadeDist = Math.exp(-dist * 0.0085)
    const envelope = ringF * fadeTime * fadeDist * strength
    const osc = Math.sin(dist * 2.55 - age * 7.2) * 0.5 + 0.5
    const osc2 = Math.sin(dist * 4.1 - age * 10.5) * 0.22
    let rh = envelope * (osc + osc2) * 0.95
    if (dist < 2.2 && age < 1.2) {
      const k = 1 - Math.min(dist/2.2, 1)
      rh -= k * Math.exp(-age*2.2) * 0.32 * strength
    }
    h += rh
  }
  return h
}

// ------------------------------------------------------------
// AUDIO — gentle procedural ambience (optional, not autoplay blocked)
// ------------------------------------------------------------
let audioCtx, gainNode, oscA, oscB, filter, lfo, startedAudio = false
function initAudio() {
  if (startedAudio) return
  try {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)()
    gainNode = audioCtx.createGain()
    gainNode.gain.value = 0.0
    gainNode.connect(audioCtx.destination)
    filter = audioCtx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = 900
    filter.Q.value = 0.6
    filter.connect(gainNode)
    // two detuned sines for "wind + water"
    oscA = audioCtx.createOscillator()
    oscA.type = 'sine'
    oscA.frequency.value = 54 // low drone
    const gA = audioCtx.createGain()
    gA.gain.value = 0.18
    oscA.connect(gA).connect(filter)
    oscB = audioCtx.createOscillator()
    oscB.type = 'sine'
    oscB.frequency.value = 108.5
    const gB = audioCtx.createGain()
    gB.gain.value = 0.07
    oscB.connect(gB).connect(filter)
    // subtle brown noise via buffer
    const nLen = audioCtx.sampleRate * 2
    const buffer = audioCtx.createBuffer(1, nLen, audioCtx.sampleRate)
    const data = buffer.getChannelData(0)
    let last = 0
    for (let i=0;i<nLen;i++){
      const white = Math.random()*2-1
      last = (last + 0.022*white) / 1.022
      data[i] = last * 0.7
    }
    const src = audioCtx.createBufferSource()
    src.buffer = buffer
    src.loop = true
    const gN = audioCtx.createGain()
    gN.gain.value = 0.055
    const f2 = audioCtx.createBiquadFilter()
    f2.type = 'lowpass'
    f2.frequency.value = 420
    src.connect(f2).connect(gN).connect(filter)
    // lfo for swell
    lfo = audioCtx.createOscillator()
    lfo.frequency.value = 0.045
    const lfoGain = audioCtx.createGain()
    lfoGain.gain.value = 0.018
    lfo.connect(lfoGain).connect(gainNode.gain)
    oscA.start(); oscB.start(); src.start(); lfo.start()
    startedAudio = true
  } catch(e){ console.warn('audio init fail', e) }
}
function setAudioEnabled(enabled) {
  if (!startedAudio && enabled) initAudio()
  if (!audioCtx) return
  if (audioCtx.state === 'suspended') audioCtx.resume()
  const now = audioCtx.currentTime
  gainNode.gain.cancelScheduledValues(now)
  gainNode.gain.linearRampToValueAtTime(enabled ? 0.0 : gainNode.gain.value, now)
  gainNode.gain.linearRampToValueAtTime(enabled ? 0.085 : 0.0, now + 1.2)
  if (filter) {
    filter.frequency.cancelScheduledValues(now)
    filter.frequency.linearRampToValueAtTime(enabled ? 820 : 400, now + 0.8)
  }
}
let audioOn = false
const soundBtn = document.getElementById('sound-toggle')
soundBtn.addEventListener('click', () => {
  audioOn = !audioOn
  soundBtn.classList.toggle('muted', !audioOn)
  soundBtn.textContent = audioOn ? '♪' : '♫'
  setAudioEnabled(audioOn)
  if (audioOn && audioCtx && audioCtx.state === 'suspended') audioCtx.resume()
})
// also enable on first interaction if user clicked sea
renderer.domElement.addEventListener('pointerdown', () => {
  if (!startedAudio && !audioOn) {
    // don't auto-enable, but prepare context on gesture
    initAudio()
    if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume()
  }
}, { once: true })

// ------------------------------------------------------------
// ANIMATION LOOP
// ------------------------------------------------------------
let frame = 0
function animate() {
  requestAnimationFrame(animate)
  const delta = clock.getDelta()
  elapsed += delta
  frame++

  const t = elapsed // unified time for waves + sky (keeps sunrise in sync)
  oceanUniforms.uTime.value = t
  skyMat.uniforms.uTime.value = t
  starMat.uniforms.uTime.value = t

  const { dayFactor } = updateDayNight(elapsed)

  // orbit controls
  controls.update()

  // ocean auto ripples occasionally for life
  autoRippleTimer -= delta
  if (autoRippleTimer <= 0) {
    autoRippleTimer = 6.5 + Math.random()*7.5
    // random distant splash
    const rx = (Math.random()-0.5)*220
    const rz = (Math.random()-0.5)*220 - 14
    // don't spawn too close to camera/shore
    if (Math.hypot(rx, rz) > 14) {
      oceanUniforms.uRippleCenters.value[rippleIndex % MAX_RIPPLES].set(rx, rz)
      oceanUniforms.uRippleTimes.value[rippleIndex % MAX_RIPPLES] = t
      oceanUniforms.uRippleStrengths.value[rippleIndex % MAX_RIPPLES] = 0.42 + Math.random()*0.32
      rippleIndex++
      // occasionally also show ring but more subtle
      if (Math.random() < 0.5) {
        const m = getRingMesh()
        m.position.set(rx, 0.03, rz)
        m.scale.set(0.7,0.7,0.7)
        m.material.opacity = 0.18
        m.material.color.setHex(0xffffff)
        m.userData.age = 0
        m.userData.maxAge = 2.8
        scene.add(m)
        rings.push(m)
      }
    }
  }

  // ship buoyancy physics
  const sx = ship.position.x
  const sz = ship.position.z
  const hCenter = getWaveHeight(sx, sz, t)
  // sample around for pitch/roll
  const hxF = getWaveHeight(sx + 1.45, sz, t)
  const hxB = getWaveHeight(sx - 1.45, sz, t)
  const hzL = getWaveHeight(sx, sz + 0.62, t)
  const hzR = getWaveHeight(sx, sz - 0.62, t)
  const pitch = Math.atan2(hxF - hxB, 2.9) // bow vs stern
  const roll  = Math.atan2(hzR - hzL, 1.24)

  // smooth
  ship.position.y = THREE.MathUtils.lerp(ship.position.y, hCenter + 0.38, 0.08)
  // add gentle bob from impulse of ripples
  if (ship.userData.impulse) {
    ship.position.y += ship.userData.impulse * Math.sin(t*6.2) * 0.06
    ship.userData.impulse *= 0.985
    if (ship.userData.impulse < 0.001) ship.userData.impulse = 0
  }
  // secondary micro bob
  ship.position.y += Math.sin(t*0.62)*0.025 + Math.sin(t*1.14)*0.012

  ship.rotation.x = THREE.MathUtils.lerp(ship.rotation.x, -pitch * 0.72, 0.05)
  ship.rotation.z = THREE.MathUtils.lerp(ship.rotation.z, roll * 0.82, 0.05)
  // gentle yaw sway as if at anchor
  ship.rotation.y = Math.sin(t * 0.19) * 0.07 + Math.sin(t * 0.07) * 0.045
  // sail flutter slightly with wind (based on wave)
  if (ship.userData.sail) {
    ship.userData.sail.rotation.y = Math.sin(t*0.9)*0.03 + Math.sin(t*0.34)*0.015
    ship.userData.jib.rotation.y = -0.04 + Math.sin(t*0.78)*0.022
  }
  // wake opacity pulses with movement speed (pitch/roll velocity)
  const moveIntensity = Math.abs(pitch) + Math.abs(roll)
  wake.material.opacity = THREE.MathUtils.lerp(wake.material.opacity, THREE.MathUtils.clamp(moveIntensity*1.8 + 0.08, 0, 0.22), 0.06)
  wake.scale.setScalar(1 + Math.sin(t*1.1)*0.06)
  // orbit wake slightly behind stern
  wake.position.z = THREE.MathUtils.lerp(wake.position.z, -roll*0.8, 0.04)

  // clouds drift very slowly
  clouds.forEach((c, idx) => {
    const drift = delta * (0.22 + idx*0.04)
    c.position.x += Math.sin(t*0.04 + c.userData.phase) * drift * 0.12
    c.position.z += drift * 0.18
    // wrap
    if (c.position.z > 80) c.position.z = -360
    if (c.position.x > 240) c.position.x = -240
    if (c.position.x < -240) c.position.x = 240
    c.children.forEach((m, j) => {
      m.position.y = m.userData.baseY + Math.sin(t*0.31 + m.userData.phase + j) * 0.14
    })
    // face camera? keep puff orientation soft
    c.lookAt(camera.position)
  })

  // birds
  birds.children.forEach(b => {
    b.position.x += delta * b.userData.speed * 0.9
    if (b.position.x > 24) b.position.x = -24
    b.position.y = b.userData.baseY + Math.sin(t*1.8 + b.userData.phase)*0.42
    // wing flap via scale y
    const flap = Math.sin(t*9 + b.userData.phase) * 0.62
    b.scale.y = 0.12 + Math.abs(flap)*0.28
    b.lookAt(camera.position)
  })
  birds.visible = dayFactor > 0.28
  birds.children.forEach(b => b.material.opacity = THREE.MathUtils.lerp(0.0, 0.58, THREE.MathUtils.smoothstep(dayFactor, 0.28, 0.42)))

  // rings update
  for (let i = rings.length - 1; i >= 0; i--) {
    const r = rings[i]
    r.userData.age += delta
    const age = r.userData.age
    const maxAge = r.userData.maxAge
    const prog2 = age / maxAge
    r.scale.setScalar(1 + prog2 * 9.5)
    r.material.opacity = (1 - prog2) * 0.46 * (1 - prog2*0.6)
    // follow water height slightly
    r.position.y = getWaveHeight(r.position.x, r.position.z, t) + 0.04
    if (age >= maxAge) {
      scene.remove(r)
      rings.splice(i, 1)
      ringPool.push(r)
      // reset color for reuse
      r.material.color.setHex(0xffffff)
    }
  }

  // audio subtle param drift
  if (startedAudio && audioOn && audioCtx) {
    // modulate filter with dayFactor for warmer day
    filter.frequency.value = THREE.MathUtils.lerp(filter.frequency.value, 540 + dayFactor*560 + Math.sin(t*0.07)*60, 0.02)
    if (oscA) oscA.frequency.value = 52 + Math.sin(t*0.11)*1.2 + dayFactor*2
  }

  renderer.render(scene, camera)
}
animate()

// ------------------------------------------------------------
// RESIZE
// ------------------------------------------------------------
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// ------------------------------------------------------------
// LOADER
// ------------------------------------------------------------
function hideLoader(){
  const el = document.getElementById('loader')
  if (!el || el.classList.contains('hidden')) return
  el.classList.add('hidden')
  // gentle camera intro
  const start = camera.position.clone()
  const target = new THREE.Vector3(9, 6.2, 11)
  let p = 0
  function intro() {
    p += 0.01
    if (p < 1) {
      const e = 1 - Math.pow(1 - p, 3)
      camera.position.lerpVectors(start, target, e)
      requestAnimationFrame(intro)
    }
  }
  intro()
  // initial gentle ripples
  setTimeout(() => addRipple(5, -2, 0.95), 800)
  setTimeout(() => addRipple(-7, 4, 0.72), 1400)
}
window.addEventListener('load', () => setTimeout(hideLoader, 480))
if (document.readyState === 'complete') setTimeout(hideLoader, 600)
else setTimeout(() => { const el=document.getElementById('loader'); if(el && !el.classList.contains('hidden')) hideLoader(); }, 2600)

// handle visibility to pause audio context
document.addEventListener('visibilitychange', () => {
  if (document.hidden && audioCtx) audioCtx.suspend()
  else if (!document.hidden && audioCtx && audioOn) audioCtx.resume()
})

// initial sky
updateDayNight(elapsed)

// ------------------------------------------------------------
// EASTER: double-click ship to make it rock
// ------------------------------------------------------------
raycaster // ensure
renderer.domElement.addEventListener('dblclick', (e) => {
  const rect = renderer.domElement.getBoundingClientRect()
  mouse.set(((e.clientX-rect.left)/rect.width)*2-1, -((e.clientY-rect.top)/rect.height)*2+1)
  raycaster.setFromCamera(mouse, camera)
  const hits = raycaster.intersectObject(ship, true)
  if (hits.length) {
    // big splash
    const p = ship.position
    for (let i=0;i<3;i++) setTimeout(()=>addRipple(p.x + (Math.random()-0.5)*1.8, p.z+(Math.random()-0.5)*1.8, 1.25), i*120)
    ship.userData.impulse = 1.8
    // camera shake hint
    controls.target.y += 0.08
    setTimeout(()=>controls.target.y-=0.08, 340)
  }
})
