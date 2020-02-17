<script>
export default {
  name: 'WhoIAmContent',
}
</script>

<template lang="pug">
.p-whoiam-content
  .p-whoiam-content__section.p-whoiam-content__section--1
    h2
      |I'm a Web Developer.
      br
      |Just love World-Wide-Web.
    p
      |I love the web. I look forward to all the possibilities of the Web. Right now, I'm full of development with WebGL and Vue.js, but that's not all I'm interested in. The ever-expanding web world is very attractive. I will continue to develop the web.
    p
      |My career as a web developer started in 2006.
    p
      |As a teenager, I didn't go to college, so I don't have any degree right now. I also have no professional education on the web or programming. I have a career and track record of more than ten years as a web developer, but all that I did was blessed with good luck.
    p
      |The Japanese web industry is very rough and sloppy. There is still plenty of room for an empty-handed human like me. I was able to blend into the industry, and gradually acquire skills in business. Although I'm still not an expert in a particular genre, I've fully benefited from such an environment and still work as a front-end development handyman in many different types of work.
  .p-whoiam-content__section.p-whoiam-content__section--2
    h2
      |Expressing my identity
      br
      |as a Japanese Developer.
    p
      |When I started thinking about renewing my site, I didn't want to make this site just a portfolio. I explored what my identity was and tried to express it as much as possible using whatever technology I have now.
    p
      |Japan, where I was born, is a wealthy and peaceful country, but now it is on a gradual decline. The generations of my grandfather and father have prospered after a war defeat and economic growth, but our generation has not experienced the harsh like them. I think our generation is always indulging in our enjoyment, devouring what the previous generation has cultivated. The fact that I focus only on what I find fun without aiming for an expert seems to have such generational aspects and a great cause and effect. I thought that is just my identity.
  .p-whoiam-content__section.p-whoiam-content__section--3
    p
      |I have selected skull and flower objects as motifs for prosperity and death. To make them more ephemeral and vacuity, I colored these in brilliant golden color. The development way is composite with three.js and Vue-CLI. By these means, I'm proud that I have been able to reflect my innerness, generation, and physicality on this site.
    p
      |Initially, I planned to develop this site alone, but fortunately, I was able to get the help of my friend and designer Shunsuke Iseki, who has world-class skills. I was able to experience his art direction skills up close and was impressed by his precise work. I appreciate his great performance.
</template>

<style lang="scss">
.p-whoiam-content {
  overflow: hidden;
  line-height: (25 / 12);
  @include fontSizeAll(12, 12, 12);
  letter-spacing: 0.15em;
  @include l-more-than-mobile {
    margin-bottom: 300px;
  }
  @include l-mobile {
  }
  h2 {
    line-height: (30 / 18);
    margin-top: 0;
    @include fontSizeAll(18, 18, 18);
    @include l-more-than-mobile {
      margin-bottom: 25px;
    }
    @include l-mobile {
    }
  }
  p {
    margin-top: 0;
    margin-bottom: 20px;
  }
  &__section {
    text-align: justify;
    @include l-more-than-mobile {
      width: 500 / 1360 * 100%;
    }
    &--1 {
      @include l-more-than-mobile {
        margin-left: 50%;
        margin-bottom: 120px;
      }
    }
    &--2 {
      @include l-more-than-mobile {
        margin-left: 360 / 1360 * 100%;
        margin-bottom: 40px;
      }
    }
    &--3 {
      @include l-more-than-mobile {
        margin-left: 500 / 1360 * 100%;
      }
    }
  }

  // Transition
  transition-property: opacity;
  .view-enter & {
    opacity: 0;
  }
  .view-enter-to & {
    opacity: 1;
    transition-duration: 1s;
    transition-delay: 1.2s;
    transition-timing-function: $easeOutQuad;
  }
  .view-leave-to & {
    opacity: 0;
    transition-duration: .6s;
    transition-delay: 0s;
  }
}
</style>
