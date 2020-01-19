import * as THREE from 'three';
import MathEx from 'js-util/MathEx';

import SkullBody from '@/webgl/SkullBody';
import SkullAuraPostEffect from '@/webgl/SkullAuraPostEffect';
import SkullAura from '@/webgl/SkullAura';
import SkullPoints from '@/webgl/SkullPoints';

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
    this.move = new THREE.Vector3();
    this.isActive = false;

    this.position.set(0, 0, -3);
  }
  start(geometry1, geometry2, noiseTex) {
    this.body = new SkullBody(geometry1, geometry2);
    this.auraPostEffect = new SkullAuraPostEffect();
    this.aura = new SkullAura();
    this.points = new SkullPoints();

    this.add(this.body);
    this.add(this.aura);
    this.add(this.points);

    this.body.start();
    this.aura.start(this.renderTarget1.texture, noiseTex);
    this.points.start(noiseTex);

    this.isActive = true;
  }
  show() {
    this.body.show();
    this.aura.show();
    this.points.show();
  }
  hide() {
    this.body.hide();
    this.points.hide();
  }
  lookMouse(lookV) {
    this.move.copy(lookV).multiplyScalar(-0.2);
    this.body.lookMouse(lookV);
  }
  update(time, renderer, camera, sceneAura, cameraAura) {
    if (this.isActive === false) return;

    // update the attributes of this group.
    this.time += time;
    this.radian += time;

    // move
    this.position.copy(this.move);

    // update children.
    this.body.update(time, camera);
    this.aura.update(time, camera);
    this.points.update(time);

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
  resize(resolution) {
    this.points.resize(resolution);
  }
}
