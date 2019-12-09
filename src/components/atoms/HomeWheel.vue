<script>
  import SplitStr from '@/components/atoms/SplitStr.vue'

  export default {
    name: 'HomeWheel',
    components: {
      SplitStr,
    },
    props: {
    },
  };
</script>

<template lang="pug">
  .p-home-wheel
    SplitStr.p-home-wheel__label(
      label = 'Show Works'
      :step = '4'
      childClassname = 'p-home-wheel__label-typo'
      )
    .p-home-wheel__circle
      .p-home-wheel__point
</template>

<style lang="scss">
  .p-home-wheel {
    @include l-more-than-mobile {
      display: flex;
      align-items: center;
      position: fixed;
      bottom: 50px;
      right: 50px;
      z-index: 100;
      @include fontSizeAll(16, 16, 12);
      &__label {
        line-height: 1;
        margin-right: 12px;
        letter-spacing: 0.1em;
      }
      &__label-typo {
        transition-property: opacity, transform;
      }
      &__circle {
        width: 40px;
        height: 40px;
        box-sizing: border-box;
        position: relative;
        border: 1px solid #222;
        border-radius: 50%;
      }
      &__point {
        width: 8px;
        height: 8px;
        top: calc(50% - 4px);
        left: calc(50% - 4px);
        position: absolute;
        border-radius: 50%;
        background-color: #222;
      }
    }
    @include l-mobile {
      display: none;
    }
  }
</style>
