<script>
  import _ from 'lodash';

  import Background from '@/components/templates/Background.vue'
  import GlobalTitle from '@/components/templates/GlobalTitle.vue'

  export default {
    name: 'App',
    components: {
      Background,
      GlobalTitle,
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

      // On global events.
      window.addEventListener('resize', _.debounce(this.resize, 100));
    },
    mounted: function() {
    },
    computed: {},
    methods: {
      update: function() {
        // console.log(this.$router.currentRoute);
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
    :class = '{ "is-enabled-dark-color": this.$store.state.darkColor === true }'
    )
    GlobalTitle
    router-view
    Background
</template>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Lora:400,700&display=swap');

  @import '@/assets/scss/foundation/_variables.scss';
  @import '@/assets/scss/foundation/_normalize.scss';
  @import '@/assets/scss/foundation/_global.scss';

  .p-page {
    position: relative;
    z-index: 10;
    font-family: 'Lora', serif;
    color: #222;
    &.is-enabled-dark-color {
      color: #fff;
    }
  }
</style>
