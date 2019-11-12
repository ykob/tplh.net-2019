<script>
  export default {
    name: '',
    components: {},
    props: {},
    data: function() {
      return {}
    },
    methods: {},
  };
</script>

<template lang="pug">
  .p-background(
    :class = '{ "is-enabled-dark-color": this.$store.state.isEnabledDarkColor === true }'
    )
</template>

<style lang="scss">
  .p-background {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(220,190,190,1);
    transition-duration: 1s;
    &.is-enabled-dark-color {
      background-color: rgba(190,174,174,1);
    }
  }
</style>
