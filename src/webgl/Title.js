import * as THREE from 'three';
import { easeInCirc, easeOutCirc } from 'easing-js';
import MathEx from 'js-util/MathEx';

import vs from '@/webgl/glsl/Title.vs';
import fs from '@/webgl/glsl/Title.fs';

const DURATION_SHOW = 3;
const DELAY_SHOW = 1;
const DURATION_HIDE = 1;
const DELAY_HIDE = 0;

export default class Title extends THREE.Mesh {
  constructor() {
    // Define Geometry
    const geometry = new THREE.PlaneBufferGeometry(16, 2, 64, 8);

    // Define Material
    const material = new THREE.RawShaderMaterial({
      uniforms: {
        time: {
          type: 'f',
          value: 0
        },
        alphaTex: {
          type: 't',
          value: null
        },
        noiseTex: {
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
    this.name = 'Title';
    this.size = new THREE.Vector3();
    this.time = 0;
    this.alphaStart = 0;
    this.alphaEnd = 0;
    this.isActive = false;
    this.isShown = false;
    this.isHidden = false;

    this.position.set(0, -7, 0);
  }
  start(alphaTex, noiseTex) {
    this.isActive = true;
    this.material.uniforms.alphaTex.value = alphaTex;
    this.material.uniforms.noiseTex.value = noiseTex;
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

    // calculation the alpha.
    const alphaShow = easeOutCirc(MathEx.clamp((this.timeShow - DELAY_SHOW) / DURATION_SHOW, 0.0, 1.0));
    const alphaHide = easeInCirc(MathEx.clamp((this.timeHide - DELAY_HIDE) / DURATION_HIDE, 0.0, 1.0));
    this.material.uniforms.alpha.value = alphaShow * (1.0 - alphaHide);
    this.position.set(
      0.0,
      alphaShow * 2 + alphaHide * 2 - 9,
      0.0
    );
    this.rotation.set(
      MathEx.radians(90 - alphaShow * 120 - alphaHide * 120),
      0.0,
      0.0
    );
  }
}
