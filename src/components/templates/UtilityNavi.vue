<script>
  import SplitStr from '@/components/atoms/SplitStr.vue';

  export default {
    name: 'UtilityNavi',
    components: {
      SplitStr
    },
    data() {
      return {
        isOvered: false,
      }
    },
    computed: {
      classnames() {
        return {
          'is-current': this.$route.name === 'who-i-am'
        }
      },
      classnamesLabel() {
        return {
          'is-current': this.$route.name === 'who-i-am',
          'is-overed': this.isOvered === true
        }
      }
    },
    methods: {
      enter() {
        this.isOvered = true;
      },
      leave() {
        this.isOvered = false;
      }
    }
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
      router-link.p-utility-navi__label(
        to = '/who-i-am/'
        :class = 'classnames'
        @mouseenter.native = 'enter'
        @mouseleave.native = 'leave'
        )
        SplitStr.p-utility-navi__typos(
          label = 'Who I am'
          :step = '2'
          childClassname = 'p-utility-navi__typo'
          )
      .p-utility-navi__line(
        :class = 'classnamesLabel'
        )
        .p-utility-navi__bar
      .p-utility-navi__point(
        :class = 'classnames'
        )
</template>

<style lang="scss">
  .p-utility-navi {
    position: absolute;
    left: 0;
    z-index: 100;
    line-height: 1;
    letter-spacing: 0.15em;
    text-align: right;
    @include fontSizeAll(12, 12, 12);
    @include l-more-than-mobile {
      width: 7.5%;
      top: 50%;
      bottom: 50px;
    }
    @include l-mobile {
      bottom: 20px;
    }
    &__label {
      position: absolute;
      bottom: -0.3em;
      left: calc(50% - 0.45em);
      line-height: 1;
      white-space: nowrap;
      @include fontSizeAll(12, 12, 12);
      text-decoration: none;
      letter-spacing: 0.3em;
      writing-mode: vertical-rl;
      transition-duration: 1.2s;
      transition-timing-function: $easeOutCirc;
      transition-property: bottom;

      // Interaction
      &.is-current {
        bottom: calc(100% - (1em * 7 + 0.3em * 6) / 2);
        pointer-events: none;
      }
    }
    &__line {
      width: 1px;
      height: 0;
      pointer-events: none;
      position: absolute;
      right: 50%;
      bottom: -10px;
      background-color: rgba($color-text, 0.2);
      transition-duration: 1s;
      transition-timing-function: $easeOutCirc;
      transition-property: height, bottom;
      &.is-overed {
        height: calc(1em * 7 + 0.3em * 6 + 20px);
      }
      &.is-current {
        height: calc(100% + (1em * 7 + 0.3em * 6) / 2 + 10px);
        bottom: 0;
        transition-duration: 1.4s;
      }
    }
    &__bar {
      width: 1px;
      top: 0;
      background-color: rgba($color-text, 0.8);
    }
    &__point {
      width: 3px;
      height: 3px;
      position: absolute;
      bottom: -1px;
      right: calc(50% - 1px);
      opacity: 0;
      border-radius: 50%;
      background-color: rgba($color-text, 0.5);
      transition-duration: .7s;
      transition-property: opacity;

      // Interaction
      &.is-current {
        opacity: 1;
        transition-delay: .4s;
      }
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
