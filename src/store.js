import Vue from 'vue';
import Vuex from 'vuex';
import * as THREE from 'three';
import MathEx from 'js-util/MathEx';

import router from '@/router';

import WORKS from '@/const/WORKS';

const INTERVAL_TO_FIRE_WHEEL = 1000;

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    globalId: 0,
    canvas: document.createElement('canvas'),
    resolution: new THREE.Vector2(),
    mouse: new THREE.Vector2(),
    mousePrev: new THREE.Vector2(),
    mouseForce: new THREE.Vector2(),
    touchMove: new THREE.Vector2(),
    webgl: null,
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
    isTransition: false,
    isTransitionDescend: false,
    isTransitionInWorks: false,
    isWheeling: false,
    isMobile: false,
    isEnabledTouch: false,
    isTouchStarted: false,
    isTouchMoving: false
  },
  mutations: {
    initWebGL(state, webgl) {
      state.webgl = webgl;
    },
    showPreloader(state) {
      state.isShownPreloader = true;
    },
    setPreloadMax(state, num) {
      state.preloadMax = num;
    },
    updatePreloadAnchor(state) {
      state.preloadAnchor++;
    },
    updatePreloadProgress(state) {
      state.preloadProgress +=
        (state.preloadAnchor - state.preloadProgress) / 14;
    },
    loaded(state) {
      state.isLoaded = true;
    },
    showView(state) {
      state.isShowView = true;
    },
    showUI(state) {
      state.isShownUI = true;
    },
    startTransition(state) {
      state.isTransition = true;
    },
    endTransition(state) {
      state.isTransition = false;
    },
    transit(state, opts) {
      if (state.globalId !== opts.globalId) {
        state.isTransitionDescend = state.globalId <= opts.globalId;
      } else {
        state.isTransitionDescend = state.currentWorksId <= opts.currentWorksId;
      }
      state.isTransitionInWorks = state.globalId === 1 && opts.globalId === 1;
      state.globalId = opts.globalId;
      state.currentWorksId = opts.currentWorksId ? opts.currentWorksId : 0;
    },
    changeBackground(state, { isHome, hasDelay }) {
      state.webgl.changeBackground(isHome, hasDelay);
    },
    showHomeObjs(state, bool) {
      state.webgl.showHomeObjs(bool);
    },
    showWorksObjs(state, { index, direction }) {
      state.webgl.showWorksObjs(index, direction, state.positionFromWorks);
      state.positionFromWorks = direction;
    },
    showWhoIAmObjs(state, bool) {
      state.webgl.showWhoIAmObjs(bool);
    },
    startWheeling(state) {
      state.isWheeling = true;

      // Prevent repeated wheel events fire with a timer.
      state.wheelTimer = setTimeout(() => {
        state.isWheeling = false;
      }, INTERVAL_TO_FIRE_WHEEL);
    },
    setScrollProgress(state, ratio) {
      state.scrollProgress = MathEx.clamp(ratio, 0, 1);
    },
    changeMediaQuery(state, bool) {
      state.isMobile = bool;
    },
    setEnabledTouch(state, bool) {
      state.isEnabledTouch = bool;
    },
    startTouch(state) {
      state.isTouchStarted = true;
    },
    startTouchMove(state) {
      state.isTouchMoving = true;
    },
    touchMove(state, { x, y }) {
      state.touchMove.set(x, y);
    },
    touchEnd(state) {
      state.touchMove.set(0, 0);
      state.isTouchStarted = false;
      state.isTouchMoving = false;
    }
  },
  actions: {
    async initWebGL(context) {
      await import('@/webgl/').then(module => {
        const webgl = new module.default();
        context.commit('initWebGL', webgl);
      });
    },
    debounceRouterPush(context, url) {
      if (context.state.isTransition === true) return;
      context.commit('startTransition');
      router.push(url);
      setTimeout(() => {
        context.commit('endTransition');
      }, INTERVAL_TO_FIRE_WHEEL);
    }
  }
});
