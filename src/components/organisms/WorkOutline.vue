<script>
const romanize = num => {
  if (isNaN(num)) return NaN;

  const digits = String(+num).split('');
  const key = [
    '',
    'C',
    'CC',
    'CCC',
    'CD',
    'D',
    'DC',
    'DCC',
    'DCCC',
    'CM',
    '',
    'X',
    'XX',
    'XXX',
    'XL',
    'L',
    'LX',
    'LXX',
    'LXXX',
    'XC',
    '',
    'I',
    'II',
    'III',
    'IV',
    'V',
    'VI',
    'VII',
    'VIII',
    'IX'
  ];
  let roman = '';
  let i = 3;

  while (i--) {
    roman = (key[+digits.pop() + i * 10] || '') + roman;
  }
  return Array(+digits.join('') + 1).join('M') + roman;
};

export default {
  name: 'WorkOutline',
  props: {
    index: {
      type: Number,
      default: 0
    },
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    credit: {
      type: String,
      default: ''
    },
    href: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      headingHeight: 0,
      isOvered: false
    };
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
      };
    },
    linkWrapStyles() {
      return {
        top: this.$store.state.isMobile === true ? 0 : `${this.headingHeight}px`
      };
    }
  },
  methods: {
    enter() {
      if (this.$store.state.isEnabledTouch === true) return;
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
$baseDelayShow: 1.1s;
$baseDurationShow: 0.8s;
$delayStepShow: 0.07s;

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
    right: 44px;
    left: 44px;
    bottom: 22px;
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
  }
  &__elm {
    // Transition
    transition-property: opacity, transform;
    .show-enter &,
    .show-asc-enter & {
      opacity: 0;
    }
    .show-enter &,
    .view-asc-leave-to &,
    .show-asc-leave-to & {
      transform: translate3d(0, 100px, 30px) rotate3d(1, 0, 0.5, 10deg);
    }
    .show-asc-enter &,
    .view-leave-to &,
    .show-leave-to & {
      transform: translate3d(0, -100px, 30px) rotate3d(1, 0, 0.5, -10deg);
    }
    .show-enter-to &,
    .show-asc-enter-to & {
      opacity: 1;
      transition-duration: $baseDurationShow;
      transition-timing-function: $easeOutQuad;
    }
    .view-leave-to &,
    .view-asc-leave-to &,
    .show-leave-to &,
    .show-asc-leave-to & {
      opacity: 0;
      transition-duration: 0.6s;
      transition-timing-function: $easeInQuad;
    }
  }
  &__number {
    line-height: 1;
    @include fontSizeAll(20, 20, 13);
    text-transform: uppercase;
    @include l-more-than-mobile {
      margin-bottom: 20px;
    }
    @include l-mobile {
      margin-bottom: 10px;
    }

    // Transition
    .show-enter-to & {
      transition-delay: $baseDelayShow + $delayStepShow * 0;
    }
    .show-asc-enter-to & {
      transition-delay: $baseDelayShow + $delayStepShow * 3;
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
    @include fontSizeAll(28, 28, 18);
    letter-spacing: 0.14em;
    @include l-more-than-mobile {
      padding-bottom: 25px;
    }
    @include l-mobile {
      padding-bottom: 15px;
    }

    // Transition
    .show-enter-to & {
      transition-delay: $baseDelayShow + $delayStepShow * 1;
    }
    .show-asc-enter-to & {
      transition-delay: $baseDelayShow + $delayStepShow * 2;
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
      transition-delay: $baseDelayShow + $delayStepShow * 2;
    }
    .show-asc-enter-to & {
      transition-delay: $baseDelayShow + $delayStepShow * 1;
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
    @include fontSizeAll(10, 10, 7);
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
      transition-delay: $baseDelayShow + $delayStepShow * 3;
    }
    .show-asc-enter-to & {
      transition-delay: $baseDelayShow + $delayStepShow * 0;
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
    height: (25 / 12) * 1em;
    @include fontSizeAll(12, 12, 9);
    @include l-more-than-mobile {
      position: absolute;
      width: 50%;
      top: 0;
      right: 0;
    }
    @include l-mobile {
      position: relative;
      margin-top: 15px;
    }
  }
  &__link-line {
    height: 1px;
    position: absolute;
    top: calc(25 / 12 * 0.5em);
    left: 0;
    background-color: rgba($color-text, 0.5);
    @include l-more-than-mobile {
      width: calc(100% - 110px);
    }
    @include l-mobile {
      width: 143px;
    }

    // Transition
    transform-origin: left;
    transition-duration: 0.7s;
    transition-property: width, transform, opacity;
    transition-timing-function: $easeOutCirc;
    .show-enter &,
    .show-asc-enter & {
      opacity: 0;
      transform: scaleX(0);
    }
    .show-enter-to &,
    .show-asc-enter-to & {
      opacity: 1;
      transform: scaleX(1);
      transition-delay: $baseDelayShow + 0.4s;
    }
    .view-leave-to &,
    .view-asc-leave-to &,
    .show-leave-to &,
    .show-asc-leave-to & {
      opacity: 0;
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
    @include l-more-than-mobile {
      right: 0;
    }
    @include l-mobile {
      left: 163px;
    }

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
      transition-delay: $baseDelayShow + 0.5s;
      transition-timing-function: $easeOutQuad;
    }
    .view-leave-to &,
    .view-asc-leave-to &,
    .show-leave-to &,
    .show-asc-leave-to & {
      opacity: 0;
      transition-duration: 0.6s;
      transition-delay: 0s;
    }
  }
}
</style>
