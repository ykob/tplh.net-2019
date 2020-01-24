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
    display: flex;
  }
</style>
