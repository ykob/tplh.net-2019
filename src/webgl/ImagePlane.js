import * as THREE from 'three';

import vs from '@/webgl/glsl/ImagePlane.vs';
import fs from '@/webgl/glsl/ImagePlane.fs';

export default class ImagePlane extends THREE.Mesh {
  constructor(width) {
    // Define Geometry
    const geometry = new THREE.PlaneBufferGeometry(
      width,
      width * 0.666,
      48,
      32
    );

    // Define Material
    const material = new THREE.RawShaderMaterial({
      uniforms: {
        time: {
          type: 'f',
          value: 0
        },
        easeTransition1: {
          type: 'f',
          value: 0
        },
        easeTransition2: {
          type: 'f',
          value: 0
        },
        easeTransition3: {
          type: 'f',
          value: 0
        },
        noiseTex: {
          type: 't',
          value: null
        },
        imgTex1: {
          type: 't',
          value: null
        },
        imgTex2: {
          type: 't',
          value: null
        },
        imgTex3: {
          type: 't',
          value: null
        },
        imgRatio: {
          type: 'v2',
          value: new THREE.Vector2(1, 0.666)
        }
      },
      vertexShader: vs,
      fragmentShader: fs,
      transparent: true
    });

    // Create Object3D
    super(geometry, material);
    this.name = 'ImagePlane';
    this.imgIndexPrev = 0;
    this.imgIndexNext = 0;
    this.renderOrder = 5;
  }
  start(noiseTex, imgTexes) {
    this.imgTexes = imgTexes;
    this.material.uniforms.noiseTex.value = noiseTex;
    this.material.uniforms.imgTex1.value = imgTexes[0];
    this.material.uniforms.imgTex2.value = imgTexes[1];
  }
  update(time, easeStep1, easeStep2, easeStep3) {
    this.material.uniforms.time.value += time;
    this.material.uniforms.easeTransition1.value = easeStep1;
    this.material.uniforms.easeTransition2.value = easeStep2;
    this.material.uniforms.easeTransition3.value = easeStep3;
  }
  changeTex(index, changeIndex) {
    this.imgIndexPrev = this.imgIndexNext;
    this.imgIndexNext = index;
    switch (changeIndex) {
      case 0:
      default:
        this.material.uniforms.imgTex1.value = this.imgTexes[this.imgIndexPrev];
        this.material.uniforms.imgTex2.value = this.imgTexes[this.imgIndexNext];
        break;
      case 1:
        this.material.uniforms.imgTex2.value = this.imgTexes[this.imgIndexPrev];
        this.material.uniforms.imgTex3.value = this.imgTexes[this.imgIndexNext];
        break;
      case 2:
        this.material.uniforms.imgTex3.value = this.imgTexes[this.imgIndexPrev];
        this.material.uniforms.imgTex1.value = this.imgTexes[this.imgIndexNext];
        break;
    }
  }
}
