import { easeOutCirc } from 'easing-js';
import MathEx from 'js-util/MathEx';

import Petal from '@/webgl/Petal';

const DURATION_SHOW = 5;
const DELAY_SHOW = 1.2;
const DELAY_SHOW_FIRST = 4;
const DURATION_HIDE = 1;
const DELAY_HIDE = 0;

export default class PetalRotate extends Petal {
  constructor(geometry, hsv1, hsv2, hsv3) {
    // Create Object3D
    super(geometry, hsv1, hsv2, hsv3);
    this.name = 'PetalRotate';
    this.durationRise = (1 - this.mass) * 5 + Math.random() * 4 + 8;
    this.delayShow = DELAY_SHOW + Math.random();
    this.delayHide = DELAY_HIDE + Math.random() * 0.2;
    this.delayRise = this.durationRise * Math.random();
    this.radiusBase = Math.random() * Math.random() * 8 + 4;
    this.radiusAdd = Math.random() * Math.random() * 48;
    this.radian = MathEx.radians((Math.random() * 2 - 1) * 180);
    this.timeRise = 0;
    this.timeRotate = 0;
    this.timeShow = 0;
    this.timeHide = 0;
    this.isShown = false;
    this.isShownFirst = false;
    this.isHidden = false;
  }
  show(isShownFirst) {
    this.timeShow = 0;
    this.timeHide = 0;
    this.isShown = true;
    this.isHidden = false;

    if (this.isShownFirst === false && isShownFirst === true) {
      this.isShownFirst = isShownFirst;
      this.delayShow = DELAY_SHOW_FIRST + Math.random();
    } else {
      this.delayShow = DELAY_SHOW + Math.random();
    }
  }
  hide() {
    this.isHidden = true;
  }
  update(time) {
    super.update(time * 3);
    this.timeRise += time;
    this.timeRotate += time * (1.1 - (this.radiusBase + this.radiusAdd) / 60);

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
    const alphaRize = easeOutCirc(
      ((this.timeRise - this.delayRise) / this.durationRise) % 1,
      0.0,
      1.0
    );
    const radius = this.radiusBase + this.radiusAdd * alphaRize;

    this.material.uniforms.alphaShow.value = alphaShow * (1.0 - alphaHide);
    this.position.set(
      Math.sin(this.radian + this.timeRotate) * radius,
      (alphaRize * 2 - 1) * 20,
      Math.cos(this.radian + this.timeRotate) * radius
    );
  }
}
