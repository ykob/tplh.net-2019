<script>
  import sleep from 'js-util/sleep'

  export default {
    name: 'Home',
    metaInfo: {
      meta: [
        {
          name: 'description',
          content: 'I am a Front-End & Creative Developer in Japan.'
        }
      ]
    },
    components: {
    },
    data: function() {
      return {
      }
    },
    created() {
    },
    mounted() {
      this.$store.commit('enableDarkColor', false);
      this.$store.commit('showGlobalTitle', false);
      this.$store.commit('showSkull', true);
      this.$store.commit('showWorksImage', 0);
      this.$store.commit('transit', {
        globalId: 0,
      });
    },
    computed: {},
    methods: {},
  }
</script>

<template lang="pug">
  .p-view-wrap
</template>

<style lang="scss">
</style>
