<script>
  import sleep from 'js-util/sleep'
  import MathEx from 'js-util/MathEx'
  import normalizeWheel from 'normalize-wheel';

  import WhoIAmContent from '@/components/atoms/WhoIAmContent.vue'
  import WhoIAmHeading from '@/components/atoms/WhoIAmHeading.vue'
  import WhoIAmThanks from '@/components/atoms/WhoIAmThanks.vue'
  import WhoIAmLinks from '@/components/organisms/WhoIAmLinks.vue'

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
      WhoIAmContent,
      WhoIAmHeading,
      WhoIAmThanks,
      WhoIAmLinks,
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
          paddingTop: `${this.$store.state.resolution.y / 2}px`,
          transform: `translate3d(0, ${-this.scrollY}px, 0)`
        }
      }
    },
    async created () {
      window.addEventListener('wheel', this.wheel, { passive: false });
      window.addEventListener('resize', this.resize);
      this.scrollY = 0;
      this.anchorY = 0;
      this.$store.commit('setScrollProgress', 0);
    },
    async mounted() {
      this.$store.commit('changeBackground', true);
      this.$store.commit('showSkull', false);
      this.$store.commit('showWorksImage', {
        index: 0,
        direction: 1
      });
      this.$store.commit('showWhoIAmObjs', true);
      this.$store.commit('transit', {
        globalId: 50,
      });
      this.$store.commit('transitInWorks', false);
      await sleep(500);
      this.$store.commit('showUI');
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
        this.$store.commit('setScrollProgress', this.scrollY / (this.clientHeight - this.$store.state.resolution.y));
        if (this.isRendering === true) {
          requestAnimationFrame(this.update);
        }
      },
      wheel(e) {
        e.preventDefault();

        const n = normalizeWheel(e);
        const { works, isWheeling } = this.$store.state;

        if (isWheeling === true) return;

        if (this.scrollY < 1 && n.pixelY < 0) {
          // Go to the previous page.
          this.$store.commit('startWheeling');
          this.$router.push(`/works/${works[works.length - 1].key}/`);
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
        this.clientHeight = this.$refs['whoiam-wrap'].clientHeight;
        this.anchorY = MathEx.clamp(
          this.anchorY,
          0,
          this.clientHeight - this.$store.state.resolution.y
        );
        this.$store.commit('setScrollProgress', this.scrollY / (this.clientHeight - this.$store.state.resolution.y));
      }
    }
  }
</script>

<template lang="pug">
.p-view-wrap
  .p-whoiam-wrap(
    :style = 'styles'
    ref = 'whoiam-wrap'
    )
    .p-whoiam-wrap__in
      WhoIAmHeading
      WhoIAmContent
      WhoIAmLinks
      WhoIAmThanks
</template>

<style lang="scss">
  .p-whoiam-wrap {
    @include l-more-than-mobile {
      margin-right: 7.5%;
      margin-left: 7.5%;
      padding-bottom: 300px;
    }
    @include l-mobile {
    }
    &__in {
      position: relative;
      margin-top: -25px;
    }
  }
</style>
