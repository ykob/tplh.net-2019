<script>
  export default {
    name: 'ContactDescription',
    components: {
    },
    props: {
      isShown: {
        type: Boolean,
        default: false,
      },
    },
  };
</script>

<template lang="pug">
.p-contact-form(
  :class = '{ "is-shown" : isShown === true }'
  )
  div
    |Name:
  div
    |Email:
  div
    |Content:
</template>

<style lang="scss">
.p-contact-form {
  // Transition
  opacity: 0;
  transition-property: opacity;
  &.is-shown {
    opacity: 1;
    transition-duration: 1s;
    transition-delay: .4s;
  }
  .view-leave-to & {
    opacity: 0;
    transition-duration: .6s;
    transition-delay: 0s;
  }
}
</style>
