<template>
  <div class="category">
      <div class="top d_flex align_items_center py_3 px_3 mb_2" @click="resetPostType">
        <div class="icon">
          <icon-base
            class="icon--arrow-left"
            icon-name="arrow"
            width="18"
            height="22"
            viewBox="0 0 28 28"
          >
            <icon-arrow-left></icon-arrow-left>
          </icon-base>
        </div>
        <div class="text">Tự động đăng bài viết từ danh mục</div>
      </div>
      <div class="body mb_3">
        <div class="desc mb_2">
          <icon-base
            class="icon--sort-down"
            icon="icon--sort-down"
            width="14px"
            heigh="5px"
            viewBox="0 0 14 14"
          >
            <icon-sort-down></icon-sort-down>
          </icon-base>
          Vui lòng chọn một danh mục bài viết
        </div>
        <div class="option">

          <multiselect
            label="title"
            :clearable="false"
            :options="categories"
            @input="selectCategory"
            placeholder="Chọn danh mục đăng bài "
          />
        </div>
      </div>
      <div class="bottom">
        <!--Start: Post detail -->
        <global-option />
        <!--End: Post detail -->
      </div>
  </div>
</template>

<script>
import GlobalOption from "../components/target";
export default {
  components: {
    GlobalOption
  },
  props: {
    event: Object
  },
  computed: {
    categories(){
      return this.$store.getters.allCategories;
    }
  },
  methods: {
    resetPostType() {
      this.$store.dispatch( "setCaseEvent", {
        key: "target",
        value: 0
      } );
      this.$store.dispatch( "setCaseEvent", {
        key: "post",
        value: 0
      } );
    },
    selectCategory( category ){
      this.$store.dispatch( "setEvent", {
        key: "post_category",
        value: category._id
      } );
    }
  },
}
</script>

<style lang="scss" scoped>
.category {
  background-color: #fafafa;
  color: $mainDarkLight;
  .top {
    background-color: #cccccc;
    border-radius: calc(.5rem + 2px);
    cursor: pointer;
    .icon {
      svg {
        margin-bottom: -6px;
      }
    }
  }
  .body {
    .desc {
      svg {
        margin-bottom: -8px;
      }
      font-weight: 600;
    }
    .option {
      width: 50%;
      border: 1px solid $border-color;
      border-radius: calc(.5rem + 2px);
    }
  }
}
</style>
