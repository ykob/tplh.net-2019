<script>
export default {
  name: 'WhoIAmHeading',
}
</script>

<template lang="pug">
  h1.p-whoiam-heading
    span.p-whoiam-heading__row
      |Yoichi
    span.p-whoiam-heading__row
      |Kobayashi
</template>

<style lang="scss">
.p-whoiam-heading {
  perspective: 500px;
  line-height: (70 / 60);
  @include fontSizeAll(60, 60, 60);
  letter-spacing: 0.15em;
  @include l-more-than-mobile {
    margin-bottom: 75px;
    margin-left: 50%;
  }
  @include l-mobile {
  }
  &__row {
    display: block;

    // Transition
    transition-property: opacity, transform;
    transform-origin: left bottom;
    .view-enter &,
    .view-asc-enter & {
      opacity: 0;
    }
    .view-enter & {
      transform: translate3d(0, 60px, 30px) rotate3d(1, 0, 0.25, 20deg);
    }
    .view-asc-enter & {
      transform: translate3d(0, -60px, 30px) rotate3d(1, 0, 0.25, -20deg);
    }
    .view-enter-to &,
    .view-asc-enter-to & {
      opacity: 1;
      transition-duration: 1s;
      transition-timing-function: $easeOutCubic;
      @include iterateTransitionDelay(2, 0.1, 0.9);
    }
    .view-leave-to &,
    .view-asc-leave-to & {
      opacity: 0;
      transform-origin: top;
      transition-duration: .6s;
      transition-timing-function: $easeInQuad;
      @include iterateTransitionDelay(2, 0.05, 0.04);
    }
    .view-leave-to & {
      transform: translate3d(0, -60px, 30px) rotate3d(1, 0, 0.25, -20deg);
    }
    .view-asc-leave-to & {
      transform: translate3d(0, 60px, 30px) rotate3d(1, 0, 0.25, 20deg);
    }
  }
}
</style>
