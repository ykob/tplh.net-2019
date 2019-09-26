<script>
  import sleep from 'js-util/sleep'

  import HomeTitle from '@/components/atoms/HomeTitle.vue'

  export default {
    name: 'Home',
    components: {
      HomeTitle,
    },
    data: function() {
      return {
        isShown: false,
      }
    },
    created: function() {
      this.$store.commit('enableDarkColor', false);
      this.$store.commit('showGlobalTitle', false);
      this.$store.commit('transit', {
        globalId: 0,
      });
    },
    mounted: async function() {
      await sleep(500);
      this.isShown = true;
    },
    computed: {},
    methods: {},
  }
</script>

<template lang="pug">
  .p-view-wrap(
    :class = '{ "is-shown" : isShown === true }'
    )
    HomeTitle
    .p-home-wheel
      .p-home-wheel__label
        |Show Works
      .p-home-wheel__circle
        .p-home-wheel__point
</template>

<style lang="scss">
  @import '@/assets/scss/foundation/_mixins.scss';

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
