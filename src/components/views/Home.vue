<script>
  import sleep from 'js-util/sleep'

  import HomeTitle from '@/components/atoms/HomeTitle.vue'
  import HomeWheel from '@/components/atoms/HomeWheel.vue'

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
      HomeTitle,
      HomeWheel,
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
    HomeTitle
    HomeWheel
</template>

<style lang="scss">
</style>
