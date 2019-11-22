<script>
  export default {
    name: 'InputText',
    components: {},
    props: {
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
    methods: {
      onChange(e) {
        this.$emit('change', e);
      }
    },
  };
</script>

<template lang="pug">
  input.input-text(
    type = 'text'
    :class = 'classnames'
    @change = 'onChange'
    )
</template>

<style lang="scss">
  .input-text {
    height: calc(1.5em + 1em);
    appearance: none;
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
