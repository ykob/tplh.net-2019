<script>
import sleep from 'js-util/sleep'
import AboutTitle from '@/components/atoms/AboutTitle.vue'
import AboutDescription from '@/components/atoms/AboutDescription.vue'

export default {
  name: 'About',
  metaInfo: {
    title: 'About / ',
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
  data() {
    return {
    }
  },
  created() {
  },
  mounted() {
    this.$store.commit('enableDarkColor', false);
    this.$store.commit('showGlobalTitle', true);
    this.$store.commit('showSkull', false);
    this.$store.commit('showWorksImage', 0);
    this.$store.commit('showPortlate', true);
    this.$store.commit('transit', {
      globalId: 50,
    });
  },
  computed: {},
  methods: {},
}
</script>

<template lang="pug">
.p-view-wrap
  AboutTitle
  AboutDescription
</template>

<style lang="scss">
</style>
