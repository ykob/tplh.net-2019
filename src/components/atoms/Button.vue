<script>
  export default {
    name: 'Button',
    components: {
    },
    props: {
      tag: {
        type: String,
        default: 'button',
      },
      role: {
        type: String,
        default: 'submit',
      },
      width: {
        type: String,
        default: '120px',
      },
    },
    render: function (createElement) {
      const self = this;
      const vnode = createElement(
        this.tag,
        {
          class: [
            'c-button',
            `c-button--${this.role}`
          ],
          style: {
            width: this.width,
          },
          on: {
            click: function (event) {
              self.$emit('click', event)
            },
            submit: function (event) {
              self.$emit('submit', event)
            },
          },
        },
        [
          this.$slots.default,
        ]
      );
      return vnode;
    },
  };
</script>

<style lang="scss">
  .c-button {
    height: 40px;
    box-sizing: border-box;
    cursor: pointer;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    border-top: 0;
    border-bottom: 2px solid;
    border-right: 0;
    border-left: 0;
    border-radius: 4px;
    text-decoration: none;
    letter-spacing: 0.1em;
  }
</style>
