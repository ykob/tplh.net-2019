import * as THREE from 'three';

import store from '@/store';

export default class Camera extends THREE.PerspectiveCamera {
  constructor(fov, aspect, near, far) {
    super(fov, aspect, near, far);

    this.time = 0;
    this.isActive = false;
  }
  start() {
    this.aspect = 3 / 2;
    this.far = 1000;
    this.setFocalLength(50);
    this.lookAt(new THREE.Vector3(0, 0, 0));
    this.isActive = true;
  }
  update(time) {
    if (this.isActive === false) return;
    this.time += time;
  }
  resize() {
    const { resolution, isMobile } = store.state;

    this.aspect = resolution.x / resolution.y;
    this.updateProjectionMatrix();
    if (resolution.x < resolution.y && isMobile === true) {
      this.position.set(0, 0, 65);
    } else {
      this.position.set(0, 0, 50);
    }
  }
}
