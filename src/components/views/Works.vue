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
    created() {
    },
    mounted() {
      this.$store.commit('enableDarkColor', true);
      this.$store.commit('showGlobalTitle', true);
      this.$store.commit('showSkull', false);
      this.$store.commit('transit', {
        globalId: 1,
        currentWorksId: _.findIndex(
          this.$store.state.works,
          { key: this.$route.params.key }
        )
      });
    },
    computed: {
    },
  }
</script>

<template lang="pug">
  transition-group.p-view-wrap(
    name = 'show'
    appear
    tag = 'div'
    )
    WorkOutline(
      v-for = 'item, index in $store.state.works'
      v-if = 'item.key === $route.params.key'
      :key = 'index'
      :index = 'index'
      :title = 'item.title'
      :description = 'item.description'
      :href = 'item.href'
      )
</template>

<style lang="scss">
</style>
