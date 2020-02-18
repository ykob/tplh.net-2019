<script>
import Link from '@/components/organisms/Link'

export default {
  name: 'WhoIAmLinks',
  components: {
    Link
  }
}
</script>

<template lang="pug">
  .p-whoiam-links
    .p-whoiam-links__items
      Link.p-whoiam-links__item(
        href = 'https://twitter.com/ykob0123'
        target = '_blank'
        )
        |Twitter
      Link.p-whoiam-links__item(
        href = 'https://github.com/ykob'
        target = '_blank'
        )
        |GitHub
    .p-whoiam-links__items
      Link.p-whoiam-links__item(
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
  transition-property: opacity;
  .view-enter & {
    opacity: 0;
  }
  .view-enter-to & {
    opacity: 1;
    transition-duration: 1s;
    transition-delay: 1.2s;
    transition-timing-function: $easeOutQuad;
  }
  .view-leave-to & {
    opacity: 0;
    transition-duration: .6s;
    transition-delay: 0s;
  }
}
</style>
