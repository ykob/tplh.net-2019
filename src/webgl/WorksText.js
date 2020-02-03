import * as THREE from 'three';
import { easeInOutCirc } from 'easing-js';
import MathEx from 'js-util/MathEx';

import vs from '@/webgl/glsl/WorksText.vs';
import fs from '@/webgl/glsl/WorksText.fs';

import WORKS from '@/const/WORKS';

const WIDTH = 90;
const DURATION_TRANSITION = 1.6;

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
        prevMaxUvX: {
          type: 'f',
          value: 0
        },
        nextId: {
          type: 'f',
          value: 0
        },
        nextMaxUvX: {
          type: 'f',
          value: 0
        },
        maxId: {
          type: 'f',
          value: 16
        },
        alphaChanging: {
          type: 'f',
          value: 0
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
  change(id) {
    const { prevId, prevMaxUvX, nextId, nextMaxUvX } = this.material.uniforms;
    prevId.value = nextId.value;
    prevMaxUvX.value = nextMaxUvX.value;
    nextId.value = id;
    nextMaxUvX.value = (id > 0) ? (WORKS[id - 1].textWidth + 40) / 2048 : 0;
    this.timeTransition = 0;
    this.isChanging = true;
  }
  update(t) {
    if (this.isActive === false) return;

    const { time, alphaChanging, nextId } = this.material.uniforms;
    time.value += t;

    // run the animation of changing text.
    if (this.isChanging) {
      this.timeTransition += t;
      alphaChanging.value = easeInOutCirc(MathEx.clamp(this.timeTransition / DURATION_TRANSITION, 0.0, 1.0));
      if (this.timeTransition >= DURATION_TRANSITION) {
        this.isChanging = false;
      }
    }
  }
}
