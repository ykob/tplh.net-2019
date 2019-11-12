<script>
import sleep from 'js-util/sleep'

export default {
  name: 'Contact',
  components: {
  },
  data() {
    return {
      isShown: false,
    }
  },
  async created() {
    this.$store.commit('enableDarkColor', true);
    this.$store.commit('transit', {
      globalId: 99,
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
</template>

<style lang="scss">
</style>
