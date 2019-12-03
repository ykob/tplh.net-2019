import * as THREE from 'three';
import sleep from 'js-util/sleep';

import PromiseOBJLoader from '@/webgl/PromiseOBJLoader';
import PromiseTextureLoader from '@/webgl/PromiseTextureLoader';
import Camera from '@/webgl/Camera';
import SkullAuraCamera from '@/webgl/SkullAuraCamera';
import Skull from '@/webgl/Skull';

// ==========
// Define common variables
//
let renderer;
const scene = new THREE.Scene();
const camera = new Camera();
const clock = new THREE.Clock({
  autoStart: false
});
const sceneAura = new THREE.Scene();
const skullAuraCamera = new SkullAuraCamera();

// ==========
// Define unique variables
//
const skull = new Skull();

// ==========
// Define WebGLContent Class.
//
export default class WebGLContent {
  constructor() {
  }
  async start(canvas) {
    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      canvas: canvas,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0.0);

    await Promise.all([
      PromiseOBJLoader(require('@/assets/obj/SkullHead.obj')),
      PromiseTextureLoader(require('@/assets/img/webgl/noise_skull.png')),
    ]).then((response) => {
      const geometrySkullHead = response[0].children[1].geometry;
      const geometrySkullJaw = response[0].children[0].geometry;
      const noiseTex = response[1];

      noiseTex.wrapS = THREE.RepeatWrapping;
      noiseTex.wrapT = THREE.RepeatWrapping;

      camera.start();
      skullAuraCamera.start();

      skull.start(geometrySkullHead, geometrySkullJaw, noiseTex);

      scene.add(skull);
    });
  }
  play() {
    clock.start();
    this.update();
  }
  pause() {
    clock.stop();
  }
  update() {
    // When the clock is stopped, it stops the all rendering too.
    if (clock.running === false) return;

    // Calculate msec for this frame.
    const time = clock.getDelta();

    // Update Camera.
    camera.update(time);
    skullAuraCamera.update(camera);

    // Update each objects.
    skull.update(time, renderer, camera, sceneAura, skullAuraCamera);

    // Render the 3D scene.
    renderer.render(scene, camera);
  }
  resize(resolution) {
    camera.resize(resolution);
    skull.resize(resolution);
    renderer.setSize(resolution.x, resolution.y);
  }
}
