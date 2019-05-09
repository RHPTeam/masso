<template>
  <div class="content">
    <div class="desc mb_2">Chọn bài viết bạn muốn đăng</div>
    <div class="wrapper">
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
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>
