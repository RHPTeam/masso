<template>
  <div class="category--wrap">
    <div class="ct_f">
      <div class="r">
        <div class="c_12 c_lg_12 c_xl_4 mb_0 mb_md_5 pl_0">
          <!-- Start: Category Form -->
          <app-form
            :currentPage="currentPage"
            :filterShowSelected="filterShowSelected"
            :isUpdateCategory="isUpdateCategory"
            @cancelUpdateCategory="isUpdateCategory = $event"
          />
          <!-- End: Category Form -->
        </div>
        <div class="c_12 c_lg_12 c_xl_8">
          <!-- Start: Action -->
          <app-action
            :filterShowSelected="filterShowSelected"
            @updateFilterShowSelected="updateFilterShowSelected($event)"
            @updateSearch="search = $event"
          />
          <!-- End: Action -->
          <!-- Start: Data List -->
          <app-list
            :currentPage="currentPage"
            :filterShowSelected="filterShowSelected"
            :search="search"
            @updateCategory="updateCategory( $event )"
            @updateCurrentPage="currentPage = $event"
          />
          <!-- End: Data List -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppAction from "../layouts/actions/categories";
import AppForm from "./form";
import AppList from "./list";

export default {
  components: {
    AppAction,
    AppForm,
    AppList
  },
  data() {
    return {
      currentPage: 1,
      filterShowSelected: { id: 25, name: "Hiển thị 25" },
      isUpdateCategory: false,
      search: ""
    };
  },
  async created() {
    await this.$store.dispatch( "getAllCategories" );
  },
  methods: {
    updateCategory( category ) {
      this.isUpdateCategory = true;
      this.$store.dispatch( "getCategoryById", category._id );
    },
    updateFilterShowSelected( val ) {
      this.filterShowSelected = val;
      this.currentPage = 1;

      const dataSender = {
        size: this.filterShowSelected.id,
        page: this.currentPage
      };

      this.$store.dispatch( "getCategoriesByPage", dataSender );
    }
  }
};
</script>

<style lang="scss" scoped></style>
