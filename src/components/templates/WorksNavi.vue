<script>
  import SplitStr from '@/components/atoms/SplitStr.vue';

  export default {
    name: 'WorksNavi',
    components: {
      SplitStr,
    },
    props: {
    },
    data() {
      return {
        isOvered: false
      }
    },
    computed: {
      classnames() {
        return {
          'is-previous': this.$store.state.positionFromWorks === -1,
          'is-current': this.$store.state.positionFromWorks === 0,
          'is-next': this.$store.state.positionFromWorks === 1,
          'is-overed': this.isOvered === true
        }
      }
    },
    methods: {
      enter() {
        this.isOvered = true;
      },
      leave() {
        this.isOvered = false;
      },
      getWorksUrl(i) {
        return `/works/${this.$store.state.works[i].key}/`;
      },
      anchorStyles(i) {
        return {
          top: `calc(50% + ${(i - (this.$store.state.works.length - 1) / 2) * 50}px)`,
          transitionDelay: `${i * 0.06}s`
        }
      },
      anchorClassnames(i) {
        return {
          'is-shown': this.$store.state.positionFromWorks === 0,
          'is-current': this.$store.state.works[i].key === this.$route.params.key,
        }
      }
    }
  };
</script>

<template lang="pug">
  transition(
    name = 'show'
    appear
    )
    .p-works-navi
      router-link.p-works-navi__label(
        tag = 'div'
        :to = 'getWorksUrl(0)'
        :class = 'classnames'
        )
        a(
          @mouseenter = 'enter'
          @mouseleave = 'leave'
          )
          |Works
      .p-works-navi__line.p-works-navi__line--upper(
        :class = 'classnames'
        )
      .p-works-navi__line.p-works-navi__line--lower(
        :class = 'classnames'
        )
      .p-works-navi__point.p-works-navi__point--upper
      .p-works-navi__point.p-works-navi__point--lower
      router-link.p-works-navi__anchor(
        v-for = 'anchor, index in $store.state.works'
        :to = 'getWorksUrl(index)'
        :style = 'anchorStyles(index)'
        :class = 'anchorClassnames(index)'
        )
</template>

<style lang="scss">
  .p-works-navi {
    position: absolute;
    right: 0;
    z-index: 100;
    @include l-more-than-mobile {
      width: 7.5%;
      top: 50px;
      bottom: 50px;
    }
    @include l-mobile {
    }
    &__label {
      position: absolute;
      top: calc(50% - (1em * 5 + 0.3em * 4) / 2);
      right: calc(50% - 0.55em);
      @include fontSizeAll(12, 12, 12);
      line-height: 1;
      text-decoration: none;
      letter-spacing: 0.3em;
      writing-mode: vertical-rl;
      transition-duration: 1.2s;
      transition-timing-function: $easeOutCirc;
      transition-property: top;

      // Interaction
      &.is-current {
        top: 10px;
        pointer-events: none;
      }
    }
    &__line {
      width: 1px;
      height: calc(50% - 60px);
      position: absolute;
      right: 50%;
      pointer-events: none;
      background-color: rgba($color-text, 0.2);
      transition-duration: 1.2s;
      transition-timing-function: $easeOutCirc;
      transition-property: height;
      &--upper {
        top: 0;

        // Interaction
        &.is-overed {
          height: calc(50% + 60px);
        }
        &.is-current {
          height: 0;
        }
        &.is-previous {
          height: 0;
        }
      }
      &--lower {
        bottom: 0;

        // Interaction
        &.is-overed {
          height: calc(50% + 60px);
        }
        &.is-current {
          height: 100%;
        }
        &.is-next {
          height: 0;
        }
      }
    }
    &__point {
      width: 3px;
      height: 3px;
      position: absolute;
      right: calc(50% - 1px);
      border-radius: 50%;
      background-color: rgba($color-text, 0.5);
      &--upper {
        top: -1px;
      }
      &--lower {
        bottom: -1px;
      }
    }
    &__anchor {
      width: 41px;
      height: 41px;
      position: absolute;
      right: 50%;
      opacity: 0;
      margin-top: -20px;
      margin-right: -20px;
      transition-duration: .6s;
      transition-property: transform, opacity;
      transform: scale(0);
      &:before {
        width: 9px;
        height: 9px;
        backface-visibility: hidden;
        content: '';
        display: block;
        box-sizing: border-box;
        position: absolute;
        top: 16px;
        left: 16px;
        border: 1px solid $color-text;
        transform: rotate(45deg);
        transition-duration: .6s;
        transition-property: background-color;
      }
      &.is-shown {
        opacity: 1;
        transform: scale(1);
      }
      &.is-current {
        &:before {
          background-color: $color-text;
        }
      }
    }
  }
</style>
