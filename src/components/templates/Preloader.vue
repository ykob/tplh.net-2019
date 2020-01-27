<script>
  import PreloaderCount from '@/components/atoms/PreloaderCount.vue'
  import PreloaderInitial from '@/components/atoms/PreloaderInitial.vue'
  import PreloaderProgress from '@/components/atoms/PreloaderProgress.vue'

  export default {
    name: 'Preloader',
    components: {
      PreloaderCount,
      PreloaderInitial,
      PreloaderProgress,
    }
  };
</script>

<template lang="pug">
  transition(
    name = 'preloader'
    )
    .preloader(
      v-if = '$store.state.isShownPreloader === true && $store.state.isLoaded === false'
      )
      PreloaderCount
      PreloaderInitial
      PreloaderProgress
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

    //
    // transition
    // ==========
    &.preloader-enter {
      opacity: 0;
      transform: scale(0.6);
    }
    &.preloader-enter-to {
      transform: scale(1);
      transition-duration: 1.4s;
      transition-timing-function: $easeOutCirc;
      transition-property: opacity, transform;
    }
    &.preloader-leave-to {
      opacity: 0;
      transform: scale(1.2);
      transition-duration: 1.4s;
      transition-delay: 1s;
      transition-timing-function: $easeInOutCirc;
      transition-property: opacity, transform;
    }
  }
</style>
