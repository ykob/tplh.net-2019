<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'About',
  components: {
  },
  created: function() {
    this.$store.commit('enableDarkColor', false);
    this.$store.commit('transit', {
      globalId: 1,
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
</template>
