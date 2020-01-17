<script>
  import PreloaderProgress from '@/components/atoms/PreloaderProgress.vue'

  export default {
    name: 'Preloader',
    components: {
      PreloaderProgress,
    },
    computed: {
      classnames() {
        return {
          'is-hidden': this.$store.state.isLoaded === true
        }
      }
    }
  };
</script>

<template lang="pug">
  .preloader
    PreloaderProgress.preloader__progress(
      :class = 'classnames'
      )
</template>

<style lang="scss" scoped>
  .preloader {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10000;
    pointer-events: none;
    &__progress {
      width: 252px;
      height: 252px;
      position: absolute;
      top: calc(50% - 126px);
      left: calc(50% - 126px);

      &.is-hidden {
        opacity: 0;
        transform: scale(1.05);
        transition-duration: 1s;
        transition-timing-function: $easeOutCirc;
        transition-property: opacity, transparent;
      }
    }
  }
</style>
