<script>
  import _ from 'lodash';
  import normalizeWheel from 'normalize-wheel';

  import Background from '@/components/templates/Background.vue';
  import GlobalTitle from '@/components/templates/GlobalTitle.vue';
  import UtilityNavi from '@/components/templates/UtilityNavi.vue';

  const INTERVAL_TO_FIRE_WHEEL = 1000;

  export default {
    name: 'App',
    components: {
      Background,
      GlobalTitle,
      UtilityNavi,
    },
    data: function() {
      return {
        wheelTimer: null,
        isWheeling: false,
      }
    },
    created: function() {
      const { canvas, webgl } = this.$store.state;

      document.body.append(canvas);
      canvas.style = `
        position: fixed;
        top: 0;
        left: 0;
      `;

      webgl.start(canvas);

      this.resize();

      webgl.play();

      // If finish the preload process, Start requestAnimationFrame Loop.
      this.update();

      // For wheel events
      // =====
      const wheel = (e) => {
        const n = normalizeWheel(e);
        const { works } = this.$store.state;
        const { name } = this.$route;

        // Run at the first wheel event only.
        if (this.isWheeling === false) {
          if (Math.abs(n.pixelY) < 10) return;

            if (name === 'home') {
              if (n.pixelY > 0) {
                e.preventDefault();
                this.$router.push(`/works/${works[0].key}/`);
              }
            } else if (name === 'works') {
              e.preventDefault();
              if (n.pixelY > 0) {
                this.$store.commit('transitNextWorks');
              } else {
                this.$store.commit('transitPrevWorks');
              }
              this.$router.push(`/works/${works[this.$store.state.currentWorksId].key}/`);
            }

          // Prevent repeated wheel events fire with a timer.
          this.isWheeling = true;
          this.wheelTimer = setTimeout(() => {
            this.isWheeling = false;
          }, INTERVAL_TO_FIRE_WHEEL);
        }
      };

      // On global events.
      window.addEventListener('resize', _.debounce(this.resize, 100));
      window.addEventListener('wheel', wheel, { passive: false });
      window.addEventListener('DOMMouseScroll', wheel, { passive: false });
    },
    mounted: function() {
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
  .p-page(
    :class = '{ "is-enabled-dark-color": this.$store.state.isEnabledDarkColor === true }'
    )
    GlobalTitle
    UtilityNavi
    transition(
      name = 'view'
      )
      router-view
    Background
</template>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Lora:400,700&display=swap');

  @import '@/assets/scss/foundation/_normalize.scss';
  @import '@/assets/scss/foundation/_global.scss';
  @import '@/assets/scss/object/project/_view-wrap.scss';
  @import '@/assets/scss/object/vendor/ps.scss';

  .p-page {
    position: relative;
    z-index: 10;
    font-family: 'Lora', serif;
    color: #222;
    transition-duration: .4s;
    transition-property: color;
    a {
      color: #222;
      transition-duration: .4s;
      transition-property: color;
    }
    &.is-enabled-dark-color {
      color: #fff;
      a {
        color: #fff;
      }
    }
  }
</style>
