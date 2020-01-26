<script>
  import _ from 'lodash';
  import normalizeWheel from 'normalize-wheel';
  import sleep from 'js-util/sleep'

  import GlobalTitle from '@/components/templates/GlobalTitle.vue';
  import UtilityNavi from '@/components/templates/UtilityNavi.vue';
  import WorksNavi from '@/components/templates/WorksNavi.vue';
  import Preloader from '@/components/templates/Preloader.vue';
  import Guide from '@/components/templates/Guide.vue';

  const INTERVAL_TO_FIRE_WHEEL = 1000;

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
    data: function() {
      return {
        wheelTimer: null,
        isWheeling: false,
      }
    },
    async created() {
      const { canvas, webgl } = this.$store.state;

      document.body.append(canvas);
      canvas.style = `
        position: fixed;
        top: 0;
        left: 0;
      `;

      // For wheel events
      // =====
      const wheel = (e) => {
        e.preventDefault();

        const n = normalizeWheel(e);
        const { works } = this.$store.state;
        const { name } = this.$route;

        // Run at the first wheel event only.
        if (this.isWheeling === false) {
          if (Math.abs(n.pixelY) < 10) return;
          this.isWheeling = true;

          if (name === 'home') {
            if (n.pixelY > 0) {
              this.$router.push(`/works/${works[0].key}/`);
            }
          } else if (name === 'works') {
            if (n.pixelY > 0) {
              if (this.$store.state.currentWorksId < works.length - 1) {
                this.$store.commit('transitNextWorks');
                this.$router.push(`/works/${works[this.$store.state.currentWorksId].key}/`);
              } else {
                this.$router.push(`/who-i-am/`);
              }
            } else {
              if (this.$store.state.currentWorksId > 0) {
                this.$store.commit('transitPrevWorks');
                this.$router.push(`/works/${works[this.$store.state.currentWorksId].key}/`);
              } else {
                this.$router.push(`/`);
              }
            }
          } else if (name === 'who-i-am') {
            if (n.pixelY < 0) {
              this.$router.push(`/works/${works[works.length - 1].key}/`);
            }
          }

          // Prevent repeated wheel events fire with a timer.
          this.wheelTimer = setTimeout(() => {
            this.isWheeling = false;
          }, INTERVAL_TO_FIRE_WHEEL);
        }
      };

      // On global events.
      window.addEventListener('resize', _.debounce(this.resize, 100));
      window.addEventListener('mousemove', this.mousemove);
      document.addEventListener('mouseleave', this.mouseleave);
      window.addEventListener('wheel', wheel, { passive: false });

      await sleep(500);
      this.$store.commit('showPreloader');
      this.update();
      webgl.start(canvas, this.$store);
    },
    computed: {},
    methods: {
      update() {
        const { mouse, webgl, preloadMax, preloadProgress, isLoaded } = this.$store.state;
        if (isLoaded === false) {
          this.$store.commit('updatePreloadProgress');
          if (preloadProgress / preloadMax > 0.999) {
            this.loaded();
          }
        } else {
          webgl.update(mouse);
        }
        requestAnimationFrame(this.update);
      },
      async loaded() {
        this.resize();
        this.$store.commit('loaded');
        await sleep(1500)
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
      name = 'view'
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
