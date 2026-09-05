import { PNG } from 'pngjs';
import fs from 'fs';
const file = process.argv[2];
const p = PNG.sync.read(fs.readFileSync(file));
const { width: W, height: H, data: d } = p;
function lum(i){ return 0.2126*d[i]+0.7152*d[i+1]+0.0722*d[i+2]; }
// scan for brightest pixel (sun/moon) 
let maxL = 0, maxX = -1, maxY = -1;
for (let y = 0; y < H; y += 1) for (let x = 0; x < W; x += 1) {
  const i = (y * W + x) * 4; const L = lum(i);
  if (L > maxL) { maxL = L; maxX = x; maxY = y; }
}
// count bright blobs in sky region (top 30%)
let bright = 0;
for (let y = 0; y < H * 0.35; y++) for (let x = 0; x < W; x += 2) {
  const i = (y * W + x) * 4; if (lum(i) > 200) bright++;
}
// region stats
function stat(x0,y0,x1,y1){let r=0,g=0,b=0,n=0;const set=new Set();for(let y=y0;y<y1;y+=2)for(let x=x0;x<x1;x+=2){const i=(y*W+x)*4;r+=d[i];g+=d[i+1];b+=d[i+2];n++;set.add((d[i]>>5)+""+(d[i+1]>>5)+""+(d[i+2]>>5));}return `(${(r/n)|0},${(g/n)|0},${(b/n)|0}) ${set.size}cols`;}
console.log(file);
console.log('  brightest px', `(${maxX},${maxY}) lum=${maxL|0}`);
console.log('  bright px in top 35%:', bright);
console.log('  sky-top  ', stat(Math.round(W*0.3),10,Math.round(W*0.7),Math.round(H*0.12)));
console.log('  sky-mid  ', stat(Math.round(W*0.3),Math.round(H*0.18),Math.round(W*0.7),Math.round(H*0.3)));
console.log('  horizon  ', stat(Math.round(W*0.3),Math.round(H*0.42),Math.round(W*0.7),Math.round(H*0.5)));
console.log('  water-mid', stat(Math.round(W*0.3),Math.round(H*0.62),Math.round(W*0.7),Math.round(H*0.72)));