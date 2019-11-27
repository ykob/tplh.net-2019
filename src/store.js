import Vue from 'vue';
import Vuex from 'vuex';
import * as THREE from 'three';

import WebGL from '@/webgl/';

import WORKS from '@/components/_const/WORKS';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    globalId: 0,
    canvas: document.createElement('canvas'),
    resolution: new THREE.Vector2(),
    webgl: new WebGL(),
    works: WORKS,
    currentWorksId: 0,
    isLoaded: false,
    isEnabledDarkColor: false,
    isShownGlobalTitle: false,
  },
  mutations: {
    transit (state, opts) {
      state.globalId = opts.globalId;
      state.currentWorksId = (opts.currentWorksId) ? opts.currentWorksId : 0;
    },
    enableDarkColor (state, bool) {
      state.isEnabledDarkColor = bool;
    },
    showGlobalTitle (state, bool) {
      state.isShownGlobalTitle = bool;
    },
    transitPrevWorks (state) {
      state.currentWorksId =
        (state.currentWorksId <= 0)
          ? state.works.length - 1
          : state.currentWorksId - 1;
    },
    transitNextWorks (state) {
      state.currentWorksId =
        (state.currentWorksId >= state.works.length - 1)
          ? 0
          : state.currentWorksId + 1;
    },
  },
  actions: {
    // transit (context, opts) {
    //   context.commit('transit', opts);
    // },
  }
})
