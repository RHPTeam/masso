<template>
  <div class="main">
    <!-- Start: Desktop Component-->
    <div class="d_none d_md_block">
      <breadcrumb
        nameBread="Thông báo"
        subBread="Lorem ipsum dolor sit amet, consetetur sadipscing elitr"
      />
      <!-- Start: Content -->
      <div class="main--content">
        <app-desktop/>
      </div>
      <!-- End: Content -->
    </div>
    <!-- End: Desktop Component-->
  </div>
</template>

<script>
import AppDesktop from "./desktop/index";

export default {
  components: {
    AppDesktop
  }
};
</script>

<style lang="scss" scoped>

</style>
