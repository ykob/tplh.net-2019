<script>
  import _ from 'lodash';
  import normalizeWheel from 'normalize-wheel';
  import sleep from 'js-util/sleep'

  import GlobalTitle from '@/components/templates/GlobalTitle.vue';
  import UtilityNavi from '@/components/templates/UtilityNavi.vue';
  import WorksNavi from '@/components/templates/WorksNavi.vue';
  import Guide from '@/components/templates/Guide.vue';

  const INTERVAL_TO_FIRE_WHEEL = 1500;

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

      await webgl.start(canvas);

      this.resize();

      webgl.play();

      // If finish the preload process, Start requestAnimationFrame Loop.
      this.update();

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
      window.addEventListener('wheel', wheel, { passive: false });

      await sleep(500);
      this.$store.state.isLoaded = true;
    },
    computed: {},
    methods: {
      update: function() {
        this.$store.state.webgl.update();
        requestAnimationFrame(this.update);
      },
      resize: function() {
        const { canvas, resolution, webgl } = this.$store.state;

        resolution.set(document.body.clientWidth, window.innerHeight);
        canvas.width = resolution.x;
        canvas.height = resolution.y;
        webgl.resize(resolution);
      },
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
      v-if = '$store.state.isLoaded === true'
      )
      router-view
    Guide
</template>

<style lang="scss">
  @import '@/assets/scss/foundation/font.scss';
  @import '@/assets/scss/foundation/_normalize.scss';
  @import '@/assets/scss/foundation/_global.scss';
  @import '@/assets/scss/object/project/_view-wrap.scss';
  @import '@/assets/scss/object/vendor/ps.scss';
</style>
