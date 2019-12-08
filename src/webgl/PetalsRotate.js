import * as THREE from 'three';
import MathEx from 'js-util/MathEx';

import Petal from '@/webgl/Petal';

export default class PetalsRotate extends THREE.Group {
  constructor() {
    super();
    this.name = 'PetalsRotate';
    this.petal;
    this.time = 0;
    this.isActive = false;
  }
  start(geometry1, geometry2, noiseTex) {
    this.petal = new Petal(geometry1);

    this.add(this.petal);

    this.petal.start(noiseTex);
    this.petal.position.set(5, 0, 0);

    this.isActive = true;
  }
  show() {
  }
  hide() {
  }
  update(time, renderer, camera, sceneAura, cameraAura) {
    if (this.isActive === false) return;

    this.petal.update(time);
  }
}
