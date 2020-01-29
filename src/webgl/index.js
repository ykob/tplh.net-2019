import * as THREE from 'three';
import UAParser from 'ua-parser-js';
import sleep from 'js-util/sleep';

import PromiseOBJLoader from '@/webgl/PromiseOBJLoader';
import PromiseTextureLoader from '@/webgl/PromiseTextureLoader';
import Camera from '@/webgl/Camera';
import SkullAuraCamera from '@/webgl/SkullAuraCamera';
import Skull from '@/webgl/Skull';
import Title from '@/webgl/Title';
import PetalRotateGroup from '@/webgl/PetalRotateGroup';
import Image from '@/webgl/Image';
import Background from '@/webgl/Background';
import Intersector from '@/webgl/Intersector';

import checkWebpFeature from '@/utils/checkWebpFeature';
import initDatGui from '@/utils/initDatGui';

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
const raycaster = new THREE.Raycaster();

// ==========
// Define unique variables
//
const skull = new Skull();
const title = new Title();
const petalRotateGroup = new PetalRotateGroup();
const image = new Image();
const bg = new Background();
const intersector = new Intersector();

const petalHsv1 = new THREE.Vector3(0.09, 0.7, 0.35);
const petalHsv2 = new THREE.Vector3(0.09, 0.46, 0.1);
const petalHsv3 = new THREE.Vector3(0.09, 0.72, 0.18);

const ua = UAParser();

// ==========
// Define WebGLContent Class.
//
export default class WebGLContent {
  constructor() {
  }
  async start(canvas, store) {
    // Check whether the webp format is enabled.
    let webpExe = '';
    await checkWebpFeature('lossy')
      .then(() => {
        webpExe = 'webp';
      })
      .catch(() => {
        webpExe = 'jpg';
      });

    // Initialize the WebGL renderer.
    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      canvas: canvas,
    });
    renderer.setPixelRatio((ua.os.name === 'iOS' || ua.os.name === 'Android') ? 2 : 1);
    renderer.setClearColor(0x1b191c, 0.0);

    // Loading all assets for WebGL.
    const updateProgressAnchor = (result) => {
      store.commit('updatePreloadAnchor');
      return result
    }
    const assetsObj = [
      require('@/assets/obj/SkullHead.obj'),
      require('@/assets/obj/CherryBlossom.obj')
    ]
    const assetsImgs = [
      require('@/assets/img/webgl/title.jpg'),
      require('@/assets/img/webgl/noise.jpg'),
      require('@/assets/img/webgl/noise_burn.jpg'),
      require('@/assets/img/webgl/thumb_blank.png'),
      require(`@/assets/img/webgl/thumb_sketch_threejs.${webpExe}`),
      require(`@/assets/img/webgl/thumb_warpdrive.${webpExe}`),
      require(`@/assets/img/webgl/thumb_hassyadai.${webpExe}`),
      require(`@/assets/img/webgl/thumb_imago.${webpExe}`),
      require(`@/assets/img/webgl/thumb_best_film_2018.${webpExe}`),
    ]
    store.commit('setPreloadMax', assetsObj.length + assetsImgs.length);

    await Promise.all([
      ...(assetsObj.map(o => {
        return PromiseOBJLoader(o).then(updateProgressAnchor)
      })),
      ...(assetsImgs.map(o => {
        return PromiseTextureLoader(o).then(updateProgressAnchor)
      }))
    ]).then((response) => {
      // Initialize all instance on WebGL scene.
      const geometrySkullHead = response[0].children[1].geometry;
      const geometrySkullJaw = response[0].children[0].geometry;
      const geometryPetal1 = response[1].children[0].geometry;
      const geometryPetal2 = response[1].children[1].geometry;
      const titleTex = response[2];
      const noiseTex = response[3];
      const noiseBurnTex = response[4];
      const imgTexes = response.slice(5);

      noiseTex.wrapS = THREE.RepeatWrapping;
      noiseTex.wrapT = THREE.RepeatWrapping;
      noiseBurnTex.wrapS = THREE.RepeatWrapping;
      noiseBurnTex.wrapT = THREE.RepeatWrapping;

      // Add the webgl objects to the scene.
      scene.add(skull);
      scene.add(title);
      scene.add(petalRotateGroup);
      scene.add(image);
      scene.add(bg);
      scene.add(intersector);

      // Start all updating.
      camera.start();
      skullAuraCamera.start();
      skull.start(geometrySkullHead, geometrySkullJaw, noiseTex);
      title.start(titleTex, noiseTex);
      petalRotateGroup.start(geometryPetal1, geometryPetal2, noiseTex, petalHsv1, petalHsv2, petalHsv3);
      image.start(noiseBurnTex, imgTexes);
      bg.start(noiseTex);

      // show the dat.gui.
      if (process.env.VUE_APP_MODE === 'development') {
        initDatGui(skull, petalHsv1, petalHsv2, petalHsv3);
      }
    });
  }
  play() {
    clock.start();
  }
  pause() {
    clock.stop();
  }
  changeBackground (bool) {
    bg.change(bool);
  }
  showSkull(bool) {
    if (bool === true) {
      skull.show();
      title.show();
      petalRotateGroup.show();
    } else {
      skull.hide();
      title.hide();
      petalRotateGroup.hide();
    }
  }
  showWorksImage(index) {
    image.change(index);
  }
  update(mouse) {
    // When the clock is stopped, it stops the all rendering too.
    const time = (clock.running === true) ? clock.getDelta() : 0;

    // Calculate msec for this frame.

    // Update Camera.
    camera.update(time);
    skullAuraCamera.update(camera);

    // Raycast
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects([intersector]);
    if (intersects.length > 0) {
      skull.lookMouse(intersects[0].point)
    }

    // Update each objects.
    skull.update(time, renderer, camera, sceneAura, skullAuraCamera);
    petalRotateGroup.update(time);
    title.update(time);
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
    intersector.resize(camera, resolution);
    renderer.setSize(resolution.x, resolution.y);
  }
}
