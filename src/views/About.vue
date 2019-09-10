<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'About',
  components: {
  },
  created: function() {
    this.$store.dispatch('transit', {
      globalId: 1,
    });
  },
  mounted: function() {
  },
  computed: {},
  methods: {},
}
</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>
      {{ this.$store.state.globalId }}
    </p>
  </div>
</template>
