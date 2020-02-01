import * as THREE from 'three';
import { easeOutQuad, easeOutCirc } from 'easing-js';
import MathEx from 'js-util/MathEx';

import ImagePlane from '@/webgl/ImagePlane';
import ImageFire from '@/webgl/ImageFire';
import ImagePoints from '@/webgl/ImagePoints';

const DURATION = 1.8;

export default class Image extends THREE.Group {
  constructor() {
    super();
    this.name = 'ImageGroup';
    this.size = new THREE.Vector3();
    this.margin = new THREE.Vector2();
    this.timeTransition = 0;
    this.easeRise = 0;
    this.easeStep = 0;
    this.currentIndex = 0;
    this.delay = 0;
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
  change(index) {
    if (index === this.currentIndex) return;
    this.delay = (index > 0 && this.currentIndex === 0) ? 0.5 : 0;
    this.currentIndex = index;
    this.timeTransition = 0;
    this.isAnimated = true;
    this.children[0].changeTex(index);
    this.children[0].update(0, 0);
    this.children[1].update(0, 0);
    this.children[2].update(0, 0);
  }
  update(time) {
    this.timeTransition += time;

    if (this.isAnimated === true) {
      this.easeRise = easeOutCirc(MathEx.clamp((this.timeTransition - this.delay) / DURATION, 0.0, 1.0));
      this.easeStep = easeOutQuad(MathEx.clamp((this.timeTransition - this.delay) / DURATION, 0.0, 1.0));
      if (this.timeTransition - this.delay >= DURATION) {
        this.isAnimated = false;
      }
    }
    this.position.y = (1.0 - this.easeRise) * -10;
    this.children[0].update(time, this.easeStep);
    this.children[1].update(time, this.easeStep);
    this.children[2].update(time, this.easeStep);
  }
  resize(resolution) {
    this.children[2].resize(resolution);
  }
}
