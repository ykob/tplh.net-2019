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
    :class = '{ "is-enabled-dark-color": this.$store.state.darkColor === true }'
    )
</template>

<style lang="scss">
  .p-background {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-image: linear-gradient(0deg, rgba(220,190,190,1) 0%, rgba(251,251,251,1) 100%);
    &.is-enabled-dark-color {
      background-image: linear-gradient(0deg, rgba(190,174,174,1) 0%, rgba(103,75,75,1) 100%);
    }
  }
</style>
