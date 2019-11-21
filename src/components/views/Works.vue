<script>
  import _ from 'lodash';

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
    computed: {},
    methods: {},
  }
</script>

<template lang="pug">
  .p-view-wrap
    transition(
      name = 'show'
      )
      .p-works-outline(
        v-for = 'item in $store.state.works'
        v-if = 'item.key === $route.params.key'
        )
        h1.p-view-wrap__title
          |{{ item.title }}
        .p-view-wrap__description
          |{{ item.description }}
        a.p-view-wrap__link(
          :href = 'item.href'
          target = '_blank'
          )
          |Show this.
</template>

<style lang="scss">
  .p-view-wrap {
    &__title {

    }
  }
</style>
