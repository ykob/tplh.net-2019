<script>
  import sleep from 'js-util/sleep'
  import MathEx from 'js-util/MathEx'
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
        clientHeight: 0,
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
      window.addEventListener('resize', this.resize);
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
      this.scrollY = 0;
      this.anchorY = 0;
      this.isRendering = true;
      this.resize();
      this.update();
    },
    destroyed () {
      window.removeEventListener('wheel', this.wheel, { passive: false });
      window.removeEventListener('resize', this.resize);
      this.isRendering = false;
    },
    methods: {
      update() {
        this.scrollY = Math.floor((this.scrollY + (this.anchorY - this.scrollY) / 10) * 100) / 100;
        if (this.isRendering === true) {
          requestAnimationFrame(this.update);
        }
      },
      wheel(e) {
        e.preventDefault();

        const n = normalizeWheel(e);
        const { works, isWheeling } = this.$store.state;

        if (isWheeling === true) return;

        if (this.scrollY === 0 && n.pixelY < 0) {
          // Go to the previous page.
          this.$store.commit('startWheeling');
          if (n.pixelY < 0) {
            this.$router.push(`/works/${works[works.length - 1].key}/`);
          }
        } else {
          // Scroll the content of the current page.
          this.anchorY = MathEx.clamp(
            this.anchorY + n.pixelY,
            0,
            this.clientHeight - this.$store.state.resolution.y
          );
        }
      },
      resize() {
        this.clientHeight = this.$refs['about-content'].clientHeight;
        this.anchorY = MathEx.clamp(
          this.anchorY,
          0,
          this.clientHeight - this.$store.state.resolution.y
        );
      }
    }
  }
</script>

<template lang="pug">
.p-view-wrap
  .about-content(
    :style = 'styles'
    ref = 'about-content'
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
