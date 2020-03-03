<script>
  export default {
    name: 'PreloaderInitial',
  };
</script>

<template lang="pug">
  .preloader-initial
    .preloader-initial__typo.preloader-initial__typo--1
      .preloader-initial__typo-in.preloader-initial__typo-in--1
        |Y
    .preloader-initial__typo.preloader-initial__typo--2
      .preloader-initial__typo-in.preloader-initial__typo-in--2
        |K
</template>

<style lang="scss">
  .preloader-initial {
    width: 1em;
    height: 2em;
    position: absolute;
    top: calc(50% - 1em);
    left: calc(50% - 0.5em);
    @include fontSizeAll(24, 24, 14);
    text-align: center;
    &__typo {
      display: block;
      overflow: hidden;
      &--1 {
        transform: rotate(180deg);
      }
      &--2 {
        margin-top: -0.25em;
      }
    }
    &__typo-in {
      .preloader-enter & {
        transform: translate3d(1.01em, 0 ,0);
      }
      .preloader-enter-to & {
        transform: translate3d(0, 0 ,0);
        transition-duration: 1s;
        &--2 {
          transition-delay: .1s
        }
      }
    }

    //
    // transition
    // ==========
    .preloader-enter & {
      opacity: 0;
      transform: scale(0.6);
    }
    .preloader-enter-to & {
      transform: scale(1);
      transition-duration: 1.4s;
      transition-delay: 0.2s;
      transition-timing-function: $easeOutCirc;
      transition-property: opacity, transform;
    }
    .preloader-leave-to & {
      opacity: 0;
      transform: scale(1.4);
      transition-duration: 1.4s;
      transition-delay: 1s;
      transition-timing-function: $easeInExpo;
      transition-property: opacity, transform;
    }
  }
</style>
