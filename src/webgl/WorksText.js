import * as THREE from 'three';
import { easeInCirc, easeOutCirc } from 'easing-js';
import MathEx from 'js-util/MathEx';

import vs from '@/webgl/glsl/WorksText.vs';
import fs from '@/webgl/glsl/WorksText.fs';

import WORKS from '@/const/WORKS';

const WIDTH = 90;
const DURATION_TRANSITION = 1;
const DELAY_SHOW = 0.8;

export default class WorksText extends THREE.Mesh {
  constructor() {
    // Define Geometry
    const geometry = new THREE.PlaneBufferGeometry(
      WIDTH,
      (5 / 16) * WIDTH,
      128,
      39
    );

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
        tex1Index: {
          type: 'f',
          value: 0
        },
        tex1MaxUvX: {
          type: 'f',
          value: 0
        },
        tex2Index: {
          type: 'f',
          value: 0
        },
        tex2MaxUvX: {
          type: 'f',
          value: 0
        },
        tex3Index: {
          type: 'f',
          value: 0
        },
        tex3MaxUvX: {
          type: 'f',
          value: 0
        },
        maxIndex: {
          type: 'f',
          value: 16
        },
        alphaShow1: {
          type: 'f',
          value: 0
        },
        alphaHide1: {
          type: 'f',
          value: 0
        },
        alphaShow2: {
          type: 'f',
          value: 0
        },
        alphaHide2: {
          type: 'f',
          value: 0
        },
        alphaShow3: {
          type: 'f',
          value: 0
        },
        alphaHide3: {
          type: 'f',
          value: 0
        },
        directionShow1: {
          type: 'f',
          value: 1
        },
        directionHide1: {
          type: 'f',
          value: 1
        },
        directionShow2: {
          type: 'f',
          value: 1
        },
        directionHide2: {
          type: 'f',
          value: 1
        },
        directionShow3: {
          type: 'f',
          value: 1
        },
        directionHide3: {
          type: 'f',
          value: 1
        }
      },
      vertexShader: vs,
      fragmentShader: fs,
      transparent: true,
      side: THREE.DoubleSide,
      depthTest: false
    });

    // Create Object3D
    super(geometry, material);
    this.name = 'WorksText';
    this.time = 0;
    this.timeShow1 = 0;
    this.timeShow2 = 0;
    this.timeShow3 = 0;
    this.timeHide1 = 0;
    this.timeHide2 = 0;
    this.timeHide3 = 0;
    this.changeIndex = 0;
    this.isActive = false;
    this.isShown1 = false;
    this.isShown2 = false;
    this.isShown3 = false;
    this.isHidden1 = false;
    this.isHidden2 = false;
    this.isHidden3 = false;
    this.renderOrder = 2;
  }
  start(tex) {
    this.isActive = true;
    this.material.uniforms.tex.value = tex;
  }
  change(index, dir, prevPosFromWorks) {
    if (this.changeIndex === 0) {
      const {
        tex1Index,
        tex2Index,
        tex2MaxUvX,
        directionHide1,
        directionShow2
      } = this.material.uniforms;
      tex2Index.value = index;
      tex2MaxUvX.value =
        index > 0 ? (WORKS[index - 1].textWidth + 40) / 2048 : 0;
      this.timeHide1 = 0;
      this.isHidden1 = true;
      this.timeShow2 = 0;
      this.timeHide2 = 0;
      this.isShown2 = true;
      this.isHidden2 = false;

      if (index === 0) {
        directionHide1.value = directionShow2.value = dir;
      } else if (tex1Index.value === 0) {
        directionHide1.value = directionShow2.value = -prevPosFromWorks;
      } else {
        const diff = tex2Index.value - tex1Index.value;
        directionHide1.value = directionShow2.value = diff / Math.abs(diff);
      }
    } else if (this.changeIndex === 1) {
      const {
        tex2Index,
        tex3Index,
        tex3MaxUvX,
        directionHide2,
        directionShow3
      } = this.material.uniforms;
      tex3Index.value = index;
      tex3MaxUvX.value =
        index > 0 ? (WORKS[index - 1].textWidth + 40) / 2048 : 0;
      this.timeHide2 = 0;
      this.isHidden2 = true;
      this.timeShow3 = 0;
      this.timeHide3 = 0;
      this.isShown3 = true;
      this.isHidden3 = false;

      if (index === 0) {
        directionHide2.value = directionShow3.value = dir;
      } else if (tex2Index.value === 0) {
        directionHide2.value = directionShow3.value = -prevPosFromWorks;
      } else {
        const diff = tex3Index.value - tex2Index.value;
        directionHide2.value = directionShow3.value = diff / Math.abs(diff);
      }
    } else if (this.changeIndex === 2) {
      const {
        tex3Index,
        tex1Index,
        tex1MaxUvX,
        directionHide3,
        directionShow1
      } = this.material.uniforms;
      tex1Index.value = index;
      tex1MaxUvX.value =
        index > 0 ? (WORKS[index - 1].textWidth + 40) / 2048 : 0;
      this.timeHide3 = 0;
      this.isHidden3 = true;
      this.timeShow1 = 0;
      this.timeHide1 = 0;
      this.isShown1 = true;
      this.isHidden1 = false;

      if (index === 0) {
        directionHide3.value = directionShow1.value = dir;
      } else if (tex3Index.value === 0) {
        directionHide3.value = directionShow1.value = -prevPosFromWorks;
      } else {
        const diff = tex1Index.value - tex3Index.value;
        directionHide3.value = directionShow1.value = diff / Math.abs(diff);
      }
    }

    this.changeIndex = this.changeIndex >= 2 ? 0 : this.changeIndex + 1;
  }
  update(t) {
    if (this.isActive === false) return;

    const {
      time,
      alphaShow1,
      alphaShow2,
      alphaShow3,
      alphaHide1,
      alphaHide2,
      alphaHide3
    } = this.material.uniforms;

    time.value += t;

    // run the animation of changing text.
    if (this.isShown1) {
      this.timeShow1 += t;
    }
    if (this.isShown2) {
      this.timeShow2 += t;
    }
    if (this.isShown3) {
      this.timeShow3 += t;
    }
    if (this.isHidden1) {
      this.timeHide1 += t;
    }
    if (this.isHidden2) {
      this.timeHide2 += t;
    }
    if (this.isHidden3) {
      this.timeHide3 += t;
    }

    alphaShow1.value = easeOutCirc(
      MathEx.clamp(
        (this.timeShow1 - DELAY_SHOW) / DURATION_TRANSITION,
        0.0,
        1.0
      )
    );
    alphaShow2.value = easeOutCirc(
      MathEx.clamp(
        (this.timeShow2 - DELAY_SHOW) / DURATION_TRANSITION,
        0.0,
        1.0
      )
    );
    alphaShow3.value = easeOutCirc(
      MathEx.clamp(
        (this.timeShow3 - DELAY_SHOW) / DURATION_TRANSITION,
        0.0,
        1.0
      )
    );
    alphaHide1.value = easeInCirc(
      MathEx.clamp(this.timeHide1 / DURATION_TRANSITION, 0.0, 1.0)
    );
    alphaHide2.value = easeInCirc(
      MathEx.clamp(this.timeHide2 / DURATION_TRANSITION, 0.0, 1.0)
    );
    alphaHide3.value = easeInCirc(
      MathEx.clamp(this.timeHide3 / DURATION_TRANSITION, 0.0, 1.0)
    );
  }
}
