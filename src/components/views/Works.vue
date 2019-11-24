<script>
  import _ from 'lodash';
  import zeroPadding from 'js-util/zeroPadding';

  import Button from '@/components/atoms/Button.vue';

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
      .p-works-outline(
        v-for = 'item, index in $store.state.works'
        v-if = 'item.key === $route.params.key'
        )
        .p-works-outline__number
          |Works &#35;{{ getNumber(index) }}
        h1.p-works-outline__title
          |{{ item.title }}
        .p-works-outline__description
          |{{ item.description }}
        Button.p-works-outline__link(
          tag = 'a'
          :href = 'item.href'
          target = '_blank'
          )
          |Show this.
</template>

<style lang="scss">
  .p-works-outline {
    position: absolute;
    @include l-more-than-mobile {
      top: 42%;
      left: 50px;
    }
    @include l-mobile {
    }
    &__number {
      line-height: 1;
      @include fontSizeAll(21, 21, 14);
      text-transform: uppercase;
      letter-spacing: 0.16em;
      @include l-more-than-mobile {
        margin-bottom: 24px;
      }
      @include l-mobile {
        margin-bottom: 12px;
      }
    }
    &__title {
      line-height: .9;
      margin-top: 0;
      margin-bottom: 0;
      @include fontSizeAll(42, 42, 24);
      letter-spacing: 0.14em;
      @include l-more-than-mobile {
        margin-bottom: 30px;
      }
      @include l-mobile {
        margin-bottom: 20px;
      }
    }
    &__description {
      letter-spacing: 0.16em;
      white-space: pre-wrap;
      @include l-more-than-mobile {
        margin-bottom: 20px;
      }
      @include l-mobile {
        margin-bottom: 10px;
      }
    }
  }
</style>
