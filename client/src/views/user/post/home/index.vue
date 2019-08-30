<template>
  <div class="main">
    <!-- Start: Desktop Component-->
    <div class="d_md_block d_none" v-if="innerWidth > 768">
      <app-desktop />
    </div>
    <!-- End: Desktop Component-->

    <!-- Start: Mobile Component -->
    <div class="d_block d_md_none" v-else>
      <app-mobile />
    </div>
    <!-- End: Mobile Component -->
  </div>
</template>

<script>
import AppDesktop from "./desktop"
import AppMobile from "./mobile/main"
export default {
  components: {
    AppDesktop,
    AppMobile
  },
  data() {
    return {
      statusNetwork: true,
      showExpire: false,
      innerWidth: 0
    };
  },
  computed: {
    variableControlGuide(){
      return this.$store.getters.variableControlGuide;
    }
  },
  mounted() {
    this.$nextTick(function() {
      window.addEventListener('resize', this.getWindowWidth);
      this.getWindowWidth();
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.getWindowWidth);
  },
  methods: {
    getWindowWidth(event) {
      this.innerWidth = window.innerWidth;
    }
  }
}
</script>

<style lang="scss" scoped>
// @import "./index.style";
</style>

