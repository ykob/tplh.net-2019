<script>
import SplitStr from '@/components/common/SplitStr.vue';

export default {
  name: 'WorksNavi',
  components: {
    SplitStr
  },
  data() {
    return {
      isOvered: false,
      isOveredAnchor: -1,
      hasAnchorDelay: true,
      timerAnchorEnter: null
    };
  },
  computed: {
    classnames() {
      return {
        'is-shown': this.$store.state.isShownUI === true,
        'is-previous': this.$store.state.positionFromWorks === -1,
        'is-current': this.$store.state.positionFromWorks === 0,
        'is-next': this.$store.state.positionFromWorks === 1,
        'is-overed': this.isOvered === true
      };
    },
    lineProgressStyles() {
      const { state } = this.$store;
      return {
        height:
          state.positionFromWorks === 0 && state.isShownUI
            ? this.$store.state.isMobile === true
              ? `calc(50% + ${(state.currentWorksId -
                  (state.works.length - 1) / 2) *
                  25}px + 10px)`
              : `calc(50% + ${(state.currentWorksId -
                  (state.works.length - 1) / 2) *
                  50}px + 10px)`
            : undefined,
        transitionDelay: `${
          state.isTransitionInWorks === true || state.positionFromWorks != 0
            ? 0
            : 0.6
        }s`
      };
    }
  },
  watch: {
    '$store.state.positionFromWorks'() {
      if (this.$store.state.positionFromWorks === 0) {
        this.hasAnchorDelay = true;
        setTimeout(() => {
          this.hasAnchorDelay = false;
        }, 1000);
      }
    }
  },
  methods: {
    enter() {
      if (this.$store.state.isEnabledTouch === true) return;
      this.isOvered = true;
    },
    leave() {
      this.isOvered = false;
    },
    transit(i) {
      const { state, dispatch } = this.$store;
      dispatch('debounceRouterPush', `/works/${state.works[i].key}/`);
    },
    anchorEnter(i) {
      if (this.$store.state.isEnabledTouch === true) return;
      if (this.isOveredAnchor === i) return;
      clearTimeout(this.timerAnchorEnter);
      this.timerAnchorEnter = setTimeout(() => {
        this.isOveredAnchor = i;
        this.hasAnchorDelay = false;
      }, 50);
    },
    anchorLeave() {
      clearTimeout(this.timerAnchorEnter);
      this.timerAnchorEnter = setTimeout(() => {
        this.isOveredAnchor = -1;
      }, 50);
    },
    anchorStyles(i) {
      const { state } = this.$store;

      return {
        top:
          state.isMobile === true
            ? `calc(50% + ${(i - (state.works.length - 1) / 2) * 25}px)`
            : `calc(50% + ${(i - (state.works.length - 1) / 2) * 50}px)`,
        transitionDelay:
          state.positionFromWorks === 0 ? `${i * 0.06 + 0.6}s` : `${i * 0.06}s`
      };
    },
    anchorClassnames(i) {
      return {
        'is-shown':
          this.$store.state.positionFromWorks === 0 &&
          this.$store.state.isShownUI,
        'is-overed': this.isOveredAnchor === i,
        'is-current': this.$store.state.works[i].key === this.$route.params.key
      };
    },
    anchorLabelStyles(i) {
      const strLength = this.$store.state.works[i].shortTitle.length;
      const height = strLength + (strLength - 1) * 0.15;
      return {
        height: `${height}em`,
        top: `calc(50% + ${(i - (this.$store.state.works.length - 1) / 2) *
          50}px - ${height / 2}em)`
      };
    },
    anchorLabelClassnames(i) {
      const { state } = this.$store;
      return {
        'is-overed': this.isOveredAnchor === i,
        'is-current':
          state.works[i].key === this.$route.params.key &&
          this.isOveredAnchor === -1 &&
          state.isShownUI
      };
    },
    isShownAnchor(i) {
      const { state } = this.$store;
      return (
        this.isOveredAnchor === i ||
        (state.works[i].key === this.$route.params.key &&
          this.isOveredAnchor === -1 &&
          state.isShownUI)
      );
    }
  }
};
</script>

<template lang="pug">
  .p-works-navi
    .p-works-navi__label(
      :class = 'classnames'
      @click = 'transit(0)'
      @mouseenter = 'enter'
      @mouseleave = 'leave'
      )
      SplitStr(
        label = 'Works'
        :step = '4'
        childClassname = 'p-works-navi__typo'
        )
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
    .p-works-navi__anchor(
      v-for = 'anchor, index in $store.state.works'
      :style = 'anchorStyles(index)'
      :class = 'anchorClassnames(index)'
      @click = 'transit(index)'
      @mouseenter = 'anchorEnter(index)'
      @mouseleave = 'anchorLeave'
      )
    .p-works-navi__anchor-label(
      v-for = 'anchor, index in $store.state.works'
      :style = 'anchorLabelStyles(index)'
      )
      transition(
        name = 'anchor'
        )
        SplitStr.p-works-navi__anchor-label-in(
          v-if = 'isShownAnchor(index)'
          :label = 'anchor.shortTitle'
          :step = '2'
          :base = 'hasAnchorDelay === true ? 80 : 0'
          childClassname = 'p-works-navi__anchor-typo'
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
    width: 44px;
    top: 22px;
    bottom: 22px;
  }
  &__label {
    cursor: pointer;
    position: absolute;
    top: calc(50% - (1em * 5 + 0.3em * 4) / 2);
    right: calc(50% - 0.55em);
    @include fontSizeAll(12, 12, 9);
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
  &__typo {
    // Interaction
    transform: translate3d(1.1em, 0, 0);
    transition-duration: 0.6s;
    transition-property: transform;
    transition-property: $easeOutCirc;
    .is-shown & {
      transform: translate3d(0, 0, 0);
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
    &--upper,
    &--lower {
      background-color: rgba($color-text, 0.2);
      &.is-shown {
        transition-property: height;
      }
    }
    &--upper {
      top: 0;

      // Interaction
      &.is-shown {
        &.is-current {
          height: 0;
        }
        &.is-previous {
          height: 0;
        }
        &.is-next {
          @include l-more-than-mobile {
            height: calc(50% - 60px);
            &.is-overed {
              height: calc(50% + 60px);
            }
          }
          @include l-mobile {
            height: calc(50% - 40px);
          }
        }
      }
    }
    &--lower {
      bottom: 0;

      // Interaction
      &.is-shown {
        &.is-current {
          height: calc(100% + 10px);
        }
        &.is-previous {
          @include l-more-than-mobile {
            height: calc(50% - 60px);
            &.is-overed {
              height: calc(50% + 60px);
            }
          }
          @include l-mobile {
            height: calc(50% - 40px);
          }
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
      transition-duration: 0.7s;
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
    cursor: pointer;
    position: absolute;
    right: 50%;
    opacity: 0;
    transition-duration: 0.6s;
    transition-property: transform, opacity;
    transform: scale(0);
    @include l-more-than-mobile {
      width: 41px;
      height: 41px;
      margin-top: -20px;
      margin-right: -20px;
    }
    @include l-mobile {
      width: 25px;
      height: 25px;
      margin-top: -12px;
      margin-right: -12px;
    }
    &:before {
      backface-visibility: hidden;
      content: '';
      display: block;
      box-sizing: border-box;
      position: absolute;
      border: 1px solid rgba($color-text, 0.5);
      transform: rotate(45deg);
      transition-duration: 0.6s;
      transition-property: border-color, background-color;
      @include l-more-than-mobile {
        width: 7px;
        height: 7px;
        top: 17px;
        left: 17px;
      }
      @include l-mobile {
        width: 5px;
        height: 5px;
        top: 10px;
        left: 10px;
      }
    }
    &.is-shown {
      opacity: 1;
      transform: scale(1);
    }
    &.is-overed,
    &.is-current {
      &:before {
        border: 1px solid rgba($color-text, 1);
        background-color: rgba($color-text, 1);
      }
    }
    &.is-current {
      pointer-events: none;
    }
  }
  &__anchor-label {
    height: 20em;
    line-height: 1.1;
    overflow: hidden;
    position: absolute;
    pointer-events: none;
    @include fontSizeAll(12, 12, 9);
    text-align: center;
    writing-mode: vertical-rl;
    white-space: nowrap;
    letter-spacing: 0.15em;
    @include l-more-than-mobile {
      left: calc(25% - 1.1em);
    }
    @include l-mobile {
      display: none;
    }
  }
  &__anchor-label-in {
    &.anchor-enter-to,
    &.anchor-leave-to {
      transition-duration: 2s;
    }
  }
  &__anchor-typo {
    // Interaction
    transition-duration: 0.6s;
    transition-property: transform;
    transition-property: $easeOutCirc;
    .anchor-enter & {
      transform: translate3d(1.1em, 0, 0);
    }
    .anchor-enter-to & {
      transform: translate3d(0, 0, 0);
    }
    .anchor-leave-to & {
      transform: translate3d(1.1em, 0, 0);
    }
  }
}
</style>
