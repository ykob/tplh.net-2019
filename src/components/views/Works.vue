<script>
  import _ from 'lodash';
  import normalizeWheel from 'normalize-wheel';
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
    created () {
      window.addEventListener('wheel', this.wheel, { passive: false });
    },
    async mounted() {
      const index = _.findIndex(
        this.$store.state.works,
        { key: this.$route.params.key }
      );

      this.$store.commit('changeBackground', true);
      this.$store.commit('showSkull', false);
      this.$store.commit('showWorksImage', {
        index: index + 1,
        direction: 0
      });
      this.$store.commit('transit', {
        globalId: 1,
        currentWorksId: index
      });
      this.$store.commit('transitInWorks', false);
      await sleep(500);
      this.$store.commit('showUI');
    },
    watch: {
      '$route.params.key': function(key) {
        const index = _.findIndex(
          this.$store.state.works,
          { key: key }
        );
        this.$store.commit('showWorksImage', {
          index: index + 1,
          direction: 0
        });
        this.$store.commit('transitInWorks', true);
        this.$store.commit('transit', {
          globalId: 1,
          currentWorksId: index
        });
      }
    },
    destroyed () {
      window.removeEventListener('wheel', this.wheel, { passive: false });
    },
    methods: {
      wheel(e) {
        e.preventDefault();

        const n = normalizeWheel(e);
        const { works, isWheeling } = this.$store.state;

        // Run at the first wheel event only.
        if (isWheeling === false) {
          if (Math.abs(n.pixelY) < 10) return;
          this.$store.commit('startWheeling');

          if (n.pixelY > 0) {
            if (this.$store.state.currentWorksId < works.length - 1) {
              this.$store.commit('transitNextWorks');
              this.$router.push(`/works/${works[this.$store.state.currentWorksId].key}/`);
            } else {
              this.$router.push(`/who-i-am/`);
            }
          } else {
            if (this.$store.state.currentWorksId > 0) {
              this.$store.commit('transitPrevWorks');
              this.$router.push(`/works/${works[this.$store.state.currentWorksId].key}/`);
            } else {
              this.$router.push(`/`);
            }
          }
        }
      }
    }
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
