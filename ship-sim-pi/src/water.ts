import * as THREE from 'three'

export const MAX_RIPPLES = 12
export const RIPPLE_LIFETIME = 3.2

export type Ripple = { x: number; z: number; start: number; strength: number }

// Shared GLSL wave function (must match waves.ts)
const WAVE_GLSL = /* glsl */ `
  float waveY(vec2 p, float t) {
    return 0.55 * sin(p.x * 0.045 + t * 0.9) * cos(p.y * 0.06 + t * 0.7)
         + 0.35 * sin(p.y * 0.075 - t * 1.1) * cos(p.x * 0.055 - t * 0.55)
         + 0.22 * sin((p.x + p.y) * 0.035 + t * 0.45);
  }
`

const VERT = /* glsl */ `
  uniform float uTime;
  uniform vec4 uRipples[${MAX_RIPPLES}];

  varying vec2 vUv;
  varying vec3 vWorldPos;
  varying float vWave;

  ${WAVE_GLSL}

  float rippleDisp(vec2 p, float t) {
    float d = 0.0;
    for (int i = 0; i < ${MAX_RIPPLES}; i++) {
      vec4 r = uRipples[i];
      if (r.w <= 0.0) continue;
      float age = t - r.z;
      if (age <= 0.0 || age > ${RIPPLE_LIFETIME.toFixed(1)}) continue;
      float dist = length(p - r.xy);
      float radius = age * 4.2;
      float ring = abs(dist - radius);
      float width = 1.4 + age * 1.1;
      float envelope = exp(-(ring * ring) / (width * width));
      float fade = 1.0 - age / ${RIPPLE_LIFETIME.toFixed(1)};
      d += sin(dist * 3.0 - age * 9.0) * envelope * fade * r.w * 0.55;
    }
    return d;
  }

  void main() {
    vec3 p = position;
    float t = uTime;
    float w = waveY(p.xz, t) + rippleDisp(p.xz, t);
    p.y += w;
    vec4 world = modelMatrix * vec4(p, 1.0);
    vUv = uv;
    vWorldPos = world.xyz;
    vWave = w;
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`

const FRAG = /* glsl */ `
  uniform float uTime;
  uniform vec3 uSunDir;      // direction from scene toward the sun
  uniform vec3 uSunColor;
  uniform vec3 uMoonDir;
  uniform vec3 uMoonColor;
  uniform vec3 uSkyZenith;
  uniform vec3 uSkyHorizon;
  uniform vec3 uCamPos;
  uniform float uDay;

  varying vec2 vUv;
  varying vec3 vWorldPos;
  varying float vWave;

  void main() {
    vec3 N = normalize(cross(dFdx(vWorldPos), dFdy(vWorldPos)));
    if (N.y < 0.0) N = -N;
    vec3 V = normalize(uCamPos - vWorldPos);

    // reflection of the sky
    float reflY = clamp(reflect(-V, N).y, 0.0, 1.0);
    vec3 skyRefl = mix(uSkyHorizon, uSkyZenith, pow(reflY, 0.5));

    float fres = pow(1.0 - max(dot(N, V), 0.0), 4.0);

    vec3 deep = mix(vec3(0.012, 0.03, 0.05), vec3(0.012, 0.26, 0.31), uDay);
    vec3 col = mix(deep, skyRefl, fres * 0.82);

    // sun glint — shimmering path on the water
    vec3 H = normalize(uSunDir + V);
    float spec = pow(max(dot(N, H), 0.0), 380.0);
    col += uSunColor * spec * 1.7;

    // faint moonlight glint
    vec3 Hm = normalize(uMoonDir + V);
    float mspec = pow(max(dot(N, Hm), 0.0), 220.0);
    col += uMoonColor * mspec * 0.35;

    // foam on crests
    float foam = smoothstep(0.55, 1.0, vWave) * 0.65;
    col = mix(col, vec3(0.92, 0.95, 0.97), foam);

    // warm key-light tint toward the sun
    float sunAmt = pow(max(dot(N, uSunDir), 0.0), 5.0);
    col += uSunColor * sunAmt * 0.16;

    // distance haze so the far edge melts into the sky
    float distFog = smoothstep(400.0, 2400.0, distance(vWorldPos, uCamPos));
    col = mix(col, uSkyHorizon, distFog * 0.92);

    gl_FragColor = vec4(col, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`

export function createWater(size = 2600, segments = 240): {
  mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial>
  material: THREE.ShaderMaterial
  rippleUniforms: { value: THREE.Vector4[] }
  countUniform: { value: number }
} {
  const geometry = new THREE.PlaneGeometry(size, size, segments, segments)
  geometry.rotateX(-Math.PI / 2)

  const rippleUniforms = { value: Array.from({ length: MAX_RIPPLES }, () => new THREE.Vector4(0, 0, 0, 0)) }
  const countUniform = { value: 0 }

  const material = new THREE.ShaderMaterial({
    vertexShader: VERT,
    fragmentShader: FRAG,
    uniforms: {
      uTime: { value: 0 },
      uSunDir: { value: new THREE.Vector3(0, 1, 0) },
      uSunColor: { value: new THREE.Color(1, 1, 1) },
      uMoonDir: { value: new THREE.Vector3(0, -1, 0) },
      uMoonColor: { value: new THREE.Color(0.7, 0.8, 1) },
      uSkyZenith: { value: new THREE.Color(0.2, 0.4, 0.8) },
      uSkyHorizon: { value: new THREE.Color(0.8, 0.85, 0.9) },
      uCamPos: { value: new THREE.Vector3(0, 10, 0) },
      uDay: { value: 1 },
      uRipples: rippleUniforms,
    },
  })

  const mesh = new THREE.Mesh(geometry, material)
  mesh.matrixAutoUpdate = false
  mesh.updateMatrix()
  return { mesh, material, rippleUniforms, countUniform }
}
