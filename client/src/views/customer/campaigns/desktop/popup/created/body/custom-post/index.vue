<template>
  <div class="content">
    <div class="breadcrumb d_flex align_items_center">
      <div class="btn--back" @click="comeBackOptionPost">
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
      <div class="breadcrumb--text">Tùy chỉnh đăng bài</div>
    </div>
    <div class="desc d_flex align_items_center justify_content_between mb_2">
      <div class="left">
        <button class="btn--add text_center" @click="isShowSearch = true">Chọn</button>
      </div>
      <div v-show="isShowSearch === false">Đã chọn 5 trong số 20 bài viết</div>
    </div>
    <div class="wrapper" v-show="isShowSearch === false">
      <div class="item--header d_flex align_items_center px_3 py_2">
        <div class="col col--checkbox px_2">
          <label class="custom--checkbox mb_0">
            <input type="checkbox" />
          </label>
        </div>
        <div class="col col--name px_2">Tên bài viết</div>
        <div class="col col--category px_2">Danh mục</div>
        <div class="col col--content px_2">Nội dung</div>
      </div>
      <div class="item--body d_flex align_items_center px_3 py_2">
        <div class="col col--checkbox px_2">
          <label class="custom--checkbox mb_0">
            <input type="checkbox" checked />
          </label>
        </div>
        <div class="col col--name px_2">
          <div class="col col--name-text">
            Lorem ipsum dolor.
          </div>
        </div>
        <div class="col col--category px_2">Mỹ phẩm</div>
        <div class="col col--content px_2">
          <div class="col--content-text">
            Lorem ipsum dolor sit amet.
          </div>
        </div>
      </div>
    </div>
    <!--  Start: search post  -->
    <search-post v-if="isShowSearch === true" />
    <!-- End: search post -->
  </div>
</template>

<script>
import SearchPost from "./search"
export default {
  components:{
    SearchPost
  },
  data() {
    return {
      isShowSearch: false
    }
  },
  methods: {
    comeBackOptionPost() {
      this.$emit( "comeBack", "none" );
    }
  },
}
</script>

<style lang="scss" scoped>
  @import "index.style";
  .left {
    .btn--add {
      background-color: #ffb94a;
      border: none;
      border-radius: .5rem;
      color: #ffffff;
      height: 30px;
      width: 80px;
      &:hover, &:active, &:visited, &:focus {
        box-shadow: none;
        outline: 0;
      }
    }
  }
</style>
