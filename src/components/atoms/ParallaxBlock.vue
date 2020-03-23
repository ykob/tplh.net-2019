<script>
export default {
  name: 'ParallaxBlock',
  props: {
    scrollY: {
      type: Number,
      default: 0
    },
    parallaxRatio: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      center: 0
    };
  },
  watch: {
    '$store.state.resolution.x'() {
      this.getCenter();
    },
    '$store.state.resolution.y'() {
      this.getCenter();
    }
  },
  mounted() {
    this.getCenter();
  },
  computed: {
    styles() {
      if (this.parallaxRatio === 0) return;
      const windowCenter = this.scrollY + this.$store.state.resolution.y * 0.5;
      const diff = (this.center - windowCenter) * -this.parallaxRatio;
      if (this.$store.state.isMobile === true) {
        return;
      } else {
        return {
          transform: `translate3d(0, ${diff}px, 0)`
        };
      }
    }
  },
  methods: {
    async getCenter() {
      const rect = this.$el.getBoundingClientRect();
      this.center = this.scrollY + rect.top + rect.height * 0.5;
    }
  }
};
</script>

<template lang="pug">
  div
    div(
      :style = 'styles'
      )
      slot
</template>

<style lang="scss"></style>
