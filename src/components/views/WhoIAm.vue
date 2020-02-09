<script>
  import sleep from 'js-util/sleep'
  import normalizeWheel from 'normalize-wheel';

  import AboutTitle from '@/components/atoms/AboutTitle.vue'
  import AboutDescription from '@/components/atoms/AboutDescription.vue'

  export default {
    name: 'WhoIAm',
    metaInfo: {
      title: 'Who I am / ',
      meta: [
        {
          name: 'description',
          content: 'it is about page.'
        }
      ]
    },
    components: {
      AboutTitle,
      AboutDescription,
    },
    created () {
      window.addEventListener('wheel', this.wheel, { passive: false });
    },
    async mounted() {
      this.$store.commit('changeBackground', true);
      this.$store.commit('showSkull', false);
      this.$store.commit('showWorksImage', {
        index: 0,
        direction: 1
      });
      this.$store.commit('transit', {
        globalId: 50,
      });
      this.$store.commit('transitInWorks', false);
      await sleep(500);
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

          if (n.pixelY < 0) {
            this.$router.push(`/works/${works[works.length - 1].key}/`);
          }
        }
      }
    }
  }
</script>

<template lang="pug">
.p-view-wrap
  AboutTitle
  AboutDescription
</template>

<style lang="scss">
</style>
