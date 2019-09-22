<script>
  export default {
    name: 'Works',
    components: {
    },
    created: function() {
      this.$store.commit('enableDarkColor', true);
      this.$store.commit('showGlobalTitle', true);
      this.$store.commit('transit', {
        globalId: 1,
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
