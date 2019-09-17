<script>
  // @ is an alias to /src
  import SplitStr from '@/components/atoms/SplitStr.vue'

  export default {
    name: 'Home',
    components: {
      SplitStr,
    },
    created: function() {
      this.$store.commit('enableDarkColor', false);
      this.$store.commit('transit', {
        globalId: 0,
      });
    },
    mounted: function() {
    },
    computed: {},
    methods: {},
  }
</script>

<template lang="pug">
  div
    .p-home-title
      .p-home-title__name
        SplitStr(
          label = 'Yoichi Kobayashi'
          align = 'center'
          exClassName = 'p-home-title__name-typo'
          )
      .p-home-title__summary
        SplitStr(
          label = 'Front-End & Creative Developer.'
          align = 'center'
          )
    .p-home-wheel
      .p-home-wheel__label
        |Show Works
      .p-home-wheel__circle
        .p-home-wheel__point
</template>

<style lang="scss">
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
  }
  .p-home-wheel {
    display: flex;
    align-items: center;
    position: fixed;
    z-index: 100;
    @include fontSizeAll(16, 16, 12);
    @include l-more-than-mobile {
      bottom: 50px;
      right: 50px;
    }
    @include l-mobile {
      bottom: 20px;
      right: 20px;
    }
    &__label {
      line-height: 1;
      letter-spacing: 0.1em;
      @include l-more-than-mobile {
        margin-right: 12px;
      }
      @include l-mobile {
        margin-right: 8px;
      }
    }
    &__circle {
      box-sizing: border-box;
      position: relative;
      border: 1px solid #222;
      border-radius: 50%;
      @include l-more-than-mobile {
        width: 40px;
        height: 40px;
      }
      @include l-mobile {
        width: 24px;
        height: 24px;
      }
    }
    &__point {
      position: absolute;
      border-radius: 50%;
      background-color: #222;
      @include l-more-than-mobile {
        width: 8px;
        height: 8px;
        top: calc(50% - 4px);
        left: calc(50% - 4px);
      }
      @include l-mobile {
        width: 6px;
        height: 6px;
        top: calc(50% - 3px);
        left: calc(50% - 3px);
      }
    }
  }
</style>
