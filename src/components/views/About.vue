<script>
  import sleep from 'js-util/sleep'
  import SplitStr from '@/components/atoms/SplitStr.vue'

  export default {
    name: 'About',
    components: {
      SplitStr,
    },
    data: function() {
      return {
        isShown: false,
      }
    },
    created: async function() {
      this.$store.commit('enableDarkColor', false);
      this.$store.commit('transit', {
        globalId: 50,
      });
      await sleep(500);
      this.$store.commit('showGlobalTitle', true);
    },
    mounted: async function() {
      await sleep(500);
      this.isShown = true;
    },
    computed: {},
    methods: {},
  }
</script>

<template lang="pug">
  .p-view-wrap
    SplitStr.p-about-title(
      tag = 'h1'
      label = 'About'
      :step = '4'
      childClassname = 'p-about-title__typo'
      :class = '{ "is-shown" : isShown === true }'
      )
    .p-about-description(
      :class = '{ "is-shown" : isShown === true }'
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
  @import '@/assets/scss/foundation/_variables.scss';
  @import '@/assets/scss/foundation/_mixins.scss';

  .p-about-title {
    position: absolute;
    line-height: .9;
    margin-top: 0;
    margin-bottom: 0;
    @include fontSizeAll(64, 42, 24);
    letter-spacing: 0.12em;
    @include l-more-than-mobile {
      top: 22.5%;
      left: 50%;
    }
    @include l-mobile {
    }
    &__typo {
      opacity: 0;
      transform: translate3d(0, .4em, 0) rotateY(70deg);
      transition-property: opacity, transform;
      .is-shown & {
        opacity: 1;
        transition-duration: 1s;
        transition-timing-function: $easeOutQuad;
        transform: translate3d(0, 0, 0) rotateY(0);
      }
      .view-leave-to & {
        opacity: 0;
        transition-duration: .6s;
        transition-timing-function: $easeInQuad;
        transform: translate3d(0, -.6em, 0) rotateY(-70deg);
      }
    }
  }
  .p-about-description {
    box-sizing: border-box;
    position: absolute;
    line-height: 2;
    overflow: scroll;
    letter-spacing: 0.08em;
    mask-image: linear-gradient(to bottom, transparent 5%, black 20%, black 80%, transparent 95%);
    @include l-more-than-mobile {
      width: 50%;
      top: 33.3%;
      bottom: 20%;
      left: 50%;
      padding-right: 100px;
    }
    @include l-mobile {
    }
    h2 {
      letter-spacing: 0.12em;
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
