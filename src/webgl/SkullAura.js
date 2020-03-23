import * as THREE from 'three';
import { easeOutCirc } from 'easing-js';
import MathEx from 'js-util/MathEx';

import store from '@/store';
import vs from '@/webgl/glsl/SkullAura.vs';
import fs from '@/webgl/glsl/SkullAura.fs';

const DURATION_SHOW = 1;
const DELAY_SHOW = 2.6;

export default class SkullAura extends THREE.Mesh {
  constructor() {
    // Define Geometry
    const geometry = new THREE.PlaneBufferGeometry(35, 35);

    // Define Material
    const material = new THREE.RawShaderMaterial({
      uniforms: {
        time: {
          type: 'f',
          value: 0
        },
        postEffectTex: {
          type: 't',
          value: null
        },
        noiseTex: {
          type: 't',
          value: null
        },
        alpha: {
          type: 'f',
          value: 0
        },
        hsv1: {
          type: 'v3',
          value: new THREE.Vector3()
        },
        hsv2: {
          type: 'v3',
          value: new THREE.Vector3(0, 0, 0)
        },
        strength: {
          type: 'f',
          value: 1.8
        },
        colorRangeMin: {
          type: 'f',
          value: 0.3
        },
        colorRangeMax: {
          type: 'f',
          value: 0.7
        },
        opacityRangeMin: {
          type: 'f',
          value: 0.58
        },
        opacityRangeMax: {
          type: 'f',
          value: 0.8
        },
        opacityBase: {
          type: 'f',
          value: 0.9
        }
      },
      vertexShader: vs,
      fragmentShader: fs,
      transparent: true,
      blending: THREE.AdditiveBlending
    });

    // Create Object3D
    super(geometry, material);
    this.name = 'SkullAura';
    this.timeShow = 0;
    this.mouseForce = 0;
    this.hsv1Base = new THREE.Vector3(0.15, 0.62, 1);
    this.strengthBase = 1.8;
    this.colorRangeMinBase = 0.3;
    this.isActive = false;
    this.isShown = false;
    this.position.set(0, 0, 8);
  }
  start(postEffectTex, noiseTex) {
    this.isActive = true;
    this.material.uniforms.postEffectTex.value = postEffectTex;
    this.material.uniforms.noiseTex.value = noiseTex;
  }
  show() {
    this.isShown = true;
    if (this.timeShow > 0) {
      this.timeShow = DURATION_SHOW + DELAY_SHOW;
    }
  }
  update(time, camera, fluctuation) {
    const { mouseForce } = store.state;

    if (this.isActive === false) return;
    this.rotation.copy(camera.rotation);
    this.material.uniforms.time.value += time;
    this.mouseForce = Math.min(this.mouseForce + mouseForce.length() * 0.3, 1);
    this.mouseForce =
      Math.floor((this.mouseForce + (0 - this.mouseForce) / 20) * 100) / 100;

    if (this.isShown === true) {
      this.timeShow += time;
    }
    const alpha = MathEx.clamp(
      (this.timeShow - DELAY_SHOW) / DURATION_SHOW,
      0.0,
      1.0
    );
    this.material.uniforms.alpha.value = easeOutCirc(alpha);
    this.material.uniforms.hsv1.value.set(
      this.hsv1Base.x - (1 - alpha) * 0.05 - this.mouseForce * 0.05,
      this.hsv1Base.y,
      this.hsv1Base.z
    );
    this.material.uniforms.strength.value =
      this.strengthBase +
      fluctuation * 0.8 +
      (1 - alpha) * 4.0 +
      this.mouseForce;
    this.material.uniforms.colorRangeMin.value =
      this.colorRangeMinBase + (1 - alpha) * 0.2 + this.mouseForce * 0.2;
    this.scale.set(
      1 + (1 - alpha) * 0.1 + this.mouseForce * 0.02,
      1 + (1 - alpha) * 0.1 + this.mouseForce * 0.02,
      1
    );
  }
}
