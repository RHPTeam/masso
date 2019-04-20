<template>
  <div class="post--action d_flex justify_content_between align_items_center">
    <div class="post--search d_flex justify_content_between align_items_center">
      <span class="ml_3 mt_1">
        <icon-base
          icon-name="input-search"
          width="20"
          height="20"
          viewBox="0 0 20 20"
        >
          <icon-input-search />
        </icon-base>
      </span>
      <input type="text" placeholder="Tìm kiếm" />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.post--search {
  background-color: #fafafa;
  border-radius: 10px;
  font-size: 0.875rem;
  height: 40px;
  width: 240px;
  > input[type="text"] {
    background-color: transparent;
    border: 0;
    font-size: 0.875rem;
    height: 100%;
    outline: none;
    width: calc(100% - 48px);
  }
  ::-webkit-input-placeholder {
    /* Chrome/Opera/Safari */
    color: #ccc;
  }
  ::-moz-placeholder {
    /* Firefox 19+ */
    color: #ccc;
  }
  :-ms-input-placeholder {
    /* IE 10+ */
    color: #ccc;
  }
  :-moz-placeholder {
    /* Firefox 18- */
    color: #999;
  }
  svg {
    color: #999;
  }
}
</style>
