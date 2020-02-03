import * as THREE from 'three';
import { easeInOutCirc } from 'easing-js';
import MathEx from 'js-util/MathEx';

import vs from '@/webgl/glsl/WorksText.vs';
import fs from '@/webgl/glsl/WorksText.fs';

const WIDTH = 90;

export default class WorksText extends THREE.Mesh {
  constructor() {
    // Define Geometry
    const geometry = new THREE.PlaneBufferGeometry(WIDTH, 3 / 16 * WIDTH);

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
        prevId: {
          type: 'f',
          value: 0
        },
        nextId: {
          type: 'f',
          value: 1
        },
        maxId: {
          type: 'f',
          value: 16
        },
        maxUvX: {
          type: 'f',
          value: 650 / 1024
        }
      },
      vertexShader: vs,
      fragmentShader: fs,
      transparent: true,
    });

    // Create Object3D
    super(geometry, material);
    this.name = 'WorksText';
    this.time = 0;
    this.isActive = false;

    this.position.set(0, 0, 0);
  }
  start(tex) {
    this.isActive = true;
    this.material.uniforms.tex.value = tex;
  }
  show() {
  }
  hide() {
  }
  update(time) {
    if (this.isActive === false) return;
    this.material.uniforms.time.value += time;
  }
}
