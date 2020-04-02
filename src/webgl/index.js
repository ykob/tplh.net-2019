import * as THREE from 'three';

import store from '@/store';
import PromiseOBJLoader from '@/webgl/PromiseOBJLoader';
import PromiseTextureLoader from '@/webgl/PromiseTextureLoader';
import checkWebpFeature from '@/utils/checkWebpFeature';

import PIXEL_RATIO from '@/const/PIXEL_RATIO';

// ==========
// Define common variables
//
let renderer;
const scene = new THREE.Scene();
const clock = new THREE.Clock({
  autoStart: false
});
const sceneAura = new THREE.Scene();
const raycaster = new THREE.Raycaster();

// For the post effect.
const renderTarget1 = new THREE.WebGLRenderTarget();
const renderTarget2 = new THREE.WebGLRenderTarget();
const renderTarget3 = new THREE.WebGLRenderTarget();
const scenePE = new THREE.Scene();
const cameraPE = new THREE.OrthographicCamera(-1, 1, 1, -1, 1, 2);

const petalHsv1 = new THREE.Vector3(0.09, 0.7, 0.35);
const petalHsv2 = new THREE.Vector3(0.09, 0.46, 0.1);
const petalHsv3 = new THREE.Vector3(0.09, 0.72, 0.18);

// ==========
// Define WebGLContent Class.
//
export default class WebGLContent {
  constructor() {
    this.camera;
    this.skullAuraCamera;
    this.skull;
    this.title;
    this.petalRotateGroup;
    this.petalFallGroup;
    this.image;
    this.worksText;
    this.whoiamText;
    this.bg;
    this.intersector;
    this.postEffectBright;
    this.postEffectBlurX;
    this.postEffectBlurY;
    this.postEffectBloom;
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

    // import modules
    await Promise.all([
      import('@/webgl/Camera').then(module => {
        this.camera = new module.default();
      }),
      import('@/webgl/SkullAuraCamera').then(module => {
        this.skullAuraCamera = new module.default();
      }),
      import('@/webgl/Skull').then(module => {
        this.skull = new module.default();
      }),
      import('@/webgl/Title').then(module => {
        this.title = new module.default();
      }),
      import('@/webgl/PetalFallGroup').then(module => {
        this.petalFallGroup = new module.default();
      }),
      import('@/webgl/PetalRotateGroup').then(module => {
        this.petalRotateGroup = new module.default();
      }),
      import('@/webgl/Image').then(module => {
        this.image = new module.default();
      }),
      import('@/webgl/WorksText').then(module => {
        this.worksText = new module.default();
      }),
      import('@/webgl/WhoIamText').then(module => {
        this.whoiamText = new module.default();
      }),
      import('@/webgl/Background').then(module => {
        this.bg = new module.default();
      }),
      import('@/webgl/Intersector').then(module => {
        this.intersector = new module.default();
      }),
      import('@/webgl/PostEffectBright').then(module => {
        this.postEffectBright = new module.default();
      }),
      import('@/webgl/PostEffectBlur').then(module => {
        this.postEffectBlurX = new module.default();
        this.postEffectBlurY = new module.default();
      }),
      import('@/webgl/PostEffectBloom').then(module => {
        this.postEffectBloom = new module.default();
      })
    ]);

    // Initialize the WebGL renderer.
    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      canvas: canvas
    });
    renderer.setPixelRatio(PIXEL_RATIO);
    renderer.setClearColor(0x1b191c, 0.0);

    // For the Post Effect.
    this.postEffectBright.start(renderTarget1.texture);
    this.postEffectBlurX.start(renderTarget2.texture, 1, 0);
    this.postEffectBlurY.start(renderTarget3.texture, 0, 1);
    this.postEffectBloom.start(renderTarget1.texture, renderTarget2.texture);

    // Loading all assets for WebGL.
    const updateProgressAnchor = result => {
      store.commit('updatePreloadAnchor');
      return result;
    };
    const assetsObj = [
      require('@/assets/obj/SkullHead.obj'),
      require('@/assets/obj/CherryBlossom.obj')
    ];
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
      require(`@/assets/img/webgl/thumb_best_film_2018.${webpExe}`)
    ];
    store.commit('setPreloadMax', assetsObj.length + assetsImgs.length);

    await Promise.all([
      ...assetsObj.map(o => {
        return PromiseOBJLoader(o).then(updateProgressAnchor);
      }),
      ...assetsImgs.map(o => {
        return PromiseTextureLoader(o).then(updateProgressAnchor);
      })
    ]).then(response => {
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
      scene.add(this.skull);
      scene.add(this.title);
      scene.add(this.petalFallGroup);
      scene.add(this.petalRotateGroup);
      scene.add(this.image);
      scene.add(this.worksText);
      scene.add(this.whoiamText);
      scene.add(this.bg);
      scene.add(this.intersector);

      // Start all updating.
      this.camera.start();
      this.skullAuraCamera.start();
      this.skull.start(geometrySkullHead, geometrySkullJaw, noiseTex);
      this.title.start(titleTex, noiseTex);
      this.petalFallGroup.start(
        geometryPetal1,
        geometryPetal2,
        noiseTex,
        petalHsv1,
        petalHsv2,
        petalHsv3
      );
      this.petalRotateGroup.start(
        geometryPetal1,
        geometryPetal2,
        noiseTex,
        petalHsv1,
        petalHsv2,
        petalHsv3
      );
      this.image.start(noiseBurnTex, imgTexes);
      this.worksText.start(worksTextTex);
      this.whoiamText.start(whoiamTextTex);
      this.bg.start(noiseTex);
    });

    // show the dat.gui.
    if (process.env.NODE_ENV === 'development') {
      const initDatGui = await import('@/utils/initDatGui');

      initDatGui.default(
        this.skull,
        this.petalRotateGroup,
        petalHsv1,
        petalHsv2,
        petalHsv3
      );
    }
  }
  play() {
    clock.start();
  }
  pause() {
    clock.stop();
  }
  changeBackground(isHome, hasDelay) {
    this.bg.change(isHome, hasDelay);
  }
  showHomeObjs(bool) {
    if (bool === true) {
      this.skull.show();
      this.title.show();
      this.petalRotateGroup.show();
      this.postEffectBloom.shake();
    } else {
      this.skull.hide();
      this.title.hide();
      this.petalRotateGroup.hide();
      this.postEffectBloom.fadeOut();
    }
  }
  showWorksObjs(index, direction, prevPosFromWorks) {
    this.image.change(index, direction + prevPosFromWorks);
    this.worksText.change(index, direction, prevPosFromWorks);
  }
  showWhoIAmObjs(bool) {
    if (bool === true) {
      this.petalFallGroup.show();
      this.whoiamText.show();
    } else {
      this.petalFallGroup.hide();
      this.whoiamText.hide();
    }
  }
  update() {
    const { mouse } = store.state;

    // When the clock is stopped, it stops the all rendering too.
    const time = clock.running === true ? clock.getDelta() : 0;

    // Calculate msec for this frame.

    // Update Camera.
    this.camera.update(time);
    this.skullAuraCamera.update(this.camera);

    // Raycast
    raycaster.setFromCamera(mouse, this.camera);
    const intersects = raycaster.intersectObjects([this.intersector]);
    if (intersects.length > 0) {
      this.skull.lookMouse(intersects[0].point);
    }

    // Update each objects.
    this.skull.update(
      time,
      renderer,
      this.camera,
      sceneAura,
      this.skullAuraCamera
    );
    this.petalFallGroup.update(time);
    this.petalRotateGroup.update(time);
    this.title.update(time);
    this.image.update(time);
    this.worksText.update(time);
    this.whoiamText.update(time);
    this.bg.update(time);
    this.postEffectBloom.update(time);

    // Render the main scene to frame buffer.
    renderer.setRenderTarget(renderTarget1);
    renderer.render(scene, this.camera);

    // // Render the post effect.
    scenePE.add(this.postEffectBright);
    renderer.setRenderTarget(renderTarget2);
    renderer.render(scenePE, cameraPE);
    scenePE.remove(this.postEffectBright);
    scenePE.add(this.postEffectBlurX);
    renderer.setRenderTarget(renderTarget3);
    renderer.render(scenePE, cameraPE);
    scenePE.remove(this.postEffectBlurX);
    scenePE.add(this.postEffectBlurY);
    renderer.setRenderTarget(renderTarget2);
    renderer.render(scenePE, cameraPE);
    scenePE.remove(this.postEffectBlurY);
    scenePE.add(this.postEffectBloom);
    renderer.setRenderTarget(null);
    renderer.render(scenePE, cameraPE);
    scenePE.remove(this.postEffectBloom);
  }
  resize() {
    const { resolution } = store.state;

    this.camera.resize();
    this.skull.resize();
    this.title.resize();
    this.image.resize();
    this.bg.resize(this.camera);
    this.intersector.resize(this.camera);
    renderer.setSize(resolution.x, resolution.y);

    // For the Post Effect.
    renderTarget1.setSize(
      resolution.x * PIXEL_RATIO,
      resolution.y * PIXEL_RATIO
    );
    renderTarget2.setSize(
      resolution.x * PIXEL_RATIO,
      resolution.y * PIXEL_RATIO
    );
    renderTarget3.setSize(
      resolution.x * PIXEL_RATIO,
      resolution.y * PIXEL_RATIO
    );
    this.postEffectBlurY.resize();
    this.postEffectBlurX.resize();
  }
}
