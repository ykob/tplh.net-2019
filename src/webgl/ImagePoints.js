import * as THREE from 'three';

import store from '@/store';
import vs from '@/webgl/glsl/ImagePoints.vs';
import fs from '@/webgl/glsl/ImagePoints.fs';

import PIXEL_RATIO from '@/const/PIXEL_RATIO';

export default class ImagePoints extends THREE.Points {
  constructor(width) {
    // Define Geometry
    const baseGeometry = new THREE.PlaneBufferGeometry(
      width,
      width * 0.666,
      24,
      24
    );
    const geometry = new THREE.BufferGeometry();

    geometry.setAttribute('position', baseGeometry.attributes.position);
    geometry.setAttribute('uv', baseGeometry.attributes.uv);

    // Define Material
    const material = new THREE.RawShaderMaterial({
      uniforms: {
        time: {
          type: 'f',
          value: 0
        },
        easeTransition1: {
          type: 'f',
          value: 0
        },
        easeTransition2: {
          type: 'f',
          value: 0
        },
        easeTransition3: {
          type: 'f',
          value: 0
        },
        resolution: {
          type: 'v2',
          value: new THREE.Vector2()
        },
        noiseTex: {
          type: 't',
          value: null
        },
        imgRatio: {
          type: 'v2',
          value: new THREE.Vector2(1, 0.666)
        },
        pixelRatio: {
          type: 'f',
          value: PIXEL_RATIO
        }
      },
      vertexShader: vs,
      fragmentShader: fs,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthTest: false
    });

    // Create Object3D
    super(geometry, material);
    this.name = 'ImagePoints';
  }
  start(noiseTex) {
    this.material.uniforms.noiseTex.value = noiseTex;
  }
  update(time, easeStep1, easeStep2, easeStep3) {
    this.material.uniforms.time.value += time;
    this.material.uniforms.easeTransition1.value = easeStep1;
    this.material.uniforms.easeTransition2.value = easeStep2;
    this.material.uniforms.easeTransition3.value = easeStep3;
  }
  resize() {
    const { resolution } = store.state;

    this.material.uniforms.resolution.value.copy(resolution);
  }
}
