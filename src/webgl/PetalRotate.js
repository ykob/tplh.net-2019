import * as THREE from 'three';
import MathEx from 'js-util/MathEx';

import Petal from '@/webgl/Petal';

export default class PetalRotate extends Petal {
  constructor(geometry) {
    // Create Object3D
    super(geometry);
    this.name = 'PetalRotate';
    this.radius = (1 - this.mass) * 8 + 5;
    this.radian1 = MathEx.radians((Math.random() * 2 - 1) * 180);
    this.radian2 = MathEx.radians((Math.random() * 2 - 1) * 180);
  }
  update(time) {
    super.update(time);
    this.radian1 += time * (1 - this.mass + 1) * 0.1;
    this.radian2 += time * (1 - this.mass + 1) * 0.1;

    this.position.set(
      Math.sin(this.radian1) * this.radius,
      Math.sin(this.radian2) * this.radius * 0.333,
      Math.cos(this.radian1) * this.radius
    );
  }
}
