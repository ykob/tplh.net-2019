import * as THREE from 'three';

import vs from '@/webgl/glsl/PostEffect.vs';
import fs from '@/webgl/glsl/PostEffectBright.fs';

export default class PostEffectBright extends THREE.Mesh {
  constructor() {
    // Define Geometry
    const geometry = new THREE.PlaneBufferGeometry(2, 2);

    // Define Material
    const material = new THREE.RawShaderMaterial({
      uniforms: {
        minBright: {
          type: 'f',
          value: 0.25
        },
        texture: {
          type: 't',
          value: null
        }
      },
      vertexShader: vs,
      fragmentShader: fs
    });

    // Create Object3D
    super(geometry, material);
    this.name = 'PostEffectBright';
  }
  start(texture) {
    this.material.uniforms.texture.value = texture;
  }
}
