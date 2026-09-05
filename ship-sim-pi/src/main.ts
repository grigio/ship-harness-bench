import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import {
  DAY_CYCLE_SECONDS,
  dayFactor,
  moonDirection,
  skyHorizon,
  skyZenith,
  sunColor,
  sunDirection,
  twilightFactor,
  MOON_COLOR,
} from './daycycle'
import { createWater, MAX_RIPPLES, type Ripple } from './water'
import { createSky, type Sky } from './sky'
import { createShip } from './ship'
import { createSeagulls } from './seagulls'
import { createSplashes } from './splashes'
import { createOceanAudio } from './audio'
import './style.css'

const clock = new THREE.Clock()
let simTime = 0
let dayTime = 6 * 3600 // start at dawn (6:00) for a beautiful first impression
let daySpeed = 1

// ---------------- renderer / scene / camera ----------------

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 1.0
document.body.appendChild(renderer.domElement)

const scene = new THREE.Scene()
scene.fog = new THREE.Fog(0xffffff, 500, 2600)

const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.5, 5000)
camera.position.set(34, 17, 46)

const controls = new OrbitControls(camera, renderer.domElement)
controls.target.set(0, 2.5, 0)
controls.enableDamping = true
controls.dampingFactor = 0.06
controls.minDistance = 14
controls.maxDistance = 170
controls.minPolarAngle = 0.08
controls.maxPolarAngle = 1.5
controls.enablePan = false
controls.autoRotate = true
controls.autoRotateSpeed = 0.35

let lastInteraction = performance.now()
renderer.domElement.addEventListener('pointerdown', () => {
  lastInteraction = performance.now()
  controls.autoRotate = false
})
renderer.domElement.addEventListener('pointermove', () => {
  if (performance.now() - lastInteraction < 400) lastInteraction = performance.now()
})

// ---------------- world ----------------

const water = createWater()
scene.add(water.mesh)
const sky: Sky = createSky()
scene.add(sky.group)
const ship = createShip()
scene.add(ship.group)
const gulls = createSeagulls(5)
scene.add(gulls.group)
const splashes = createSplashes()
scene.add(splashes.points)

// ---------------- lighting ----------------

const hemi = new THREE.HemisphereLight(0xbcd8ff, 0x40352a, 1)
scene.add(hemi)
const sunLight = new THREE.DirectionalLight(0xffffff, 2.4)
scene.add(sunLight)
const moonLight = new THREE.DirectionalLight(0x7f96ff, 0.35)
scene.add(moonLight)

const tmp = new THREE.Color()

// ---------------- ripples ----------------

const ripples: Ripple[] = []

function addRipple(x: number, z: number, strength = 1) {
  ripples.push({ x, z, start: simTime, strength })
  if (ripples.length > MAX_RIPPLES) ripples.shift()
}

function writeRippleUniforms() {
  const arr = water.rippleUniforms.value
  for (let i = 0; i < MAX_RIPPLES; i++) {
    const r = ripples[i]
    if (!r) {
      arr[i].set(0, 0, 0, 0)
    } else {
      arr[i].set(r.x, r.z, r.start, r.strength)
    }
  }
}

// ---------------- interaction ----------------

const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()
let downX = 0
let downY = 0

renderer.domElement.addEventListener('pointerdown', (e) => {
  downX = e.clientX
  downY = e.clientY
})
renderer.domElement.addEventListener('pointerup', (e) => {
  if (Math.hypot(e.clientX - downX, e.clientY - downY) > 8) return // was a drag
  const rect = renderer.domElement.getBoundingClientRect()
  mouse.set(((e.clientX - rect.left) / rect.width) * 2 - 1, -((e.clientY - rect.top) / rect.height) * 2 + 1)
  raycaster.setFromCamera(mouse, camera)
  const hits = raycaster.intersectObject(water.mesh)
  if (hits.length > 0 && hits[0].distance < 600) {
    addRipple(hits[0].point.x, hits[0].point.z)
    splashes.burst(hits[0].point.x, hits[0].point.z, 0.75)
  }
})

// ---------------- HUD ----------------

const oceanAudio = createOceanAudio()
oceanAudio.unlock()

const phaseEl = document.getElementById('phase')!
const soundBtn = document.getElementById('sound')!
const speedEl = document.getElementById('speed') as HTMLInputElement

soundBtn.addEventListener('click', () => {
  const on = oceanAudio.toggle()
  soundBtn.textContent = on ? 'sound on' : 'sound off'
  soundBtn.classList.toggle('off', !on)
})
speedEl.addEventListener('input', () => {
  daySpeed = Math.pow(10, Number(speedEl.value) - 1) // -1..1 -> 0.1x..10x
})

const hint = document.getElementById('hint')!
setTimeout(() => hint.classList.add('fade'), 9000)

const hoursToLabel = (t: number) => {
  const h = (t * 24) % 24
  const hh = Math.floor(h)
  const mm = Math.floor((h - hh) * 60)
  return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`
}

// ---------------- main loop ----------------

function updateLights(day: number) {
  hemi.color.copy(tmp.copy(skyZenith(dayTime / DAY_CYCLE_SECONDS)))
  hemi.intensity = 0.45 + day * 0.75
  sunLight.color.copy(tmp.copy(sunColor(dayTime / DAY_CYCLE_SECONDS)))
  sunLight.intensity = day * 2.6
  moonLight.intensity = (1 - day) * 0.4
  ;(scene.fog as THREE.Fog).color.copy(skyHorizon(dayTime / DAY_CYCLE_SECONDS))
}

function loop() {
  const dt = Math.min(clock.getDelta(), 0.05)
  simTime += dt
  dayTime += dt * daySpeed * DAY_CYCLE_SECONDS
  if (dayTime > DAY_CYCLE_SECONDS) dayTime -= DAY_CYCLE_SECONDS

  const t = dayTime / DAY_CYCLE_SECONDS
  const sunDir = sunDirection(t)
  const moonDir = moonDirection(t)
  const day = dayFactor(t)

  // water
  const wm = water.material
  wm.uniforms.uTime.value = simTime
  wm.uniforms.uSunDir.value.copy(sunDir)
  wm.uniforms.uMoonDir.value.copy(moonDir)
  wm.uniforms.uSunColor.value.copy(tmp.copy(sunColor(t)))
  wm.uniforms.uSkyZenith.value.copy(skyZenith(t))
  wm.uniforms.uSkyHorizon.value.copy(skyHorizon(t))
  wm.uniforms.uCamPos.value.copy(camera.position)
  wm.uniforms.uDay.value = day
  writeRippleUniforms()

  // sky
  sky.uniforms.uZenith.value.copy(skyZenith(t))
  sky.uniforms.uHorizon.value.copy(skyHorizon(t))
  sky.uniforms.uSunColor.value.copy(tmp.copy(sunColor(t)))
  sky.uniforms.uMoonColor.value.copy(MOON_COLOR)
  sky.uniforms.uTwilight.value = twilightFactor(t)
  sky.uniforms.uDay.value = day
  sky.update(simTime, sunDir, moonDir)

  // lights
  sunLight.position.copy(sunDir).multiplyScalar(500)
  moonLight.position.copy(moonDir).multiplyScalar(500)
  updateLights(day)

  // entities
  ship.update(simTime, day)
  gulls.update(simTime)
  splashes.update(dt)

  // idle drift back on
  if (performance.now() - lastInteraction > 6000 && !controls.autoRotate) {
    controls.autoRotate = true
  }

  controls.update()
  renderer.render(scene, camera)

  phaseEl.textContent = `${hoursToLabel(t)}`
}

renderer.setAnimationLoop(loop)

// ---------------- resize ----------------

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})
