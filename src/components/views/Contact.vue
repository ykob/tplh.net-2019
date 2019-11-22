<script>
import sleep from 'js-util/sleep'
import ContactTitle from '@/components/atoms/ContactTitle.vue'
import ContactDescription from '@/components/atoms/ContactDescription.vue'
import ContactForm from '@/components/organics/ContactForm.vue'

export default {
  name: 'Contact',
  metaInfo: {
    title: 'Contact / ',
    meta: [
      {
        name: 'description',
        content: 'it is contact page.'
      }
    ]
  },
  components: {
    ContactTitle,
    ContactDescription,
    ContactForm,
  },
  data() {
    return {
      isShown: false,
    }
  },
  async created() {
    this.$store.commit('enableDarkColor', true);
    this.$store.commit('transit', {
      globalId: 99,
    });
    await sleep(500);
    this.$store.commit('showGlobalTitle', true);
  },
  async mounted() {
    await sleep(500);
    this.isShown = true;
  },
  computed: {},
  methods: {},
}
</script>

<template lang="pug">
.p-view-wrap.p-contact-wrap
  .p-contact-column.p-contact-column--1
    ContactTitle(
      :isShown = 'isShown'
      )
    ContactDescription(
      :isShown = 'isShown'
      )
  .p-contact-column.p-contact-column--2
    ContactForm(
      :isShown = 'isShown'
      )
</template>

<style lang="scss">
.p-contact-wrap {
  @include l-more-than-mobile {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @include l-mobile {
  }
}
.p-contact-column {
  box-sizing: border-box;
  @include l-more-than-mobile {
    width: 50%;
    &--1 {
      padding-right: 50px;
      text-align: right;
    }
    &--2 {
      padding-left: 50px;
      padding-right: 100px;
    }
  }
  @include l-mobile {
  }

}
</style>
