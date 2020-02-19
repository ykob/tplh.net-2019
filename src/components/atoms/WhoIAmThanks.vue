<script>
export default {
  name: 'WhoIAmThanks',
}
</script>

<template lang="pug">
.p-whoiam-credit
  .p-whoiam-credit__line
  h2.p-whoiam-credit__heading
    |Credits
  p.p-whoiam-credit__text
    |3D MODELS : CGTrader
    br
    |Design : Shunsuke Iseki
    br
    |Development : Yoichi Kobayashi
</template>

<style lang="scss">
.p-whoiam-credit {
  position: relative;
  @include l-more-than-mobile {
    padding-left: 500 / 1360 * 100%;
  }
  @include l-mobile {
  }
  &__line {
    @include l-more-than-mobile {
      width: calc(360 / 1360 * 100% - 20px);
      height: 1px;
      position: absolute;
      top: 1em;
      left: 0;
      background-color: rgba(#dfc7a4, 0.3);
    }
    @include l-mobile {
    }
  }
  &__heading {
    width: 140 / 1000 * 100%;
    position: absolute;
    top: 0;
    left: 360 / 1360 * 100%;
    margin: 0;
    font-weight: 400;
    @include fontSizeAll(12, 12, 12);
  }
  &__text {
  }

  // Transition
  transition-property: opacity;
  .view-enter &,
  .view-asc-enter & {
    opacity: 0;
  }
  .view-enter-to &,
  .view-asc-enter-to & {
    opacity: 1;
    transition-duration: 1s;
    transition-delay: 1.2s;
    transition-timing-function: $easeOutQuad;
  }
  .view-leave-to &,
  .view-asc-leave-to & {
    opacity: 0;
    transition-duration: .6s;
    transition-delay: 0s;
  }
}
</style>
