import * as THREE from 'three';
import { easeInCirc, easeOutCirc } from 'easing-js';
import MathEx from 'js-util/MathEx';

import vs from '@/webgl/glsl/WhoIamText.vs';
import fs from '@/webgl/glsl/WhoIamText.fs';

const WIDTH = 39;
const DURATION_TRANSITION = 1;
const DELAY_SHOW = 0.5;

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
      },
      vertexShader: vs,
      fragmentShader: fs,
      transparent: true,
    });

    // Create Object3D
    super(geometry, material);
    this.name = 'WhoIamText';
    this.time = 0;
    this.timeTransition = 0;
    this.isActive = false;
    this.isChanging = false;
    this.position.y = -10;
  }
  start(tex) {
    this.isActive = true;
    this.material.uniforms.tex.value = tex;
  }
  update(t) {
    if (this.isActive === false) return;
  }
}
