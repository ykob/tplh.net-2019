<script>
export default {
  name: 'AboutDescription',
  components: {},
  props: {
  },
  data() {
    return {
    }
  },
  mounted() {
  },
  computed: {
  }
}
</script>

<template lang="pug">
.p-about-description(
  ref = 'wrap'
  :class = '{ "is-shown" : isShown === true }'
  )
  .p-about-description__in
    h2
      |About Me
    p
      |I'm working in Japan as a Front-End Developer also a Creative Developer.
      br
      |From 2010, I've started to learn JavaScript, And my career as a Web Developer was started.
      br
      |I'm working in Japan as a Front-End Developer also a Creative Developer.
      br
      |From 2010, I've started to learn JavaScript, And my career as a Web Developer was started.
      br
      |I'm working in Japan as a Front-End Developer also a Creative Developer.
      br
      |From 2010, I've started to learn JavaScript, And my career as a Web Developer was started.
      br
      |I'm working in Japan as a Front-End Developer also a Creative Developer.
      br
      |From 2010, I've started to learn JavaScript, And my career as a Web Developer was started.
      br
      |I'm working in Japan as a Front-End Developer also a Creative Developer.
      br
      |From 2010, I've started to learn JavaScript, And my career as a Web Developer was started.
      br
    h2
      |Credit
    p
      |I'm working in Japan as a Front-End Developer also a Creative Developer.
      br
      |From 2010, I've started to learn JavaScript, And my career as a Web Developer was started.
      br
      |I'm working in Japan as a Front-End Developer also a Creative Developer.
      br
      |From 2010, I've started to learn JavaScript, And my career as a Web Developer was started.
      br
      |I'm working in Japan as a Front-End Developer also a Creative Developer.
      br
      |From 2010, I've started to learn JavaScript, And my career as a Web Developer was started.
      br
      |I'm working in Japan as a Front-End Developer also a Creative Developer.
      br
      |From 2010, I've started to learn JavaScript, And my career as a Web Developer was started.
      br
</template>

<style lang="scss">
.p-about-description {
  box-sizing: border-box;
  letter-spacing: 0.08em;
  @include l-more-than-mobile {
    width: 50%;
  }
  @include l-pc {
    top: calc(64 / 16 * 0.9 * 1rem + 25%);
  }
  @include l-tablet {
    top: calc(42 / 16 * 0.9 * 1rem + 25%);
  }
  @include l-mobile {
  }
  &__in {
    @include l-more-than-mobile {
      padding-right: 100px;
    }
    @include l-mobile {
    }
  }
  h2 {
    line-height: 1.5;
    letter-spacing: 0.12em;
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
