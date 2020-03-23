<script>
export default {
  name: "WhoIAmHeading"
};
</script>

<template lang="pug">
  h1.p-whoiam-heading
    span.p-whoiam-heading__in
      span.p-whoiam-heading__row
        |Yoichi
      span.p-whoiam-heading__row
        |Kobayashi
</template>

<style lang="scss">
.p-whoiam-heading {
  perspective: 500px;
  line-height: (70 / 60);
  @include fontSizeAll(60, 60, 30);
  letter-spacing: 0.15em;
  @include l-more-than-mobile {
    margin-bottom: 145px;
    margin-left: 40%;
  }
  @include l-mobile {
    margin-bottom: 50px;
  }
  &__in {
    display: block;

    // Transition
    transition-property: transform;
    transform-origin: center left;
    .view-enter &,
    .view-asc-leave-to & {
      transform: translate3d(0, 100px, 30px) rotate3d(1, 0, 0.5, 10deg);
    }
    .view-asc-enter &,
    .view-leave-to & {
      transform: translate3d(0, -100px, 30px) rotate3d(1, 0, 0.5, -10deg);
    }
    .view-enter-to &,
    .view-asc-enter-to & {
      transition-duration: 1.1s;
      transition-delay: 0.8s;
      transition-timing-function: $easeOutQuad;
    }
    .view-leave-to &,
    .view-asc-leave-to & {
      transition-duration: 0.65s;
      transition-timing-function: $easeInQuad;
    }
  }
  &__row {
    display: block;

    // Transition
    transition-property: opacity, transform;
    transform-origin: center left;
    .view-enter &,
    .view-asc-enter & {
      opacity: 0;
    }
    .view-enter &,
    .view-asc-leave-to & {
      transform: translate3d(0, 100px, 0);
    }
    .view-asc-enter &,
    .view-leave-to & {
      transform: translate3d(0, -100px, 0);
    }
    .view-enter-to &,
    .view-asc-enter-to & {
      opacity: 1;
      transition-duration: 1s;
      transition-timing-function: $easeOutQuad;
      @include iterateTransitionDelay(2, 0.1, 0.8);
    }
    .view-leave-to &,
    .view-asc-leave-to & {
      opacity: 0;
      transition-duration: 0.6s;
      transition-timing-function: $easeInQuad;
      @include iterateTransitionDelay(2, -0.1, 0.1);
    }
  }
}
</style>
