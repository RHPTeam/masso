<template>
  <div class="campaigns--wrapper">
    <!-- Start: Header -->
    <app-header
      :filterShowSelected="filterShowSelected"
      :filterStatusSelected="filterStatusSelected"
      @updateFilterShowSelected="updateFilterShowSelected($event)"
      @updateFilterStatusSelected="filterStatusSelected = $event"
      @updateSearch="search = $event"
    />
    <!-- End: Header -->
    <!-- Start: Data Table -->
    <app-table
      :currentPage="currentPage"
      :filterShowSelected="filterShowSelected"
      :filterStatusSelected="filterStatusSelected"
      :search="search"
    />
    <!-- End: Data Table -->
    <!-- Start: Footer -->
    <app-footer
      :currentPage="currentPage"
      :filterShowSelected="filterShowSelected"
      @updateCurrentPage="currentPage = $event"
    />
    <!-- End: Footer -->
  </div>
</template>

<script>
import AppHeader from "./header/index";
import AppTable from "./table/index";
import AppFooter from "./footer/index";

export default {
  components: {
    AppHeader,
    AppTable,
    AppFooter
  },
  data() {
    return {
      currentPage: 1,
      filterShowSelected: { id: 25, name: "Hiển thị 25" },
      filterStatusSelected: { id: "all", name: "Tất cả trạng thái" },
      search: ""
    };
  },
  methods: {
    updateFilterShowSelected( val ) {
      this.filterShowSelected = val;
      this.currentPage = 1;

      const dataSender = {
        size: this.filterShowSelected.id,
        page: this.currentPage
      };

      this.$store.dispatch( "getCampaignsByPage", dataSender );
    }
  }
};
</script>

<style lang="scss" scoped></style>
