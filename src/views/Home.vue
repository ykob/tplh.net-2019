<script>
import normalizeWheel from 'normalize-wheel';
import sleep from 'js-util/sleep';

import store from '@/store';
import HomeHeading from '@/components/home/HomeHeading.vue';

export default {
  name: 'Home',
  metaInfo: {
    title: ''
  },
  components: {
    HomeHeading
  },
  beforeRouteEnter(to, from, next) {
    store.commit('transit', {
      globalId: 0
    });
    next();
  },
  created() {
    window.addEventListener('wheel', this.wheel, { passive: false });
    window.addEventListener('touchmove', this.touchmove);
  },
  async mounted() {
    this.$store.commit('changeBackground', {
      isHome: true,
      hasDelay: true
    });
    this.$store.commit('showHomeObjs', true);
    this.$store.commit('showWorksObjs', {
      index: 0,
      direction: -1
    });
    this.$store.commit('showWhoIAmObjs', false);
    await sleep(5000);
    this.$store.commit('showUI');
  },
  destroyed() {
    window.removeEventListener('wheel', this.wheel, { passive: false });
    window.removeEventListener('touchmove', this.touchmove);
  },
  methods: {
    wheel(e) {
      e.preventDefault();

      const n = normalizeWheel(e);
      const { state, commit } = this.$store;

      // Run at the first wheel event only.
      if (state.isWheeling === false) {
        if (Math.abs(n.pixelY) < 10) return;
        commit('startWheeling');

        if (n.pixelY > 0) {
          this.$router.push(`/works/${state.works[0].key}/`);
        }
      }
    },
    touchmove() {
      const { state, commit, dispatch } = this.$store;

      if (state.isTouchMoving === true) {
        if (state.touchMove.y < -10) {
          dispatch('debounceRouterPush', `/works/${state.works[0].key}/`);
          commit('touchEnd');
        }
      }
    }
  }
};
</script>

<template lang="pug">
  .p-view-wrap
    HomeHeading
</template>

<style lang="scss"></style>
