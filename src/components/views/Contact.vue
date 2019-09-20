<script>
  export default {
    name: 'Contact',
    components: {
    },
    created: function() {
      this.$store.commit('enableDarkColor', false);
      this.$store.commit('showGlobalTitle', true);
      this.$store.commit('transit', {
        globalId: 99,
      });
    },
    mounted: function() {
    },
    computed: {},
    methods: {},
  }
</script>

<template lang="pug">
  .p-view-contact
</template>

<style lang="scss">
  @import '@/assets/scss/foundation/_mixins.scss';
</style>
