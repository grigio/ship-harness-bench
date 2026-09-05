import * as THREE from 'three'

const VERT = /* glsl */ `
  varying vec3 vDir;
  void main() {
    vDir = normalize(position);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const FRAG = /* glsl */ `
  uniform vec3 uSunDir;
  uniform vec3 uMoonDir;
  uniform vec3 uSunColor;
  uniform vec3 uMoonColor;
  uniform vec3 uZenith;
  uniform vec3 uHorizon;
  uniform float uTwilight;
  uniform float uDay;
  uniform float uTime;

  varying vec3 vDir;

  float hash(vec3 p) {
    return fract(sin(dot(p, vec3(12.9898, 78.233, 37.719))) * 43758.5453);
  }

  void main() {
    vec3 dir = normalize(vDir);

    float h = clamp(dir.y, 0.0, 1.0);
    vec3 col = mix(uHorizon, uZenith, pow(h, 0.5));

    // warm band just above the horizon at dusk / dawn
    col += uHorizon * uTwilight * pow(1.0 - h, 6.0) * 0.6;

    // sun glow
    float s = max(dot(dir, uSunDir), 0.0);
    col += uSunColor * pow(s, 700.0) * 1.8;   // compact disc
    col += uSunColor * pow(s, 24.0) * (0.16 + 0.4 * uTwilight); // broad halo

    // moon glow
    float m = max(dot(dir, uMoonDir), 0.0);
    col += uMoonColor * pow(m, 240.0) * 1.4;

    // stars — visible when the sun is down, fade out above the horizon
    float starAmt = (1.0 - uDay) * smoothstep(0.0, 0.5, h);
    float cell = hash(floor(dir * 170.0));
    float star = step(0.9991, cell) * starAmt;
    star *= 0.5 + 0.5 * sin(uTime * 2.0 + cell * 400.0);
    col += vec3(0.85, 0.92, 1.0) * star;

    // gentle deep-space vignette at the zenith
    col *= 1.0 - 0.25 * smoothstep(0.55, 1.0, h) * (1.0 - uDay);

    gl_FragColor = vec4(col, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`

function makeGlowTexture(inner: number, outer: number): THREE.CanvasTexture {
  const size = 256
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!
  const grad = ctx.createRadialGradient(size / 2, size / 2, size * inner, size / 2, size / 2, size * outer)
  grad.addColorStop(0, 'rgba(255,255,255,1)')
  grad.addColorStop(0.35, 'rgba(255,255,255,0.55)')
  grad.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, size, size)
  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

const DISC_TEX = makeGlowTexture(0.0, 0.32)
const HALO_TEX = makeGlowTexture(0.0, 1.0)

export type Sky = {
  group: THREE.Group
  sunSprite: THREE.Sprite
  sunHalo: THREE.Sprite
  moonSprite: THREE.Sprite
  moonHalo: THREE.Sprite
  uniforms: {
    uSunDir: { value: THREE.Vector3 }
    uMoonDir: { value: THREE.Vector3 }
    uSunColor: { value: THREE.Color }
    uMoonColor: { value: THREE.Color }
    uZenith: { value: THREE.Color }
    uHorizon: { value: THREE.Color }
    uTwilight: { value: number }
    uDay: { value: number }
    uTime: { value: number }
  }
  update(time: number, sunDir: THREE.Vector3, moonDir: THREE.Vector3): void
}

export function createSky(): Sky {
  const radius = 3000

  const uniforms = {
    uSunDir: { value: new THREE.Vector3(0, 1, 0) },
    uMoonDir: { value: new THREE.Vector3(0, -1, 0) },
    uSunColor: { value: new THREE.Color(1, 1, 1) },
    uMoonColor: { value: new THREE.Color(0.78, 0.84, 1) },
    uZenith: { value: new THREE.Color(0.16, 0.42, 0.78) },
    uHorizon: { value: new THREE.Color(0.74, 0.84, 0.92) },
    uTwilight: { value: 0 },
    uDay: { value: 1 },
    uTime: { value: 0 },
  }

  const dome = new THREE.Mesh(
    new THREE.SphereGeometry(radius, 48, 32),
    new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms,
      side: THREE.BackSide,
      depthWrite: false,
    }),
  )

  const sunSprite = new THREE.Sprite(
    new THREE.SpriteMaterial({ map: DISC_TEX, blending: THREE.AdditiveBlending, depthWrite: false }),
  )
  const sunHalo = new THREE.Sprite(
    new THREE.SpriteMaterial({ map: HALO_TEX, blending: THREE.AdditiveBlending, depthWrite: false }),
  )
  const moonSprite = new THREE.Sprite(
    new THREE.SpriteMaterial({ map: DISC_TEX, blending: THREE.AdditiveBlending, depthWrite: false }),
  )
  const moonHalo = new THREE.Sprite(
    new THREE.SpriteMaterial({ map: HALO_TEX, blending: THREE.AdditiveBlending, depthWrite: false }),
  )

  const group = new THREE.Group()
  group.add(dome, sunHalo, sunSprite, moonHalo, moonSprite)

  function update(time: number, sunDir: THREE.Vector3, moonDir: THREE.Vector3) {
    uniforms.uTime.value = time
    uniforms.uSunDir.value.copy(sunDir)
    uniforms.uMoonDir.value.copy(moonDir)

    const elev = sunDir.y
    const sunPos = sunDir.clone().multiplyScalar(radius - 40)
    const moonPos = moonDir.clone().multiplyScalar(radius - 40)

    sunSprite.position.copy(sunPos)
    sunHalo.position.copy(sunPos)
    moonSprite.position.copy(moonPos)
    moonHalo.position.copy(moonPos)

    // sun is bigger and softer near the horizon
    const nearHorizon = 1 - Math.min(1, Math.abs(elev) * 3)
    const sunScale = 110 * (1 + nearHorizon * 0.7)
    sunSprite.scale.setScalar(sunScale)
    sunHalo.scale.setScalar(sunScale * (2.6 + nearHorizon * 3))
    sunSprite.material.opacity = Math.min(1, (elev + 0.02) * 14)
    sunHalo.material.opacity = Math.min(1, (elev + 0.06) * 10)

    const moonScale = 46
    moonSprite.scale.setScalar(moonScale)
    moonHalo.scale.setScalar(moonScale * 3.2)
    const moonVis = Math.min(1, (-elev + 0.02) * 12)
    moonSprite.material.opacity = moonVis
    moonHalo.material.opacity = moonVis * 0.8
  }

  return { group, sunSprite, sunHalo, moonSprite, moonHalo, uniforms, update }
}
