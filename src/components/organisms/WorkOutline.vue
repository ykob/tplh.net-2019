<script>
  const romanize = (num) => {
    if (isNaN(num)) return NaN;

    const digits = String(+num).split('');
    const key = [
      '', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM',
      '', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC',
      '', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'
    ];
    let roman = '';
    let i = 3;

    while (i--) {
      roman = (key[+digits.pop() + (i * 10)] || '') + roman;
    }
    return Array(+digits.join('') + 1).join('M') + roman;
  }

  export default {
    name: 'ContactTitle',
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
    data() {
      return {
        isOvered: false
      }
    },
    computed: {
      getNumber() {
        return `#${romanize(this.index + 1)}`;
      },
      linkLineClassnames() {
        return {
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
  .p-work-outline
    .p-work-outline__number(
      )
      |{{ getNumber }}
    h1.p-work-outline__title
      |{{ title }}
    .p-work-outline__content-wrap
      .p-work-outline__content
        .p-work-outline__description
          |{{ description }}
        .p-work-outline__credit
          |Credits
          br
          |{{ credit }}
      .p-work-outline__link-wrap
        .p-work-outline__link-line(
          :class = 'linkLineClassnames'
          )
        a.p-work-outline__link(
          :href = 'href'
          target = '_blank'
          @mouseenter = 'enter'
          @mouseleave = 'leave'
          )
          |Launch
</template>

<style lang="scss">
  .p-work-outline {
    perspective: 500px;
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
        margin-bottom: 20px;
      }
      @include l-mobile {
        margin-bottom: 10px;
      }

      // Transition
      transition-property: opacity, transform;
      transform-origin: left bottom;
      .show-enter & {
        opacity: 0;
        transform: translate3d(0, 60px, 30px) rotate3d(1, 0, 0.25, 20deg);
      }
      .show-enter-to & {
        opacity: 1;
        transition-duration: 1s;
        transition-delay: .8s;
        transition-timing-function: $easeOutQuad;
      }
      .view-leave-to &,
      .show-leave-to & {
        opacity: 0;
        transform: translate3d(0, -60px, 30px) rotate3d(1, 0, 0.25, -20deg);
        transition-duration: .6s;
        transition-delay: 0s;
        transition-timing-function: $easeInQuad;
      }
    }
    &__title {
      line-height: 1.2;
      margin-top: 0;
      margin-bottom: 0;
      @include fontSizeAll(28, 28, 28);
      letter-spacing: 0.14em;
      @include l-more-than-mobile {
        width: 50%;
        margin-bottom: 25px;
      }
      @include l-mobile {
        margin-bottom: 15px;
      }

      // Transition
      transition-property: opacity, transform;
      transform-origin: left center;
      .show-enter & {
        opacity: 0;
        transform: translate3d(0, 60px, 30px) rotate3d(1, 0, 0.25, 20deg);
      }
      .show-enter-to & {
        opacity: 1;
        transition-duration: 1s;
        transition-delay: .9s;
        transition-timing-function: $easeOutCubic;
      }
      .view-leave-to &,
      .show-leave-to & {
        opacity: 0;
        transform: translate3d(0, -60px, 30px) rotate3d(1, 0, 0.25, -20deg);
        transition-duration: .6s;
        transition-delay: 0.04s;
        transition-timing-function: $easeInQuad;
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
      box-sizing: border-box;
      @include l-more-than-mobile {
        width: 50%;
        padding-right: 20px;
      }
      @include l-mobile {
      }
    }
    &__description {
      white-space: pre-wrap;

      // Transition
      transition-property: opacity, transform;
      transform-origin: bottom;
      .show-enter & {
        opacity: 0;
        transform: translate3d(0, 60px, 30px) rotate3d(1, 0, 0.25, 20deg);
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
        transform: translate3d(0, -60px, 30px) rotate3d(1, 0, 0.25, -20deg);
        transform-origin: top;
        transition-duration: .6s;
        transition-delay: 0.08s;
        transition-timing-function: $easeInQuad;
      }
    }
    &__credit {
      line-height: 2;
      white-space: pre-wrap;
      @include fontSizeAll(10, 10, 10);
      &:before {
        width: 5px;
        height: 1px;
        content: '';
        display: block;
        margin-top: 15px;
        margin-bottom: 15px;
        background-color: $color-text;
      }

      // Transition
      transition-property: opacity, transform;
      transform-origin: bottom;
      .show-enter & {
        opacity: 0;
        transform: translate3d(0, 60px, 30px) rotate3d(1, 0, 0.25, 20deg);
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
        transform: translate3d(0, -60px, 30px) rotate3d(1, 0, 0.25, -20deg);
        transform-origin: top;
        transition-duration: .6s;
        transition-delay: 0.12s;
        transition-timing-function: $easeInQuad;
      }
    }
    &__link-wrap {
      position: relative;
      @include l-more-than-mobile {
        width: 50%;
      }
      @include l-mobile {
      }
    }
    &__link-line {
      width: calc(100% - 110px);
      height: 1px;
      position: absolute;
      top: calc(25 / 12 * 0.5em - 2px);
      left: 0;
      background-color: rgba($color-text, 0.5);

      // Transition
      transition-duration: .7s;
      transition-property: width, transform, opacity;
      transition-timing-function: $easeOutCirc;
      .show-enter & {
        transform: scaleX(0);
        transform-origin: left;
      }
      .show-enter-to & {
        transform: scaleX(1);
        transform-origin: left;
        transition-delay: 1.1s;
      }
      .view-leave-to &,
      .show-leave-to & {
        transform: scaleX(0);
        transform-origin: right;
        transition-delay: 0.2s;
      }
      &.is-overed {
        width: calc(100% + 10px);
      }
    }
    &__link {
      line-height: (25 / 12);
      position: absolute;
      top: 0;
      right: 0;
      @include fontSizeAll(12, 12, 12);

      // Transition
      transition-property: opacity;
      .show-enter & {
        opacity: 0;
      }
      .show-enter-to & {
        opacity: 1;
        transition-duration: 1s;
        transition-delay: 1.3s;
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
