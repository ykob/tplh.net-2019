<script>
import PreloaderCount from '@/components/common/PreloaderCount.vue';
import PreloaderInitial from '@/components/common/PreloaderInitial.vue';
import PreloaderProgress from '@/components/common/PreloaderProgress.vue';

export default {
  name: 'Preloader',
  components: {
    PreloaderCount,
    PreloaderInitial,
    PreloaderProgress
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
    opacity: 0.999;
  }
  &.preloader-enter-to {
    opacity: 1;
    transition-duration: 1.6s;
    transition-property: opacity;
  }
  &.preloader-leave-to {
    opacity: 0.999;
    transition-duration: 1.6s;
    transition-delay: 0.8s;
  }
}
</style>
