<script>
  import SplitStr from '@/components/atoms/SplitStr.vue';

  export default {
    name: 'UtilityNavi',
    components: {
      SplitStr,
    },
  };
</script>

<template lang="pug">
  transition(
    name = 'show'
    appear
    )
    .p-utility-navi(
      v-if = '$store.state.isLoaded'
      )
      router-link.p-utility-navi__item(
        to = '/about/'
        )
        SplitStr.p-utility-navi__typos(
          label = 'who we are'
          :step = '2'
          childClassname = 'p-utility-navi__typo'
          )
</template>

<style lang="scss">
  .p-utility-navi {
    pointer-events: none;
    position: absolute;
    left: 0;
    z-index: 100;
    line-height: 1;
    letter-spacing: 0.15em;
    text-align: right;
    writing-mode: vertical-rl;
    @include fontSizeAll(12, 12, 12);
    @include l-more-than-mobile {
      bottom: 50px;
      left: calc(3.75% - 0.55em);
    }
    @include l-mobile {
      bottom: 20px;
    }
    &__item {
      display: block;
      pointer-events: auto;
      position: relative;
      text-decoration: none;
    }
    &__typos {
    }
    &__typo {
      display: inline-block;
    }

    // Transition
    &.show-enter {
      opacity: 0.999;
    }
    &.show-enter-to {
      opacity: 1;
      transition-duration: 3s;
      transition-property: opacity;
    }
    &.show-enter & {
      &__item {
        opacity: 0;
      }
    }
    &.show-enter-to & {
      &__item {
        opacity: 1;
        transition-duration: 1s;
        transition-property: opacity;
        @for $i from 1 through 5 {
          &:nth-of-type(#{$i}) {
            transition-delay: $i * 0.14 + .6s;
          }
        }
      }
    }
  }
</style>
