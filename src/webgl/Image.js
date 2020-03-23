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
    this.timeTranslate = 0;
    this.timeChange1 = 0;
    this.timeChange2 = 0;
    this.timeChange3 = 0;
    this.easeFuncTranslate = null;
    this.easeStepTranslate = 0;
    this.easeStepChange1 = 0;
    this.easeStepChange2 = 0;
    this.easeStepChange3 = 0;
    this.transitionStart = 0;
    this.transitionEnd = 0;
    this.currentIndex = 0;
    this.changeIndex = 0;
    this.delayTranslate = 0;
    this.delayChange1 = 0;
    this.delayChange2 = 0;
    this.delayChange3 = 0;
    this.isTranslating = false;
    this.isChanging1 = false;
    this.isChanging2 = false;
    this.isChanging3 = false;

    this.position.set(0, 1, 0);
    this.rotation.set(
      MathEx.radians(-22),
      MathEx.radians(0),
      MathEx.radians(-8)
    );
  }
  start(noiseTex, imgTexes) {
    const width = 20;
    const imagePlane = new ImagePlane(width);
    const imageFire1 = new ImageFire(width);
    const imageFire2 = new ImageFire(width);
    const imageFire3 = new ImageFire(width);
    const imagePoints = new ImagePoints(width);

    imagePlane.start(noiseTex, imgTexes);
    imageFire1.start(noiseTex);
    imageFire2.start(noiseTex);
    imageFire3.start(noiseTex);
    imagePoints.start(noiseTex);

    imagePlane.renderOrder = 2;
    imageFire1.renderOrder = 10;
    imageFire1.position.z = 2;
    imageFire2.renderOrder = 10;
    imageFire2.position.z = 2;
    imageFire3.renderOrder = 10;
    imageFire3.position.z = 2;
    imagePoints.renderOrder = 10;
    imagePoints.position.z = 2;

    this.add(imagePlane);
    this.add(imageFire1);
    this.add(imageFire2);
    this.add(imageFire3);
    this.add(imagePoints);
  }
  change(index, direction) {
    if (index === this.currentIndex) return;

    if (index > 0 && this.currentIndex === 0) {
      this.easeFuncTranslate = easeOutExpo;
      this.delayTranslate = 0.8;
      if (this.changeIndex === 0) this.delayChange1 = 0.6;
      if (this.changeIndex === 1) this.delayChange2 = 0.6;
      if (this.changeIndex === 2) this.delayChange3 = 0.6;
      this.transitionStart = direction * 24;
      this.transitionEnd = 0;
    } else if (index === 0 && this.currentIndex > 0) {
      this.easeFuncTranslate = easeInOutExpo;
      this.delayTranslate = 0;
      if (this.changeIndex === 0) this.delayChange1 = 0.3;
      if (this.changeIndex === 1) this.delayChange2 = 0.3;
      if (this.changeIndex === 2) this.delayChange3 = 0.3;
      this.transitionStart = this.position.y;
      this.transitionEnd = direction * 24;
    } else {
      this.delayTranslate = 0;
      if (this.changeIndex === 0) this.delayChange1 = 0;
      if (this.changeIndex === 1) this.delayChange2 = 0;
      if (this.changeIndex === 2) this.delayChange3 = 0;
      this.transitionStart = this.position.y;
      this.transitionEnd = 0;
    }
    switch (this.changeIndex) {
      case 0:
      default:
        this.timeChange1 = 0;
        this.timeChange2 = 0;
        this.isChanging1 = true;
        this.isChanging2 = false;
        break;
      case 1:
        this.timeChange2 = 0;
        this.timeChange3 = 0;
        this.isChanging2 = true;
        this.isChanging3 = false;
        break;
      case 2:
        this.timeChange3 = 0;
        this.timeChange1 = 0;
        this.isChanging3 = true;
        this.isChanging1 = false;
        break;
    }

    this.currentIndex = index;
    this.timeTranslate = 0;
    this.isTranslating = true;
    this.children[0].changeTex(index, this.changeIndex);
    this.children[0].update(
      0,
      this.easeStepChange1,
      this.easeStepChange2,
      this.easeStepChange3
    );
    this.children[1].update(0, this.easeStepChange1);
    this.children[2].update(0, this.easeStepChange2);
    this.children[3].update(0, this.easeStepChange3);
    this.children[4].update(
      0,
      this.easeStepChange1,
      this.easeStepChange2,
      this.easeStepChange3
    );

    this.changeIndex = this.changeIndex >= 2 ? 0 : this.changeIndex + 1;
  }
  update(time) {
    if (this.isTranslating === true) {
      this.timeTranslate += time;
      this.easeStepTranslate = this.easeFuncTranslate(
        MathEx.clamp(
          (this.timeTranslate - this.delayTranslate) / DURATION_RISE,
          0.0,
          1.0
        )
      );
    }
    if (this.isChanging1 === true) {
      this.timeChange1 += time;
    }
    if (this.isChanging2 === true) {
      this.timeChange2 += time;
    }
    if (this.isChanging3 === true) {
      this.timeChange3 += time;
    }
    this.easeStepChange1 = easeOutQuad(
      MathEx.clamp(
        (this.timeChange1 - this.delayChange1) / DURATION_CHANGE,
        0.0,
        1.0
      )
    );
    this.easeStepChange2 = easeOutQuad(
      MathEx.clamp(
        (this.timeChange2 - this.delayChange2) / DURATION_CHANGE,
        0.0,
        1.0
      )
    );
    this.easeStepChange3 = easeOutQuad(
      MathEx.clamp(
        (this.timeChange3 - this.delayChange3) / DURATION_CHANGE,
        0.0,
        1.0
      )
    );

    this.position.y =
      this.transitionStart +
      this.easeStepTranslate * (this.transitionEnd - this.transitionStart);
    this.children[0].update(
      time,
      this.easeStepChange1,
      this.easeStepChange2,
      this.easeStepChange3
    );
    this.children[1].update(time, this.easeStepChange1);
    this.children[2].update(time, this.easeStepChange2);
    this.children[3].update(time, this.easeStepChange3);
    this.children[4].update(
      time,
      this.easeStepChange1,
      this.easeStepChange2,
      this.easeStepChange3
    );
  }
  resize() {
    this.children[4].resize();
  }
}
