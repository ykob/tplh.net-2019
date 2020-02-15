<script>
export default {
  name: 'WhoIAmHeading',
}
</script>

<template lang="pug">
  h1.p-whoiam-heading
    |Yoichi
    br
    |Kobayashi
</template>

<style lang="scss">
.p-whoiam-heading {
  overflow: hidden;

  // Transition
  transition-property: opacity;
  .view-enter & {
    opacity: 0;
  }
  .view-enter-to & {
    opacity: 1;
    transition-duration: 1s;
    transition-delay: 1.2s;
    transition-timing-function: $easeOutQuad;
  }
  .view-leave-to & {
    opacity: 0;
    transition-duration: .6s;
    transition-delay: 0s;
  }
}
</style>
