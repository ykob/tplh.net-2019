<script>
  import SplitStr from '@/components/atoms/SplitStr.vue'

  export default {
    name: 'ContactTitle',
    components: {
      SplitStr,
    },
    props: {
    },
  };
</script>

<template lang="pug">
SplitStr.p-contact-title(
  tag = 'h1'
  label = 'Contact'
  :step = '4'
  childClassname = 'p-contact-title__typo'
  )
</template>

<style lang="scss">
.p-contact-title {
  line-height: .9;
  margin-top: 0;
  @include fontSizeAll(64, 42, 24);
  letter-spacing: 0.12em;
  @include l-more-than-mobile {
    margin-bottom: 30px;
  }
  @include l-mobile {
    margin-bottom: 15px;
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
