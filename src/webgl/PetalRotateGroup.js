import * as THREE from 'three';

import PetalRotate from '@/webgl/PetalRotate';

const PETAL_NUM = 60;

export default class PetalRotateGroup extends THREE.Group {
  constructor() {
    super();
    this.name = 'PetalRotateGroup';
    this.petals = Array(PETAL_NUM);
    this.time = 0;
    this.isActive = false;
    this.isShownFirst = false;
  }
  start(geometryPetal1, geometryPetal2, noiseTex, hsv1, hsv2, hsv3) {
    for (var i = 0; i < this.petals.length; i++) {
      const geometry = i % 2 === 1 ? geometryPetal1 : geometryPetal2;
      this.petals[i] = new PetalRotate(geometry, hsv1, hsv2, hsv3);
      this.add(this.petals[i]);
      this.petals[i].start(noiseTex);
    }
    this.isActive = true;
  }
  show() {
    if (this.isShownFirst === false) {
      this.isShownFirst = true;
    }
    for (var i = 0; i < this.petals.length; i++) {
      this.petals[i].show(this.isShownFirst);
    }
  }
  hide() {
    for (var i = 0; i < this.petals.length; i++) {
      this.petals[i].hide();
    }
  }
  update(time) {
    if (this.isActive === false) return;
    for (var i = 0; i < this.petals.length; i++) {
      this.petals[i].update(time);
    }
  }
}
