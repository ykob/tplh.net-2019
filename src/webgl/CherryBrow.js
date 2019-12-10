import * as THREE from 'three';
import MathEx from 'js-util/MathEx';

import PetalBrow from '@/webgl/PetalBrow';

const NUM = 12;

export default class CherryBrow extends THREE.Group {
  constructor() {
    super();
    this.name = 'PetalsBlow';
    this.petals = Array(NUM);
    this.time = 0;
    this.isActive = false;
  }
  start(geometry1, geometry2, noiseTex) {
    for (var i = 0; i < this.petals.length; i++) {
      const geometry = (i % 2 === 1) ? geometry1 : geometry2;
      this.petals[i] = new PetalBrow(geometry);
      this.add(this.petals[i]);
      this.petals[i].start(noiseTex);
    }
    this.isActive = true;
  }
  changeColorDark(bool) {
    for (var i = 0; i < this.petals.length; i++) {
      this.petals[i].changeColorDark(bool);
    }
  }
  update(time, renderer, camera, sceneAura, cameraAura) {
    if (this.isActive === false) return;
    for (var i = 0; i < this.petals.length; i++) {
      this.petals[i].update(time);
    }
  }
}
