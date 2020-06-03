<template>
  <div class="post--wrap">
    <!-- Start: Action -->
    <app-action
      :filterCategorySelected="filterCategorySelected"
      :filterShowSelected="filterShowSelected"
      :currentPage="currentPage"
      @updateCurrentPage="updateCurrentPage($event)"
      @updateFilterCategorySelected="filterCategorySelected = $event"
      @updateFilterShowSelected="updateFilterShowSelected($event)"
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
        :search="search"
        :currentPage="currentPage"
        :filterCategorySelected="filterCategorySelected"
        :filterShowSelected="filterShowSelected"
        @updateCurrentPage="updateCurrentPage($event)"
      />
    </div>
    <!-- End: pagination post-->
  </div>
</template>

<script>
import AppAction from "../../layouts/actions/posts/index";
import AppPaginate from "./paginate/index";
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
      filterCategorySelected: { id: "all", title: "Tất cả" },
      filterShowSelected: { id: 25, name: "Hiển thị 25" },
      search: ""
    };
  },
  computed: {
    allCategories() {
      return this.$store.getters.allCategories;
    }
  },
  async created() {
    const page = this.$route.query.page,
      size = this.$route.query.size,
      search = this.$route.query.search,
      categoryId = this.$route.query.categoryId;

    this.currentPage = Number(page);
    this.filterShowSelected.id = Number(size);
    this.filterShowSelected.name = `Hiển thị ${size}`;
    if (search !== undefined) {
      this.search = search;
    }
    if (categoryId !== undefined) {
      await this.$store.dispatch("getAllCategories");
      const category = this.allCategories.filter(item => {
        return item._id === categoryId;
      });

      this.filterCategorySelected = {
        id: categoryId,
        title: category[0].title
      };
    }
  },
  methods: {
    updateCurrentPage(page) {
      this.currentPage = page;
    },
    async updateFilterShowSelected(selected) {
      this.filterShowSelected = selected;
      this.currentPage = 1;

      const dataSender = {
        size: this.filterShowSelected.id,
        page: this.currentPage
      };
      await this.$store.dispatch("getPostsByPage", dataSender);

      this.$router.replace({
        name: "post_posts",
        query: {
          size: this.filterShowSelected.id,
          page: this.currentPage
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
