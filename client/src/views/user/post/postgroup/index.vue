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
        <app-group
          :groupSelected="groupSelected"
          @updateGroupSelected="groupSelected = $event"

        />
        <!-- End: Group -->
        <!-- Start: Info -->
        <app-info
          :groupSelected="groupSelected"
          :typeFilterSelected="typeFilterSelected"
          @updateFilterSelected="typeFilterSelected = $event"
        />
        <!-- End: Info -->
        <!-- Start: List -->
        <app-table
          :groupSelected="groupSelected"
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
import AppGroup from "./desktop/group/index";
import AppInfo from "./desktop/info/index";
import AppTable from "./desktop/table/index";

export default {
  components: {
    AppGroup,
    AppInfo,
    AppTable
  },
  data(){
    return {
      groupSelected: false,
      typeFilterSelected: "Tất cả"
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
