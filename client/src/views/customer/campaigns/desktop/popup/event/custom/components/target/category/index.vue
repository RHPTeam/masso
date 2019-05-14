<template>
  <div class="group">
    <div class="body">
      <div class="title mb_2">Chọn nhóm bạn muốn đăng</div>
      <div class="main">
        <multiselect
          label="title"
        />
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
  .group {
    .body {
      width: 50%;
      .title  {}
      .main {
        border: 1px solid $border-color;
        border-radius: calc(.5rem + 2px);
      }
      .desc {}
    }
  }
</style>
