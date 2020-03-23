import * as THREE from 'three';
import MathEx from 'js-util/MathEx';

import vs from '@/webgl/glsl/Intersector.vs';
import fs from '@/webgl/glsl/Intersector.fs';

export default class Intersector extends THREE.Mesh {
  constructor() {
    // Define Geometry
    const geometry = new THREE.PlaneGeometry(1, 1);

    // Define Material
    const material = new THREE.RawShaderMaterial({
      vertexShader: vs,
      fragmentShader: fs
    });

    // Create Object3D
    super(geometry, material);
    this.name = 'Intersector';
    this.size = new THREE.Vector3();

    this.position.set(0, 0, 30);
  }
  resize(camera) {
    const height = Math.abs(
      (camera.position.z - this.position.z) *
        Math.tan(MathEx.radians(camera.fov) / 2) *
        2
    );
    const width = height * camera.aspect;

    this.size.set(width, height, 1);
    this.scale.copy(this.size);
  }
}
