import * as THREE from 'three'

// The sun swings along a 2D arc whose elevation is driven by `t` in [0,1):
//   t = 0     -> midnight (sun below horizon)
//   t = 0.25  -> sunrise
//   t = 0.5   -> noon (sun overhead)
//   t = 0.75  -> sunset

const clamp01 = (v: number) => Math.min(1, Math.max(0, v))

export const DAY_CYCLE_SECONDS = 150

export function sunDirection(t: number): THREE.Vector3 {
  const elev = -Math.cos(t * Math.PI * 2) * (Math.PI / 2) // angle in [-pi/2, pi/2]
  const az = t * Math.PI * 2 - Math.PI / 2
  const ce = Math.cos(elev)
  return new THREE.Vector3(ce * Math.cos(az), Math.sin(elev), ce * Math.sin(az))
}

export function moonDirection(t: number): THREE.Vector3 {
  return sunDirection(t).clone().negate()
}

// 0 at night, 1 in full day
export function dayFactor(t: number): number {
  const d = sunDirection(t)
  return clamp01((d.y + 0.1) / 0.3)
}

// 0 when the sun is high or deep below, 1 near the horizon (dusk/dawn band)
export function twilightFactor(t: number): number {
  const d = sunDirection(t)
  return 1 - clamp01((Math.abs(d.y) - 0.02) / 0.22)
}

// Warm low sun, pale white high sun
export function sunColor(t: number): THREE.Color {
  const d = sunDirection(t)
  const h = clamp01(d.y)
  return new THREE.Color(1, 0.42 + 0.56 * h, 0.2 + 0.66 * h)
}

export const MOON_COLOR = new THREE.Color(0.78, 0.84, 1.0)

export const SKY_ZENITH_DAY = new THREE.Color(0.16, 0.42, 0.78)
export const SKY_ZENITH_NIGHT = new THREE.Color(0.006, 0.01, 0.028)
export const SKY_HORIZON_DAY = new THREE.Color(0.74, 0.84, 0.92)
export const SKY_HORIZON_NIGHT = new THREE.Color(0.03, 0.05, 0.1)
export const SKY_TWILIGHT_TINT = new THREE.Color(1.0, 0.5, 0.28)

export function skyZenith(t: number): THREE.Color {
  const day = dayFactor(t)
  const twi = twilightFactor(t)
  const c = SKY_ZENITH_DAY.clone().lerp(SKY_ZENITH_NIGHT, 1 - day)
  return c.lerp(SKY_TWILIGHT_TINT, twi * 0.28 * day)
}

export function skyHorizon(t: number): THREE.Color {
  const day = dayFactor(t)
  const twi = twilightFactor(t)
  const c = SKY_HORIZON_DAY.clone().lerp(SKY_HORIZON_NIGHT, 1 - day)
  return c.lerp(SKY_TWILIGHT_TINT, twi * 0.85)
}
