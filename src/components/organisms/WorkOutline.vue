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
        headingHeight: 0,
        isOvered: false
      }
    },
    mounted() {
      this.resize();
      window.addEventListener('resize', this.resize);
    },
    destroyed() {
      window.removeEventListener('resize', this.resize);
    },
    computed: {
      getNumber() {
        return `#${romanize(this.index + 1)}`;
      },
      linkLineClassnames() {
        return {
          'is-overed': this.isOvered === true
        }
      },
      linkWrapStyles() {
        return {
          top: `${this.headingHeight}px`
        }
      }
    },
    methods: {
      enter() {
        this.isOvered = true;
      },
      leave() {
        this.isOvered = false;
      },
      resize() {
        this.headingHeight = this.$refs['work-outline-heading'].clientHeight;
      }
    }
  };
</script>

<template lang="pug">
  .p-work-outline
    .p-work-outline__content
      .p-work-outline__heading(
        ref = 'work-outline-heading'
        )
        .p-work-outline__number.p-work-outline__elm
          |{{ getNumber }}
        h1.p-work-outline__title.p-work-outline__elm
          |{{ title }}
      .p-work-outline__description.p-work-outline__elm
        |{{ description }}
      .p-work-outline__credit.p-work-outline__elm
        |Credits
        br
        |{{ credit }}
    .p-work-outline__link-wrap(
      :style = 'linkWrapStyles'
      )
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
    &.show-enter-active,
    &.show-leave-active,
    &.show-asc-enter-active,
    &.show-asc-leave-active {
      transition-duration: 2s;
      transition-property: opacity;
    }
    &.show-enter,
    &.show-leave-to,
    &.show-asc-enter,
    &.show-asc-leave-to {
      opacity: 0.999;
    }
    &.show-leave-to,
    &.show-asc-leave-to {
      pointer-events: none;
    }

    &__content {
      box-sizing: border-box;
      @include l-more-than-mobile {
        width: 50%;
        padding-right: 20px;
      }
      @include l-mobile {
      }

      // Transition
      transition-property: transform;
      transform-origin: center left;
      .show-enter & {
        transform: translate3d(0, 100px, 30px) rotate3d(1, 0, 0.5, 10deg);
      }
      .show-asc-enter & {
        transform: translate3d(0, -100px, 30px) rotate3d(1, 0, 0.5, -10deg);
      }
      .show-enter-to &,
      .show-asc-enter-to & {
        transition-duration: 1.3s;
        transition-delay: 0.8s;
        transition-timing-function: $easeOutQuad;
      }
      .view-leave-to &,
      .view-asc-leave-to &,
      .show-leave-to &,
      .show-asc-leave-to & {
        transform-origin: top;
        transition-duration: .72s;
        transition-timing-function: $easeInQuad;
      }
      .view-leave-to &,
      .show-leave-to & {
        transform: translate3d(0, -100px, 30px) rotate3d(1, 0, 0.5, -10deg);
      }
      .view-asc-leave-to &,
      .show-asc-leave-to & {
        transform: translate3d(0, 100px, 30px) rotate3d(1, 0, 0.5, 10deg);
      }
    }
    &__elm {
      // Transition
      transition-property: opacity, transform;
      .show-enter &,
      .show-asc-enter & {
        opacity: 0;
      }
      .show-enter & {
        transform: translate3d(0, 100px, 0);
      }
      .show-asc-enter & {
        transform: translate3d(0, -100px, 0);
      }
      .show-enter-to &,
      .show-asc-enter-to & {
        opacity: 1;
        transition-duration: 1s;
        transition-timing-function: $easeOutQuad;
      }
      .view-leave-to &,
      .view-asc-leave-to &,
      .show-leave-to &,
      .show-asc-leave-to & {
        opacity: 0;
        transition-duration: .6s;
        transition-timing-function: $easeInQuad;
      }
      .view-leave-to &,
      .show-leave-to & {
        transform: translate3d(0, -100px, 0);
      }
      .view-asc-leave-to &,
      .show-asc-leave-to & {
        transform: translate3d(0, 100px, 0);
      }
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
      .show-enter-to & {
        transition-delay: .8s;
      }
      .show-asc-enter-to & {
        transition-delay: 1.1s;
      }
      .view-leave-to &,
      .show-leave-to & {
        transition-delay: 0s;
      }
      .view-asc-leave-to &,
      .show-asc-leave-to & {
        transition-delay: 0.12s;
      }
    }
    &__title {
      line-height: 1.2;
      margin-top: 0;
      margin-bottom: 0;
      @include fontSizeAll(28, 28, 28);
      letter-spacing: 0.14em;
      @include l-more-than-mobile {
        padding-bottom: 25px;
      }
      @include l-mobile {
        padding-bottom: 15px;
      }

      // Transition
      .show-enter-to & {
        transition-delay: 0.9s;
      }
      .show-asc-enter-to & {
        transition-delay: 1s;
      }
      .view-leave-to &,
      .show-leave-to & {
        transition-delay: 0.04s;
      }
      .view-asc-leave-to &,
      .show-asc-leave-to & {
        transition-delay: 0.08s;
      }
    }
    &__description {
      white-space: pre-wrap;

      // Transition
      .show-enter-to & {
        transition-delay: 1s;
      }
      .show-asc-enter-to & {
        transition-delay: 0.9s;
      }
      .view-leave-to &,
      .show-leave-to & {
        transition-delay: 0.08s;
      }
      .view-asc-leave-to &,
      .show-asc-leave-to & {
        transition-delay: 0.04s;
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
      .show-enter-to & {
        transition-delay: 1.1s;
      }
      .show-asc-enter-to & {
        transition-delay: .8s;
      }
      .view-leave-to &,
      .show-leave-to & {
        transition-delay: 0.12s;
      }
      .view-asc-leave-to &,
      .show-asc-leave-to & {
        transition-delay: 0s;
      }
    }
    &__link-wrap {
      position: absolute;
      backface-visibility: hidden;
      @include l-more-than-mobile {
        width: 50%;
        top: 0;
        right: 0;
      }
      @include l-mobile {
      }
    }
    &__link-line {
      width: calc(100% - 110px);
      height: 1px;
      position: absolute;
      top: calc(25 / 12 * 0.5em);
      left: 0;
      background-color: rgba($color-text, 0.5);

      // Transition
      transform-origin: left;
      transition-duration: .7s;
      transition-property: width, transform, opacity;
      transition-timing-function: $easeOutCirc;
      .show-enter &,
      .show-asc-enter & {
        transform: scaleX(0);
      }
      .show-enter-to &,
      .show-asc-enter-to & {
        transform: scaleX(1);
        transition-delay: 1.6s;
      }
      .view-leave-to &,
      .view-asc-leave-to &,
      .show-leave-to &,
      .show-asc-leave-to & {
        transform: scaleX(0);
        transform-origin: right;
        transition-delay: 0s;
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
      .show-enter &,
      .show-asc-enter & {
        opacity: 0;
      }
      .show-enter-to &,
      .show-asc-enter-to & {
        opacity: 1;
        transition-duration: 1s;
        transition-delay: 1.8s;
        transition-timing-function: $easeOutQuad;
      }
      .view-leave-to &,
      .view-asc-leave-to &,
      .show-leave-to &,
      .show-asc-leave-to & {
        opacity: 0;
        transition-duration: .6s;
        transition-delay: 0s;
      }
    }
  }
</style>
