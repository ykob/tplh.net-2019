<script>
  import zeroPadding from 'js-util/zeroPadding';

  import SplitStr from '@/components/atoms/SplitStr.vue'

  export default {
    name: 'ContactTitle',
    components: {
      SplitStr,
    },
    props: {
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
      credit: {
        type: String,
        default: '',
      },
      href: {
        type: String,
        default: '',
      },
    },
    computed: {
      getNumber() {
        return `#${zeroPadding(this.index + 1, 2)}`;
      }
    },
  };
</script>

<template lang="pug">
  .p-work-outline
    .p-work-outline__number(
      )
      |{{ getNumber }}
    SplitStr.p-work-outline__title(
      tag = 'h1'
      :label = 'title'
      :step = '2'
      childClassname = 'p-work-outline__title-typo'
      )
    .p-work-outline__content-wrap
      .p-work-outline__content
        .p-work-outline__description
          |{{ description }}
        .p-work-outline__credit
          |Credits
          br
          |{{ credit }}
      .p-work-outline__link-wrap
        .p-work-outline__link-line
        a.p-work-outline__link(
          :href = 'href'
          )
          |Launch
</template>

<style lang="scss">
  .p-work-outline {
    position: absolute;
    letter-spacing: 0.15em;
    @include l-more-than-mobile {
      width: 1000 / 1600 * 100%;
      left: 300 / 1600 * 100%;
      bottom: 50px;
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
      @include fontSizeAll(20, 20, 20);
      text-transform: uppercase;
      @include l-more-than-mobile {
        margin-bottom: 24px;
      }
      @include l-mobile {
        margin-bottom: 12px;
      }

      // Transition
      transition-property: opacity;
      .show-enter & {
        opacity: 0;
      }
      .show-enter-to & {
        opacity: 1;
        transition-duration: 1s;
        transition-delay: .7s;
        transition-timing-function: $easeOutQuad;
      }
      .view-leave-to &,
      .show-leave-to & {
        opacity: 0;
        transition-duration: .6s;
        transition-delay: 0s;
      }
    }
    &__title {
      line-height: .9;
      margin-top: 0;
      margin-bottom: 0;
      @include fontSizeAll(28, 28, 28);
      letter-spacing: 0.14em;
      @include l-more-than-mobile {
        width: 50%;
        margin-bottom: 30px;
      }
      @include l-mobile {
        margin-bottom: 20px;
      }
    }
    &__title-typo {
      // Transition
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
        @for $i from 0 through 200 {
          &--#{$i} {
            transition-delay: $i * 0.01 + 0.5s;
          }
        }
      }
      .view-leave-to &,
      .show-leave-to & {
        opacity: 0;
        transition-duration: .6s;
        transition-timing-function: $easeInQuad;
        transform: translate3d(0, -.6em, 0) rotateY(-70deg);
      }
    }
    &__content-wrap {
      @include l-more-than-mobile {
        display: flex;
      }
      @include l-mobile {
      }
    }
    &__content {
      @include l-more-than-mobile {
        width: 50%;
      }
      @include l-mobile {
      }
    }
    &__description {
      line-height: (25 / 12);
      white-space: pre-wrap;
      @include fontSizeAll(12, 12, 12);
      @include l-more-than-mobile {
        margin-bottom: 20px;
      }
      @include l-mobile {
        margin-bottom: 10px;
      }

      // Transition
      transition-property: opacity;
      .show-enter & {
        opacity: 0;
      }
      .show-enter-to & {
        opacity: 1;
        transition-duration: 1s;
        transition-delay: 1s;
        transition-timing-function: $easeOutQuad;
      }
      .view-leave-to &,
      .show-leave-to & {
        opacity: 0;
        transition-duration: .6s;
        transition-delay: 0.1s;
      }
    }
    &__credit {
      line-height: 2;
      white-space: pre-wrap;
      @include fontSizeAll(10, 10, 10);

      // Transition
      transition-property: opacity;
      .show-enter & {
        opacity: 0;
      }
      .show-enter-to & {
        opacity: 1;
        transition-duration: 1s;
        transition-delay: 1.1s;
        transition-timing-function: $easeOutQuad;
      }
      .view-leave-to &,
      .show-leave-to & {
        opacity: 0;
        transition-duration: .6s;
        transition-delay: 0.2s;
      }
    }
    &__link {
      line-height: (20 / 12);
      @include fontSizeAll(12, 12, 12);

      // Transition
      transition-property: opacity;
      .show-enter & {
        opacity: 0;
      }
      .show-enter-to & {
        opacity: 1;
        transition-duration: 1s;
        transition-delay: 1.1s;
        transition-timing-function: $easeOutQuad;
      }
      .view-leave-to &,
      .show-leave-to & {
        opacity: 0;
        transition-duration: .6s;
        transition-delay: 0.2s;
      }
    }
  }
</style>
