<template>
  <div class="category" :data-theme="currentTheme">
    <!-- Start: Top -->
    <div class="top mb_3">
      <div class="back mb_3" @click="comebackOption"> << Thay đổi</div>
      <div>Tùy chọn đăng bài viết trong danh mục của bạn</div>
    </div>
    <!-- End: Top -->
    <!-- Start: Body -->
    <div class="body mb_3">
      <div class="desc mb_3 text_left">
        <span class="desc--text">Danh mục bài viết</span>
      </div>
      <div class="option mb_3">
        <multiselect
          label="title"
          :clearable="false"
          :options="categories"
          @input="selectCategory"
          placeholder="Chọn danh mục đăng bài "
        />
<!--        :value="event.post_category"-->
      </div>
        <div class="desc">Thằng ngu chọn danh mục không có bài viết kìa</div>
    </div>
    <!-- End: Body -->
    <!-- Start: Bottom -->
    <!-- End: Bottom -->
  </div>
</template>

<script>
export default {
  props: {
    event: Object
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    categories(){
      return this.$store.getters.allCategories;
    }
  },
  async created(){
    if ( this.categories.length === 0 ) {
      await this.$store.dispatch( "getAllCategories" );
    }
  },
  methods: {
    comebackOption(){
      this.$store.dispatch( "setCaseEvent", {
        key: "post",
        value: 0
      } );
    },
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
        value: {
          _id: category._id,
          title: category.title
        }
      } );
    }
  },
}
</script>

<style lang="scss" scoped>
  .category {
    /*background-color: #f7f7f7;*/
    color: $mainDarkLight;
    .top {
      .back {
        cursor: pointer;
        text-decoration: underline;
      }
    }
    .body {
      /*background-color: #fff;*/
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
    .bottom {
      .next {
        border: 1px solid #e4e4e4;
        border-radius: .625rem;
        cursor: pointer;
        padding: .5rem 1rem;
      }
    }
  }


  // ========================= CHANGE THEME

  // dark
  .category[data-theme="dark"] {
    /*background: #27292d;*/
    color: #cccccc;
    .body {
      /*background: #272a2c;*/
      .desc--text {
        color: #ccc;
      }
      .option {
        border-color: #484848;
      }
    }
  }
</style>
