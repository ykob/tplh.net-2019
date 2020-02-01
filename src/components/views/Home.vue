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
    async mounted() {
      this.$store.commit('changeBackground', false);
      this.$store.commit('showSkull', true);
      this.$store.commit('showWorksImage', {
        index: 0,
        direction: -1
      });
      this.$store.commit('transit', {
        globalId: 0,
      });
      this.$store.commit('transitInWorks', false);
      await sleep(5000);
      this.$store.commit('showUI');
    }
  }
</script>

<template lang="pug">
  .p-view-wrap
</template>

<style lang="scss">
</style>
