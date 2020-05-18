<script>
import sleep from 'js-util/sleep';
import MathEx from 'js-util/MathEx';
import normalizeWheel from 'normalize-wheel';

import store from '@/store';
import WhoIAmSection from '@/components/who-i-am/WhoIAmSection.vue';
import WhoIAmHeading from '@/components/who-i-am/WhoIAmHeading.vue';
import WhoIAmThanks from '@/components/who-i-am/WhoIAmThanks.vue';
import WhoIAmLinks from '@/components/who-i-am/WhoIAmLinks.vue';

export default {
  name: 'WhoIAm',
  metaInfo: {
    title: 'Who I am / '
  },
  components: {
    WhoIAmSection,
    WhoIAmHeading,
    WhoIAmThanks,
    WhoIAmLinks
  },
  data() {
    return {
      scrollY: 0,
      anchorY: 0,
      anchorYPrev: 0,
      clientHeight: 0,
      isRendering: false
    };
  },
  watch: {
    async '$store.state.resolution.y'() {
      await sleep(10);
      this.resize();
    }
  },
  computed: {
    styles() {
      return {
        paddingTop: `${this.$store.state.resolution.y / 2}px`,
        transform: `translate3d(0, ${-this.scrollY}px, 0)`
      };
    }
  },
  beforeRouteEnter(to, from, next) {
    store.commit('transit', {
      globalId: 50
    });
    next();
  },
  created() {
    window.addEventListener('wheel', this.wheel, { passive: false });
    window.addEventListener('touchstart', this.touchstart);
    window.addEventListener('touchmove', this.touchmove);
    this.scrollY = 0;
    this.anchorY = 0;
    this.anchorYPrev = 0;
    this.$store.commit('setScrollProgress', 0);
  },
  async mounted() {
    this.$store.commit('changeBackground', {
      isHome: false,
      hasDelay: false
    });
    this.$store.commit('showHomeObjs', false);
    this.$store.commit('showWorksObjs', {
      index: 0,
      direction: 1
    });
    this.$store.commit('showWhoIAmObjs', true);
    await sleep(500);
    this.$store.commit('showUI');
    this.isRendering = true;
    this.resize();
    this.update();
  },
  destroyed() {
    window.removeEventListener('wheel', this.wheel, { passive: false });
    window.removeEventListener('touchstart', this.touchstart);
    window.removeEventListener('touchmove', this.touchmove);
    this.isRendering = false;
  },
  methods: {
    update() {
      this.scrollY =
        Math.floor((this.scrollY + (this.anchorY - this.scrollY) / 10) * 100) /
        100;
      this.$store.commit(
        'setScrollProgress',
        this.scrollY / (this.clientHeight - this.$store.state.resolution.y)
      );
      if (this.isRendering === true) {
        requestAnimationFrame(this.update);
      }
    },
    wheel(e) {
      e.preventDefault();

      const n = normalizeWheel(e);
      const { state, commit } = this.$store;

      if (state.isWheeling === true) return;

      if (this.scrollY < 1 && n.pixelY < 0) {
        // Go to the previous page.
        commit('startWheeling');
        this.$router.push(`/works/${state.works[state.works.length - 1].key}/`);
      } else {
        // Scroll the content of the current page.
        this.anchorY = MathEx.clamp(
          this.anchorY + n.pixelY,
          0,
          this.clientHeight - state.resolution.y
        );
      }
    },
    touchstart() {
      this.anchorYPrev = this.anchorY;
    },
    touchmove() {
      const { state, commit, dispatch } = this.$store;

      if (state.isTouchMoving === true) {
        if (this.scrollY < 1 && state.touchMove.y > 10) {
          // Go to the previous page.
          dispatch(
            'debounceRouterPush',
            `/works/${state.works[state.works.length - 1].key}/`
          );
          commit('touchEnd');
        } else {
          // Scroll the content of the current page.
          this.anchorY = MathEx.clamp(
            this.anchorYPrev - state.touchMove.y * 1.5,
            0,
            this.clientHeight - state.resolution.y
          );
        }
      }
    },
    resize() {
      this.clientHeight = this.$refs['whoiam-wrap'].clientHeight;
      this.anchorY = MathEx.clamp(
        this.anchorY,
        0,
        this.clientHeight - this.$store.state.resolution.y
      );
      this.$store.commit(
        'setScrollProgress',
        this.scrollY / (this.clientHeight - this.$store.state.resolution.y)
      );
    }
  }
};
</script>

<template lang="pug">
.p-view-wrap
  .p-whoiam-wrap(
    :style = 'styles'
    ref = 'whoiam-wrap'
    )
    .p-whoiam-wrap__in
      WhoIAmHeading
      WhoIAmSection(
        :num = '1'
        :scrollY = 'scrollY'
        :parallaxRatio = '0.1'
        )
        h2
          |I'm a Web Developer.
          br
          |Just love World-Wide-Web.
        p
          |I love the web. I look forward to all the possibilities of the Web. Right now, I'm good at developing with three.js and Vue.js, but that's not all I'm interested in. The ever-expanding web world is very attractive. I will continue to develop the web.
        p
          |My career as a web developer started in 2006.
        p
          |As a teenager, I didn't go to college, so I don't have any degree right now. I also have no professional education on the web or programming. I have a career and track record of more than ten years as a web developer, but all that I did was blessed with good luck.
        p
          |The Japanese web industry is very rough and sloppy. There is still plenty of room for an empty-handed human like me. I was able to blend into the industry, and gradually acquire skills in business. Although I'm still not an expert in a particular genre, I've fully benefited from such an environment and still work as a front-end development handyman in many different types of work.
      WhoIAmSection(
        :num = '2'
        )
        h2
          |Expressing my identity
          br
          |as a Japanese Developer.
        p
          |When I started thinking about renewing my site, I didn't want to make this site just a portfolio. I explored what my identity was and tried to express it as much as possible using whatever technology I have now.
        p
          |Japan, where I was born, is a wealthy and peaceful country, but now it is on a gradual decline. The generations of my grandfather and father have prospered after a war defeat and economic growth, but our generation has not experienced the harsh like them. I think our generation is always indulging in our enjoyment, devouring what the previous generation has cultivated. The fact that I focus only on what I find fun without aiming for an expert seems to have such generational aspects and a great cause and effect. I thought that is just my identity.
      WhoIAmSection(
        :num = '3'
        :scrollY = 'scrollY'
        :parallaxRatio = '0.1'
        )
        p
          |I have selected skull and flower objects as motifs for prosperity and death. To make them more ephemeral and vacuity, I colored these in brilliant golden color. The development way is composite with three.js and Vue-CLI. By these means, I'm proud that I have been able to reflect my innerness, generation, and physicality on this site.
        p
          |Initially, I planned to develop this site alone, but fortunately, I was able to get the help of my friend and designer Shunsuke Iseki, who has world-class skills. I was able to experience his art direction skills up close and was impressed by his precise work. I appreciate his excellent performance.
      WhoIAmLinks(
        :scrollY = 'scrollY'
        :parallaxRatio = '0.05'
        )
      WhoIAmThanks
</template>

<style lang="scss">
.p-whoiam-wrap {
  @include l-more-than-mobile {
    margin-right: 7.5%;
    margin-left: 7.5%;
    padding-bottom: 300px;
  }
  @include l-mobile {
    margin-right: 44px;
    margin-left: 44px;
    padding-bottom: 44px;
  }
  &__in {
    position: relative;
    margin-top: -25px;
  }
}
</style>
