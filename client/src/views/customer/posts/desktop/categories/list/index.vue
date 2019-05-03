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
      <div class="col col--posts px_2">Số bài viết</div>
      <div class="col col--description px_2">Mô tả</div>
      <div class="col col--action px_4">Hành động</div>
    </div>

    <div class="item--wrap">
      <div v-for="(item, index) in categories" :key="index">
        <item-categories :item="item" @update="changeUpdate($event)" />
      </div>
    </div>
    <!-- Start: Paginate Categories -->
    <div>
      <cate-paginate />
    </div>
    <!-- End: Paginate Categories -->
    </div>
  </div>
</template>

<script>
import ItemCategories from "./item";
import CatePaginate from "./paginate";
export default {
  components: {
    ItemCategories,
    CatePaginate
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    categories() {
      return this.$store.getters.categories.results;
    }
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
