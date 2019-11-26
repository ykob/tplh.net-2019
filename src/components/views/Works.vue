<script>
  import _ from 'lodash';
  
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
    mounted: function() {
    },
    computed: {
    },
    methods: {
      getNumber(i) {
        return zeroPadding(i + 1, 2);
      }
    },
  }
</script>

<template lang="pug">
  .p-view-wrap
    transition(
      name = 'show'
      )
      WorkOutline(
        v-for = 'item, index in $store.state.works'
        v-if = 'item.key === $route.params.key'
        :index = 'index'
        :title = 'item.title'
        :description = 'item.description'
        :href = 'item.href'
        )
</template>

<style lang="scss">
</style>
