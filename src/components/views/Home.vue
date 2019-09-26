<script>
  import sleep from 'js-util/sleep'

  import HomeTitle from '@/components/atoms/HomeTitle.vue'
  import HomeWheel from '@/components/atoms/HomeWheel.vue'

  export default {
    name: 'Home',
    components: {
      HomeTitle,
      HomeWheel,
    },
    data: function() {
      return {
        isShown: false,
      }
    },
    created: function() {
      this.$store.commit('enableDarkColor', false);
      this.$store.commit('showGlobalTitle', false);
      this.$store.commit('transit', {
        globalId: 0,
      });
    },
    mounted: async function() {
      await sleep(500);
      this.isShown = true;
    },
    computed: {},
    methods: {},
  }
</script>

<template lang="pug">
  .p-view-wrap
    HomeTitle(
      :isShown = 'isShown'
      )
    HomeWheel(
      :isShown = 'isShown'
      )
</template>

<style lang="scss">
</style>
