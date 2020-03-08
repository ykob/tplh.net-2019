<script>
  import findIndex from 'lodash/findIndex';
  import normalizeWheel from 'normalize-wheel';
  import sleep from 'js-util/sleep'

  import store from '@/store'
  import WorkOutline from '@/components/organisms/WorkOutline.vue';

  export default {
    name: 'Works',
    metaInfo: {
      title: 'Works / '
    },
    components: {
      WorkOutline
    },
    beforeRouteEnter(to, from, next) {
      const index = findIndex(
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
      const index = findIndex(
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
        const index = findIndex(
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
        const { state, commit } = this.$store

        // Run at the first wheel event only.
        if (state.isWheeling === false) {
          if (Math.abs(n.pixelY) < 10) return;
          commit('startWheeling');

          if (n.pixelY > 0) {
            // go to the next page.
            if (state.currentWorksId < state.works.length - 1) {
              const i = state.currentWorksId + 1;
              this.$router.push(`/works/${state.works[i].key}/`);
            } else {
              this.$router.push(`/who-i-am/`);
            }
          } else {
            // go to the previous page.
            if (state.currentWorksId > 0) {
              const i = state.currentWorksId - 1;
              this.$router.push(`/works/${state.works[i].key}/`);
            } else {
              this.$router.push(`/`);
            }
          }
        }
      },
      touchmove() {
        const { state, commit, dispatch } = this.$store;

        if (state.isTouchMoving === true) {
          if (state.touchMove.y < -10) {
            // go to the next page.
            if (state.currentWorksId < state.works.length - 1) {
              const i = state.currentWorksId + 1;
              dispatch('debounceRouterPush', `/works/${state.works[i].key}/`)
            } else {
              dispatch('debounceRouterPush', `/who-i-am/`)
            }
            commit('touchEnd');
          } else if (state.touchMove.y > 10) {
            // go to the previous page.
            if (state.currentWorksId > 0) {
              const i = state.currentWorksId - 1;
              dispatch('debounceRouterPush', `/works/${state.works[i].key}/`);
            } else {
              dispatch('debounceRouterPush', `/`);
            }
            commit('touchEnd');
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
