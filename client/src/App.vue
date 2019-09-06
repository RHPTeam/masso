<template>
  <div id="app">
    <VuePerfectScrollbar class="scroll-area" ref="scroll">
      <router-view />
    </VuePerfectScrollbar>

    <!-- Start: Wizard-->
    <wizard-quick-post v-if="isShowWizard===true"/>
    <!-- End: Wizard-->

    <!--	Start: Create Campaign Popup Test Again	-->
    <transition name="popup">
      <app-events v-if="caseEvent.popup === true" @close="close( $event )" />
    </transition>
    <!--	End: Create Campaign Popup	-->
  </div>
</template>
<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import AppEvents from "@/views/user/post/campaigns/desktop/popup/events";
import WizardQuickPost from "@/components/shared/layouts/wizard/quickpost";


export default {
  components: {
    VuePerfectScrollbar,
    AppEvents,
    WizardQuickPost
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
