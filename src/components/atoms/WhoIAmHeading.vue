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
    .view-enter & {
      opacity: 0;
      transform: translate3d(-20px, 50px, 0) skewY(5deg);
    }
    .view-enter-to & {
      opacity: 1;
      transition-duration: 1s;
      transition-timing-function: $easeOutCubic;
      @include iterateTransitionDelay(2, 0.1, 0.9);
    }
    .view-leave-to & {
      opacity: 0;
      transform: translate3d(0, -60px, 0);
      transform-origin: top;
      transition-duration: .6s;
      transition-timing-function: $easeInQuad;
      @include iterateTransitionDelay(2, 0.05, 0.04);
    }
  }
}
</style>
