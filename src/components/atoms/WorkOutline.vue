<script>
  import zeroPadding from 'js-util/zeroPadding';

  import Button from '@/components/atoms/Button.vue';
  import SplitStr from '@/components/atoms/SplitStr.vue'

  export default {
    name: 'ContactTitle',
    components: {
      SplitStr,
    },
    props: {
      isShown: {
        type: Boolean,
        default: false,
      },
      index: {
        type: Number,
        default: 0,
      },
      title: {
        type: String,
        default: '',
      },
      description: {
        type: String,
        default: '',
      },
      href: {
        type: String,
        default: '',
      },
    },
    methods: {
      getNumber(i) {
        return zeroPadding(i + 1, 2);
      }
    },
  };
</script>

<template lang="pug">
  .p-work-outline
    .p-work-outline__number
      |Works &#35;{{ getNumber(index) }}
    SplitStr.p-work-outline__title(
      tag = 'h1'
      :label = 'title'
      :step = '4'
      childClassname = 'p-work-outline__title-typo'
      )
    .p-work-outline__description
      |{{ description }}
    Button.p-work-outline__link(
      tag = 'a'
      :href = 'href'
      target = '_blank'
      )
      |Show this.
</template>

<style lang="scss">
  .p-work-outline {
    position: absolute;
    @include l-more-than-mobile {
      top: 42%;
      left: 50px;
    }
    @include l-mobile {
    }

    // Transition
    &.show-enter-active, &.show-leave-active {
      transition-duration: 2s;
      transition-property: opacity;
    }
    &.show-enter, &.show-leave-to {
      opacity: 0.999;
    }
    &.show-leave-to {
      pointer-events: none;
    }

    &__number {
      line-height: 1;
      @include fontSizeAll(21, 21, 14);
      text-transform: uppercase;
      letter-spacing: 0.16em;
      @include l-more-than-mobile {
        margin-bottom: 24px;
      }
      @include l-mobile {
        margin-bottom: 12px;
      }
    }
    &__title {
      line-height: .9;
      margin-top: 0;
      margin-bottom: 0;
      @include fontSizeAll(42, 42, 24);
      letter-spacing: 0.14em;
      @include l-more-than-mobile {
        margin-bottom: 30px;
      }
      @include l-mobile {
        margin-bottom: 20px;
      }
    }
    &__title-typo {
      transition-property: opacity, transform;
      .show-enter & {
        opacity: 0;
        transform: translate3d(0, .4em, 0) rotateY(70deg);
      }
      .show-enter-to & {
        opacity: 1;
        transition-duration: 1s;
        transition-timing-function: $easeOutQuad;
        transform: translate3d(0, 0, 0) rotateY(0);
      }
      .view-leave-to &,
      .show-leave-to & {
        opacity: 0;
        transition-duration: .6s;
        transition-timing-function: $easeInQuad;
        transform: translate3d(0, -.6em, 0) rotateY(-70deg);
      }
    }
    &__description {
      letter-spacing: 0.16em;
      white-space: pre-wrap;
      @include l-more-than-mobile {
        margin-bottom: 20px;
      }
      @include l-mobile {
        margin-bottom: 10px;
      }
    }
  }
</style>
