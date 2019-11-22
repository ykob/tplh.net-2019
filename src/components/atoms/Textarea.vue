<script>
  export default {
    name: 'Textarea',
    components: {},
    props: {
      value: {
        type: String,
        value: ''
      },
      hasError: {
        type: Boolean,
        value: false
      },
    },
    computed: {
      classnames: function() {
        return {
          'has-error': this.hasError === true,
        }
      },
    },
  };
</script>

<template lang="pug">
  textarea.textarea(
    name = ''
    cols = '40'
    rows = '6'
    :class = 'classnames'
    )
    |{{ value }}
</template>

<style lang="scss">
  .textarea {
    box-sizing: border-box;
    line-height: 1.5;
    padding: calc(.5em);
    border: 1px solid #fff;
    border-radius: 0;
    background-color: transparent;
    &:focus {
      outline: 0;
      padding: calc(.5em - 1px);
      border: 2px solid #fff;
    }
    &.has-error {
      padding: calc(.5em - 1px);
      border: 2px solid #d00;
    }
  }
</style>
