<template>
  <div class="main">
    <!-- Start: Desktop Component-->
    <div class="d_none d_md_block">
      <breadcrumb
        nameBread="Quản lý nhóm"
        subBread="Trang giúp bạn quản các trang và nhóm Facebook"
      />
      <!-- Start: Content -->
      <div class="main--content">
        <!-- Start: Group -->
        <app-group/>
        <!-- End: Group -->
        <!-- Start: Info -->
        <app-info/>
        <!-- End: Info -->
        <!-- Start: List -->
        <app-list/>
        <!-- End: List -->
      </div>
      <!-- End: Content -->
    </div>
    <!-- End: Desktop Component-->
  </div>
</template>

<script>
import AppGroup from "./desktop/group";
import AppInfo from "./desktop/info";
import AppList from "./desktop/list";

export default {
  components: {
    AppGroup,
    AppInfo,
    AppList
  }
};
</script>

<style lang="scss" scoped>

</style>
