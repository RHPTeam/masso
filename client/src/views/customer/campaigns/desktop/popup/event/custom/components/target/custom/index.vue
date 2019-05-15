<template>
  <div class="page d_flex align_items_center">
    <div class="item mr_2">
      <div class="title mb_2">Chọn nhóm bạn muốn đăng</div>
      <div class="main">
        <multiselect label="name" />
      </div>
      <div class="desc text_right mt_2">Bao gồm 0 nhóm đã sử dụng</div>
    </div>
    <div class="item ml_2">
      <div class="title mb_2">Chọn nhóm bạn muốn đăng</div>
      <div class="main">
        <multiselect label="name" />
      </div>
      <div class="desc text_right mt_2">Bao gồm 0 nhóm đã sử dụng</div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.page {
  .item {
    width: 50%;
    .main {
      border: 1px solid $border-color;
      border-radius: calc(.5rem + 2px);
    }
  }
}
</style>
