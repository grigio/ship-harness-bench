import * as THREE from 'three';

/**
 * A soft radial-gradient sprite texture (used for smoke, sun halo, splashes).
 */
export function radialTexture(opts = {}) {
  const size = opts.size || 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const half = size / 2;
  const grad = ctx.createRadialGradient(half, half, 0, half, half, half);
  grad.addColorStop(0, opts.inner || 'rgba(255,255,255,1)');
  grad.addColorStop(opts.mid || 0.35, opts.midColor || 'rgba(255,255,255,0.55)');
  grad.addColorStop(1, opts.outer || 'rgba(255,255,255,0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/**
 * A soft clustered puff texture for clouds.
 */
export function cloudTexture(size = 512) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const half = size / 2;
  const blobs = [
    [half, half, 150],
    [half - 70, half + 20, 95],
    [half + 80, half - 10, 110],
    [half - 10, half - 75, 80],
    [half + 40, half + 70, 70],
    [half - 120, half - 45, 60],
  ];
  for (const [x, y, r] of blobs) {
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, 'rgba(255,255,255,0.95)');
    g.addColorStop(0.55, 'rgba(255,255,255,0.55)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}
