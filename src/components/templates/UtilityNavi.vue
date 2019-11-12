<script>
  export default {
    name: 'UtilityNavi',
    components: {},
    props: {},
    data: function() {
      return {}
    },
    methods: {},
  };
</script>

<template lang="pug">
  .p-utility-navi
    router-link.p-utility-navi__item(
      to = '/about/'
      )
      |About
    router-link.p-utility-navi__item(
      to = '/contact/'
      )
      |Contact
</template>

<style lang="scss">
  .p-utility-navi {
    position: fixed;
    z-index: 100;
    line-height: 1;
    @include fontSizeAll(16, 16, 12);
    letter-spacing: 0.1em;
    @include l-more-than-mobile {
      left: 50px;
      bottom: 50px;
    }
    @include l-mobile {
      left: 20px;
      bottom: 20px;
    }
    &__item {
      position: relative;
      text-decoration: none;
      @include l-more-than-mobile {
        margin-right: 20px;
      }
      @include l-mobile {
        margin-right: 10px;
      }
    }
  }
</style>
