<script>
  export default {
    name: 'GlobalTitle',
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
      router-link.p-global-title__wrap(
        to = '/'
        )
        .p-global-title__typo.p-global-title__typo--1
          |Y
        .p-global-title__typo.p-global-title__typo--2
          |K
</template>

<style lang="scss">
  .p-global-title {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    left: 0;
    z-index: 100;
    line-height: 0.75;
    @include l-more-than-mobile {
      width: 7.5%;
      top: 55px;
    }
    @include l-mobile {
      top: 24px;
    }
    &__wrap {
      cursor: pointer;
      display: block;
      text-decoration: none;
    }
    &__typo {
      display: block;
      @include fontSizeAll(24, 24, 24);
      &--1 {
        transform: rotate(180deg);
      }
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
