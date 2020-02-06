<script>
  const YEAR_PREV = 1984;
  const YEAR_NEXT = 2020;

  const makeDigitArr = (prev, next, digit) => {
    const count = Math.ceil((next - prev) / Math.pow(10, digit - 1));
    const firstNum = parseInt(String(Math.floor(prev / Math.pow(10, digit - 1))).slice('-1'));
    return [...Array(count + 1).keys()].map(n => {
      return parseInt(String(n + firstNum).slice('-1'));
    });
  }
  const makeCounterCol = (digit) => {
    return [...Array(digit)].map((o, i) => {
      return makeDigitArr(YEAR_PREV, YEAR_NEXT, digit - i);
    });
  }

  export default {
    name: 'PreloaderCount',
    data() {
      return {
        cols: makeCounterCol(4)
      }
    }
  };
</script>

<template lang="pug">
  .preloader-counter
    .preloader-counter__col(
      v-for = 'col in cols'
      )
      .preloader-counter__row(
        v-for = 'row in col'
        )
        |{{ row }}
</template>

<style lang="scss">
  .preloader-counter {
    width: 112px;
    height: 1.5em;
    position: absolute;
    top: calc(50% - 0.75em);
    left: calc(50% - 56px);
    overflow: hidden;
    &__col {
      display: flex;
      flex-direction: column-reverse;
      position: absolute;
      bottom: 0;
      &:nth-of-type(1) {
        left: 0;
      }
      &:nth-of-type(2) {
        left: 1em;
      }
      &:nth-of-type(3) {
        right: 1em;
      }
      &:nth-of-type(4) {
        right: 0;
      }
    }
    &__row {
      width: 1em;
      height: 1.5em;
      display: flex;
      justify-content: center;
      align-items: center;
      line-height: 1;
      @include fontSizeAll(16, 16, 16);
    }

    //
    // transition
    // ==========
    .preloader-enter & {
      opacity: 0;
      transform: scale(0.6);
    }
    .preloader-enter-to & {
      transform: scale(1);
      transition-duration: 1.4s;
      transition-delay: 0.1s;
      transition-timing-function: $easeOutCirc;
      transition-property: opacity, transform;
    }
    .preloader-leave-to & {
      opacity: 0;
      transform: scale(1.4);
      transition-duration: 1.4s;
      transition-delay: 0.9s;
      transition-timing-function: $easeInExpo;
      transition-property: opacity, transform;
    }
    &__col {
      transform: translate3d(0, 0, 0);
      .preloader-enter & {
        transform: translate3d(0, -1.5em, 0);
      }
      .preloader-enter-to & {
        transform: translate3d(0, 0, 0);
        transition-duration: 1s;
        @include iterateTransitionDelay(4, 0.08, 0);
      }
      .preloader-leave-to & {
        transform: translate3d(0, calc(100% - 1.5em), 0);
        transition-duration: 1s;
        transition-timing-function: $easeInOutExpo;
        @include iterateTransitionDelay(4, 0.08, 0);
      }
    }
  }
</style>
