<script>
  import InputText from '@/components/atoms/InputText.vue';
  import Textarea from '@/components/atoms/Textarea.vue';

  export default {
    name: 'ContactDescription',
    components: {
      InputText,
      Textarea
    },
    props: {
      isShown: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        input: {
          name: {
            default: '',
            value: 'a',
            validation: null,
            error: []
          },
          email: {
            default: '',
            value: '',
            validation: null,
            error: []
          },
          content: {
            default: '',
            value: '',
            validation: null,
            error: []
          },
        },
      }
    },
    methods: {
      onChange(e) {
        console.log(e)
        this.input.name.value = e.currentTarget.value;
      }
    }
  };
</script>

<template lang="pug">
.p-contact-form(
  :class = '{ "is-shown" : isShown === true }'
  )
  .p-contact-form__row
    .p-contact-form__label
      |Name:
    InputText.p-contact-form__input(
      name = 'name'
      :value = 'input.name.value'
      @change = 'onChange'
      )
  .p-contact-form__row
    .p-contact-form__label
      |Email:
    InputText.p-contact-form__input(
      name = 'email'
      :value = 'input.email.value'
      @change = 'onChange'
      )
  .p-contact-form__row
    .p-contact-form__label
      |Content:
    Textarea.p-contact-form__textarea(
      name = 'content'
      :value = 'input.content.value'
      @change = 'onChange'
      )
</template>

<style lang="scss">
.p-contact-form {
  &__row {
    margin-top: 15px;
    &:first-child {
      margin-top: 0;
    }
  }
  &__input {
    width: 100%;
    max-width: 400px;
    display: block;
  }
  &__textarea {
    width: 100%;
    max-width: 600px;
    height: 240px;
    display: block;
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
