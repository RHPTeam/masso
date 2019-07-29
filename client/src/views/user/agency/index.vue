<template>
  <div class="main--agency">
    <!-- Start: Desktop -->
    <div class="d_none d_md_block">
      <app-desktop />
    </div>
    <!-- End: Desktop -->
    <!-- Start: Mobile -->
    <div class="d_block d_md_none">
      <app-mobile />
    </div>
    <!-- End: Mobile -->
  </div>
</template>

<script>
import AppDesktop from "./desktop";
import AppMobile from "./mobile";
export default {
  components: {
    AppDesktop,
    AppMobile
  }
};
</script>

<style scoped>
</style>