<template>
  <div class="main">
    <!-- Start: Desktop Component-->
    <div class="d_md_block d_none">
      <app-desktop />
    </div>
    <!-- End: Desktop Component-->

    <!-- Start: Mobile Component -->
    <div class="d_block d_md_none">
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
  created() {
    this.$store.dispatch("getAllAnalysis");
    this.$store.dispatch("getAllStaticCampagin");
    this.$store.dispatch("getAllSttPost");
    this.$store.dispatch("getNewestPosts", 5);
  },
}
</script>

<style lang="scss" scoped>
// @import "./index.style";
</style>

