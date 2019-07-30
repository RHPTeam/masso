<template>
  <div class="dropdown--filter-post position_fixed">
    <div class="items--header d_flex align_items_center mb_2">
      <div @click="closePopup">
        <icon-base
          icon-name="arrow-down"
          class="arrow-down"
          width="20"
          height="20"
          viewBox="0 0 130 130"
        >
          <icon-arrow-down />
        </icon-base>
      </div>
      <p class="name--modal mb_0 m_auto">Danh mục</p>
    </div>
    <div class="items--body">
      <div class="title mb_2 pl_2">Chọn danh mục bạn muốn lọc</div>
      <VuePerfectScrollbar class="list--category">
        <div v-if="categories.length === 0" class="text_center py_2">Không có danh mục nào</div>
        <div v-else>
          <div class="item d_flex" @click="showAllPost">
            <span>Tất cả</span>
            <span class="ml_auto mr_2">
              <icon-base
                icon-name="arrow-down"
                class="icon--arrow-right"
                width="10"
                height="10"
                viewBox="0 0 130 130"
              >
                <icon-arrow-down />
              </icon-base>
            </span>
          </div>
          <item-category
            :item="item"
            v-for="(item, index) in categories"
            :key="index"
            @closePopup="closePopup"
            @updateFilterSelected="updateFilterCategorySelected($event)"
          />
        </div>
      </VuePerfectScrollbar>
    </div>
  </div>
</template>

<script>
import ItemCategory from "./item";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
export default {
  components: {
    ItemCategory,
    VuePerfectScrollbar
  },
  computed: {
    categories() {
      return this.$store.getters.allCategories;
    }
  },
  methods: {
    closePopup() {
      this.$emit("closePopup", false);
    },
    showAllPost() {
      this.$store.dispatch("actionCursor", 11);
      const dataSender = {
        page: 1,
        size: 25
      };
      this.$store.dispatch("getPostsByPage", dataSender);
      this.closePopup();
    },
    updateFilterCategorySelected(val) {
      this.$store.dispatch("actionCursor", 14);
      const dataSender = {
        categoryId: val._id,
        size: 25,
        page: 1
      };
      this.$store.dispatch("getPostByCategoriesMobile", dataSender);
      this.$store.dispatch("getCategoryById", val._id);
    }
  },
  created() {
    const categoriesNo = this.$store.getters.allCategories;
    if( categoriesNo.length === 0 ) {

      this.$store.dispatch("getAllCategories");
    }
  }
};
</script>

<style scoped lang="scss">
.dropdown--filter-post {
  width: 100vw;
  height: 100vh;
  background: #2b2d33;
  left: 0;
  top: 0;
  // color: #333;
  z-index: 10;
  .items--header {
    padding: 0.625rem 0;
    border-bottom: 1px solid #444;
    .arrow-down {
      transform: rotate(90deg);
      margin-left: 0.5rem;
    }
  }
  .item {
    color: #ccc;
    font-size: 0.875rem;
    border-top: 1px solid #514f4fa1;
    padding: 0.5rem 0.5rem 0.5rem 1rem;
    .icon--arrow-right {
      transform: rotate(-90deg);
    }
  }
  .list--category {
    max-height: 89vh;
  }
}
</style>
