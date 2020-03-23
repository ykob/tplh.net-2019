import * as THREE from 'three';
import { easeOutCubic, easeInOutCubic } from 'easing-js';
import MathEx from 'js-util/MathEx';

import vs from '@/webgl/glsl/Background.vs';
import fs from '@/webgl/glsl/Background.fs';

const DURATION_SHOW = 4;
const DURATION_CHANGE = 2;

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
        alphaShowFirst: {
          type: 'f',
          value: 0
        }
      },
      vertexShader: vs,
      fragmentShader: fs
    });

    // Create Object3D
    super(geometry, material);
    this.name = 'Background';
    this.size = new THREE.Vector3();
    this.time = 0;
    this.timeShowFirst = 0;
    this.alphaStart = 0;
    this.alphaEnd = 0;
    this.isActive = false;
    this.isShownFirst = false;
    this.isChanged = false;

    this.position.set(0, 0, -50);
  }
  start(noiseTex) {
    this.isActive = true;
    this.material.uniforms.noiseTex.value = noiseTex;
  }
  change(isHome, hasDelay) {
    this.isChanged = true;

    if (this.isShownFirst === false) {
      this.isShownFirst = true;
      if (isHome === false) {
        this.material.uniforms.alpha.value = 1;
        this.alphaStart = 1;
        this.alphaEnd = 1;
        this.timeShowFirst = 0;
      } else {
        this.timeShowFirst = hasDelay === true ? -5.5 : 0;
      }
    } else {
      if (this.timeShowFirst < 0) {
        this.timeShowFirst = 0;
      }
      this.alphaStart = this.material.uniforms.alpha.value;
      this.alphaEnd = isHome === true ? 0 : 1;
      this.time = 0;
    }
  }
  update(time) {
    if (this.isActive === false) return;

    if (this.isShownFirst === true) {
      this.timeShowFirst += time;
      this.material.uniforms.alphaShowFirst.value = easeOutCubic(
        MathEx.clamp(this.timeShowFirst / DURATION_SHOW, 0.0, 1.0)
      );
    }

    if (this.isChanged === true) {
      this.time += time;
      this.timeShowFirst += time;
      this.material.uniforms.alpha.value =
        this.alphaStart +
        easeInOutCubic(MathEx.clamp(this.time / DURATION_CHANGE, 0.0, 1.0)) *
          (this.alphaEnd - this.alphaStart);
      if (this.time >= DURATION_CHANGE) {
        this.time = 0;
        this.isChanged = false;
      }
    }

    this.material.uniforms.time.value += time;
  }
  resize(camera) {
    const height = Math.abs(
      (camera.position.z - this.position.z) *
        Math.tan(MathEx.radians(camera.fov) / 2) *
        2
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
