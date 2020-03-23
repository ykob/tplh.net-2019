<script>
export default {
  name: 'SplitStr',
  components: {},
  props: {
    tag: {
      Type: String,
      default: 'div'
    },
    label: {
      Type: String,
      default: ''
    },
    step: {
      Type: Number,
      default: 4
    },
    base: {
      Type: Number,
      default: 0
    },
    align: {
      Type: String,
      default: 'left'
    },
    childClassname: {
      Type: String,
      default: ''
    }
  },
  data: function() {
    return {
      strArr: []
    };
  },
  created: function() {
    this.strArr = this.label.split('').map(s => {
      return s === ' ' ? '&nbsp;' : s;
    });
  },
  methods: {
    classnames: function(i) {
      const base = 'c-split-str__typo-in';
      let num;

      switch (this.align) {
        case 'center':
          num =
            Math.floor(Math.abs(i - (this.strArr.length - 1) * 0.5)) *
              this.step +
            this.base;
          break;
        case 'right':
          num = (this.strArr.length - 1 - i) * this.step + this.base;
          break;
        case 'left':
        default:
          num = i * this.step + this.base;
      }

      return [base, `${base}--${num}`, this.childClassname];
    }
  }
};
</script>

<template lang="pug">
  .c-split-str(
    :is = 'tag'
    )
    .c-split-str__typo(
      v-for = 'str, i in strArr'
      :class = 'classnames(i)'
      )
      span(
        v-html = 'str'
        :class = 'classnames(i)'
        )
</template>

<style lang="scss">
.c-split-str {
  &__typo {
    display: inline-block;
    overflow: hidden;
  }
  &__typo-in {
    display: inline-block;
    backface-visibility: hidden;
    @for $i from 0 through 200 {
      &--#{$i} {
        transition-delay: $i * 0.01s;
      }
    }
  }
}
</style>
