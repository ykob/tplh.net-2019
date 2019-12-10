import * as THREE from 'three';
import { easeOutCirc } from 'easing-js';
import MathEx from 'js-util/MathEx';

import vs from '@/webgl/glsl/Blossom.vs';
import fs from '@/webgl/glsl/Blossom.fs';

const DURATION_SHOW = 5;
const DELAY_SHOW = 1.2;
const DURATION_HIDE = 1.4;
const DELAY_HIDE = 0;

export default class Blossom extends THREE.Mesh {
  constructor(i, geometry) {
    // Define Material
    const material = new THREE.RawShaderMaterial({
      uniforms: {
        time: {
          type: 'f',
          value: 0
        },
        alpha: {
          type: 'f',
          value: 0
        },
      },
      vertexShader: vs,
      fragmentShader: fs,
      flatShading: true,
      side: THREE.DoubleSide,
    });

    // Create Object3D
    super(geometry, material);
    this.name = 'Blossom';
    this.delay = i * 0.6 + DELAY_SHOW;
    this.radius = i * 4 + 10;
    this.radian1 = MathEx.radians(i * 360);
    this.radian2 = MathEx.radians((Math.random() * 2 - 1) * 180);
    this.rotateDirection = Math.round(Math.random()) * 2 - 1;
    this.timeRotate = Math.random() * 100;
    this.timeShow = 0;
    this.timeHide = 0;
    this.isActive = false;
    this.isShown = false;
    this.isHidden = false;
  }
  start() {
    this.isActive = true;
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
    if (this.isActive === false) return;
    this.material.uniforms.time.value += time;

    // for the showing effect.
    if (this.isShown === true) {
      this.timeShow += time;
      if (this.timeShow - this.delay >= DURATION_SHOW) {
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
    this.material.uniforms.alpha.value = alphaShow * (1.0 - alphaHide);

    // calculation the world rotation.
    this.radian1 += time * 0.1 * this.rotateDirection;
    this.radian2 += time * 0.1 * this.rotateDirection;

    this.position.set(
      Math.sin(this.radian1) * (this.radius + (1.0 - alphaShow) * this.radius * 0.5),
      Math.sin(this.radian2) * this.radius * 0.333,
      Math.cos(this.radian1) * (this.radius + (1.0 - alphaShow) * this.radius * 0.5)
    );

    this.timeRotate += time;
    this.rotation.set(
      this.timeRotate * 0.15,
      this.timeRotate * 0.1,
      this.timeRotate * 0.2
    );
  }
}
