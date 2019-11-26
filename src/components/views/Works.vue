<script>
  import _ from 'lodash';
  import sleep from 'js-util/sleep'

  import WorkOutline from '@/components/atoms/WorkOutline.vue';

  export default {
    name: 'Works',
    metaInfo: {
      title: 'Works / ',
      meta: [
        {
          name: 'description',
          content: 'it is works page.'
        }
      ]
    },
    components: {
      WorkOutline
    },
    data() {
      return {
        isShown: false,
      }
    },
    created: function() {
      this.$store.commit('enableDarkColor', true);
      this.$store.commit('showGlobalTitle', true);
      this.$store.commit('transit', {
        globalId: 1,
        currentWorksId: _.findIndex(
          this.$store.state.works,
          { key: this.$route.params.key }
        )
      });
    },
    async mounted() {
      await sleep(500);
      this.isShown = true;
    },
    computed: {
    },
  }
</script>

<template lang="pug">
  .p-view-wrap
    transition-group(
      name = 'show'
      tag = 'div'
      )
      WorkOutline(
        v-for = 'item, index in $store.state.works'
        v-if = 'item.key === $route.params.key && isShown === true'
        :key = 'index'
        :index = 'index'
        :title = 'item.title'
        :description = 'item.description'
        :href = 'item.href'
        )
</template>

<style lang="scss">
</style>
