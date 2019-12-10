import * as THREE from 'three';
import { easeOutCirc } from 'easing-js';
import MathEx from 'js-util/MathEx';

import vs from '@/webgl/glsl/Portlate.vs';
import fs from '@/webgl/glsl/Portlate.fs';

const DURATION_SHOW = 3;
const DELAY_SHOW = 0.5;
const DURATION_HIDE = 5;
const DELAY_HIDE = 0;

export default class Portlate extends THREE.Mesh {
  constructor() {
    // Define Geometry
    const geometry = new THREE.PlaneBufferGeometry(20, 40);

    // Define Material
    const material = new THREE.RawShaderMaterial({
      uniforms: {
        time: {
          type: 'f',
          value: 0
        },
        maskTex: {
          type: 't',
          value: null
        },
        alpha: {
          type: 'f',
          value: 0
        },
      },
      vertexShader: vs,
      fragmentShader: fs,
      transparent: true,
    });

    // Create Object3D
    super(geometry, material);
    this.name = 'Portlate';
    this.timeShow = 0;
    this.timeHide = 0;
    this.isActive = false;
    this.isShown = false;
    this.isHidden = false;
    this.rotation.set(0, 0, MathEx.radians(-20));
  }
  start(maskTex) {
    this.isActive = true;
    this.material.uniforms.maskTex.value = maskTex;
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
    const alphaShow = easeOutCirc(MathEx.clamp((this.timeShow - DELAY_SHOW) / DURATION_SHOW, 0.0, 1.0));
    const alphaHide = easeOutCirc(MathEx.clamp((this.timeHide - DELAY_HIDE) / DURATION_HIDE, 0.0, 1.0));
    this.material.uniforms.alpha.value = 1.0 - alphaShow * (1.0 - alphaHide);
  }
  resize(resolution) {
    if (resolution.x > 768) {
      this.position.set(-7, 10, 0);
    } else {
      this.position.set(0, 10, 0);
    }
  }
}
