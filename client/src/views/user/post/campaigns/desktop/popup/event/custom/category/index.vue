<template>
  <div class="category">
    <div class="top d_flex align_items_center justify_content_between mb_3">
      <div class="top--left"
           @click="resetPostType"
      >≪ Quay lại</div>
      <div class="top--right d_flex align_items_center">
        <div class="mr_2">Đăng bài viết từ danh mục</div>
        <div class="icon">
          <icon-base
            class="icon--categories"
            :style="[ { color: event.color }, { stroke: event.color } ]"
            height="20px"
            width="20px"
            viewBox="0 0 460 460"
          >
            <icon-categories></icon-categories>
          </icon-base>
        </div>
      </div>
    </div>
    <div class="body p_3 mb_4">
      <div class="desc mb_3">
        <icon-base
          class="icon--sort-down"
          icon="icon--sort-down"
          width="14px"
          heigh="5px"
          viewBox="0 0 14 14"
        >
          <icon-sort-down></icon-sort-down>
        </icon-base>
        <span class="desc--text">Danh mục bài viết</span>
      </div>
      <div class="option">
        <multiselect
          label="title"
          :value="event.post_category"
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
import GlobalOption from "../components/target/index";
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
      // Remove post_category
      this.$store.dispatch( "setEventRemove", "post_category" );
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
  background-color: #f7f7f7;
  color: $mainDarkLight;
  .top {
    font-size: .825rem;
    .top--left {
      color: #666;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
    .top--right {
      color: #666;
      .icon {
        .icon--categories {
          stroke-width: 5;
          transition: all 1s ease;
          vertical-align: middle;
        }
      }
    }
  }
  .body {
    background-color: #fff;
    border-radius: .625rem;
    .desc {
      color: #666;
      font-size: .875rem;
      font-weight: 600;
      svg {
        margin-bottom: -8px;
      }
    }
    .option {
      border: 1px solid #e4e4e4;
      border-radius: calc(.5rem + 2px);
      width: 50%;
    }
  }
}
</style>
