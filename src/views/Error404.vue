<script>
import sleep from 'js-util/sleep';

import store from '@/store';
import ErrorMessage from '@/components/error/ErrorMessage.vue';

export default {
  name: 'error-404',
  metaInfo: {
    title: '404 File not found / ',
    meta: [
      {
        name: 'description',
        content: ''
      }
    ]
  },
  components: {
    ErrorMessage
  },
  beforeRouteEnter(to, from, next) {
    store.commit('transit', {
      globalId: 0
    });
    next();
  },
  async mounted() {
    const { commit } = this.$store;

    commit('changeBackground', {
      isHome: true,
      hasDelay: false
    });
    commit('showHomeObjs', false);
    commit('showWorksObjs', {
      index: 0,
      direction: -1
    });
    commit('showWhoIAmObjs', false);
    await sleep(500);
    commit('showUI');
  }
};
</script>

<template lang="pug">
  .p-view-wrap
    ErrorMessage
</template>

<style lang="scss"></style>
