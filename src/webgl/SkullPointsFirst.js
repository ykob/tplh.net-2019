import * as THREE from 'three';
import MathEx from 'js-util/MathEx';

import store from '@/store';
import vs from '@/webgl/glsl/SkullPointsFirst.vs';
import fs from '@/webgl/glsl/SkullPointsFirst.fs';

import PIXEL_RATIO from '@/const/PIXEL_RATIO';

const DURATION = 1.4;
const DELAY_SHOW = 2.75;
const DURATION_HIDE = 1;
const NUM = 800;

export default class SkullPointsFirst extends THREE.Points {
  constructor() {
    // Define Geometry
    const geometry = new THREE.BufferGeometry();

    // Define attributes of the geometry
    const baPositions = new THREE.BufferAttribute(new Float32Array(NUM * 3), 3);
    const baDelays = new THREE.BufferAttribute(new Float32Array(NUM), 1);
    const baStartY = new THREE.BufferAttribute(new Float32Array(NUM), 1);
    for (var i = 0, ul = NUM; i < ul; i++) {
      const radian = MathEx.radians(Math.random() * 360);
      const radius = Math.random() * 6 + 2;
      baPositions.setXYZ(
        i,
        Math.cos(radian) * radius,
        0,
        Math.sin(radian) * radius
      );
      baDelays.setX(i, Math.random() * DURATION * 0.6 + DELAY_SHOW);
      baStartY.setX(i, Math.random() * 10);
    }
    geometry.setAttribute('position', baPositions);
    geometry.setAttribute('delay', baDelays);
    geometry.setAttribute('startY', baStartY);

    // Define Material
    const material = new THREE.RawShaderMaterial({
      uniforms: {
        time: {
          type: 'f',
          value: 0
        },
        duration: {
          type: 'f',
          value: DURATION
        },
        resolution: {
          type: 'v2',
          value: new THREE.Vector2()
        },
        pixelRatio: {
          type: 'f',
          value: PIXEL_RATIO
        },
        noiseTex: {
          type: 't',
          value: null
        },
        alpha: {
          type: 'f',
          value: 0
        }
      },
      vertexShader: vs,
      fragmentShader: fs,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    // Create Object3D
    super(geometry, material);
    this.name = 'SkullPointsFirst';
    this.timeHide = 0;
    this.isShown = false;
    this.isHidden = false;
  }
  start(noiseTex) {
    this.material.uniforms.noiseTex.value = noiseTex;
  }
  show() {
    this.isShown = true;
  }
  hide() {
    this.isHidden = this.isShown;
  }
  update(t) {
    if (this.isShown === false) return;

    const { time } = this.material.uniforms;

    time.value += t;
    this.rotation.set(0, time.value * 0.2, 0);

    if (time.value >= DURATION * 1.8 + DELAY_SHOW) {
      this.visible = false;
    }

    // calculation the hidding alpha.
    if (this.isHidden === true) {
      this.timeHide += time;
    }
    const alphaHide = MathEx.clamp(this.timeHide / DURATION_HIDE, 0.0, 1.0);
    this.material.uniforms.alpha.value = 1.0 - alphaHide;
  }
  resize() {
    const { resolution } = store.state;
    this.material.uniforms.resolution.value.copy(resolution);
  }
}
