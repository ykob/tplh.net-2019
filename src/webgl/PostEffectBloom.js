import * as THREE from 'three';
import { easeOutCirc, easeInOutCubic } from 'easing-js';
import MathEx from 'js-util/MathEx';

import store from '@/store';

import vs from '@/webgl/glsl/PostEffect.vs';
import fs from '@/webgl/glsl/PostEffectBloom.fs';

const DURATION1 = 0.2;
const DURATION2 = 1.8;
const DURATION3 = 1;
const DELAY = 2.7;

export default class PostEffectBloom extends THREE.Mesh {
  constructor() {
    // Define Geometry
    const geometry = new THREE.PlaneBufferGeometry(2, 2);

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
        resolution: {
          type: 'v2',
          value: store.state.resolution
        },
        texture1: {
          type: 't',
          value: null
        },
        texture2: {
          type: 't',
          value: null
        }
      },
      vertexShader: vs,
      fragmentShader: fs
    });

    // Create Object3D
    super(geometry, material);
    this.name = 'PostEffectBloom';
    this.timeShake = 0;
    this.timeFadeOut = 0;
    this.isShaking = false;
    this.isFadeOut = false;
  }
  start(texture1, texture2) {
    this.material.uniforms.texture1.value = texture1;
    this.material.uniforms.texture2.value = texture2;
  }
  shake() {
    this.isShaking = true;
  }
  fadeOut() {
    this.isFadeOut = this.isShaking;
  }
  update(time) {
    this.material.uniforms.time.value += time;

    if (this.isShaking === true) {
      this.timeShake += time;
    }
    if (this.isFadeOut === true) {
      this.timeFadeOut += time;
    }

    const alpha1 = easeOutCirc(
      MathEx.clamp((this.timeShake - DELAY) / DURATION1, 0.0, 1.0)
    );
    const alpha2 = easeInOutCubic(
      MathEx.clamp((this.timeShake - DELAY - DURATION1) / DURATION2, 0.0, 1.0)
    );
    const alpha3 = easeOutCirc(
      MathEx.clamp(this.timeFadeOut / DURATION3, 0.0, 1.0)
    );
    this.material.uniforms.alpha.value =
      alpha1 * (1.0 - alpha2) * (1.0 - alpha3);
  }
}
