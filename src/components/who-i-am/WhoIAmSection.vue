<script>
import ParallaxBlock from '@/components/common/ParallaxBlock';

export default {
  name: 'WhoIAmSection',
  components: {
    ParallaxBlock
  },
  props: {
    num: {
      type: Number,
      default: 0
    },
    scrollY: {
      type: Number,
      default: 0
    },
    parallaxRatio: {
      type: Number,
      default: 0
    }
  },
  computed: {
    classnames() {
      return [`p-whoiam-section--${this.num}`];
    }
  }
};
</script>

<template lang="pug">
  ParallaxBlock.p-whoiam-section(
    :class = 'classnames'
    :scrollY = 'scrollY'
    :parallaxRatio = 'parallaxRatio'
    )
    slot
</template>

<style lang="scss">
.p-whoiam-section {
  text-align: justify;
  @include l-more-than-mobile {
    width: 500 / 1360 * 100%;
  }
  @include l-mobile {
    margin-bottom: 50px;
  }
  &--1 {
    @include l-more-than-mobile {
      margin-left: 50%;
      margin-bottom: 120px;
    }
  }
  &--2 {
    @include l-more-than-mobile {
      margin-left: 20%;
      margin-bottom: 120px;
    }
  }
  &--3 {
    @include l-more-than-mobile {
      margin-left: 500 / 1360 * 100%;
      margin-bottom: 180px;
    }
  }
  h2 {
    line-height: (30 / 18);
    margin-top: 0;
    @include fontSizeAll(18, 18, 12);
    @include l-more-than-mobile {
      margin-bottom: 35px;
    }
    @include l-mobile {
    }
  }
  p {
    margin-top: 0;
    margin-bottom: 20px;
  }

  // Transition
  transition-property: opacity, transform;
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
    transition-delay: 1.2s;
    transition-timing-function: $easeOutQuad;
  }
  .view-leave-to &,
  .view-asc-leave-to & {
    opacity: 0;
    transition-duration: 0.6s;
    transition-delay: 0s;
    transition-timing-function: $easeInQuad;
  }
}
</style>
