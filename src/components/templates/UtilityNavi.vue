<script>
  export default {
    name: 'UtilityNavi',
    components: {},
    props: {},
    data: function() {
      return {}
    },
    computed: {
      getCurrentWorkPath() {
        return `/works/${this.$store.state.works[0].key}/`;
      }
    },
    methods: {},
  };
</script>

<template lang="pug">
  transition(
    name = 'show'
    appear
    )
    .p-utility-navi(
      v-if = '$store.state.isLoaded'
      )
      .p-utility-navi__items
        router-link.p-utility-navi__item(
          :to = 'getCurrentWorkPath'
          )
          |Works
        router-link.p-utility-navi__item(
          to = '/about/'
          )
          |About
        router-link.p-utility-navi__item(
          to = '/contact/'
          )
          |Contact
      .p-utility-navi__copyright
        |Copyright &copy; 2019, Yoichi Kobayashi.
</template>

<style lang="scss">
  .p-utility-navi {
    position: fixed;
    z-index: 100;
    line-height: 1;
    letter-spacing: 0.16em;
    @include l-more-than-mobile {
      width: calc(50% - 50px);
      height: 40px;
      left: 50px;
      bottom: 50px;
    }
    @include l-mobile {
      width: calc(100% - 40px);
      left: 20px;
      bottom: 20px;
    }
    &__items {
      display: flex;
      @include fontSizeAll(14, 14, 11);
      @include l-more-than-mobile {
        position: absolute;
        top: 0;
        left: 0;
      }
      @include l-mobile {
        justify-content: flex-end;
        margin-bottom: 15px;
      }
    }
    &__item {
      display: block;
      position: relative;
      text-decoration: none;
      @include l-more-than-mobile {
        margin-right: 20px;
      }
      @include l-mobile {
        margin-left: 10px;
      }
    }
    &__copyright {
      @include fontSizeAll(11, 11, 9);
      @include l-more-than-mobile {
        position: absolute;
        bottom: 0;
        left: 0;
      }
      @include l-mobile {
        text-align: right;
      }
    }

    // Transition
    &.show-enter {
      opacity: 0.999;
    }
    &.show-enter-to {
      opacity: 1;
      transition-duration: 3s;
      transition-property: opacity;
    }
    &.show-enter & {
      &__item {
        opacity: 0;
      }
      &__copyright {
        opacity: 0;
      }
    }
    &.show-enter-to & {
      &__item {
        opacity: 1;
        transition-duration: 1s;
        transition-property: opacity;
        @for $i from 1 through 5 {
          &:nth-of-type(#{$i}) {
            transition-delay: $i * 0.14 + .6s;
          }
        }
      }
      &__copyright {
        opacity: 1;
        transition-duration: 1s;
        transition-property: opacity;
        transition-delay: 1s;
      }
    }
  }
</style>
