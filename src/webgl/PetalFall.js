import * as THREE from 'three';
import { easeOutCirc } from 'easing-js';
import MathEx from 'js-util/MathEx';

import Petal from '@/webgl/Petal';

const DURATION_SHOW = 5;
const DELAY_SHOW = 1.2;
const DURATION_HIDE = 1;
const DELAY_HIDE = 0;

export default class PetalFall extends Petal {
  constructor(geometry, hsv1, hsv2, hsv3) {
    // Create Object3D
    super(geometry, hsv1, hsv2, hsv3);
    this.name = 'PetalFall';
    this.durationFall = (1 - this.mass) * 10 + Math.random() * 5 + 5;
    this.delayFall = this.durationFall * Math.random();
    this.delayShow = DELAY_SHOW + Math.random();
    this.delayHide = DELAY_HIDE + Math.random() * 0.2;
    this.timeFall = 0;
    this.timeShow = 0;
    this.timeHide = 0;
    this.isShown = false;
    this.isShownFirst = false;
    this.isHidden = false;

    this.basePosition = new THREE.Vector3(
      (Math.random() * 2 - 1) * 40,
      0,
      Math.random() * 20 + 5
    );
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
  update(time, scrollProgress) {
    super.update(time);
    this.timeFall += time;

    // for the showing effect.
    if (this.isShown === true) {
      this.timeShow += time;
      if (this.timeShow - this.delayShow >= DURATION_SHOW) {
        this.isShown = false;
      }
    }
    // for the hiding effect.
    if (this.isHidden === true) {
      this.timeHide += time;
      if (this.timeHide - this.delayHide >= DURATION_HIDE) {
        this.isHidden = false;
      }
    }

    // calculation the alpha.
    const alphaShow = easeOutCirc(
      MathEx.clamp((this.timeShow - this.delayShow) / DURATION_SHOW, 0.0, 1.0)
    );
    const alphaHide = easeOutCirc(
      MathEx.clamp((this.timeHide - this.delayHide) / DURATION_HIDE, 0.0, 1.0)
    );
    this.material.uniforms.alphaShow.value = alphaShow * (1.0 - alphaHide);

    this.position.set(
      this.basePosition.x +
        Math.sin((this.timeFall + this.delayFall) * 0.3) * 1.5,
      ((((this.timeFall + this.delayFall) / this.durationFall -
        scrollProgress * 0.4) %
        1) *
        2 -
        1) *
        -20,
      this.basePosition.z
    );
  }
}
