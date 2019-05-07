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
        <app-info
          :typeFilterSelected="typeFilterSelected"
          @updateFilterSelected="typeFilterSelected = $event"
        />
        <!-- End: Info -->
        <!-- Start: List -->
        <app-table
          :typeFilterSelected="typeFilterSelected"
        />
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
import AppTable from "./desktop/table";

export default {
  components: {
    AppGroup,
    AppInfo,
    AppTable
  },
  data(){
    return {
      typeFilterSelected: "Tất cả"
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
