<script>
export default {
  name: 'Link',
  props: {
    vertical: {
      type: Boolean,
      default: false
    },
    isCurrent: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isOvered: false
    };
  },
  computed: {
    classnames() {
      return {
        'is-horizontal': this.vertical === false,
        'is-vertical': this.vertical === true
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
    }
  }
};
</script>

<template lang="pug">
  a.c-link(
    @mouseenter = 'enter'
    @mouseleave = 'leave'
    )
    span.c-link__label(
      :class = 'classnames'
      )
      slot
    transition(
      name = 'show'
      )
      span.c-link__line(
        v-if = 'isOvered === true || isCurrent === true'
        :class = 'classnames'
        )
</template>

<style lang="scss">
.c-link {
  display: inline-block;
  position: relative;
  &__label {
    &.is-vertical {
      writing-mode: vertical-rl;
    }
  }
  &__line {
    position: absolute;
    background-color: rgba($color-text, 0.5);
    &.is-horizontal {
      height: 1px;
      top: calc(50% + 2px);
      right: -10px;
      left: -10px;
    }
    &.is-vertical {
      width: 1px;
      top: -10px;
      bottom: -10px;
      left: calc(50% - 2px);
    }

    // Transition
    transition-property: transform;
    &.show-enter {
      &.is-horizontal {
        transform: scaleX(0);
      }
      &.is-vertical {
        transform: scaleY(0);
      }
    }
    &.show-enter-to {
      transition-duration: 0.7s;
      transition-timing-function: $easeOutCirc;
      &.is-horizontal {
        transform: scaleX(1);
        transform-origin: left;
      }
      &.is-vertical {
        transform: scaleY(1);
        transform-origin: top;
      }
    }
    &.view-leave-to,
    &.show-leave-to {
      transition-duration: 0.7s;
      transition-timing-function: $easeOutCirc;
      &.is-horizontal {
        transform: scaleX(0);
        transform-origin: right;
      }
      &.is-vertical {
        transform: scaleY(0);
        transform-origin: bottom;
      }
    }
  }
}
</style>
