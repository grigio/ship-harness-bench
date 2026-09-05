import * as THREE from 'three'

// JS mirror of the GLSL wave in water.ts so the ship can ride the same surface.
// Keep these two in sync!

const EPS = 0.6

export function waveHeight(x: number, z: number, t: number): number {
  return (
    0.55 * Math.sin(x * 0.045 + t * 0.9) * Math.cos(z * 0.06 + t * 0.7) +
    0.35 * Math.sin(z * 0.075 - t * 1.1) * Math.cos(x * 0.055 - t * 0.55) +
    0.22 * Math.sin((x + z) * 0.035 + t * 0.45)
  )
}

export function waveNormal(x: number, z: number, t: number): THREE.Vector3 {
  const dx = (waveHeight(x + EPS, z, t) - waveHeight(x - EPS, z, t)) / (2 * EPS)
  const dz = (waveHeight(x, z + EPS, t) - waveHeight(x, z - EPS, t)) / (2 * EPS)
  const n = new THREE.Vector3(-dx, 1, -dz)
  return n.normalize()
}

export function waveSlope(x: number, z: number, t: number): { pitch: number; roll: number } {
  const dx = (waveHeight(x + EPS, z, t) - waveHeight(x - EPS, z, t)) / (2 * EPS)
  const dz = (waveHeight(x, z + EPS, t) - waveHeight(x, z - EPS, t)) / (2 * EPS)
  return { pitch: Math.atan2(dx, 1), roll: Math.atan2(dz, 1) }
}
