import * as THREE from 'three';
import { easeOutCirc, easeInOutCubic } from 'easing-js';
import MathEx from 'js-util/MathEx';

import vs from '@/webgl/glsl/SkullBody.vs';
import fs from '@/webgl/glsl/SkullBody.fs';
const DURATION_SHOW = 5;
const DELAY_SHOW = 1;
const DURATION_HIDE = 1.2;
const DELAY_HIDE = 0.4;
const DURATION_SCREAM = 2.5;
const DELAY_SCREAM = 2.5;

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
        rotateMatrix: {
          type: 'm4',
          value: new THREE.Matrix4()
        },
        renderOutline: {
          type: 'f',
          value: 0
        },
        alpha: {
          type: 'f',
          value: 0
        },
        hsv1: {
          type: 'v3',
          value: new THREE.Vector3(0.09, 0.7, 0.3)
        }
      },
      vertexShader: vs,
      fragmentShader: fs,
      transparent: true,
      flatShading: true
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
    this.lookEuler = new THREE.Euler();
    this.lookV = new THREE.Vector3();
    this.lookA = new THREE.Vector3();
    this.lookAnchor = new THREE.Vector3();
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
    if (this.timeScream > 0) {
      this.timeScream = DURATION_SCREAM + DELAY_SCREAM;
    }
  }
  hide() {
    this.isShown = false;
    this.isHidden = true;
  }
  lookMouse(lookV) {
    this.lookAnchor.copy(lookV);
  }
  update(time, camera, fluctuation) {
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
    const alphaShow = easeOutCirc(
      MathEx.clamp((this.timeShow - DELAY_SHOW) / DURATION_SHOW, 0.0, 1.0)
    );
    const alphaHide = easeOutCirc(
      MathEx.clamp((this.timeHide - DELAY_HIDE) / DURATION_HIDE, 0.0, 1.0)
    );
    this.material.uniforms.alpha.value = alphaShow * (1.0 - alphaHide);

    // scream
    const alphaScream = easeInOutCubic(
      MathEx.smoothstep(
        DELAY_SCREAM,
        DELAY_SCREAM + DURATION_SCREAM * 0.2,
        this.timeScream
      ) *
        (1 -
          MathEx.smoothstep(
            DELAY_SCREAM + DURATION_SCREAM * 0.15,
            DELAY_SCREAM + DURATION_SCREAM,
            this.timeScream
          ))
    );

    // Frist rotate
    const alphaRaise = easeOutCirc(
      MathEx.clamp(((this.timeShow - DELAY_SHOW) / DURATION_SHOW) * 2, 0.0, 1.0)
    );

    // Move to look at a mouse coordinate.
    // rotate
    this.lookA
      .copy(this.lookAnchor)
      .sub(this.lookV)
      .divideScalar(24);
    this.lookV.add(this.lookA);
    this.lookAt(this.lookV);
    this.lookEuler.copy(this.rotation);
    this.rotation.set(
      this.lookEuler.x +
        MathEx.radians(5 + (1.0 - alphaRaise) * 70 + alphaScream * -20),
      this.lookEuler.y + MathEx.radians(0),
      this.lookEuler.z + MathEx.radians(0)
    );
    this.material.uniforms.rotateMatrix.value.makeRotationFromEuler(
      this.rotation
    );

    const shake = alphaScream * 0.035;
    const shakeRadian = MathEx.radians(Math.random() * 360);
    this.position.set(
      Math.cos(shakeRadian) * shake,
      Math.sin(shakeRadian) * shake,
      0
    );

    // loop animation
    const loopDegree = (Math.sin(this.timeLoop) * 0.5 + 0.5) * 8;

    this.head.rotation.set(
      MathEx.radians(alphaScream * -24 - loopDegree),
      0,
      0
    );
    this.jaw.rotation.set(MathEx.radians(alphaScream * 24 + loopDegree), 0, 0);

    // calculation the scale.
    const scale = alphaShow * 0.3 + 0.7 + alphaHide * 0.1 + alphaScream * 0.2;
    this.scale.set(scale, scale, scale);

    // fluctuation of the color
    this.material.uniforms.hsv1.value.z = 0.3 + fluctuation * 0.3;
  }
}
