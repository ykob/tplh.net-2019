import * as THREE from 'three';
import { easeInOutQuad } from 'easing-js';
import MathEx from 'js-util/MathEx';

import vs from '@/webgl/glsl/Background.vs';
import fs from '@/webgl/glsl/Background.fs';

const DURATION = 1.4;

export default class Background extends THREE.Mesh {
  constructor() {
    // Define Geometry
    const geometry = new THREE.PlaneBufferGeometry(1, 1, 128, 128);

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
        imgRatio: {
          type: 'v2',
          value: new THREE.Vector2()
        },
        alpha: {
          type: 'f',
          value: 0
        },
      },
      vertexShader: vs,
      fragmentShader: fs,
    });

    // Create Object3D
    super(geometry, material);
    this.name = 'Background';
    this.size = new THREE.Vector3();
    this.time = 0;
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

    if (this.isChanged === true) {
      this.time += time;
      this.material.uniforms.alpha.value =
        this.alphaStart + easeInOutQuad(
          MathEx.clamp(this.time / DURATION, 0.0, 1.0)
        ) * (this.alphaEnd - this.alphaStart);
      if (this.time >= DURATION) {
        this.time = 0;
        this.isChanged = false;
      }
    }

    this.material.uniforms.time.value += time;
  }
  changeColorDark(bool) {
    this.alphaStart = this.material.uniforms.alpha.value;
    this.alphaEnd = (bool === true) ? 1 : 0;
    this.time = 0;
    this.isChanged = true;
  }
  resize(camera, resolution) {
    const height = Math.abs(
      (camera.position.z - this.position.z) * Math.tan(MathEx.radians(camera.fov) / 2) * 2
    );
    const width = height * camera.aspect;

    this.size.set(width, height, 1);
    this.material.uniforms.imgRatio.value.set(
      Math.min(1, this.size.x / this.size.y),
      Math.min(1, this.size.y / this.size.x)
    );
    this.scale.copy(this.size);
  }
}
