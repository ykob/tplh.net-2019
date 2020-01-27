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
    @include fontSizeAll(24, 24, 24);
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
  }
</style>
