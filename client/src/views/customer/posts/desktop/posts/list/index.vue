<template>
  <div class="post--wrap">
    <!-- Start: Action -->
    <app-action
      :filterCategorySelected="filterCategorySelected"
      :filterShowSelected="filterShowSelected"
      @updateFilterCategorySelected="filterCategorySelected = $event"
      @updateFilterShowSelected="filterShowSelected = $event"
    />
    <!-- End: Action -->
    <!-- Start: Data List -->
    <app-list
      :filterCategorySelected="filterCategorySelected"
      :filterShowSelected="filterShowSelected"
    />
    <!-- End: Data List -->
    <!-- Start: Info -->
<!--    <app-info />-->
    <!-- Start: Info -->
  </div>
</template>

<script>
import AppAction from "../../layouts/action/index";
import AppList from "./table/index";

export default {
  components: {
    AppAction,
    AppList
  },
  data() {
    return {
      filterCategorySelected: { id: "all", name: "Tất cả" },
      filterShowSelected: { id: 25, name: "Hiển thị 25" }
    }
  }
};
</script>

<style lang="scss" scoped></style>
