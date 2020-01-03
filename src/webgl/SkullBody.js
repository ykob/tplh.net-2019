import * as THREE from 'three';
import { easeOutCirc, easeInOutCirc } from 'easing-js';
import MathEx from 'js-util/MathEx';

import vs from '@/webgl/glsl/SkullBody.vs';
import fs from '@/webgl/glsl/SkullBody.fs';

const DURATION_SHOW = 5;
const DELAY_SHOW = 1;
const DURATION_HIDE = 1.4;
const DELAY_HIDE = 0;
const DURATION_SCREAM = 4;
const DELAY_SCREAM = 3;

export default class SkullBody extends THREE.Group {
  constructor(geometry1, geometry2) {
    // Create Object3D
    super();

    // Define Material
    this.material = new THREE.RawShaderMaterial({
      uniforms: {
        time: {
          type: 'f',
          value: 0
        },
        renderOutline: {
          type: 'f',
          value: 0
        },
        alpha: {
          type: 'f',
          value: 0
        }
      },
      vertexShader: vs,
      fragmentShader: fs,
      transparent: true,
      flatShading: true,
    });

    this.head = new THREE.Mesh(geometry1, this.material);
    this.jaw = new THREE.Mesh(geometry2, this.material);

    this.add(this.head);
    this.add(this.jaw);

    this.name = 'SkullBody';
    this.timeShow = 0;
    this.timeHide = 0;
    this.timeScream = 0;
    this.timeLoop = -MathEx.radians(90);
    this.isActive = false;
    this.isShown = false;
    this.isHidden = false;
  }
  start() {
    this.isActive = true;
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
  update(time, camera) {
    if (this.isActive === false) return;
    this.material.uniforms.time.value += time;

    // for the showing effect.
    if (this.isShown === true) {
      this.timeShow += time;
      this.timeScream += time;
    }
    // for the hiding effect.
    if (this.isHidden === true) {
      this.timeHide += time;
    }
    // for the loop animation
    if (this.timeScream >= DELAY_SCREAM + DURATION_SCREAM) {
      this.timeLoop += time;
    }

    // calculation the alpha.
    const alphaShow = easeOutCirc(MathEx.clamp((this.timeShow - DELAY_SHOW) / DURATION_SHOW, 0.0, 1.0));
    const alphaHide = easeOutCirc(MathEx.clamp((this.timeHide - DELAY_HIDE) / DURATION_HIDE, 0.0, 1.0));
    this.material.uniforms.alpha.value = alphaShow * (1.0 - alphaHide);

    // scream
    const alphaScream = easeInOutCirc(
      MathEx.smoothstep(DELAY_SCREAM, DELAY_SCREAM + DURATION_SCREAM * 0.33, this.timeScream)
      * (1 - MathEx.smoothstep(DELAY_SCREAM + DURATION_SCREAM * 0.33, DELAY_SCREAM + DURATION_SCREAM, this.timeScream))
    );

    const shake = alphaScream * 0.05;
    const shakeRadian = MathEx.radians(Math.random() * 360);
    this.position.set(
      Math.cos(shakeRadian) * shake,
      Math.sin(shakeRadian) * shake,
      0
    );

    // loop animation
    const loopDegree = (Math.sin(this.timeLoop) * 0.5 + 0.5) * 8;

    this.head.rotation.set(MathEx.radians(alphaScream * -24 - loopDegree), 0, 0);
    this.jaw.rotation.set(MathEx.radians(alphaScream * 24 + loopDegree), 0, 0);

    // calculation the scale.
    const scale = (alphaShow * 0.3 + 0.7) + (alphaHide * 0.1) + alphaScream * 0.2;
    this.scale.set(scale, scale, scale);
  }
}
