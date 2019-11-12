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
.p-contact-description(
  :class = '{ "is-shown" : isShown === true }'
  )
  p
    |If you have any requests or questions for me,
    br
    |Please send a message use with this form.
</template>

<style lang="scss">
.p-contact-description {
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
