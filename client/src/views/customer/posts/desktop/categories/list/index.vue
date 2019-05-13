<template>
  <div class="category--data my_3" :data-theme="currentTheme">
    <div class="wrapper">
      <div class="item--header d_flex align_items_center px_3 py_2">
      <div class="col col--checkbox px_2">
        <label class="custom--checkbox mb_0">
          <input type="checkbox" />
        </label>
      </div>
      <div class="col col--category px_2">Tên danh mục</div>
      <div class="col col--posts text_center px_2">Số bài viết</div>
      <div class="col col--description px_2">Mô tả</div>
      <div class="col col--action px_4">Hành động</div>
    </div>

    <div class="item--wrap">
      <item-categories
        v-for="(item, index) in categories"
        :key="index"
        :item="item"
        @update="changeUpdate($event)"
      />
    </div>
    <!-- Start: Paginate Categories -->
    <div class="mt_3">
      <category-paginate />
    </div>
    <!-- End: Paginate Categories -->
    </div>
  </div>
</template>

<script>
import ItemCategories from "./item";
import CategoryPaginate from "./paginate";

export default {
  components: {
    ItemCategories,
    CategoryPaginate
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    categories() {
      if (
        Object.entries(this.$store.getters.categories ).length === 0 &&
        this.$store.getters.categories.constructor === Object
      ) return;

      return this.$store.getters.categories;
    }
  },
  async created() {
    await this.$store.dispatch( "getAllCategories" );
  },
  methods: {
    changeUpdate( ev ) {
      this.$emit( "changeUpdate", ev );
    }
  }
};
</script>
 
<style lang="scss" scoped>
@import "./index.style";
</style>
