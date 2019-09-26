<script>
  import SplitStr from '@/components/atoms/SplitStr.vue'

  export default {
    name: 'HomeTitle',
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
  .p-home-title(
    :class = '{ "is-shown" : isShown === true }'
    )
    SplitStr.p-home-title__name(
      label = 'Yoichi Kobayashi'
      align = 'center'
      :step = '4'
      childClassname = 'p-home-title__name-typo'
      )
    SplitStr.p-home-title__summary(
      label = 'Front-End & Creative Developer.'
      align = 'center'
      :step = '2'
      :base = '20'
      childClassname = 'p-home-title__summary-typo'
      )
</template>

<style lang="scss">
  @import '@/assets/scss/foundation/_variables-easings.scss';
  @import '@/assets/scss/foundation/_mixins.scss';

  .p-home-title {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    top: 66.6%;
    right: 0;
    left: 0;
    z-index: 100;
    line-height: 1;
    &__name {
      text-transform: uppercase;
      @include fontSizeAll(42, 42, 24);
      letter-spacing: 0.2em;
      @include l-more-than-mobile {
        margin-bottom: 25px;
      }
      @include l-mobile {
        margin-bottom: 12px;
      }
    }
    &__summary {
      @include fontSizeAll(18, 18, 12);
      letter-spacing: 0.16em;
    }

    // Transition
    &__name-typo {
      opacity: 0;
      transform: translate3d(0, .6em, 0) rotateY(70deg);
    }
    &__summary-typo {
      opacity: 0;
      transform: translate3d(0, .6em, 0);
    }
    .is-shown & {
      &__name-typo, &__summary-typo {
        opacity: 1;
        transition-duration: 1s;
        transition-property: opacity, transform;
        transition-timing-function: $easeOutQuad;
      }
      &__name-typo {
        transform: translate3d(0, 0, 0) rotateY(0);
      }
      &__summary-typo {
        transform: translate3d(0, 0, 0);
      }
    }
    .view-leave-to & {
      &__name-typo, &__summary-typo {
        opacity: 0;
        transition-duration: .6s;
        transition-timing-function: $easeInQuad;
      }
      &__name-typo {
        transform: translate3d(0, -1.0em, 0) rotateY(-70deg);
      }
      &__summary-typo {
        transform: translate3d(0, -.8em, 0);
      }
    }
  }
</style>
