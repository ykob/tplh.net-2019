<script>
import sleep from 'js-util/sleep'
import AboutTitle from '@/components/atoms/AboutTitle.vue'
import AboutDescription from '@/components/atoms/AboutDescription.vue'

export default {
  name: 'WhoIAm',
  metaInfo: {
    title: 'Who I am / ',
    meta: [
      {
        name: 'description',
        content: 'it is about page.'
      }
    ]
  },
  components: {
    AboutTitle,
    AboutDescription,
  },
  async mounted() {
    this.$store.commit('changeBackground', true);
    this.$store.commit('showSkull', false);
    this.$store.commit('showWorksImage', 0);
    this.$store.commit('setPositionFromWorks', 1);
    this.$store.commit('transit', {
      globalId: 50,
    });
    this.$store.commit('transitInWorks', false);
    await sleep(500);
    this.$store.commit('showUI');
  }
}
</script>

<template lang="pug">
.p-view-wrap
  AboutTitle
  AboutDescription
</template>

<style lang="scss">
</style>
