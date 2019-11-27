<script>
  import SplitStr from '@/components/atoms/SplitStr.vue'

  export default {
    name: 'AboutTitle',
    components: {
      SplitStr,
    },
    props: {
      isShown: {
        type: Boolean,
        default: false,
      },
    },
  };
</script>

<template lang="pug">
SplitStr.p-about-title(
  tag = 'h1'
  label = 'About'
  :step = '4'
  childClassname = 'p-about-title__typo'
  :class = '{ "is-shown" : isShown === true }'
  )
</template>

<style lang="scss">
.p-about-title {
  position: absolute;
  line-height: .9;
  margin-top: 0;
  margin-bottom: 0;
  @include fontSizeAll(64, 42, 24);
  letter-spacing: 0.12em;
  @include l-more-than-mobile {
    top: 25%;
    left: 50%;
  }
  @include l-mobile {
  }
  &__typo {
    transition-property: opacity, transform;
    .view-enter & {
      opacity: 0;
      transform: translate3d(0, .4em, 0) rotateY(70deg);
    }
    .view-enter-to & {
      opacity: 1;
      transition-duration: 1s;
      transition-timing-function: $easeOutQuad;
      transform: translate3d(0, 0, 0) rotateY(0);
    }
    .view-leave-to & {
      opacity: 0;
      transition-duration: .6s;
      transition-timing-function: $easeInQuad;
      transform: translate3d(0, -.6em, 0) rotateY(-70deg);
    }
  }
}
</style>
