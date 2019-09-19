<script>
  export default {
    name: 'SplitStr',
    components: {},
    props: {
      label: {
        Type: String,
        default: '',
      },
      step: {
        Type: Number,
        default: 4,
      },
      base: {
        Type: Number,
        default: 0,
      },
      align: {
        Type: String,
        default: 'left',
      },
      exClassName: {
        Type: String,
        default: '',
      },
    },
    computed: {
      split: function() {
        const className = 'c-split-str__typo';
        const strArr = this.label.split('');
        let html = '';

        for (var i = 0; i < strArr.length; i++) {
          const typo = (strArr[i] == ' ') ? '&nbsp' : strArr[i];
          let num;

          switch (this.align) {
            case 'center':
              num = Math.floor(Math.abs(i - (strArr.length - 1) * 0.5)) * this.step + this.base;
              break;
            case 'right':
              num = (strArr.length - 1 - i) * this.step + this.base;
              break;
            case 'left':
            default:
              num = i * this.step + this.base;
          }
          html += `<span class="${className} ${className}--${num} ${this.exClassName}">${typo}</span>`
        }
        return html;
      },
    },
  };
</script>

<template lang="pug">
  span.c-split-str(
    v-html = 'split'
    )
</template>

<style lang="scss">
  .c-split-str {
    &__typo {
      display: inline-block;
      @for $i from 0 through 100 {
        &--#{$i} {
          transition-delay: $i * 0.01s;
        }
      }
    }
  }
</style>
