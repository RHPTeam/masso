<template>
  <div class="post--wrap">
    <!-- Start: Action -->
    <app-action
      :filterCategorySelected="filterCategorySelected"
      :filterShowSelected="filterShowSelected"
      @updateFilterCategorySelected="filterCategorySelected = $event"
      @updateFilterShowSelected="filterShowSelected = $event"
      @updateSearch="search = $event"
    />
    <!-- End: Action -->
    <!-- Start: Data List -->
    <app-table
      :filterCategorySelected="filterCategorySelected"
      :filterShowSelected="filterShowSelected"
      :search="search"
    />
    <!-- End: Data List -->
    <!-- Start: Info -->
<!--    <app-info />-->
    <!-- Start: Info -->
  </div>
</template>

<script>
import AppAction from "../../layouts/action/index";
import AppTable from "./table/index";

export default {
  components: {
    AppAction,
    AppTable
  },
  data() {
    return {
      filterCategorySelected: { id: "all", name: "Tất cả" },
      filterShowSelected: { id: 25, name: "Hiển thị 25" },
      search: ""
    }
  }
};
</script>

<style lang="scss" scoped></style>
