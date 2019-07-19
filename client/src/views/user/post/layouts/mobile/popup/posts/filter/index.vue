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
                class="icon--go-to"
                icon-name="Submit"
                width="22"
                height="22"
                viewBox="0 0 33 33"
              >
                <icon-arrow-right />
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
      return this.$store.getters.categoriesPage;
    }
  },
  methods: {
    showAllPost() {
      const dataSender = {
        size: 25,
        page: 1
      };
      this.$store.dispatch( "getPostsByPage", dataSender );
      this.closePopup();
    },
    updateFilterCategorySelected(val) {
      // console.log(val);
      // this.$emit( "updateFilterCategorySelected", val );
      const dataSender = {
        categoryId: val._id,
        size: 25,
        page: 1
      };
      this.$store.dispatch("getPostByCategories", dataSender);
    },
    closePopup() {
      this.$emit("closePopup", false);
    }
  },
  created() {
    const categoriesNo = this.$store.getters.categoriesPage;
    if( categoriesNo.length === 0 ) {
      const dataSender = {
        size: 25,
        page: 1
      };

      this.$store.dispatch("getCategoriesByPage", dataSender);
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
    // background: #fff;
    // margin-bottom: 0.625rem;
    // border-radius: 0.625rem;
    // padding: 0.625rem 0;
    font-size: 0.875rem;
    border-top: 1px solid #514f4fa1;
    padding: 0.5rem 0;
    padding-left: 0.625rem;
    // text-align: center;
    // border: 1px solid #ccc;
  }
  .list--category {
    max-height: 90vh;
  }
}
</style>
