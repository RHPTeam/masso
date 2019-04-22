<template>
  <div class="main">
    <!-- Start: Desktop Component-->
    <div class="d_none d_md_block">
      <breadcrumb
        nameBread="Bạn bè Facebook"
        subBread="Trang giúp bạn thiết lập nhanh các nhóm bạn bè"
      />
      <!-- Start: Content -->
      <div class="main--content">
        <!-- Start: Group -->
        <app-group/>
        <!-- End: Group -->
        <!-- Start: Attribute -->
        <app-attribute/>
        <!-- End: Attribute -->
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
import AppAttribute from "./desktop/attribute";
import AppInfo from "./desktop/info";
import AppList from "./desktop/list";

export default {
  components: {
    AppGroup,
    AppAttribute,
    AppInfo,
    AppList
  }
};
</script>

<style lang="scss" scoped>

</style>
