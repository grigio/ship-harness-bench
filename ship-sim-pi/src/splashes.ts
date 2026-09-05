import * as THREE from 'three'

const POOL = 320

type Particle = {
  alive: boolean
  life: number
  maxLife: number
  pos: THREE.Vector3
  vel: THREE.Vector3
}

// White spray that bursts up and outward where you click, then settles back into the sea.
export function createSplashes(): {
  points: THREE.Points
  burst(x: number, z: number, strength: number): void
  update(dt: number): void
} {
  const positions = new Float32Array(POOL * 3)
  const colors = new Float32Array(POOL * 3)
  const sizes = new Float32Array(POOL)
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  geo.setAttribute('size', new THREE.BufferAttribute(sizes, 3))

  const mat = new THREE.PointsMaterial({
    size: 0.5,
    sizeAttenuation: true,
    vertexColors: true,
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  })

  const points = new THREE.Points(geo, mat)

  const pool: Particle[] = Array.from({ length: POOL }, () => ({
    alive: false,
    life: 0,
    maxLife: 1,
    pos: new THREE.Vector3(),
    vel: new THREE.Vector3(),
  }))

  function burst(x: number, z: number, strength: number) {
    const spawn = Math.floor(14 + 26 * strength)
    for (let k = 0; k < spawn; k++) {
      const p = pool.find((c) => !c.alive)
      if (!p) break
      const a = Math.random() * Math.PI * 2
      const r = 0.6 + Math.random() * 2.2
      p.alive = true
      p.maxLife = p.life = 0.9 + Math.random() * 0.9
      p.pos.set(x + Math.cos(a) * r * 0.3, 0.4 + Math.random() * 0.6, z + Math.sin(a) * r * 0.3)
      p.vel.set(
        Math.cos(a) * (1.6 + Math.random() * 2.4) * strength,
        2.4 + Math.random() * 3.4,
        Math.sin(a) * (1.6 + Math.random() * 2.4) * strength,
      )
    }
  }

  function update(dt: number) {
    let active = 0
    const pos = geo.getAttribute('position') as THREE.BufferAttribute
    const col = geo.getAttribute('color') as THREE.BufferAttribute
    for (let i = 0; i < POOL; i++) {
      const p = pool[i]
      if (!p.alive) {
        sizes[i] = 0
        continue
      }
      p.life -= dt
      if (p.life <= 0) {
        p.alive = false
        sizes[i] = 0
        continue
      }
      p.vel.y -= 9.8 * dt
      p.pos.addScaledVector(p.vel, dt)
      p.pos.y = Math.max(0.05, p.pos.y)
      pos.setXYZ(i, p.pos.x, p.pos.y, p.pos.z)
      const k = p.life / p.maxLife
      col.setXYZ(i, 0.95, 0.98, 1.0)
      sizes[i] = 0.35 + 0.55 * k
      active++
    }
    pos.needsUpdate = true
    col.needsUpdate = true
    mat.opacity = active > 0 ? 0.85 : 0
  }

  return { points, burst, update }
}
