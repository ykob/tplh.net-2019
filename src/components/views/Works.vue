<script>
  import _ from 'lodash';
  import normalizeWheel from 'normalize-wheel';
  import sleep from 'js-util/sleep'

  import store from '@/store'
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
    beforeRouteEnter(to, from, next) {
      const index = _.findIndex(
        store.state.works,
        { key: to.params.key }
      );

      store.commit('transit', {
        globalId: 1,
        currentWorksId: index
      });

      next();
    },
    created () {
      window.addEventListener('wheel', this.wheel, { passive: false });
      window.addEventListener('touchmove', this.touchmove);
    },
    async mounted() {
      const index = _.findIndex(
        this.$store.state.works,
        { key: this.$route.params.key }
      );

      this.$store.commit('changeBackground', {
        isHome: false,
        hasDelay: false
      });
      this.$store.commit('showHomeObjs', false);
      this.$store.commit('showWorksObjs', {
        index: index + 1,
        direction: 0
      });
      this.$store.commit('showWhoIAmObjs', false);

      await sleep(500);
      this.$store.commit('showUI');
    },
    destroyed () {
      window.removeEventListener('wheel', this.wheel, { passive: false });
      window.removeEventListener('touchmove', this.touchmove);
    },
    watch: {
      '$route.params.key': function(key) {
        const index = _.findIndex(
          this.$store.state.works,
          { key: key }
        );
        this.$store.commit('showWorksObjs', {
          index: index + 1,
          direction: 0
        });
        this.$store.commit('transit', {
          globalId: 1,
          currentWorksId: index
        });
      }
    },
    computed: {
      transitionName() {
        return (this.$store.state.isTransitionDescend === true) ? 'show' : 'show-asc';
      }
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
            // go to the next page.
            if (this.$store.state.currentWorksId < works.length - 1) {
              const i = this.$store.state.currentWorksId + 1;
              this.$router.push(`/works/${works[i].key}/`);
            } else {
              this.$router.push(`/who-i-am/`);
            }
          } else {
            // go to the previous page.
            if (this.$store.state.currentWorksId > 0) {
              const i = this.$store.state.currentWorksId - 1;
              this.$router.push(`/works/${works[i].key}/`);
            } else {
              this.$router.push(`/`);
            }
          }
        }
      },
      touchmove() {
        const { works, touchMove, isSwipingY } = this.$store.state
        if (isSwipingY === true) {
          if (touchMove.y < -10) {
            // go to the next page.
            if (this.$store.state.currentWorksId < works.length - 1) {
              const i = this.$store.state.currentWorksId + 1;
              this.$router.push(`/works/${works[i].key}/`);
            } else {
              this.$router.push(`/who-i-am/`);
            }
            this.$store.commit('touchEnd');
          } else if (touchMove.y > 10) {
            // go to the previous page.
            if (this.$store.state.currentWorksId > 0) {
              const i = this.$store.state.currentWorksId - 1;
              this.$router.push(`/works/${works[i].key}/`);
            } else {
              this.$router.push(`/`);
            }
            this.$store.commit('touchEnd');
          }
        }
      }
    }
  }
</script>

<template lang="pug">
  transition-group.p-view-wrap(
    :name = 'transitionName'
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
