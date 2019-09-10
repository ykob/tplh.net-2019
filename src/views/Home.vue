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

<template>
  <div class="home">
    <h1>This is a home page</h1>
    <p>
      {{ this.$store.state.globalId }}
    </p>
  </div>
</template>


<style lang="scss">
</style>
