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
    Link.p-whoiam-links__mail(
      href = 'mailto:info@tplh.net'
      )
      |info@tplh.net
</template>

<style lang="scss">
.p-whoiam-links {
}
</style>
