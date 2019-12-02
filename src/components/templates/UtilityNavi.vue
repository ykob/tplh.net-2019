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
</template>

<style lang="scss">
  .p-utility-navi {
    display: flex;
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
      display: block;
      position: relative;
      text-decoration: none;
      @include l-more-than-mobile {
        margin-right: 20px;
      }
      @include l-mobile {
        margin-right: 10px;
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
    }
  }
</style>
