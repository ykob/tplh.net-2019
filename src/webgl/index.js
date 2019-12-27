import * as THREE from 'three';
import sleep from 'js-util/sleep';

import PromiseOBJLoader from '@/webgl/PromiseOBJLoader';
import PromiseTextureLoader from '@/webgl/PromiseTextureLoader';
import Camera from '@/webgl/Camera';
import SkullAuraCamera from '@/webgl/SkullAuraCamera';
import Skull from '@/webgl/Skull';
import CherryRotate from '@/webgl/CherryRotate';
import Image from '@/webgl/Image';
import Background from '@/webgl/Background';

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
const cherryRotate = new CherryRotate();
const image = new Image();
const bg = new Background();

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
      PromiseOBJLoader(require('@/assets/obj/CherryBlossom.obj')),
      PromiseTextureLoader(require('@/assets/img/webgl/noise.jpg')),
      PromiseTextureLoader(require('@/assets/img/webgl/noise_burn.jpg')),
      PromiseTextureLoader(require('@/assets/img/webgl/thumb_blank.png')),
      PromiseTextureLoader(require('@/assets/img/webgl/thumb_sketch_threejs.jpg')),
      PromiseTextureLoader(require('@/assets/img/webgl/thumb_warpdrive.jpg')),
      PromiseTextureLoader(require('@/assets/img/webgl/thumb_hassyadai.jpg')),
    ]).then((response) => {
      const geometrySkullHead = response[0].children[1].geometry;
      const geometrySkullJaw = response[0].children[0].geometry;
      const geometryPetal1 = response[1].children[0].geometry;
      const geometryPetal2 = response[1].children[1].geometry;
      const noiseTex = response[2];
      const noiseBurnTex = response[3];
      const imgTexes = response.slice(4);

      noiseTex.wrapS = THREE.RepeatWrapping;
      noiseTex.wrapT = THREE.RepeatWrapping;
      noiseBurnTex.wrapS = THREE.RepeatWrapping;
      noiseBurnTex.wrapT = THREE.RepeatWrapping;

      camera.start();
      skullAuraCamera.start();

      skull.start(geometrySkullHead, geometrySkullJaw, noiseTex);
      cherryRotate.start(geometryPetal1, geometryPetal2, noiseTex);
      image.start(noiseBurnTex, imgTexes);
      bg.start(noiseTex);

      scene.add(skull);
      scene.add(cherryRotate);
      scene.add(image);
      scene.add(bg);
    });
  }
  play() {
    clock.start();
    this.update();
  }
  pause() {
    clock.stop();
  }
  showSkull(bool) {
    if (bool === true) {
      skull.show();
      cherryRotate.show();
    } else {
      skull.hide();
      cherryRotate.hide();
    }
  }
  showWorksImage(index) {
    image.change(index);
  }
  changeColorDark(bool) {
    bg.changeColorDark(bool);
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
    cherryRotate.update(time);
    image.update(time);
    bg.update(time);

    // Render the 3D scene.
    renderer.render(scene, camera);
  }
  resize(resolution) {
    camera.resize(resolution);
    skull.resize(resolution);
    image.resize(resolution);
    bg.resize(camera, resolution);
    renderer.setSize(resolution.x, resolution.y);
  }
}
