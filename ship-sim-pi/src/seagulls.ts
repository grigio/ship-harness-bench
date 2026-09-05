import * as THREE from 'three'

type Bird = {
  group: THREE.Group
  leftWing: THREE.Mesh
  rightWing: THREE.Mesh
  phase: number
  radius: number
  speed: number
  height: number
  heightPhase: number
}

const WING_SHAPE = new THREE.Shape()
WING_SHAPE.moveTo(0, 0)
WING_SHAPE.lineTo(2.2, 0.25)
WING_SHAPE.lineTo(0, 0.75)
WING_SHAPE.closePath()

const wingMat = new THREE.MeshStandardMaterial({
  color: 0xf4f4f2,
  roughness: 0.8,
  side: THREE.DoubleSide,
})

function makeBird(): Bird {
  const wingGeo = new THREE.ShapeGeometry(WING_SHAPE)
  const group = new THREE.Group()
  const leftWing = new THREE.Mesh(wingGeo, wingMat)
  const rightWing = new THREE.Mesh(wingGeo, wingMat)
  // wings sweep back from the body (rotate around z, extend in -x)
  leftWing.rotation.z = -0.25
  leftWing.position.x = -0.4
  rightWing.rotation.z = -0.25
  rightWing.scale.x = -1 // mirror to the other side
  rightWing.position.x = 0.4
  const body = new THREE.Mesh(
    new THREE.SphereGeometry(0.22, 8, 6),
    new THREE.MeshStandardMaterial({ color: 0xdddddd, roughness: 0.8 }),
  )
  body.scale.set(1.6, 0.7, 0.7)
  group.add(leftWing, rightWing, body)
  return {
    group,
    leftWing,
    rightWing,
    phase: Math.random() * Math.PI * 2,
    radius: 28 + Math.random() * 26,
    speed: 0.12 + Math.random() * 0.1,
    height: 14 + Math.random() * 10,
    heightPhase: Math.random() * Math.PI * 2,
  }
}

export function createSeagulls(count = 5): {
  group: THREE.Group
  update(time: number): void
} {
  const group = new THREE.Group()
  const birds = Array.from({ length: count }, () => {
    const b = makeBird()
    group.add(b.group)
    return b
  })

  function update(time: number) {
    for (const b of birds) {
      const angle = time * b.speed + b.phase
      b.group.position.set(
        Math.cos(angle) * b.radius,
        b.height + Math.sin(time * 0.35 + b.heightPhase) * 2.2,
        Math.sin(angle) * b.radius * 0.7,
      )
      // face travel direction
      b.group.rotation.y = -angle - Math.PI / 2
      // flap
      const flap = Math.sin(time * 7 + b.phase)
      b.leftWing.rotation.z = -0.3 - flap * 0.55
      b.rightWing.rotation.z = -0.3 + flap * 0.55
    }
  }

  return { group, update }
}
