<script>
  import sleep from 'js-util/sleep'

  import SplitStr from '@/components/organics/SplitStr.vue'

  export default {
    name: 'Home',
    components: {
      SplitStr,
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
    .p-home-title
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
        transition-duration: .5s;
        transition-property: opacity, transform;
        backface-visibility: hidden;
      }
      &__name-typo {
        transform: translate3d(0, 0, 0) rotateY(0);
      }
      &__summary-typo {
        transform: translate3d(0, 0, 0);
      }
    }
    .view-leave-to & {
      &__name-typo {
        opacity: 0;
        transform: translate3d(0, -.6em, 0) rotateY(70deg);
      }
      &__summary-typo {
        opacity: 0;
        transform: translate3d(0, -.6em, 0);
      }
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
