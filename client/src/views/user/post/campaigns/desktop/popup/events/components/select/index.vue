<template>
  <div class="select">
    <div class="top mb_3">
    </div>
    <!-- Start: Body -->
    <div class="body mb_3">
      <div class="desc mb_2 text_left">
        <span class="desc--text font_weight_bold">Lựa chọn bài viết từ kho nội dung</span>
      </div>
      <div class="option mb_3">
        <multiselect
          label="title"
          :clearable="false"
          :options="allPost"
          @input="selectCategory"
          placeholder="Chọn bài viết"
        />
        <!--        :value="event.post_category"-->
      </div>
      <div class="desc">
        Khuyên dùng! Một bài viết không được đăng quá 5 vị trí khác nhau.
        Điều này, giúp tài khoản của bạn an toàn, spam, vi phạm tiêu chuẩn công động, v.v
      </div>
    </div>
    <!-- End: Body -->
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
    allPost() {
      return this.$store.getters.allPost;
    }
  },
  async created(){
    if ( this.allPost.length === 0 ) {
      await this.$store.dispatch( "getAllPost" );
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
  .top {
    .back {
      cursor: pointer;
      text-decoration: underline;
    }
  }
  .body {
    border-radius: .625rem;
    width: 100%;
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
      width: 100%;
    }
  }
</style>
