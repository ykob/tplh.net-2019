const THREE = require('three');

import vs from '@/webgl/glsl/SkullAuraPostEffect.vs';
import fs from '@/webgl/glsl/SkullAuraPostEffect.fs';

export default class SkullAuraPostEffect extends THREE.Mesh {
  constructor() {
    // Define Geometry
    const geometry = new THREE.PlaneBufferGeometry(2, 2);

    // Define Material
    const material = new THREE.RawShaderMaterial({
      uniforms: {
        resolution: {
          type: 'v2',
          value: new THREE.Vector2(1024, 1024)
        },
        direction: {
          type: 'v2',
          value: new THREE.Vector2(0, 0)
        },
        radius: {
          type: 'f',
          value: 1
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
    this.name = 'AuraPostEffect';
  }
  setDirection(x, y) {
    this.material.uniforms.direction.value.set(x, y);
  }
  setTexture(texture) {
    this.material.uniforms.texture.value = texture;
  }
  update(renderer, scene, camera, renderTarget = null) {
    this.obj.visible = true;
    renderer.setRenderTarget(renderTarget);
    renderer.render(scene, camera);
    this.obj.visible = false;
  }
}
