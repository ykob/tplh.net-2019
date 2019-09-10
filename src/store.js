import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    globalId: 0,
  },
  mutations: {
    transit (state, opts) {
      state.globalId = opts.globalId;
    },
  },
  actions: {
    transit (context, opts) {
      context.commit('transit', opts);
    },
  }
})
