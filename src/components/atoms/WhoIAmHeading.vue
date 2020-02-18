<script>
export default {
  name: 'WhoIAmHeading',
}
</script>

<template lang="pug">
  h1.p-whoiam-heading
    |Yoichi
    br
    |Kobayashi
</template>

<style lang="scss">
.p-whoiam-heading {
  line-height: (70 / 60);
  @include fontSizeAll(60, 60, 60);
  letter-spacing: 0.15em;
  @include l-more-than-mobile {
    margin-bottom: 75px;
    margin-left: 50%;
  }
  @include l-mobile {
  }
}
</style>
