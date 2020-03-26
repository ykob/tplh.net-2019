<script>
export default {
  name: 'Guide'
};
</script>

<template lang="pug">
  .p-guide
    .p-guide__line.p-guide__line--horizontal.p-guide__line--horizontal-center
    .p-guide__line.p-guide__line--horizontal.p-guide__line--top
    .p-guide__line.p-guide__line--horizontal.p-guide__line--bottom
    .p-guide__line.p-guide__line--vertical.p-guide__line--vertical-center
    .p-guide__line.p-guide__line--vertical.p-guide__line--right
    .p-guide__line.p-guide__line--vertical.p-guide__line--right-half
    .p-guide__line.p-guide__line--vertical.p-guide__line--left
    .p-guide__line.p-guide__line--vertical.p-guide__line--left-half
</template>

<style lang="scss">
.p-guide {
  pointer-events: none;
  &__line {
    position: absolute;
    z-index: 10000;
    background-color: rgba(#f00, 0.5);
    &--horizontal {
      width: 100%;
      height: 1px;
      left: 0;
    }
    &--horizontal-center {
      top: 50%;
    }
    &--top {
      top: 50px;
    }
    &--bottom {
      bottom: 50px;
    }
    &--vertical {
      width: 1px;
      height: 100%;
      top: 0;
    }
    &--vertical-center {
      left: 50%;
    }
    &--right {
      right: 7.5%;
    }
    &--right-half {
      right: 3.75%;
    }
    &--left {
      left: 7.5%;
    }
    &--left-half {
      left: 3.75%;
    }
  }
}
</style>
