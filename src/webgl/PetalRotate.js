import * as THREE from 'three';
import { easeOutCirc } from 'easing-js';
import MathEx from 'js-util/MathEx';

import Petal from '@/webgl/Petal';

const DURATION_SHOW = 5;
const DELAY_SHOW = 1.2;
const DURATION_HIDE = 1;
const DELAY_HIDE = 0;

export default class PetalRotate extends Petal {
  constructor(geometry) {
    // Create Object3D
    super(geometry);
    this.name = 'PetalRotate';
    this.delay = DELAY_SHOW + Math.random();
    this.radius = (1 - this.mass) * 10 + 5;
    this.radian1 = MathEx.radians((Math.random() * 2 - 1) * 180);
    this.radian2 = MathEx.radians((Math.random() * 2 - 1) * 180);
    this.timeShow = 0;
    this.timeHide = 0;
    this.isShown = false;
    this.isHidden = false;
  }
  show() {
    this.timeShow = 0;
    this.timeHide = 0;
    this.isShown = true;
    this.isHidden = false;
  }
  hide() {
    this.isHidden = true;
  }
  update(time) {
    super.update(time);

    // for the showing effect.
    if (this.isShown === true) {
      this.timeShow += time;
      if (this.timeShow - DELAY_SHOW >= DURATION_SHOW) {
        this.isShown = false;
      }
    }
    // for the hiding effect.
    if (this.isHidden === true) {
      this.timeHide += time;
      if (this.timeHide - DELAY_HIDE >= DURATION_HIDE) {
        this.isHidden = false;
      }
    }

    // calculation the alpha.
    const alphaShow = easeOutCirc(MathEx.clamp((this.timeShow - this.delay) / DURATION_SHOW, 0.0, 1.0));
    const alphaHide = easeOutCirc(MathEx.clamp((this.timeHide - DELAY_HIDE) / DURATION_HIDE, 0.0, 1.0));
    this.material.uniforms.alphaShow.value = alphaShow * (1.0 - alphaHide);

    // calculation the world rotation.
    this.radian1 += time * (1 - this.mass + 1) * 0.1 * this.rotateDirection;
    this.radian2 += time * (1 - this.mass + 1) * 0.1 * this.rotateDirection;

    this.position.set(
      Math.sin(this.radian1) * (this.radius + (1.0 - alphaShow) * this.radius * 0.5),
      Math.sin(this.radian2) * this.radius * 0.333,
      Math.cos(this.radian1) * (this.radius + (1.0 - alphaShow) * this.radius * 0.5)
    );
  }
}
