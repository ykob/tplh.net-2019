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
        alphaShow: {
          type: 'f',
          value: 0
        },
        alphaColor: {
          type: 'f',
          value: 0
        },
      },
      vertexShader: vs,
      fragmentShader: fs,
      flatShading: true,
      side: THREE.DoubleSide,
      transparent: true,
    });

    // Create Object3D
    super(geometry, material);
    this.name = 'Petal';
    this.mass = Math.random();
    this.rotateDirection = Math.round(Math.random()) * 2 - 1;
    this.scale.set(
      this.mass * 1.2 + 0.8,
      this.mass * 1.2 + 0.8,
      this.mass * 1.2 + 0.8
    );
   this.rotation.set(
      MathEx.radians((Math.random() * 2 - 1) * 60),
      0,
      MathEx.radians((Math.random() * 2 - 1) * 60)
    );
    this.axisBodyRotate = new THREE.Vector3().copy(this.up).applyEuler(this.rotation);
    this.quaternionPrev = new THREE.Quaternion();
    this.isActive = false;
  }
  start(noiseTex) {
    this.isActive = true;
    this.material.uniforms.noiseTex.value = noiseTex;
  }
  update(time) {
    if (this.isActive === false) return;

    // rotate with a quaternion.
    this.quaternionPrev.copy(this.quaternion);
    this.quaternion.setFromAxisAngle(
      this.axisBodyRotate,
      time * this.rotateDirection * (1 - this.mass)
    ).multiply(this.quaternionPrev);

    this.material.uniforms.time.value += time;
  }
}
