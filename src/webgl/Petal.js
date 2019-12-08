import * as THREE from 'three';
import { easeOutExpo } from 'easing-js';
import MathEx from 'js-util/MathEx';

import vs from '@/webgl/glsl/Petal.vs';
import fs from '@/webgl/glsl/Petal.fs';

const DURATION = 3;

export default class Petal extends THREE.Mesh {
  constructor(geometry) {
    // Define Material
    const material = new THREE.RawShaderMaterial({
      uniforms: {
        time: {
          type: 'f',
          value: 0
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
      flatShading: true,
      side: THREE.DoubleSide,
    });

    // Create Object3D
    super(geometry, material);
    this.name = 'Petal';
    this.timeRotate = 0;
    this.timeChanged = 0;
    this.alphaStart = 0;
    this.alphaEnd = 0;
    this.isActive = false;
    this.isChanged = false;
  }
  start(noiseTex) {
    this.isActive = true;
    this.material.uniforms.noiseTex.value = noiseTex;
  }
  update(time) {
    if (this.isActive === false) return;

    this.timeRotate += time;
    this.rotation.set(0, this.timeRotate, 0);

    if (this.isChanged === true) {
      this.timeChanged += time;
      this.material.uniforms.alpha.value =
        this.alphaStart + easeOutExpo(
          MathEx.clamp(this.timeChanged / DURATION, 0.0, 1.0)
        ) * (this.alphaEnd - this.alphaStart);
      if (this.timeChanged >= DURATION) {
        this.timeChanged = 0;
        this.isChanged = false;
      }
    }

    this.material.uniforms.time.value += time;
  }
  changeColorDark(bool) {
    this.alphaStart = this.material.uniforms.alpha.value;
    this.alphaEnd = (bool === true) ? 1 : 0;
    this.timeRotate = 0;
    this.timeChanged = 0;
    this.isChanged = true;
  }
}
