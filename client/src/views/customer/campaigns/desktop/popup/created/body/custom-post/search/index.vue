<template>
  <div class="search mt_2">
    <div class="header d_flex align_items_center justify_content_between">
      <div class="left position_relative">
        <div class="icon position_absolute">
          <icon-base
            icon-name="input-search"
            width="20"
            height="20"
            viewBox="0 0 20 20"
          >
            <icon-input-search />
          </icon-base>
        </div>
        <input type="text" placeholder="Tìm kiếm ..." />
      </div>
      <div class="right position_relative">
        <div class="categories d_flex align_items_center" @click="isShowSuggest = true" v-click-outside="close">
          Danh mục
          <div class="icon--down ml_2">
            <icon-base
              class="icon--sort-down"
              icon="icon--sort-down"
              width="14px"
              heigh="14px"
              viewBox="0 0 14 14"
            >
              <icon-sort-down></icon-sort-down>
            </icon-base>
          </div>
        </div>
        <div class="suggest position_absolute" v-if="isShowSuggest === true">
          <div class="suggest--item">Bán ngáo</div>
          <div class="suggest--item">Bán ngáo</div>
        </div>
      </div>
    </div>
    <div class="body">
      <div class="result d_flex align_items_center mt_3 px_3 py_2">
        <div class="name text_left">Tên bài viết</div>
        <div class="categories text_left">Danh mục</div>
        <div class="content text_left">Nội dung</div>
        <div class="action text_center">
          Hành động
        </div>
      </div>
      <div class="result--item d_flex align_items_center px_3 py_2">
        <div class="name text_left">Lorem ipsum dolor.</div>
        <div class="categories text_left">Lorem ipsum.</div>
        <div class="content text_left">Lorem ipsum dolor sit amet.</div>
        <div class="action">
          <div class="btn--choose text_center m_auto">Chọn</div>
        </div>
      </div>
      <div class="result--item d_flex align_items_center px_3 py_2">
        <div class="name text_left">Lorem ipsum dolor.</div>
        <div class="categories text_left">Lorem ipsum.</div>
        <div class="content text_left">Lorem ipsum dolor sit amet.</div>
        <div class="action">
          <div class="btn--choose text_center m_auto">Đã chọn</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShowSuggest: false
    }
  },
  methods: {
    close() {
      this.isShowSuggest = false;
    }
  },
}
</script>

<style lang="scss" scoped>
 @import "./index.style";
</style>
