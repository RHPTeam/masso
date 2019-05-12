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
      :currentPage="currentPage"
      :filterCategorySelected="filterCategorySelected"
      :filterShowSelected="filterShowSelected"
      :search="search"
    />
    <!-- End: Data List -->
    <!-- Start: pagination post-->
    <div class="mt_3">
      <app-paginate
        :currentPage="currentPage"
        :filterShowSelected="filterShowSelected"
      />
    </div>
    <!-- End: pagination post-->
  </div>
</template>

<script>
import AppAction from "../../layouts/action/index";
import AppPaginate from "./paginate";
import AppTable from "./table/index";

export default {
  components: {
    AppAction,
    AppPaginate,
    AppTable
  },
  data() {
    return {
      currentPage: 1,
      filterCategorySelected: { id: "all", name: "Tất cả" },
      filterShowSelected: { id: 25, name: "Hiển thị 25" },
      search: ""
    }
  }
};
</script>

<style lang="scss" scoped></style>
