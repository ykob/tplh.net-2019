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
    data() {
      return {
        scrollY: 0,
        anchorY: 0,
        isRendering: false
      }
    },
    computed: {
      styles() {
        return {
          transform: `translate3d(0, ${-this.scrollY}px, 0)`
        }
      }
    },
    async created () {
      window.addEventListener('wheel', this.wheel, { passive: false });
      this.scrollY = 0;
      this.anchorY = 0;
      this.isRendering = true;
      this.update();
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
      this.isRendering = false;
    },
    methods: {
      update() {
        this.scrollY += (this.anchorY - this.scrollY) / 20;
        if (this.isRendering === true) {
          requestAnimationFrame(this.update);
        }
      },
      wheel(e) {
        e.preventDefault();

        const n = normalizeWheel(e);
        const { works, isWheeling } = this.$store.state;

        if (isWheeling === true) return;
        
        this.anchorY += n.pixelY;

        // Run at the first wheel event only.
        // if (isWheeling === false) {
        //   if (Math.abs(n.pixelY) < 10) return;
        //   this.$store.commit('startWheeling');
        //
        //   if (n.pixelY < 0) {
        //     this.$router.push(`/works/${works[works.length - 1].key}/`);
        //   }
        // }
      }
    }
  }
</script>

<template lang="pug">
.p-view-wrap
  .about-content(
    :style = 'styles'
    )
    AboutTitle
    AboutDescription
</template>

<style lang="scss">
  .about-content {
    margin-right: 7.5%;
    margin-left: 7.5%;
  }
</style>
