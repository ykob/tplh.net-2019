<script>
  export default {
    name: 'GlobalTitle',
    components: {},
    props: {},
    data: function() {
      return {}
    },
    methods: {},
  };
</script>

<template lang="pug">
  .p-global-title
    .p-global-title__name
      |Yoichi Kobayashi
    .p-global-title__summary
      |Front-End &amp; Creative Developer.
</template>

<style lang="scss">
  @import '@/assets/scss/foundation/_mixins.scss';

  .p-global-title {
    position: fixed;
    line-height: 1;
    @include l-more-than-mobile {
      top: 50px;
      left: 50px;
    }
    @include l-mobile {
      top: 20px;
      left: 20px;
    }
    &__name {
      text-transform: uppercase;
      @include fontSizeAll(18, 18, 15);
      letter-spacing: 0.18em;
      @include l-more-than-mobile {
        margin-bottom: 15px;
      }
      @include l-mobile {
        margin-bottom: 8px;
      }
    }
    &__summary {
      @include fontSizeAll(12, 12, 10);
      letter-spacing: 0.18em;
    }
  }
</style>
