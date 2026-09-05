import { PNG } from 'pngjs';
import fs from 'fs';
const file = process.argv[2];
const p = PNG.sync.read(fs.readFileSync(file));
const { width, height, data } = p;
function stat(x0,y0,x1,y1){
  let r=0,g=0,b=0,n=0; const set=new Set();
  for(let y=y0;y<y1;y+=2)for(let x=x0;x<x1;x+=2){
    const i=(y*width+x)*4; r+=data[i];g+=data[i+1];b+=data[i+2];n++;
    set.add((data[i]>>5)+','+(data[i+1]>>5)+','+(data[i+2]>>5));
  }
  return `avg=(${(r/n)|0},${(g/n)|0},${(b/n)|0}) distinct=${set.size}`;
}
console.log(file);
console.log('  sky-top   :', stat(500,50,780,110));
console.log('  horizon   :', stat(500,330,780,390));
console.log('  water-far :', stat(500,520,780,560));
console.log('  water-near:', stat(500,700,780,760));
