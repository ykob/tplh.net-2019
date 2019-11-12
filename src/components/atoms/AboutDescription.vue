<script>
import PerfectScrollbar from 'perfect-scrollbar'

export default {
  name: 'AboutDescription',
  components: {},
  props: {
    isShown: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      ps: null,
    }
  },
  mounted() {
    const { y } = this.$store.state.resolution;
    this.ps = new PerfectScrollbar(this.$refs.wrap, {
      swipeEasing: true,
      suppressScrollX: true,
    });
  },
  computed: {
    getPadding() {
      const { y } = this.$store.state.resolution;
      return {
        paddingTop: `${y * 0.467 * 0.15}px`,
        paddingBottom: `${y * 0.467 * 0.15}px`,
      }
    }
  }
}
</script>

<template lang="pug">
.p-about-description(
  ref = 'wrap'
  :class = '{ "is-shown" : isShown === true }'
  )
  .p-about-description__in(
    :style = 'getPadding'
    )
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
  position: absolute;
  overflow: hidden;
  letter-spacing: 0.08em;
  mask-image: linear-gradient(to bottom, transparent 5%, black 15%, black 85%, transparent 95%);
  @include l-more-than-mobile {
    width: 50%;
    bottom: 20%;
    left: 50%;
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
  opacity: 0;
  transition-property: opacity;
  &.is-shown {
    opacity: 1;
    transition-duration: 1s;
    transition-delay: .4s;
  }
  .view-leave-to & {
    opacity: 0;
    transition-duration: .6s;
    transition-delay: 0s;
  }
}
</style>
