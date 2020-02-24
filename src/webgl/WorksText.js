import * as THREE from 'three';
import { easeInCirc, easeOutCirc } from 'easing-js';
import MathEx from 'js-util/MathEx';

import vs from '@/webgl/glsl/WorksText.vs';
import fs from '@/webgl/glsl/WorksText.fs';

import WORKS from '@/const/WORKS';

const WIDTH = 90;
const DURATION_TRANSITION = 1;
const DELAY_SHOW = 0.5;

export default class WorksText extends THREE.Mesh {
  constructor() {
    // Define Geometry
    const geometry = new THREE.PlaneBufferGeometry(WIDTH, 5 / 16 * WIDTH, 256, 80);

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
        prevIndex: {
          type: 'f',
          value: 0
        },
        prevMaxUvX: {
          type: 'f',
          value: 0
        },
        nextIndex: {
          type: 'f',
          value: 0
        },
        nextMaxUvX: {
          type: 'f',
          value: 0
        },
        maxIndex: {
          type: 'f',
          value: 16
        },
        alphaShow: {
          type: 'f',
          value: 0
        },
        alphaHide: {
          type: 'f',
          value: 0
        },
        direction: {
          type: 'f',
          value: 1
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
    this.timeTransition = 0;
    this.isActive = false;
    this.isChanging = false;
  }
  start(tex) {
    this.isActive = true;
    this.material.uniforms.tex.value = tex;
  }
  change(index, dir, prevPosFromWorks) {
    const { prevIndex, prevMaxUvX, nextIndex, nextMaxUvX, direction } = this.material.uniforms;
    prevIndex.value = nextIndex.value;
    prevMaxUvX.value = nextMaxUvX.value;
    nextIndex.value = index;
    nextMaxUvX.value = (index > 0) ? (WORKS[index - 1].textWidth + 40) / 2048 : 0;
    this.timeTransition = 0;
    this.isChanging = true;

    if (index === 0) {
      direction.value = dir;
    } else if (prevIndex.value === 0) {
      direction.value = -prevPosFromWorks;
    } else {
      const diff = nextIndex.value - prevIndex.value;
      direction.value = diff / Math.abs(diff);
    }
  }
  update(t) {
    if (this.isActive === false) return;

    const { time, alphaShow, alphaHide, nextIndex } = this.material.uniforms;
    time.value += t;

    // run the animation of changing text.
    if (this.isChanging) {
      this.timeTransition += t;
      alphaShow.value = easeOutCirc(MathEx.clamp((this.timeTransition - DELAY_SHOW) / DURATION_TRANSITION, 0.0, 1.0));
      alphaHide.value = easeInCirc(MathEx.clamp(this.timeTransition / DURATION_TRANSITION, 0.0, 1.0));
      if (this.timeTransition - DELAY_SHOW >= DURATION_TRANSITION) {
        this.isChanging = false;
      }
    }
  }
}
