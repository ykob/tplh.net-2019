import * as THREE from 'three';
import { easeInCirc, easeOutCirc } from 'easing-js';
import MathEx from 'js-util/MathEx';

import vs from '@/webgl/glsl/WhoIamText.vs';
import fs from '@/webgl/glsl/WhoIamText.fs';

const WIDTH = 39;
const DURATION_SHOW = 4;
const DELAY_SHOW = 1.4;
const DURATION_HIDE = 1.6;
const DELAY_HIDE = 0;

export default class WhoIamText extends THREE.Mesh {
  constructor() {
    // Define Geometry
    const geometry = new THREE.PlaneBufferGeometry(WIDTH, WIDTH);

    // Define Material
    const material = new THREE.RawShaderMaterial({
      uniforms: {
        time: {
          type: 'f',
          value: 0
        },
        tex: {
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
    this.name = 'WhoIamText';
    this.time = 0;
    this.timeShow = 0;
    this.timeHide = 0;
    this.isActive = false;
    this.isShown = false;
    this.isHidden = false;
    this.position.y = -10;
  }
  start(tex) {
    this.isActive = true;
    this.material.uniforms.tex.value = tex;
  }
  show() {
    this.timeShow = 0;
    this.timeHide = 0;
    this.isShown = true;
    this.isHidden = false;
  }
  hide() {
    this.isShown = false;
    this.isHidden = true;
  }
  update(time) {
    if (this.isActive === false) return;
    this.material.uniforms.time.value += time;

    // for the showing effect.
    if (this.isShown === true) {
      this.timeShow += time;
    }

    // for the hiding effect.
    if (this.isHidden === true) {
      this.timeHide += time;
    }

    const alphaShow = easeOutCirc(MathEx.clamp((this.timeShow - DELAY_SHOW) / DURATION_SHOW, 0.0, 1.0));
    const alphaHide = easeOutCirc(MathEx.clamp((this.timeHide - DELAY_HIDE) / DURATION_HIDE, 0.0, 1.0));
    this.material.uniforms.alpha.value = alphaShow * (1.0 - alphaHide);
  }
}
