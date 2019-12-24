import * as THREE from 'three';
import MathEx from 'js-util/MathEx';

import PetalRotate from '@/webgl/PetalRotate';

const PETAL_NUM = 12;

export default class CherryRotate extends THREE.Group {
  constructor() {
    super();
    this.name = 'CherryRotate';
    this.petals = Array(PETAL_NUM);
    this.time = 0;
    this.isActive = false;
  }
  start(geometryPetal1, geometryPetal2, noiseTex) {
    for (var i = 0; i < this.petals.length; i++) {
      const geometry = (i % 2 === 1) ? geometryPetal1 : geometryPetal2;
      this.petals[i] = new PetalRotate(geometry);
      this.add(this.petals[i]);
      this.petals[i].start(noiseTex);
    }
    this.isActive = true;
  }
  show() {
    for (var i = 0; i < this.petals.length; i++) {
      this.petals[i].show();
    }
  }
  hide() {
    for (var i = 0; i < this.petals.length; i++) {
      this.petals[i].hide();
    }
  }
  update(time, renderer, camera, sceneAura, cameraAura) {
    if (this.isActive === false) return;
    for (var i = 0; i < this.petals.length; i++) {
      this.petals[i].update(time);
    }
  }
}
