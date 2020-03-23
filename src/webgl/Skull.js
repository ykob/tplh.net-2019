import * as THREE from 'three';
import { easeInOutCirc, easeOutCirc } from 'easing-js';
import MathEx from 'js-util/MathEx';

import store from '@/store';

import SkullBody from '@/webgl/SkullBody';
import SkullAuraPostEffect from '@/webgl/SkullAuraPostEffect';
import SkullAura from '@/webgl/SkullAura';
import SkullPoints from '@/webgl/SkullPoints';
import SkullPointsFirst from '@/webgl/SkullPointsFirst';

const DURATION_SHOW = 2;
const DELAY_SHOW = 1;
const DURATION_HIDE = 1.6;
const DELAY_HIDE = 0;

export default class Skull extends THREE.Group {
  constructor() {
    super();
    this.name = 'Skull';
    this.body;
    this.auraPostEffect;
    this.aura;
    this.points;
    this.renderTarget1 = new THREE.WebGLRenderTarget(256, 256);
    this.renderTarget2 = new THREE.WebGLRenderTarget(256, 256);
    this.time = 0;
    this.timeShow = 0;
    this.timeHide = 0;
    this.positionBase = new THREE.Vector3(0, 0, -3);
    this.lookV = new THREE.Vector3();
    this.lookA = new THREE.Vector3();
    this.lookAnchor = new THREE.Vector3();
    this.isActive = false;
    this.isShown = false;
    this.isHidden = false;
  }
  start(geometry1, geometry2, noiseTex) {
    this.body = new SkullBody(geometry1, geometry2);
    this.auraPostEffect = new SkullAuraPostEffect();
    this.aura = new SkullAura();
    this.points = new SkullPoints();
    this.pointsFirst = new SkullPointsFirst();

    this.add(this.body);
    this.add(this.aura);
    this.add(this.points);
    this.add(this.pointsFirst);

    this.body.start();
    this.aura.start(this.renderTarget1.texture, noiseTex);
    this.points.start(noiseTex);
    this.pointsFirst.start(noiseTex);

    this.isActive = true;
  }
  show() {
    this.timeShow = 0;
    this.timeHide = 0;
    this.isShown = true;
    this.isHidden = false;
    this.body.show();
    this.aura.show();
    this.points.show();
    this.pointsFirst.show();
  }
  hide() {
    this.isShown = false;
    this.isHidden = true;
    this.body.hide();
    this.points.hide();
    this.pointsFirst.hide();
  }
  lookMouse(lookV) {
    this.lookAnchor.copy(lookV).multiplyScalar(-0.3);
    this.body.lookMouse(lookV);
  }
  update(time, renderer, camera, sceneAura, cameraAura) {
    if (this.isActive === false) return;

    // update the attributes of this group.
    this.time += time;
    this.radian += time;

    // for the showing effect.
    if (this.isShown === true) {
      this.timeShow += time;
    }
    // for the hiding effect.
    if (this.isHidden === true) {
      this.timeHide += time;
    }

    // move with a mouse coordinate.
    this.lookA
      .copy(this.lookAnchor)
      .sub(this.lookV)
      .divideScalar(36);
    this.lookV.add(this.lookA);

    // rising first.
    const alphaShow = easeOutCirc(
      MathEx.clamp((this.timeShow - DELAY_SHOW) / DURATION_SHOW, 0.0, 1.0)
    );
    const alphaHide = easeInOutCirc(
      MathEx.clamp((this.timeHide - DELAY_HIDE) / DURATION_HIDE, 0.0, 1.0)
    );

    // add all translates to this position..
    this.position
      .set(
        this.positionBase.x,
        this.positionBase.y + (alphaShow + alphaHide - 1) * 6,
        this.positionBase.z
      )
      .add(this.lookV);

    // calculate the fluctuation of the color
    const fluctuation =
      (Math.sin(this.time) * 0.5 +
        Math.sin(this.time * 2.4) * 0.3 +
        Math.sin(this.time * 4.2) * 0.2) *
        0.5 +
      0.5;

    // update children.
    this.body.update(time, camera, fluctuation);
    this.aura.update(time, camera, fluctuation);
    this.points.update(time);
    this.pointsFirst.update(time);

    // processing before rendering the aura as texture.
    renderer.setRenderTarget(this.renderTarget1);
    sceneAura.add(this.body);
    this.body.material.uniforms.renderOutline.value = 1;

    // rendering the aura as texture.
    renderer.render(sceneAura, cameraAura);

    // processing before rendering the post effect.
    renderer.setRenderTarget(this.renderTarget2);
    sceneAura.remove(this.body);
    sceneAura.add(this.auraPostEffect);
    this.auraPostEffect.setDirection(1, 0);
    this.auraPostEffect.setTexture(this.renderTarget1.texture);

    // rendering Gaussian Blur to direction X.
    renderer.render(sceneAura, cameraAura);

    // processing before rendering the post effect.
    renderer.setRenderTarget(this.renderTarget1);
    this.auraPostEffect.setDirection(0, 1);
    this.auraPostEffect.setTexture(this.renderTarget2.texture);

    // rendering Gaussian Blur to direction Y.
    renderer.render(sceneAura, cameraAura);

    // processing after rendering the aura as texture.
    renderer.setRenderTarget(null);
    sceneAura.remove(this.auraPostEffect);
    this.add(this.body);
    this.body.material.uniforms.renderOutline.value = 0;
  }
  resize() {
    const { resolution, isMobile } = store.state;
    this.points.resize();
    this.pointsFirst.resize();
    if (isMobile === true && resolution.y > resolution.x) {
      this.scale.set(1.1, 1.1, 1.1);
    } else {
      this.scale.set(1, 1, 1);
    }
  }
}
