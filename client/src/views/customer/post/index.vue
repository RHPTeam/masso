<template>
  <div class="main" :data-theme="currentTheme">
    <!-- Start: Desktop Component-->
    <div class="d_none d_md_block">
      <breadcrumb
        nameBread="Facebook Post"
        subBread="Lorem ipsum dolor sit amet, consetetur sadipscing elitr"
      />
      <!-- Start: Content -->
      <div class="main--content">
        <!-- Start: Filter -->
        <app-filter />
        <!-- End: Filter -->
        <!-- Start: Action -->
        <app-action />
        <!-- End: Action -->
        <!-- Start: Data List -->
        <app-list />
        <!-- End: Data List -->
        <!-- Start: Info -->
        <app-info />
        <!-- Start: Info -->
      </div>
      <!-- End: Content -->
    </div>
    <!-- End: Desktop Component-->
  </div>
</template>

<script>
import AppFilter from "./desktop/filter/index";
import AppAction from "./desktop/action/index";
import AppList from "./desktop/data-list/index";
import AppInfo from "./desktop/info/index";
export default {
  components: {
    AppFilter,
    AppAction,
    AppList,
    AppInfo
  }
};
</script>

<style lang="scss" scoped></style>
