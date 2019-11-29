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
    data() {
      return {
        hoverState: 0
      }
    },
    render: function (createElement) {
      const self = this;
      const vnode = createElement(
        this.tag,
        {
          class: [
            'c-button',
            `c-button--${this.role}`,
            {
              'is-enabled-dark-color': this.$store.state.isEnabledDarkColor === true,
              'is-over' : this.hoverState === 1,
              'is-leave': this.hoverState === 2
            }
          ],
          style: {
            width: this.width,
          },
          on: {
            click(event) {
              self.$emit('click', event)
            },
            submit(event) {
              self.$emit('submit', event)
            },
            mouseover() {
              self.hoverState = 1;
            },
            mouseleave() {
              self.hoverState = 2;
            }
          },
        },
        [
          createElement(
            'span',
            {
              class: [
                'c-button__label'
              ]
            },
            [
              this.$slots.default
            ]
          ),
          createElement(
            'span',
            {
              class: [
                'c-button__bg'
              ]
            }
          )
        ]
      );
      return vnode;
    },
  };
</script>

<style lang="scss">
  .c-button {
    height: 40px;
    appearance: normal;
    -webkit-appearance: normal;
    box-sizing: border-box;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    padding: 0;
    border: 1px solid #222;
    text-decoration: none;
    letter-spacing: 0.16em;
    background-color: transparent;
    transition-property: color, border-color;
    .is-enabled-dark-color & {
      border-color: #fff;
    }
    &__label {
      display: inline-block;
      position: relative;
      z-index: 10;
    }
    &__bg {
      width: 100%;
      height: 100%;
      opacity: 0;
      position: absolute;
      top: 0;
      left: 0;
      background-color: #222;
      transition-duration: 1s;
      transition-timing-function: $easeOutCirc;
      transition-property: opacity, background-color;
      .is-enabled-dark-color & {
        background-color: #fff;
      }
    }
    &.is-over & {
      &__bg {
        opacity: .2;
      }
    }
  }
</style>
