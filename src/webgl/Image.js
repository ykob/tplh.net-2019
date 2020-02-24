import * as THREE from 'three';
import { easeOutQuad, easeInOutExpo, easeOutExpo } from 'easing-js';
import MathEx from 'js-util/MathEx';

import ImagePlane from '@/webgl/ImagePlane';
import ImageFire from '@/webgl/ImageFire';
import ImagePoints from '@/webgl/ImagePoints';

const DURATION_RISE = 1.8;
const DURATION_CHANGE = 1.8;

export default class Image extends THREE.Group {
  constructor() {
    super();
    this.name = 'ImageGroup';
    this.size = new THREE.Vector3();
    this.margin = new THREE.Vector2();
    this.timeRise = 0;
    this.timeChange = 0;
    this.easeFuncRise = null;
    this.easeStepRise = 0;
    this.easeStepChange = 0;
    this.transitionStart = 0;
    this.transitionEnd = 0;
    this.currentIndex = 0;
    this.delayRise = 0;
    this.delayChange = 0;
    this.isAnimated = false;

    this.position.set(0, 1, 0);
    this.rotation.set(
      MathEx.radians(-22),
      MathEx.radians(0),
      MathEx.radians(-8)
    )
  }
  start(noiseTex, imgTexes) {
    const width = 20;
    const imagePlane = new ImagePlane(width);
    const imageFire = new ImageFire(width);
    const imagePoints = new ImagePoints(width);

    imagePlane.start(noiseTex, imgTexes);
    imageFire.start(noiseTex);
    imagePoints.start(noiseTex);

    imageFire.renderOrder = 10;
    imageFire.position.z = 2;
    imagePoints.position.z = 2;

    this.add(imagePlane);
    this.add(imageFire);
    this.add(imagePoints);
  }
  change(index, direction) {
    if (index === this.currentIndex) return;

    if (index > 0 && this.currentIndex === 0) {
      this.easeFuncRise = easeOutExpo;
      this.delayRise = 0.8;
      this.delayChange = 0.8;
      this.transitionStart = direction * 24;
      this.transitionEnd = 0;
    } else if (index === 0 && this.currentIndex > 0) {
      this.easeFuncRise = easeInOutExpo;
      this.delayRise = 0;
      this.delayChange = 0.3;
      this.transitionStart = this.position.y;
      this.transitionEnd = direction * 24;
    } else {
      this.delayRise = 0;
      this.delayChange = 0;
      this.transitionStart = this.position.y;
      this.transitionEnd = 0;
    }

    this.currentIndex = index;
    this.timeRise = 0;
    this.timeChange = 0;
    this.isAnimated = true;
    this.children[0].changeTex(index);
    this.children[0].update(0, 0);
    this.children[1].update(0, 0);
    this.children[2].update(0, 0);
  }
  update(time) {
    this.timeRise += time;
    this.timeChange += time;

    if (this.isAnimated === true) {
      this.easeStepRise = this.easeFuncRise(MathEx.clamp((this.timeRise - this.delayRise) / DURATION_RISE, 0.0, 1.0));
      this.easeStepChange = easeOutQuad(MathEx.clamp((this.timeChange - this.delayChange) / DURATION_CHANGE, 0.0, 1.0));
      if (this.timeChange - this.delayChange >= DURATION_CHANGE) {
        this.isAnimated = false;
      }
    }

    this.position.y = this.transitionStart + this.easeStepRise * (this.transitionEnd - this.transitionStart);
    this.children[0].update(time, this.easeStepChange);
    this.children[1].update(time, this.easeStepChange);
    this.children[2].update(time, this.easeStepChange);
  }
  resize(resolution) {
    this.children[2].resize(resolution);
  }
}
