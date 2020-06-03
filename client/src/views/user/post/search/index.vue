<template>
  <div class="main">
    <!--Start: Desktop Component-->
    <div class="d_none d_md_block" v-if="innerWidth > 768">
      <app-desktop></app-desktop>
    </div>
    <!--End: Desktop Component-->

    <!--Start: Mobile Component-->
    <div class="d_block d_md_none" v-else>
      <app-mobile />
    </div>
    <!--End: Mobile Component-->
  </div>
</template>

<script>
import AppDesktop from "./desktop";
import AppMobile from "./mobile/list";

export default {
  components: {
    AppDesktop,
    AppMobile
  },
  data() {
    return {
      innerWidth: 0
    };
  },
  mounted() {
    this.$nextTick(function() {
      window.addEventListener("resize", this.getWindowWidth);
      this.getWindowWidth();
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.getWindowWidth);
  },
  methods: {
    getWindowWidth(event) {
      this.innerWidth = window.innerWidth;
    }
  }
};
</script>

<style scoped lang="scss">
</style>
