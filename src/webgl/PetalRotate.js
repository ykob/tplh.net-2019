import * as THREE from 'three';
import { easeOutCirc } from 'easing-js';
import MathEx from 'js-util/MathEx';

import Petal from '@/webgl/Petal';

const DURATION_SHOW = 5;
const DELAY_SHOW = 1.2;
const DURATION_HIDE = 1;
const DELAY_HIDE = 0;

export default class PetalRotate extends Petal {
  constructor(geometry, hsv1, hsv2) {
    // Create Object3D
    super(geometry, hsv1, hsv2);
    this.name = 'PetalRotate';
    this.durationRise = (1 - this.mass) * 20 + Math.random() * 5 + 10;
    this.delayRise = this.durationRise * Math.random();
    this.delayShow = DELAY_SHOW + Math.random();
    this.radius = Math.random() * Math.random() * Math.random() * 18 + 9;
    this.radian = MathEx.radians((Math.random() * 2 - 1) * 90);
    this.timeRise = 0;
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
    this.timeRise += time;

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
    const alphaShow = easeOutCirc(MathEx.clamp((this.timeShow - this.delayShow) / DURATION_SHOW, 0.0, 1.0));
    const alphaHide = easeOutCirc(MathEx.clamp((this.timeHide - DELAY_HIDE) / DURATION_HIDE, 0.0, 1.0));
    this.material.uniforms.alphaShow.value = alphaShow * (1.0 - alphaHide);

    this.position.set(
      Math.sin(this.radian) * this.radius,
      ((this.timeRise + this.delayRise) / this.durationRise % 1 * 2 - 1) * 20,
      Math.cos(this.radian) * this.radius
    );
  }
}
