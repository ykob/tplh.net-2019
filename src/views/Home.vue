<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
  },
  created: function() {
    this.$store.dispatch('transit', {
      globalId: 0,
    });
  },
  mounted: function() {
  },
  computed: {},
  methods: {},
}
</script>

<template lang="pug">
  div
    h1 Home Page
    p
      |{{ this.$store.state.globalId }}
</template>


<style lang="scss">
</style>
