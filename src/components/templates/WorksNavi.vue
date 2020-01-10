<script>
  import SplitStr from '@/components/atoms/SplitStr.vue';

  export default {
    name: 'WorksNavi',
    components: {
      SplitStr,
    },
    data() {
      return {
        isOvered: false,
        isOveredAnchor: -1,
      }
    },
    computed: {
      classnames() {
        return {
          'is-shown': this.$store.state.isShownUI === true,
          'is-previous': this.$store.state.positionFromWorks === -1,
          'is-current': this.$store.state.positionFromWorks === 0,
          'is-next': this.$store.state.positionFromWorks === 1,
          'is-overed': this.isOvered === true
        }
      },
      lineProgressStyles() {
        return {
          height:
            (this.$store.state.positionFromWorks === 0 && this.$store.state.isShownUI)
              ?
                `calc(50% + ${
                  (this.$store.state.currentWorksId - (this.$store.state.works.length - 1) / 2) * 50
                }px + 10px)`
              : undefined,
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
      anchorEnter(i) {
        this.isOveredAnchor = i;
      },
      anchorLeave() {
        this.isOveredAnchor = -1;
      },
      anchorStyles(i) {
        return {
          top: `calc(50% + ${(i - (this.$store.state.works.length - 1) / 2) * 50}px)`,
          transitionDelay: (this.$store.state.positionFromWorks === 0)
            ? `${i * 0.06 + 0.6}s`
            : `${i * 0.06}s`
        }
      },
      anchorClassnames(i) {
        return {
          'is-shown': this.$store.state.positionFromWorks === 0 && this.$store.state.isShownUI,
          'is-current': this.$store.state.works[i].key === this.$route.params.key,
        }
      },
      anchorLabelStyles(i) {
        const strLength = this.$store.state.works[i].title.length;
        return {
          height: `${strLength}em`,
          top: `calc(50% + ${(i - (this.$store.state.works.length - 1) / 2) * 50}px - ${strLength / 2}em)`,
        }
      },
      anchorLabelClassnames(i) {
        return {
          'is-overed': this.isOveredAnchor === i,
        }
      },
    }
  };
</script>

<template lang="pug">
  .p-works-navi
    router-link.p-works-navi__label(
      :to = 'getWorksUrl(0)'
      :class = 'classnames'
      @mouseenter.native = 'enter'
      @mouseleave.native = 'leave'
      )
      |Works
    .p-works-navi__line.p-works-navi__line--upper(
      :class = 'classnames'
      )
    .p-works-navi__line.p-works-navi__line--lower(
      :class = 'classnames'
      )
    .p-works-navi__line.p-works-navi__line--progress(
      :class = 'classnames'
      :style = 'lineProgressStyles'
      )
    .p-works-navi__point.p-works-navi__point--upper(
      :class = 'classnames'
      )
    .p-works-navi__point.p-works-navi__point--lower(
      :class = 'classnames'
      )
    router-link.p-works-navi__anchor(
      v-for = 'anchor, index in $store.state.works'
      :to = 'getWorksUrl(index)'
      :style = 'anchorStyles(index)'
      :class = 'anchorClassnames(index)'
      @mouseenter.native = 'anchorEnter(index)'
      @mouseleave.native = 'anchorLeave'
      )
    .p-works-navi__anchor-label(
      v-for = 'anchor, index in $store.state.works'
      :style = 'anchorLabelStyles(index)'
      :class = 'anchorLabelClassnames(index)'
      )
      |{{ anchor.title }}
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
      &.is-shown {
        transition-duration: 1.2s;
        transition-timing-function: $easeOutCirc;
        transition-property: top;
      }

      // Interaction
      &.is-current {
        top: 0;
        pointer-events: none;
      }
    }
    &__line {
      width: 1px;
      height: 0;
      position: absolute;
      right: 50%;
      pointer-events: none;
      transition-duration: 1.2s;
      transition-timing-function: $easeOutCirc;
      &--upper, &--lower {
        background-color: rgba($color-text, 0.2);
        &.is-shown {
          transition-property: height;
        }
      }
      &--upper {
        top: 0;

        // Interaction
        &.is-shown {
          &.is-overed {
            height: calc(50% + 60px);
          }
          &.is-current {
            height: 0;
          }
          &.is-previous {
            height: 0;
          }
          &.is-next {
            height: calc(50% - 60px);
          }
        }
      }
      &--lower {
        bottom: 0;

        // Interaction
        &.is-shown {
          &.is-overed {
            height: calc(50% + 60px);
          }
          &.is-current {
            height: calc(100% + 10px);
          }
          &.is-previous {
            height: calc(50% - 60px);
          }
          &.is-next {
            height: 0;
          }
        }
      }
      &--progress {
        top: -10px;
        background-color: rgba($color-text, 0.5);
        transition-property: height, opacity;

        // Interaction
        &.is-current {
          top: -10px;
          transition-delay: .6s;
        }
      }
    }
    &__point {
      width: 3px;
      height: 3px;
      opacity: 0;
      position: absolute;
      right: calc(50% - 1px);
      border-radius: 50%;
      background-color: rgba($color-text, 0.5);
      &.is-shown {
        opacity: 1;
        transition-duration: .7s;
        transition-property: opacity;
      }
      &--upper {
        top: -1px;

        // Interaction
        &.is-current {
          opacity: 0;
        }
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
    &__anchor-label {
      height: 20em;
      position: absolute;
      @include fontSizeAll(12, 12, 12);
      text-align: center;
      writing-mode: vertical-rl;
      letter-spacing: 0.15em;
      @include l-more-than-mobile {
        left: 25px;
      }
      @include l-mobile {
      }

      // Interaction
      opacity: 0;
      transition-duration: .6s;
      transition-property: opacity;
      &.is-overed {
        opacity: 1;
      }
    }
  }
</style>
