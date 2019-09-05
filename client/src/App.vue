<template>
  <div id="app">
    <vue-perfect-scrollbar class="scroll-area" ref="scroll">
      <router-view />
    </vue-perfect-scrollbar>
  </div>
</template>
<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import AppEvents from "@/views/user/post/campaigns/desktop/popup/events";

export default {
  components: {
    VuePerfectScrollbar,
    AppEvents,
    // AppWizard
  },
  computed: {
    caseEvent() {
      return this.$store.getters.caseEvent;
    },
    isShowWizard() {
      return this.$store.getters.isShowWizard;
    }
  },
  watch: {
    $route(to, from) {
      this.$refs.scroll.$el.scrollTop = 0;
    }
  },
};
</script>
<style lang="scss">
#app {
  font-family: "Open Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  .scroll-area {
    position: relative;
    height: 100vh;
  }
}
// RESPONSIVE
@media screen and (max-width: 767px) {
  #app {
    .ps > .ps__scrollbar-y-rail > .ps__scrollbar-y,
    .ps > .ps__scrollbar-x-rail > .ps__scrollbar-x,
    .ps:hover > .ps__scrollbar-y-rail:hover,
    .ps.ps--active-x > .ps__scrollbar-x-rail,
    .ps.ps--active-y > .ps__scrollbar-y-rail {
      display: none;
    }
  }
}
</style>
