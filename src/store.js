import Vue from 'vue'
import Vuex from 'vuex'
import * as THREE from 'three';

import WebGL from '@/webgl/'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    globalId: 0,
    canvas: document.createElement('canvas'),
    resolution: new THREE.Vector2(),
    webgl: new WebGL(),
    isEnabledDarkColor: false,
  },
  mutations: {
    transit (state, opts) {
      state.globalId = opts.globalId;
    },
    enableDarkColor (state, bool) {
      state.isEnabledDarkColor = bool;
    },
  },
  actions: {
    // transit (context, opts) {
    //   context.commit('transit', opts);
    // },
  }
})
