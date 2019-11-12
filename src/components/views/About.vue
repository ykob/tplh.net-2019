<script>
import sleep from 'js-util/sleep'
import AboutTitle from '@/components/atoms/AboutTitle.vue'
import AboutDescription from '@/components/atoms/AboutDescription.vue'

export default {
  name: 'About',
  components: {
    AboutTitle,
    AboutDescription,
  },
  data() {
    return {
      isShown: false,
    }
  },
  async created() {
    this.$store.commit('enableDarkColor', false);
    this.$store.commit('transit', {
      globalId: 50,
    });
    await sleep(500);
    this.$store.commit('showGlobalTitle', true);
  },
  async mounted() {
    await sleep(500);
    this.isShown = true;
  },
  computed: {},
  methods: {},
}
</script>

<template lang="pug">
.p-view-wrap
  AboutTitle(
    :isShown = 'isShown'
    )
  AboutDescription(
    :isShown = 'isShown'
    )
</template>

<style lang="scss">
</style>
