<script>
  export default {
    name: 'About',
    components: {
    },
    created: function() {
      this.$store.commit('enableDarkColor', false);
      this.$store.commit('showGlobalTitle', true);
      this.$store.commit('transit', {
        globalId: 50,
      });
    },
    mounted: function() {
    },
    computed: {},
    methods: {},
  }
</script>

<template lang="pug">
  .p-view-wrap
</template>

<style lang="scss">
  @import '@/assets/scss/foundation/_mixins.scss';
</style>
