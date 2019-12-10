import * as THREE from 'three';
import MathEx from 'js-util/MathEx';

import Blossom from '@/webgl/Blossom';
import PetalRotate from '@/webgl/PetalRotate';

const BLOSSOM_NUM = 3;
const PETAL_NUM = 12;

export default class CherryRotate extends THREE.Group {
  constructor() {
    super();
    this.name = 'CherryRotate';
    this.blossoms = Array(BLOSSOM_NUM);
    this.petals = Array(PETAL_NUM);
    this.time = 0;
    this.isActive = false;
  }
  start(geometryBlossom1, geometryBlossom2, geometryPetal1, geometryPetal2, noiseTex) {
    for (var i = 0; i < this.blossoms.length; i++) {
      const geometry = (i % 2 === 1) ? geometryBlossom1 : geometryBlossom2;
      this.blossoms[i] = new Blossom(i / BLOSSOM_NUM, geometry);
      this.add(this.blossoms[i]);
      this.blossoms[i].start();
    }
    for (var i = 0; i < this.petals.length; i++) {
      const geometry = (i % 2 === 1) ? geometryPetal1 : geometryPetal2;
      this.petals[i] = new PetalRotate(geometry);
      this.add(this.petals[i]);
      this.petals[i].start(noiseTex);
    }
    this.isActive = true;
  }
  show() {
    for (var i = 0; i < this.blossoms.length; i++) {
      this.blossoms[i].show();
    }
    for (var i = 0; i < this.petals.length; i++) {
      this.petals[i].show();
    }
  }
  hide() {
    for (var i = 0; i < this.blossoms.length; i++) {
      this.blossoms[i].hide();
    }
    for (var i = 0; i < this.petals.length; i++) {
      this.petals[i].hide();
    }
  }
  update(time, renderer, camera, sceneAura, cameraAura) {
    if (this.isActive === false) return;
    for (var i = 0; i < this.blossoms.length; i++) {
      this.blossoms[i].update(time);
    }
    for (var i = 0; i < this.petals.length; i++) {
      this.petals[i].update(time);
    }
  }
}
