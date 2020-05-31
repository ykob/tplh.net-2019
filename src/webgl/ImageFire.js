import * as THREE from 'three';

import vs from '@/webgl/glsl/ImageFire.vs';
import fs from '@/webgl/glsl/ImageFire.fs';

export default class ImageFire extends THREE.Mesh {
  constructor(width) {
    // Define Geometry
    const geometry = new THREE.PlaneBufferGeometry(
      width,
      width * 0.666,
      64,
      64
    );

    // Define Material
    const material = new THREE.RawShaderMaterial({
      uniforms: {
        time: {
          value: 0
        },
        easeTransition: {
          value: 0
        },
        noiseTex: {
          value: null
        },
        imgRatio: {
          value: new THREE.Vector2(1, 0.666)
        }
      },
      vertexShader: vs,
      fragmentShader: fs,
      transparent: true,
      blending: THREE.AdditiveBlending
    });

    // Create Object3D
    super(geometry, material);
    this.name = 'ImageFire';
  }
  start(noiseTex) {
    this.material.uniforms.noiseTex.value = noiseTex;
  }
  update(time, easeStep) {
    this.material.uniforms.time.value += time;
    this.material.uniforms.easeTransition.value = easeStep;
  }
}
