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
  .p-global-title(
    :class = '{ "is-shown" : this.$store.state.isShownGlobalTitle === true }'
    )
    .p-global-title__name
      |Yoichi Kobayashi
    .p-global-title__summary
      |Front-End &amp; Creative Developer.
</template>

<style lang="scss">
  @import '@/assets/scss/foundation/_mixins.scss';

  .p-global-title {
    position: fixed;
    z-index: 100;
    line-height: 1;
    @include l-more-than-mobile {
      height: 50px;
      top: 50px;
      left: 50px;
    }
    @include l-mobile {
      height: 36px;
      top: 24px;
      left: 20px;
    }
    &__name {
      position: absolute;
      top: 0;
      left: 0;
      white-space: nowrap;
      @include fontSizeAll(18, 18, 15);
      text-transform: uppercase;
      letter-spacing: 0.18em;
    }
    &__summary {
      position: absolute;
      bottom: 0;
      left: 0;
      white-space: nowrap;
      @include fontSizeAll(12, 12, 10);
      letter-spacing: 0.18em;
    }
  }
</style>
