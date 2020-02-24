<script>
  import normalizeWheel from 'normalize-wheel';
  import sleep from 'js-util/sleep'

  import store from '@/store'

  export default {
    name: 'Home',
    metaInfo: {
      meta: [
        {
          name: 'description',
          content: 'I am a Front-End & Creative Developer in Japan.'
        }
      ]
    },
    beforeRouteEnter(to, from, next) {
      store.commit('transit', {
        globalId: 0,
      });
      next();
    },
    created () {
      window.addEventListener('wheel', this.wheel, { passive: false });
    },
    async mounted() {
      this.$store.commit('changeBackground', false);
      this.$store.commit('showHomeObjs', true);
      this.$store.commit('showWorksObjs', {
        index: 0,
        direction: -1
      });
      this.$store.commit('showWhoIAmObjs', false);
      await sleep(5000);
      this.$store.commit('showUI');
    },
    destroyed () {
      window.removeEventListener('wheel', this.wheel, { passive: false });
    },
    methods: {
      wheel(e) {
        e.preventDefault();

        const n = normalizeWheel(e);
        const { works, isWheeling } = this.$store.state;

        // Run at the first wheel event only.
        if (isWheeling === false) {
          if (Math.abs(n.pixelY) < 10) return;
          this.$store.commit('startWheeling');

          if (n.pixelY > 0) {
            this.$router.push(`/works/${works[0].key}/`);
          }
        }
      }
    }
  }
</script>

<template lang="pug">
  .p-view-wrap
</template>

<style lang="scss">
</style>
