import * as THREE from 'three';

import vs from '@/webgl/glsl/ImagePoints.vs';
import fs from '@/webgl/glsl/ImagePoints.fs';

export default class ImagePoints extends THREE.Points {
  constructor(width) {
    // Define Geometry
    const baseGeometry = new THREE.PlaneBufferGeometry(width, width * 0.666, 24, 24);
    const geometry = new THREE.BufferGeometry();

    geometry.addAttribute('position', baseGeometry.attributes.position);
    geometry.addAttribute('uv', baseGeometry.attributes.uv);

    // Define Material
    const material = new THREE.RawShaderMaterial({
      uniforms: {
        time: {
          type: 'f',
          value: 0
        },
        easeTransition: {
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
          value: window.devicePixelRatio
        },
      },
      vertexShader: vs,
      fragmentShader: fs,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthTest: false,
    });

    // Create Object3D
    super(geometry, material);
    this.name = 'ImagePoints';
  }
  start(noiseTex) {
    this.material.uniforms.noiseTex.value = noiseTex;
  }
  update(time, easeStep) {
    this.material.uniforms.time.value += time;
    this.material.uniforms.easeTransition.value = easeStep;
  }
  resize(resolution) {
    this.material.uniforms.resolution.value.copy(resolution);
  }
}
