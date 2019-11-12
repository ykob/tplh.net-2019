<script>
  import SplitStr from '@/components/atoms/SplitStr.vue'

  export default {
    name: 'GlobalTitle',
    components: {
      SplitStr,
    },
    props: {},
    data: function() {
      return {}
    },
  };
</script>

<template lang="pug">
  transition(
    name = 'show'
    )
    .p-global-title(
      v-if = '$store.state.isShownGlobalTitle'
      )
      router-link.p-global-title__name(
        to = '/'
        )
        SplitStr(
          label = 'Yoichi Kobayashi'
          :step = '2'
          :base = '0'
          childClassname = 'p-global-title__name-typo'
          )
      SplitStr.p-global-title__summary(
        label = 'Front-End & Creative Developer.'
        :step = '1'
        :base = '20'
        childClassname = 'p-global-title__summary-typo'
        )
</template>

<style lang="scss">
  .p-global-title {
    position: fixed;
    z-index: 100;
    line-height: 1;
    @include l-more-than-mobile {
      height: 50px;
      top: 50px;
      left: 50px;
    }
    @include l-mobile {
      height: 36px;
      top: 24px;
      left: 20px;
    }
    &__name {
      cursor: pointer;
      position: absolute;
      top: 0;
      left: 0;
      white-space: nowrap;
      @include fontSizeAll(18, 18, 15);
      text-transform: uppercase;
      letter-spacing: 0.18em;
    }
    &__summary {
      position: absolute;
      bottom: 0;
      left: 0;
      white-space: nowrap;
      @include fontSizeAll(12, 12, 10);
      letter-spacing: 0.18em;
    }

    // Transition
    &.show-enter-to, &.show-leave-to {
      transition-property: opacity;
    }
    &.show-leave-to {
      opacity: 0.999;
      transition-duration: 1s;
    }
    &__name-typo, &__summary-typo {
      transition-property: opacity, transform;
    }
    &.show-enter-active &, &.show-leave-active & {
      &__name-typo, &__summary-typo {
        transition-duration: .5s;
        transition-property: opacity, transform;
        backface-visibility: hidden;
      }
    }
    &.show-enter & {
      &__name-typo {
        opacity: 0;
        transform: translate3d(0, 15px, 0) rotateY(90deg);
      }
      &__summary-typo {
        opacity: 0;
        transform: translate3d(0, 6px, 0);
      }
    }
    &.show-leave-to & {
      &__name-typo {
        opacity: 0;
        transform: translate3d(0, -15px, 0) rotateY(90deg);
      }
      &__summary-typo {
        opacity: 0;
        transform: translate3d(0, -6px, 0);
      }
    }
  }
</style>
