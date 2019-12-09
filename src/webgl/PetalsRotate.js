import * as THREE from 'three';
import MathEx from 'js-util/MathEx';

import PetalRotate from '@/webgl/PetalRotate';

const NUM = 12;

export default class PetalsRotate extends THREE.Group {
  constructor() {
    super();
    this.name = 'PetalsRotate';
    this.petals = Array(NUM);
    this.time = 0;
    this.isActive = false;
  }
  start(geometry1, geometry2, noiseTex) {
    for (var i = 0; i < this.petals.length; i++) {
      const geometry = (i % 2 === 1) ? geometry1 : geometry2;
      this.petals[i] = new PetalRotate(geometry);
      this.add(this.petals[i]);
      this.petals[i].start(noiseTex);
      this.petals[i].position.set((i / (NUM - 1) * 2 - 1) * 10, 0, 0);
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
