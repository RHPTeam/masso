<template>
  <div class="post--content-options">
    <div class="r">
      <!-- Start: Main Column -->
      <div class="c_md_8 col--main pr_4">
        <div class="title mb_3">
          Tùy chọn nội dung
        </div>
        <div class="options--group">
          <div class="options--item d_flex align_items_center justify_content_between mb_3"
            @click="updatePostContentOption('category')"
          >
            <div class="item--content">
              <div class="name mb_1">Tự động đăng bài viết từ danh mục</div>
              <div class="desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. Dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</div>
            </div>
            <div class="item--icon">
              <icon-base
                class="icon--arrow-right"
                :style="[ {color: '#85CFFF'}, {stroke: '#85CFFF'} ]"
                icon-name="arrow"
                width="36"
                height="40"
                viewBox="0 0 28 28"
              >
                <icon-arrow-left></icon-arrow-left>
              </icon-base>
            </div>
          </div>
          <div class="options--item d_flex align_items_center justify_content_between"
            @click="updatePostContentOption(custom)"
          >
            <div class="item--content">
              <div class="name mb_1">Tùy chọn đăng bài viết cụ thể</div>
              <div class="desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. Dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</div>
            </div>
            <div class="item--icon">
              <icon-base
                class="icon--arrow-right"
                :style="[ {color: '#85CFFF'}, {stroke: '#85CFFF'} ]"
                icon-name="arrow"
                width="36"
                height="40"
                viewBox="0 0 28 28"
              >
                <icon-arrow-left></icon-arrow-left>
              </icon-base>
            </div>
          </div>
        </div>
      </div>
      <!-- Start: Main Column -->
      <!-- Start: Support Column -->
      <div class="c_md_4 col--support">
        <div class="content--block">
          <div class="title">Bạn có biết?</div>
          <ul class="content--list">
            <li class="content--list-item mt_2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
            </li>
            <li class="content--list-item mt_2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
            </li>
            <li class="content--list-item mt_2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
            </li>
            <li class="content--list-item mt_2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
            </li>
          </ul>
        </div>
      </div>
      <!-- Start: Support Column -->
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    updatePostContentOption( val ) {
      this.$emit( "updatePostContentOption", val )
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>
