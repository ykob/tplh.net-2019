import * as THREE from 'three';

import store from '@/store';
import vs from '@/webgl/glsl/PostEffect.vs';
import fs from '@/webgl/glsl/PostEffectBlur.fs';

export default class PostEffectBlur extends THREE.Mesh {
  constructor() {
    // Define Geometry
    const geometry = new THREE.PlaneBufferGeometry(2, 2);

    // Define Material
    const material = new THREE.RawShaderMaterial({
      uniforms: {
        resolution: {
          type: 'v2',
          value: new THREE.Vector2()
        },
        direction: {
          type: 'v2',
          value: new THREE.Vector2()
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
    this.name = 'PostEffectBlur';
  }
  start(texture, x, y) {
    this.material.uniforms.texture.value = texture;
    this.material.uniforms.direction.value.set(x, y);
  }
  resize() {
    const { resolution } = store.state;
    this.material.uniforms.resolution.value.set(
      resolution.x / 3,
      resolution.y / 3
    );
  }
}
