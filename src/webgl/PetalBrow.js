import * as THREE from 'three';
import { easeOutCirc } from 'easing-js';
import MathEx from 'js-util/MathEx';

import Petal from '@/webgl/Petal';

const DURATION_SHOW = 5;

export default class PetalBrow extends Petal {
  constructor(geometry) {
    // Create Object3D
    super(geometry);
    this.name = 'PetalBrow';
    this.timeChanged = 0;
    this.alphaStart = 0;
    this.alphaEnd = 0;
    this.isChanged = false;
  }
  changeColorDark(bool) {
    this.alphaStart = this.material.uniforms.alphaColor.value;
    this.alphaEnd = (bool === true) ? 1 : 0;
    this.timeChanged = 0;
    this.isChanged = true;
  }
  update(time) {
    super.update(time);

    if (this.isChanged === true) {
      this.timeChanged += time;
      this.material.uniforms.alphaColor.value =
        this.alphaStart + easeOutExpo(
          MathEx.clamp(this.timeChanged / DURATION, 0.0, 1.0)
        ) * (this.alphaEnd - this.alphaStart);
      if (this.timeChanged >= DURATION) {
        this.timeChanged = 0;
        this.isChanged = false;
      }
    }
  }
}
