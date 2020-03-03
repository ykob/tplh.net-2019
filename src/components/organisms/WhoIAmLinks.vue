<script>
  import ParallaxBlock from '@/components/atoms/ParallaxBlock'
  import LinkListItem from '@/components/organisms/LinkListItem'

  export default {
    name: 'WhoIAmLinks',
    components: {
      ParallaxBlock,
      LinkListItem
    },
    props: {
      scrollY: {
        type: Number,
        default: 0
      },
      parallaxRatio: {
        type: Number,
        default: 0
      }
    }
  }
</script>

<template lang="pug">
  ParallaxBlock.p-whoiam-links(
    :scrollY = 'scrollY'
    :parallaxRatio = 'parallaxRatio'
    )
    .p-whoiam-links__items
      LinkListItem.p-whoiam-links__item(
        href = 'https://twitter.com/ykob0123'
        target = '_blank'
        )
        |Twitter
      LinkListItem.p-whoiam-links__item(
        href = 'https://github.com/ykob'
        target = '_blank'
        )
        |GitHub
    .p-whoiam-links__items
      LinkListItem.p-whoiam-links__item(
        href = 'mailto:info@tplh.net'
        )
        |info@tplh.net
</template>

<style lang="scss">
  .p-whoiam-links {
    @include l-more-than-mobile {
      width: 500 / 1360 * 100%;
      position: absolute;
      top: 270px;
      left: 180 / 1360 * 100%;
    }
    @include l-mobile {
      margin-bottom: 50px;
    }
    &__items {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-top: 30px;
      &:first-child {
        margin-top: 0;
      }
    }

    // Transition
    transition-property: opacity, transform;
    .view-enter &,
    .view-asc-enter & {
      opacity: 0;
    }
    .view-enter &,
    .view-asc-leave-to & {
      transform: translate3d(0, 100px, 0);
    }
    .view-asc-enter &,
    .view-leave-to & {
      transform: translate3d(0, -100px, 0);
    }
    .view-enter-to &,
    .view-asc-enter-to & {
      opacity: 1;
      transition-duration: 1s;
      transition-delay: 1.3s;
      transition-timing-function: $easeOutQuad;
    }
    .view-leave-to &,
    .view-asc-leave-to & {
      opacity: 0;
      transition-duration: .6s;
      transition-delay: 0.1s;
      transition-timing-function: $easeInQuad;
    }
  }
</style>
