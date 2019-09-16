<script>
  // @ is an alias to /src
  import SplitStr from '@/components/atoms/SplitStr.vue'

  export default {
    name: 'Home',
    components: {
      SplitStr,
    },
    created: function() {
      this.$store.dispatch('transit', {
        globalId: 0,
      });
    },
    mounted: function() {
    },
    computed: {},
    methods: {},
  }
</script>

<template lang="pug">
  div
    .p-home-title
      .p-home-title__name
        SplitStr(
          label = 'Yoichi Kobayashi'
          align = 'center'
          exClassName = 'p-home-title__name-typo'
          )
      .p-home-title__summary
        SplitStr(
          label = 'Front-End & Creative Developer.'
          align = 'center'
          )
</template>

<style lang="scss">
  @import '@/assets/scss/foundation/_mixins.scss';

  .p-home-title {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    top: 66.6%;
    right: 0;
    left: 0;
    line-height: 1;
    @include l-more-than-mobile {
    }
    @include l-mobile {
    }
    &__name {
      text-transform: uppercase;
      @include fontSizeAll(42, 42, 28);
      letter-spacing: 0.2em;
      @include l-more-than-mobile {
        margin-bottom: 25px;
      }
      @include l-mobile {
        margin-bottom: 12px;
      }
    }
    &__summary {
      @include fontSizeAll(18, 18, 15);
      letter-spacing: 0.16em;
    }
  }
</style>
