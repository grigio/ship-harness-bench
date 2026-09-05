import * as THREE from 'three';
import { radialTexture } from './textures.js';

function smooth(t) {
  return t * t * (3 - 2 * t);
}

function roundedBox(w, h, d, color, opts = {}) {
  const mat = new THREE.MeshStandardMaterial({
    color,
    roughness: opts.roughness ?? 0.7,
    metalness: opts.metalness ?? 0.05,
    emissive: opts.emissive ?? 0x000000,
    emissiveIntensity: opts.emissiveIntensity ?? 1,
  });
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

export class Ship {
  constructor() {
    this.group = new THREE.Group();
    this.speed = 0.045; // angular speed of the slow cruise circle
    this.orbitRadius = 26;
    this.orbitAngle = Math.PI * 0.35;
    this.bobTime = Math.random() * 10;

    this._buildHull();
    this._buildDeck();
    this._buildSuperstructure();
    this._buildFunnel();
    this._buildMast();
    this._buildDetails();

    // Smoke
    this.smoke = new SmokeSystem(0.45);
    this.smokeGroup = this.smoke.group;

    this.dummy = new THREE.Object3D();
    this.state = { pos: new THREE.Vector3(), dir: new THREE.Vector3(1, 0, 0), tip: new THREE.Vector3() };
  }

  _buildHull() {
    const shape = new THREE.Shape();
    shape.moveTo(-4.0, -0.62);
    shape.lineTo(-3.2, -0.92);
    shape.quadraticCurveTo(0.0, -1.0, 2.8, -0.88);
    shape.quadraticCurveTo(4.1, -0.62, 4.6, 0.0);
    shape.quadraticCurveTo(4.1, 0.62, 2.8, 0.88);
    shape.quadraticCurveTo(0.0, 1.0, -3.2, 0.92);
    shape.quadraticCurveTo(-3.8, 0.9, -4.0, 0.62);
    shape.quadraticCurveTo(-4.15, 0.0, -4.0, -0.62);

    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 1.2,
      bevelEnabled: true,
      bevelThickness: 0.16,
      bevelSize: 0.1,
      bevelSegments: 2,
      curveSegments: 18,
    });
    geo.rotateX(-Math.PI / 2);
    // Taper the hull in toward the keel so it looks boat-shaped in profile.
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      const t = Math.min(1, y / 1.2);
      pos.setZ(i, pos.getZ(i) * (0.6 + 0.4 * smooth(t)));
      pos.setX(i, pos.getX(i) * (0.72 + 0.28 * smooth(t)));
    }
    geo.computeVertexNormals();

    const mat = new THREE.MeshStandardMaterial({
      color: 0xb53d2b,
      roughness: 0.55,
      metalness: 0.1,
      flatShading: false,
    });
    const hull = new THREE.Mesh(geo, mat);
    hull.castShadow = true;
    hull.receiveShadow = true;
    this.group.add(hull);
  }

  _buildDeck() {
    const deck = roundedBox(6.7, 0.16, 1.9, 0x6f747c, { roughness: 0.9 });
    deck.position.set(0.3, 1.22, 0);
    this.group.add(deck);

    // Low bulwark along the deck edges.
    const railMat = new THREE.MeshStandardMaterial({ color: 0xc85a3e, roughness: 0.6 });
    const railL = new THREE.Mesh(new THREE.BoxGeometry(6.4, 0.14, 0.09), railMat);
    railL.position.set(0.3, 1.36, 0.98);
    railL.castShadow = true;
    this.group.add(railL);
    const railR = railL.clone();
    railR.position.z = -0.98;
    this.group.add(railR);
  }

  _buildSuperstructure() {
    const cabin = roundedBox(1.9, 1.35, 1.45, 0xf1f3f5, { roughness: 0.35, metalness: 0.05 });
    cabin.position.set(1.45, 1.95, 0);
    this.group.add(cabin);

    const winMat = new THREE.MeshStandardMaterial({
      color: 0x1c2f3d,
      roughness: 0.2,
      metalness: 0.8,
      emissive: 0x33505f,
      emissiveIntensity: 0.45,
    });
    const winFront = new THREE.Mesh(new THREE.BoxGeometry(1.25, 0.32, 0.06), winMat);
    winFront.position.set(1.45, 2.16, 0.74);
    this.group.add(winFront);
    const winSideL = winFront.clone();
    winSideL.scale.z = 1.4;
    winSideL.position.set(1.45, 2.16, 0.52);
    this.group.add(winSideL);
    const winSideR = winSideL.clone();
    winSideR.position.z = -0.52;
    this.group.add(winSideR);

    const roof = roundedBox(2.1, 0.14, 1.65, 0xdfe4e8, { roughness: 0.5 });
    roof.position.set(1.45, 2.65, 0);
    this.group.add(roof);
  }

  _buildFunnel() {
    const mat = new THREE.MeshStandardMaterial({ color: 0x33383f, roughness: 0.6, metalness: 0.4 });
    const funnel = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.33, 1.0, 20), mat);
    funnel.position.set(-1.7, 2.75, 0);
    funnel.rotation.z = 0.07;
    funnel.castShadow = true;
    this.group.add(funnel);

    const bandMat = new THREE.MeshStandardMaterial({ color: 0xb63a2c, roughness: 0.6 });
    const band = new THREE.Mesh(new THREE.CylinderGeometry(0.27, 0.36, 0.18, 20), bandMat);
    band.position.set(-1.7, 2.78, 0);
    band.rotation.z = 0.07;
    band.castShadow = true;
    this.group.add(band);

    this.funnelTip = new THREE.Vector3(-1.75, 3.35, 0);
  }

  _buildMast() {
    const mastMat = new THREE.MeshStandardMaterial({ color: 0xd8dde0, roughness: 0.5, metalness: 0.1 });
    const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.08, 2.6, 10), mastMat);
    mast.position.set(2.5, 2.3, 0);
    mast.rotation.z = -0.06;
    mast.castShadow = true;
    this.group.add(mast);

    const cross = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.06, 0.06), mastMat);
    cross.position.set(2.5, 3.3, 0);
    this.group.add(cross);

    const nav = new THREE.Mesh(
      new THREE.SphereGeometry(0.12, 12, 12),
      new THREE.MeshStandardMaterial({ color: 0xfff3c4, emissive: 0xffdda8, emissiveIntensity: 1.2 })
    );
    nav.position.set(2.5, 3.62, 0);
    this.group.add(nav);
  }

  _buildDetails() {
    // Red and green running lights on the bow.
    const red = new THREE.Mesh(
      new THREE.SphereGeometry(0.08, 10, 10),
      new THREE.MeshStandardMaterial({ color: 0xff4433, emissive: 0xff2200, emissiveIntensity: 1.4 })
    );
    red.position.set(3.6, 1.7, 0.42);
    this.group.add(red);
    const green = red.clone();
    green.material = red.material.clone();
    green.material.color.set(0x33ff66);
    green.material.emissive.set(0x00cc33);
    green.position.z = -0.42;
    this.group.add(green);

    // A little orange lifebuoy on the cabin.
    const buoy = new THREE.Mesh(
      new THREE.TorusGeometry(0.2, 0.05, 10, 18),
      new THREE.MeshStandardMaterial({ color: 0xff7a1f, roughness: 0.6 })
    );
    buoy.position.set(0.2, 1.85, 0.85);
    buoy.rotation.x = Math.PI / 2;
    buoy.rotation.z = 0.25;
    this.group.add(buoy);
  }

  getState() {
    this.state.pos.copy(this.group.position);
    this.dummy.position.copy(this.group.position);
    this.dummy.rotation.set(0, this.group.rotation.y, 0);
    this.dummy.scale.set(1, 1, 1);
    this.dummy.updateMatrixWorld();
    const tip = new THREE.Vector3(this.funnelTip.x, this.funnelTip.y, this.funnelTip.z);
    this.dummy.localToWorld(tip);
    this.state.tip.copy(tip);
    this.dummy.getWorldDirection(this.state.dir);
    return this.state;
  }

  update(dt) {
    this.bobTime += dt;
    this.orbitAngle += dt * this.speed;

    const R = this.orbitRadius;
    const x = Math.cos(this.orbitAngle) * R;
    const z = Math.sin(this.orbitAngle) * R;

    const t = this.bobTime;
    const rise = 0.35 + Math.sin(t * 1.1) * 0.07 + Math.sin(t * 2.3) * 0.025;
    const roll = Math.sin(t * 0.7) * 0.05;
    const pitch = Math.cos(t * 1.6) * 0.03;

    const heading = Math.atan2(Math.sin(this.orbitAngle + Math.PI / 2), Math.cos(this.orbitAngle + Math.PI / 2));
    this.group.position.set(x, rise, z);
    this.group.rotation.set(pitch, heading, roll);

    // Emit smoke from the funnel top in world space.
    const st = this.getState();
    this.smoke.emit(st.tip, dt);
    this.smoke.update(dt);
  }
}

/**
 * Little puffs of soft smoke rising from the funnel.
 */
export class SmokeSystem {
  constructor(rate = 0.5) {
    this.group = new THREE.Group();
    this.rate = rate;
    this.acc = 0;
    this.puffs = [];
    this.tex = radialTexture({ size: 128, inner: 'rgba(210,215,220,0.9)', mid: 0.4, midColor: 'rgba(200,206,212,0.45)', outer: 'rgba(190,196,202,0)' });
  }

  emit(worldPos, dt) {
    this.acc += dt;
    if (this.acc < this.rate) return;
    this.acc = 0;
    const mat = new THREE.SpriteMaterial({
      map: this.tex,
      color: 0xb8c0c8,
      transparent: true,
      opacity: 0.34,
      depthWrite: false,
    });
    const spr = new THREE.Sprite(mat);
    spr.position.set(worldPos.x + (Math.random() - 0.5) * 0.08, worldPos.y, worldPos.z + (Math.random() - 0.5) * 0.08);
    spr.scale.setScalar(0.6 + Math.random() * 0.3);
    this.group.add(spr);
    this.puffs.push({ sprite: spr, life: 0, max: 4.2 + Math.random() * 1.5, dir: new THREE.Vector3(0.12 + Math.random() * 0.15, 0.9, (Math.random() - 0.5) * 0.1) });
  }

  update(dt) {
    for (let i = this.puffs.length - 1; i >= 0; i--) {
      const p = this.puffs[i];
      p.life += dt;
      const s = p.sprite;
      const k = dt;
      s.position.x += p.dir.x * k + Math.sin(p.life * 2.0) * 0.01;
      s.position.y += p.dir.y * k;
      s.position.z += p.dir.z * k;
      const t = p.life / p.max;
      if (t >= 1) {
        this.group.remove(s);
        s.material.dispose();
        this.puffs.splice(i, 1);
        continue;
      }
      s.material.opacity = 0.34 * (1 - t) * 0.8;
      s.scale.setScalar((0.6 + t * 3.2) * (p.max / 4.2));
    }
  }
}
