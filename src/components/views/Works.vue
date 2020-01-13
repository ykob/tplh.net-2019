<script>
  import _ from 'lodash';
  import sleep from 'js-util/sleep'

  import WorkOutline from '@/components/organisms/WorkOutline.vue';

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
    async mounted() {
      const index = _.findIndex(
        this.$store.state.works,
        { key: this.$route.params.key }
      );

      this.$store.commit('changeBackground', true);
      this.$store.commit('showSkull', false);
      this.$store.commit('showWorksImage', index + 1);
      this.$store.commit('setPositionFromWorks', 0);
      this.$store.commit('transit', {
        globalId: 1,
        currentWorksId: index
      });
      this.$store.commit('transitInWorks', false);
      await sleep(500);
      this.$store.commit('showUI');
    },
    computed: {
    },
    watch: {
      '$route.params.key': function(key) {
        const index = _.findIndex(
          this.$store.state.works,
          { key: key }
        );
        this.$store.commit('showWorksImage', index + 1);
        this.$store.commit('transitInWorks', true);
        this.$store.commit('transit', {
          globalId: 1,
          currentWorksId: index
        });
      }
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
      :credit = 'item.credit'
      :href = 'item.href'
      )
</template>

<style lang="scss">
</style>
