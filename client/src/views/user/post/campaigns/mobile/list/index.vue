<template>
  <div class="campaigns--wrapper">
    <!-- Start: Header -->
    <!-- <app-header
      :filterShowSelected="filterShowSelected"
      :filterStatusSelected="filterStatusSelected"
      @updateFilterShowSelected="updateFilterShowSelected($event)"
      @updateFilterStatusSelected="filterStatusSelected = $event"
      @updateSearch="search = $event"
    /> -->
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
    <!-- <app-footer
      :currentPage="currentPage"
      :filterShowSelected="filterShowSelected"
      :search="search"
      @updateCurrentPage="currentPage = $event"
    /> -->
    <!-- End: Footer -->
  </div>
</template>

<script>
import AppHeader from "./header";
import AppTable from "./table/index";
import AppFooter from "../components/footer";

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
  created() {
    const page = this.$route.query.page,
          size = this.$route.query.size;

    this.currentPage = Number( page );
    this.filterShowSelected.id = Number( size );
    this.filterShowSelected.name = `Hiển thị ${size}`;
  },
  methods: {
    async updateFilterShowSelected( val ) {
      this.filterShowSelected = val;
      this.currentPage = 1;

      const dataSender = {
        size: this.filterShowSelected.id,
        page: this.currentPage
      };

      await this.$store.dispatch( "getCampaignsByPage", dataSender );

      this.$router.replace( {
        name: "post_campaigns",
        query: {
          size: this.filterShowSelected.id,
          page: this.currentPage
        }
      } );
    }
  }
};
</script>

<style lang="scss" scoped></style>
