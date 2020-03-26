<script>
export default {
  name: 'LinkListItem',
  data() {
    return {
      isOvered: false
    };
  },
  computed: {
    classnames() {
      return {
        'is-overed': this.isOvered === true
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
  a.c-link-listitem(
    @mouseenter = 'enter'
    @mouseleave = 'leave'
    )
    span.c-link-listitem__label
      slot
    span.c-link-listitem__line(
      :class = 'classnames'
      )
</template>

<style lang="scss">
.c-link-listitem {
  display: inline-block;
  position: relative;
  &__label {
    margin-left: 14px;
  }
  &__line {
    height: 1px;
    position: absolute;
    top: calc(50% + 2px);
    left: 0;
    background-color: rgba($color-text, 0.5);

    // Transition
    width: 6px;
    transform-origin: left;
    transition-duration: 0.7s;
    transition-timing-function: $easeOutCirc;
    transition-property: width;
    &.is-overed {
      width: calc(100% + 6px);
    }
  }
}
</style>
