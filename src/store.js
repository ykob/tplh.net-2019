import Vue from 'vue';
import Vuex from 'vuex';
import * as THREE from 'three';
import MathEx from 'js-util/MathEx'

import WebGL from '@/webgl/';

import WORKS from '@/const/WORKS';

const INTERVAL_TO_FIRE_WHEEL = 1000;

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
    scrollProgress: 0,
    wheelTimer: null,
    isShownPreloader: false,
    isLoaded: false,
    isShowView: false,
    isShownUI: false,
    isTransitionDescend: false,
    isTransitionInWorks: false,
    isWheeling: false,
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
      state.preloadProgress += (state.preloadAnchor - state.preloadProgress) / 14;
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
    transit (state, opts) {
      if (state.globalId !== opts.globalId) {
        state.isTransitionDescend = state.globalId <= opts.globalId
      } else {
        state.isTransitionDescend = state.currentWorksId <= opts.currentWorksId
      }
      state.globalId = opts.globalId;
      state.currentWorksId = (opts.currentWorksId) ? opts.currentWorksId : 0;
      state.isTransitionInWorks = state.globalId === 1 && opts.globalId === 1;
    },
    changeBackground (state, bool) {
      state.webgl.changeBackground(bool);
    },
    showSkull (state, bool) {
      state.webgl.showSkull(bool);
    },
    showWorksImage (state, { index, direction }) {
      state.webgl.showWorksImage(index, direction, state.positionFromWorks);
      state.positionFromWorks = direction;
    },
    showWhoIAmObjs (state, bool) {
      state.webgl.showWhoIAmObjs(bool);
    },
    startWheeling (state) {
      state.isWheeling = true;

      // Prevent repeated wheel events fire with a timer.
      state.wheelTimer = setTimeout(() => {
        state.isWheeling = false;
      }, INTERVAL_TO_FIRE_WHEEL);
    },
    setScrollProgress (state, ratio) {
      state.scrollProgress = MathEx.clamp(ratio, 0, 1);
    }
  },
  actions: {
    // transit (context, opts) {
    //   context.commit('transit', opts);
    // },
  }
})
