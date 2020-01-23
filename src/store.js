import Vue from 'vue';
import Vuex from 'vuex';
import * as THREE from 'three';

import WebGL from '@/webgl/';

import WORKS from '@/const/WORKS';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    globalId: 0,
    canvas: document.createElement('canvas'),
    resolution: new THREE.Vector2(),
    mouse: new THREE.Vector2(),
    webgl: new WebGL(),
    works: WORKS,
    currentWorksId: 0,
    positionFromWorks: -2,
    preloadMax: 0,
    preloadAnchor: 0,
    preloadProgress: 0,
    isShownPreloader: false,
    isLoaded: false,
    isShowView: false,
    isShownUI: false,
    isTransitionInWorks: false,
  },
  mutations: {
    showPreloader (state) {
      state.isShownPreloader = true;
    },
    setPreloadMax (state, num) {
      state.preloadMax = num;
    },
    updatePreloadAnchor (state) {
      state.preloadAnchor++;
    },
    updatePreloadProgress (state) {
      state.preloadProgress += (state.preloadAnchor - state.preloadProgress) / 20;
    },
    loaded (state) {
      state.isLoaded = true;
    },
    showView (state) {
      state.isShowView = true;
    },
    showUI (state) {
      state.isShownUI = true;
    },
    transitInWorks(state, bool) {
      state.isTransitionInWorks = bool;
    },
    transit (state, opts) {
      state.globalId = opts.globalId;
      state.currentWorksId = (opts.currentWorksId) ? opts.currentWorksId : 0;
    },
    changeBackground (state, bool) {
      state.webgl.changeBackground(bool);
    },
    showSkull (state, bool) {
      state.webgl.showSkull(bool);
    },
    showWorksImage (state, index) {
      state.webgl.showWorksImage(index);
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
    setPositionFromWorks (state, number) {
      state.positionFromWorks = number;
    }
  },
  actions: {
    // transit (context, opts) {
    //   context.commit('transit', opts);
    // },
  }
})
