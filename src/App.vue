<script>
  import _ from 'lodash';
  import sleep from 'js-util/sleep'

  import GlobalTitle from '@/components/templates/GlobalTitle.vue';
  import UtilityNavi from '@/components/templates/UtilityNavi.vue';
  import WorksNavi from '@/components/templates/WorksNavi.vue';
  import Preloader from '@/components/templates/Preloader.vue';
  import Guide from '@/components/templates/Guide.vue';

  export default {
    name: 'App',
    metaInfo: {
      title: '',
      titleTemplate: '%sYoichi Kobayashi / tplh.net',
    },
    components: {
      GlobalTitle,
      UtilityNavi,
      WorksNavi,
      Preloader,
      Guide,
    },
    async created() {
      const { canvas, webgl } = this.$store.state;

      document.body.append(canvas);
      canvas.style = `
        position: fixed;
        top: 0;
        left: 0;
      `;

      // On global events.
      window.addEventListener('resize', _.debounce(this.resize, 100));
      window.addEventListener('mousemove', this.mousemove);
      document.addEventListener('mouseleave', this.mouseleave);

      await sleep(500);
      this.$store.commit('showPreloader');
      this.update();
      webgl.start(canvas, this.$store);
    },
    computed: {
      transitionName() {
        return this.$store.state.isTransitionDescend === true ? 'view' : 'view-asc';
      },
    },
    methods: {
      update() {
        const { webgl, preloadMax, preloadProgress, isLoaded } = this.$store.state;
        if (isLoaded === false) {
          this.$store.commit('updatePreloadProgress');
          if (preloadProgress / preloadMax > 0.999) {
            this.loaded();
          }
        } else {
          webgl.update(this.$store.state);
        }
        requestAnimationFrame(this.update);
      },
      async loaded() {
        this.resize();
        this.$store.commit('loaded');
        if (this.$route.name === 'home') {
          await sleep(800);
        } else {
          await sleep(1400);
        }
        this.$store.state.webgl.play();
        this.$store.commit('showView');
      },
      resize() {
        const { canvas, resolution, webgl } = this.$store.state;

        resolution.set(document.body.clientWidth, window.innerHeight);
        canvas.width = resolution.x;
        canvas.height = resolution.y;
        webgl.resize(resolution);
      },
      mousemove(e) {
        if (this.$store.state.isShownUI === false) return;
        const { resolution, mouse } = this.$store.state;
        mouse.set(
          (e.clientX / resolution.x) * 2 - 1,
          -(e.clientY / resolution.y) * 2 + 1
        );
      },
      mouseleave() {
        this.$store.state.mouse.set(0, 0);
      }
    },
  }
</script>

<template lang="pug">
  div
    GlobalTitle
    UtilityNavi
    WorksNavi
    transition(
      :name = 'transitionName'
      appear
      v-if = '$store.state.isShowView === true'
      )
      router-view
    Preloader
    Guide(
      v-if = 'false'
      )
</template>

<style lang="scss">
  @import '@/assets/scss/foundation/font.scss';
  @import '@/assets/scss/foundation/normalize.scss';
  @import '@/assets/scss/foundation/global.scss';
  @import '@/assets/scss/object/project/view-wrap.scss';
  @import '@/assets/scss/object/vendor/ps.scss';
</style>
