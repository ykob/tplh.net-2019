import * as THREE from 'three';
import sleep from 'js-util/sleep';

import PromiseOBJLoader from '@/webgl/PromiseOBJLoader';
import PromiseTextureLoader from '@/webgl/PromiseTextureLoader';
import Camera from '@/webgl/Camera';
import SkullAuraCamera from '@/webgl/SkullAuraCamera';
import Skull from '@/webgl/Skull';
import Title from '@/webgl/Title';
import PetalFloatGroup from '@/webgl/PetalFloatGroup';
import PetalRotateGroup from '@/webgl/PetalRotateGroup';
import Image from '@/webgl/Image';
import WorksText from '@/webgl/WorksText';
import WhoIamText from '@/webgl/WhoIamText';
import Background from '@/webgl/Background';
import Intersector from '@/webgl/Intersector';
import PostEffectBright from '@/webgl/PostEffectBright';
import PostEffectBlur from '@/webgl/PostEffectBlur';
import PostEffectBloom from '@/webgl/PostEffectBloom';

import checkWebpFeature from '@/utils/checkWebpFeature';
import initDatGui from '@/utils/initDatGui';

import PIXEL_RATIO from '@/const/PIXEL_RATIO';

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

// For the post effect.
const renderTarget1 = new THREE.WebGLRenderTarget();
const renderTarget2 = new THREE.WebGLRenderTarget();
const renderTarget3 = new THREE.WebGLRenderTarget();
const scenePE = new THREE.Scene();
const cameraPE = new THREE.OrthographicCamera(-1, 1, 1, -1, 1, 2);

// ==========
// Define unique variables
//
const skull = new Skull();
const title = new Title();
const petalRotateGroup = new PetalRotateGroup();
const petalFloatGroup = new PetalFloatGroup();
const image = new Image();
const worksText = new WorksText();
const whoiamText = new WhoIamText();
const bg = new Background();
const intersector = new Intersector();

// For the post effect.
const postEffectBright = new PostEffectBright();
const postEffectBlurX = new PostEffectBlur();
const postEffectBlurY = new PostEffectBlur();
const postEffectBloom = new PostEffectBloom();

const petalHsv1 = new THREE.Vector3(0.09, 0.7, 0.35);
const petalHsv2 = new THREE.Vector3(0.09, 0.46, 0.1);
const petalHsv3 = new THREE.Vector3(0.09, 0.72, 0.18);

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
      antialias: false,
      canvas: canvas,
    });
    renderer.setPixelRatio(PIXEL_RATIO);
    renderer.setClearColor(0x1b191c, 0.0);

    // For the Post Effect.
    postEffectBright.start(renderTarget1.texture);
    postEffectBlurX.start(renderTarget2.texture, 1, 0);
    postEffectBlurY.start(renderTarget3.texture, 0, 1);
    postEffectBloom.start(renderTarget1.texture, renderTarget2.texture);

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
      require(`@/assets/img/webgl/title.${webpExe}`),
      require(`@/assets/img/webgl/noise.${webpExe}`),
      require(`@/assets/img/webgl/noise_burn.${webpExe}`),
      require(`@/assets/img/webgl/works_text.${webpExe}`),
      require(`@/assets/img/webgl/whoiam_text.${webpExe}`),
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
      const worksTextTex = response[5];
      const whoiamTextTex = response[6];
      const imgTexes = response.slice(7);

      noiseTex.wrapS = THREE.RepeatWrapping;
      noiseTex.wrapT = THREE.RepeatWrapping;
      noiseBurnTex.wrapS = THREE.RepeatWrapping;
      noiseBurnTex.wrapT = THREE.RepeatWrapping;
      worksTextTex.wrapS = THREE.RepeatWrapping;
      worksTextTex.wrapT = THREE.RepeatWrapping;

      // Add the webgl objects to the scene.
      scene.add(skull);
      scene.add(title);
      scene.add(petalFloatGroup);
      scene.add(petalRotateGroup);
      scene.add(image);
      scene.add(worksText);
      scene.add(whoiamText);
      scene.add(bg);
      scene.add(intersector);

      // Start all updating.
      camera.start();
      skullAuraCamera.start();
      skull.start(geometrySkullHead, geometrySkullJaw, noiseTex);
      title.start(titleTex, noiseTex);
      petalFloatGroup.start(geometryPetal1, geometryPetal2, noiseTex, petalHsv1, petalHsv2, petalHsv3);
      petalRotateGroup.start(geometryPetal1, geometryPetal2, noiseTex, petalHsv1, petalHsv2, petalHsv3);
      image.start(noiseBurnTex, imgTexes);
      worksText.start(worksTextTex);
      whoiamText.start(whoiamTextTex);
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
  showHomeObjs(bool) {
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
  showWorksObjs(index, direction, prevPosFromWorks) {
    image.change(index, direction + prevPosFromWorks);
    worksText.change(index, direction, prevPosFromWorks);
  }
  showWhoIAmObjs(bool) {
    if (bool === true) {
      petalFloatGroup.show();
      whoiamText.show();
    } else {
      petalFloatGroup.hide();
      whoiamText.hide();
    }
  }
  update({ mouse, scrollProgress }) {
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
    petalFloatGroup.update(time);
    petalRotateGroup.update(time);
    title.update(time);
    image.update(time);
    worksText.update(time);
    whoiamText.update(time, scrollProgress);
    bg.update(time);

    // Render the main scene to frame buffer.
    renderer.setRenderTarget(renderTarget1);
    renderer.render(scene, camera);

    // // Render the post effect.
    scenePE.add(postEffectBright);
    renderer.setRenderTarget(renderTarget2);
    renderer.render(scenePE, cameraPE);
    scenePE.remove(postEffectBright);
    scenePE.add(postEffectBlurX);
    renderer.setRenderTarget(renderTarget3);
    renderer.render(scenePE, cameraPE);
    scenePE.remove(postEffectBlurX);
    scenePE.add(postEffectBlurY);
    renderer.setRenderTarget(renderTarget2);
    renderer.render(scenePE, cameraPE);
    scenePE.remove(postEffectBlurY);
    scenePE.add(postEffectBloom);
    renderer.setRenderTarget(null);
    renderer.render(scenePE, cameraPE);
    scenePE.remove(postEffectBloom);
  }
  resize(resolution) {
    camera.resize(resolution);
    skull.resize(resolution);
    image.resize(resolution);
    bg.resize(camera, resolution);
    intersector.resize(camera, resolution);
    renderer.setSize(resolution.x, resolution.y);

    // For the Post Effect.
    renderTarget1.setSize(resolution.x * PIXEL_RATIO, resolution.y * PIXEL_RATIO);
    renderTarget2.setSize(resolution.x * PIXEL_RATIO, resolution.y * PIXEL_RATIO);
    renderTarget3.setSize(resolution.x * PIXEL_RATIO, resolution.y * PIXEL_RATIO);
    postEffectBlurY.resize(resolution.x / 3, resolution.y / 3);
    postEffectBlurX.resize(resolution.x / 3, resolution.y / 3);
  }
}
