<template>
  <div class="main">
    <!-- Start: Desktop Component-->
    <app-desktop />
    <!-- End: Desktop Component-->

    <!-- Start: Mobile Component -->
    <app-mobile />
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
  }
}
</script>

<style lang="scss" scoped>
// @import "./index.style";
</style>

