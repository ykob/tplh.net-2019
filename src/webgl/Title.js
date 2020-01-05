import * as THREE from 'three';
import { easeInOutCubic } from 'easing-js';
import MathEx from 'js-util/MathEx';

import vs from '@/webgl/glsl/Title.vs';
import fs from '@/webgl/glsl/Title.fs';

const DURATION = 2;

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
    this.isChanged = false;

    this.position.set(0, -7, 0);
  }
  start(alphaTex, noiseTex) {
    this.isActive = true;
    this.material.uniforms.alphaTex.value = alphaTex;
    this.material.uniforms.noiseTex.value = noiseTex;
  }
  update(time) {
    if (this.isActive === false) return;

    if (this.isChanged === true) {
      this.time += time;
      this.material.uniforms.alpha.value =
        this.alphaStart + easeInOutCubic(
          MathEx.clamp(this.time / DURATION, 0.0, 1.0)
        ) * (this.alphaEnd - this.alphaStart);
      if (this.time >= DURATION) {
        this.time = 0;
        this.isChanged = false;
      }
    }

    this.material.uniforms.time.value += time;
  }
  change(bool) {
    this.alphaStart = this.material.uniforms.alpha.value;
    this.alphaEnd = (bool === true) ? 1 : 0;
    this.time = 0;
    this.isChanged = true;
  }
}
