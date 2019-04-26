<template>
  <div class="main">
    <!-- Start: Desktop Component-->
    <div class="d_none d_md_block">
      <breadcrumb
        nameBread="Chiến dịch"
        subBread="Lorem ipsum dolor sit amet, consetetur sadipscing elitr"
      />
      <!-- Start: Header -->
      <app-header
        :filterShowSelected="filterShowSelected"
        :filterStatusSelected="filterStatusSelected"
        @updateFilterShowSelected="filterShowSelected = $event"
        @updateFilterStatusSelected="filterStatusSelected = $event"
        @updateSearch="search = $event"
      />
      <!-- End: Header -->
      <!-- Start: Content -->
      <div class="main--content">
        <!-- Start: Data Table -->
        <app-table
          :filterShowSelected="filterShowSelected"
          :filterStatusSelected="filterStatusSelected"
          :search="search"
        />
        <!-- End: Data Table -->
      </div>
      <!-- End: Content -->
    </div>
    <!-- End: Desktop Component-->
  </div>
</template>

<script>
import AppHeader from "./header";
import AppTable from "./table";
export default {
  data() {
    return {
      filterShowSelected: { id: 25, name: "Hiển thị 25" },
      filterStatusSelected: { id: "all", name: "Tất cả trạng thái" },
      search: ""
    };
  },
  components: {
    AppHeader,
    AppTable
  }
};
</script>

<style lang="scss" scoped></style>
