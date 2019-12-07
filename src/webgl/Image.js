import * as THREE from 'three';
import { easeOutQuad } from 'easing-js';
import MathEx from 'js-util/MathEx';

import ImagePlane from '@/webgl/ImagePlane';
import ImageFire from '@/webgl/ImageFire';
import ImagePoints from '@/webgl/ImagePoints';

const DURATION = 1.6;

export default class Image extends THREE.Group {
  constructor() {
    super();
    this.name = 'ImageGroup';
    this.size = new THREE.Vector3();
    this.margin = new THREE.Vector2();
    this.timeTransition = 0;
    this.currentIndex = 0;
    this.delay = 0;
    this.isAnimated = false;
  }
  start(noiseTex, imgTexes) {
    const imagePlane = new ImagePlane();
    const imageFire = new ImageFire();
    const imagePoints = new ImagePoints();

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
    this.delay = (index > 0 && this.currentIndex === 0) ? 0.7 : 0;
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
      const easeStep = easeOutQuad(MathEx.clamp((this.timeTransition - this.delay) / DURATION, 0.0, 1.0));

      this.children[0].update(time, easeStep);
      this.children[1].update(time, easeStep);
      this.children[2].update(time, easeStep);

      if (this.timeTransition - this.delay >= DURATION) {
        this.isAnimated = false;
      }
    }
  }
  resize(camera, resolution) {
    const height = Math.abs(
      (camera.position.z - this.position.z) * Math.tan(MathEx.radians(camera.fov) / 2) * 2
    );
    const width = height * camera.aspect;

    this.margin.set(
      (resolution.x > resolution.y) ? 400 : 200,
      (resolution.x > resolution.y) ? 300 : 200
    );
    this.size.set(
      width * (resolution.x - this.margin.x) / resolution.x,
      height * (resolution.y - this.margin.y) / resolution.y,
      1
    );
    this.children[0].resize(this.size);
    this.children[1].resize(this.size);
    this.children[2].resize(this.size, resolution);
  }
}
