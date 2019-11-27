<script>
  export default {
    name: 'ContactDescription',
    components: {
    },
    props: {
    },
  };
</script>

<template lang="pug">
.p-contact-description
  p
    |If you have any requests or questions for me,
    br
    |Please send a message use with this form.
</template>

<style lang="scss">
.p-contact-description {
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
