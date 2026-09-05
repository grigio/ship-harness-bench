import * as THREE from 'three'
import { waveHeight, waveSlope } from './waves'

// ---------------- shared hull profile helpers ----------------

const L = 26
const W = 6.6
const DECK_Y = 2.6
const KEEL_Y = -3.4

const clamp01 = (v: number) => Math.min(1, Math.max(0, v))

// u: 0 = bow, 1 = stern. Full amidships, pointy bow, fuller stern.
function hullTaper(u: number): number {
  const bowFactor = Math.pow(Math.sin(Math.PI * Math.min(u / 0.55, 1) * 0.5), 0.75)
  const sternFall = 1 - Math.pow(Math.max(0, (u - 0.72) / 0.28), 2) * 0.45
  return Math.max(0.12, bowFactor * sternFall)
}

// deck camber (sheer): highest amidships, slightly raised at the bow
function sheer(u: number): number {
  return 0.42 * Math.sin(Math.PI * u) + 0.26 * Math.pow(u, 2.2) - 0.08
}

const deckEdgeY = (u: number) => DECK_Y + sheer(u)
const xAt = (u: number) => -L / 2 + u * L

// ---------------- materials ----------------

function material(color: number, opts: THREE.MeshStandardMaterialParameters = {}) {
  return new THREE.MeshStandardMaterial({ color, roughness: 0.6, metalness: 0.05, ...opts })
}

const woodMat = material(0x6b3f22)
const lightWoodMat = material(0x8a5a2e, { roughness: 0.7 })
const goldMat = material(0xd8a24a, { roughness: 0.35, metalness: 0.25 })
const mastMat = material(0x57391c, { roughness: 0.55 })
const sailMat = new THREE.MeshStandardMaterial({
  color: 0xf4efdf,
  roughness: 0.92,
  metalness: 0,
  side: THREE.DoubleSide,
})
const riggingMat = new THREE.LineBasicMaterial({ color: 0x221507, transparent: true, opacity: 0.55 })
const lanternMat = material(0xffb44a, { emissive: 0xffa733, emissiveIntensity: 2.2, color: 0x553311 })

// ---------------- hull ----------------

function buildHull(): THREE.Mesh {
  const N = 40
  const pts: [number, number][] = []
  for (let i = 0; i <= N; i++) {
    const u = i / N
    pts.push([xAt(u), deckEdgeY(u)])
  }
  // bow stem down to the keel
  pts.push([L / 2 - 1.1, KEEL_Y + 0.7])
  pts.push([L / 2 - 2.6, KEEL_Y + 0.4])
  // keel
  pts.push([-L / 2 + 1.5, KEEL_Y])
  // transom back up to the deck
  pts.push([-L / 2 + 0.5, KEEL_Y + 1.0])

  const shape = new THREE.Shape()
  shape.moveTo(pts[0][0], pts[0][1])
  for (let i = 1; i < pts.length; i++) shape.lineTo(pts[i][0], pts[i][1])

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: W,
    bevelEnabled: true,
    bevelThickness: 0.22,
    bevelSize: 0.22,
    bevelSegments: 2,
    steps: 1,
  })
  geo.translate(0, 0, -W / 2)

  const pos = geo.getAttribute('position') as THREE.BufferAttribute
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i)
    const u = clamp01((x + L / 2) / L)
    const t = hullTaper(u)
    pos.setZ(i, pos.getZ(i) * t)
    const y = pos.getY(i)
    pos.setY(i, DECK_Y + (y - DECK_Y) * (0.35 + 0.65 * t))
  }
  geo.computeVertexNormals()
  const hull = new THREE.Mesh(geo, woodMat)
  hull.castShadow = true
  return hull
}

// ---------------- deck ----------------

function buildDeck(): THREE.Mesh {
  const M = 30
  const shape = new THREE.Shape()
  shape.moveTo(xAt(0), 0)
  for (let i = 1; i < M; i++) {
    const u = i / M
    shape.lineTo(xAt(u), (W / 2) * 0.9 * hullTaper(u))
  }
  shape.lineTo(xAt(1) + 0.6, 0)
  for (let i = M - 1; i >= 1; i--) {
    const u = i / M
    shape.lineTo(xAt(u), -(W / 2) * 0.9 * hullTaper(u))
  }

  const geo = new THREE.ShapeGeometry(shape, 24)
  geo.rotateX(-Math.PI / 2) // normal now faces +y
  const pos = geo.getAttribute('position') as THREE.BufferAttribute
  for (let i = 0; i < pos.count; i++) {
    const u = clamp01((pos.getX(i) + L / 2) / L)
    pos.setY(i, deckEdgeY(u))
  }
  geo.computeVertexNormals()
  return new THREE.Mesh(geo, lightWoodMat)
}

// ---------------- rails ----------------

function buildRails(): THREE.LineSegments {
  const M = 26
  const railMat = new THREE.LineBasicMaterial({ color: 0x3c2415 })
  const side = (sign: number): THREE.Vector3[] => {
    const pts: THREE.Vector3[] = []
    for (let i = 0; i <= M; i++) {
      const u = i / M
      pts.push(new THREE.Vector3(xAt(u), deckEdgeY(u) + 0.62, sign * (W / 2) * 0.86 * hullTaper(u)))
    }
    return pts
  }
  const port = side(1)
  const starboard = side(-1)
  const verts: number[] = []
  for (const pts of [port, starboard]) {
    for (let i = 0; i < pts.length - 1; i++) verts.push(...pts[i].toArray(), ...pts[i + 1].toArray())
  }
  // cross pieces at the bow and stern
  verts.push(...port[0].toArray(), ...starboard[0].toArray())
  verts.push(...port[port.length - 1].toArray(), ...starboard[port.length - 1].toArray())
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3))
  return new THREE.LineSegments(geo, railMat)
}

// ---------------- masts & yards ----------------

function buildMast(x: number, height: number, radius: number, tilt: number): THREE.Group {
  const g = new THREE.Group()
  const mast = new THREE.Mesh(new THREE.CylinderGeometry(radius * 0.65, radius, height, 10), mastMat)
  mast.position.y = DECK_Y + height / 2 + 0.1
  g.add(mast)
  g.position.x = x
  g.rotation.z = tilt // lean slightly aft
  return g
}

function buildYard(length: number, radius = 0.09): THREE.Mesh {
  const yard = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, length, 8), mastMat)
  yard.rotation.z = Math.PI / 2 // horizontal, spanning the beam
  return yard
}

function buildSquareSail(width: number, height: number, billow = 0.55): THREE.Mesh {
  const geo = new THREE.PlaneGeometry(width, height, 1, 16)
  const pos = geo.getAttribute('position') as THREE.BufferAttribute
  for (let i = 0; i < pos.count; i++) {
    const u = (pos.getX(i) + width / 2) / width
    const v = (pos.getY(i) + height / 2) / height
    const amp = billow * (0.45 + 0.55 * (1 - v)) // more belly low down
    pos.setZ(i, amp * Math.sin(Math.PI * u))
  }
  geo.computeVertexNormals()
  const sail = new THREE.Mesh(geo, sailMat)
  sail.rotation.y = Math.PI / 2
  sail.updateMatrix()
  return sail
}

function buildStaysail(a: THREE.Vector3, b: THREE.Vector3, c: THREE.Vector3, segments = 7, bulge = 0.55): THREE.Mesh {
  const ab = b.clone().sub(a)
  const ac = c.clone().sub(a)
  const n = ab.clone().cross(ac).normalize()
  const positions: number[] = []
  const indices: number[] = []
  for (let i = 0; i <= segments; i++) {
    for (let j = 0; j <= segments - i; j++) {
      const u = i / segments
      const v = j / segments
      const p = a.clone().addScaledVector(ab, u).addScaledVector(ac, v)
      p.addScaledVector(n, bulge * Math.sin(Math.PI * u) * Math.sin(Math.PI * v))
      positions.push(p.x, p.y, p.z)
    }
  }
  let idx = 0
  for (let i = 0; i < segments; i++) {
    for (let j = 0; j < segments - i; j++) {
      const a0 = idx
      const a1 = idx + 1
      const a2 = idx + segments - i + 1
      const a3 = a2 + 1
      indices.push(a0, a1, a2)
      if (j < segments - i - 1) indices.push(a1, a3, a2)
      idx++
    }
    idx++
  }
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geo.setIndex(indices)
  geo.computeVertexNormals()
  const sail = new THREE.Mesh(geo, sailMat)
  sail.castShadow = true
  return sail
}

function buildRigging(): THREE.LineSegments {
  const mainTop = new THREE.Vector3(4.5, DECK_Y + 24, 0)
  const foreTop = new THREE.Vector3(-4, DECK_Y + 19, 0)
  const bowspritTip = new THREE.Vector3(17.5, DECK_Y + 2.2, 0)
  const lines = [
    [mainTop, new THREE.Vector3(9.5, DECK_Y + 1.4, 2.8)],
    [mainTop, new THREE.Vector3(9.5, DECK_Y + 1.4, -2.8)],
    [mainTop, new THREE.Vector3(-1, DECK_Y + 1.4, 2.8)],
    [mainTop, new THREE.Vector3(-1, DECK_Y + 1.4, -2.8)],
    [foreTop, new THREE.Vector3(-9, DECK_Y + 1.4, 2.6)],
    [foreTop, new THREE.Vector3(-9, DECK_Y + 1.4, -2.6)],
    [foreTop, new THREE.Vector3(1.5, DECK_Y + 1.4, 2.6)],
    [foreTop, new THREE.Vector3(1.5, DECK_Y + 1.4, -2.6)],
    [mainTop, foreTop],
    [foreTop, bowspritTip],
  ]
  const verts: number[] = []
  for (const [a, b] of lines) verts.push(...a.toArray(), ...b.toArray())
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3))
  return new THREE.LineSegments(geo, riggingMat)
}

// ---------------- bowsprit, flags, lanterns, shadow ----------------

function buildBowsprit(): THREE.Group {
  const g = new THREE.Group()
  const boom = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.16, 7.5, 8), mastMat)
  boom.rotation.z = -0.25
  boom.position.set(L / 2 - 2, DECK_Y + 0.7, 0)
  g.add(boom)
  const fig = new THREE.Mesh(new THREE.SphereGeometry(0.3, 12, 10), goldMat)
  fig.position.set(L / 2 - 2.4, DECK_Y + 0.1, 0)
  g.add(fig)
  return g
}

function buildFlags(): THREE.Mesh[] {
  const flags: THREE.Mesh[] = []
  const flagGeo = new THREE.ShapeGeometry(
    new THREE.Shape()
      .moveTo(0, 0)
      .lineTo(0, 0.55)
      .lineTo(1.3, 0.22),
  )
  const pennantMat = material(0xb8352a, { roughness: 0.5, side: THREE.DoubleSide })
  for (const [x, y] of [
    [4.5, DECK_Y + 24.4],
    [-4, DECK_Y + 19.4],
  ] as const) {
    const f = new THREE.Mesh(flagGeo, pennantMat)
    f.position.set(x, y, 0)
    flags.push(f)
  }
  const stern = new THREE.Mesh(flagGeo, pennantMat)
  stern.scale.set(1.4, 1.4, 1.4)
  stern.position.set(-L / 2 - 0.2, DECK_Y + 1.6, 0)
  flags.push(stern)
  return flags
}

function buildLanterns(): { lanterns: THREE.Mesh[]; light: THREE.PointLight } {
  const lanterns = [
    new THREE.Mesh(new THREE.SphereGeometry(0.16, 10, 8), lanternMat),
    new THREE.Mesh(new THREE.SphereGeometry(0.16, 10, 8), lanternMat),
  ]
  lanterns[0].position.set(4.5, DECK_Y + 2.4, 0)
  lanterns[1].position.set(-L / 2, DECK_Y + 2.2, 0)
  const light = new THREE.PointLight(0xffb066, 0.5, 40, 2)
  light.position.set(0, DECK_Y + 2.5, 0)
  return { lanterns, light }
}

function buildShadowBlob(): THREE.Mesh {
  const canvas = document.createElement('canvas')
  canvas.width = 128
  canvas.height = 128
  const ctx = canvas.getContext('2d')!
  const grad = ctx.createRadialGradient(64, 64, 4, 64, 64, 64)
  grad.addColorStop(0, 'rgba(0,10,20,0.9)')
  grad.addColorStop(1, 'rgba(0,10,20,0)')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, 128, 128)
  const tex = new THREE.CanvasTexture(canvas)
  const blob = new THREE.Mesh(
    new THREE.PlaneGeometry(18, 18),
    new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false }),
  )
  blob.rotation.x = -Math.PI / 2
  blob.position.y = 0.08
  return blob
}

// ---------------- ship assembly ----------------

export type Ship = {
  group: THREE.Group
  flags: THREE.Mesh[]
  lanternLight: THREE.PointLight
  update(time: number, day: number): void
}

export function createShip(): Ship {
  const group = new THREE.Group()

  group.add(buildHull())
  group.add(buildDeck())
  group.add(buildRails())

  // masts + yards + square sails
  const main = buildMast(4.5, 24, 0.26, 0.06)
  const fore = buildMast(-4, 19, 0.2, 0.04)
  const yards = [
    { mast: main, y: DECK_Y + 7, len: 9.5 },
    { mast: main, y: DECK_Y + 11.5, len: 11 },
    { mast: main, y: DECK_Y + 16, len: 12.5 },
    { mast: fore, y: DECK_Y + 5.5, len: 8 },
    { mast: fore, y: DECK_Y + 9.5, len: 9.5 },
  ]
  for (const { mast, y, len } of yards) {
    const yard = buildYard(len)
    yard.position.y = y
    mast.add(yard)
    const sail = buildSquareSail(len * 0.82, 4.8)
    sail.position.y = y - 2.5
    mast.add(sail)
  }

  group.add(main, fore)

  // staysails
  const mainTopSail = buildStaysail(
    new THREE.Vector3(4.5, DECK_Y + 22, 0),
    new THREE.Vector3(-2, DECK_Y + 10.5, 0),
    new THREE.Vector3(4.5, DECK_Y + 15, 0),
  )
  const jib = buildStaysail(
    new THREE.Vector3(-4, DECK_Y + 18, 0),
    new THREE.Vector3(16.5, DECK_Y + 2.4, 0),
    new THREE.Vector3(-4, DECK_Y + 11, 0),
  )
  group.add(mainTopSail, jib)

  // bowsprit + rigging + flags
  group.add(buildBowsprit())
  group.add(buildRigging())
  const flags = buildFlags()
  group.add(...flags)

  // lanterns
  const { lanterns, light } = buildLanterns()
  group.add(...lanterns, light)

  // soft shadow on the water
  const blob = buildShadowBlob()
  group.add(blob)

  function update(time: number, day: number) {
    group.position.y = waveHeight(0, 0, time)
    const { pitch, roll } = waveSlope(0, 0, time)
    group.rotation.x = roll * 0.5
    group.rotation.z = -pitch * 0.5
    group.rotation.y = Math.sin(time * 0.1) * 0.04

    for (let i = 0; i < flags.length; i++) {
      flags[i].rotation.z = 0.28 + Math.sin(time * 4 + i * 1.7) * 0.24
    }
    ;(blob.material as THREE.MeshBasicMaterial).opacity = 0.28 * day
    light.intensity = 0.12 + (1 - day) * 1.6
    for (const l of lanterns) {
      ;(l.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.4 + (1 - day) * 3.2
    }
  }

  return { group, flags, lanternLight: light, update }
}
