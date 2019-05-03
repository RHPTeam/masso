<template>
  <div class="campaigns--wrapper">
    <!-- Start: Header -->
    <app-header
      :filterShowSelected="filterShowSelected"
      :filterStatusSelected="filterStatusSelected"
      @updateFilterShowSelected="filterShowSelected = $event"
      @updateFilterStatusSelected="filterStatusSelected = $event"
      @updateSearch="search = $event"
    />
    <!-- End: Header -->
    <!-- Start: Data Table -->
    <app-table
      :filterShowSelected="filterShowSelected"
      :filterStatusSelected="filterStatusSelected"
      :search="search"
    />
    <!-- End: Data Table -->
  </div>
</template>

<script>
import AppHeader from "./header";
import AppTable from "./table";
export default {
  components: {
    AppHeader,
    AppTable
  },
  data() {
    return {
      filterShowSelected: { id: 25, name: "Hiển thị 25" },
      filterStatusSelected: { id: "all", name: "Tất cả trạng thái" },
      search: ""
    };
  }
};
</script>

<style lang="scss" scoped></style>
