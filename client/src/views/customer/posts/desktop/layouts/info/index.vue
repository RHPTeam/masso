<template>
  <div class="post--info d_flex justify_content_between align_items_center">
    <div class="post--info-show">Hiển thị 25 trong số 100</div>
    <paginate
      :page-count="10"
      :page-range="2"
      :margin-pages="2"
      :click-handler="clickCallback"
      :prev-text="'&#8249;'"
      :next-text="'&#x203A;'"
      :container-class="'pagination'"
      :page-class="'page-item'"
    ></paginate>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.post--info {
  font-size: 0.875rem;
  &-show {
    color: #999;
    letter-spacing: -0.2px;
  }
}
</style>
<style lang="scss">
.pagination {
  margin-bottom: 0;
  li {
    border-radius: 14px;
    height: 30px;
    font-size: 1.5rem;
    margin: 0 0.25rem;
    line-height: 24px;
    a {
      color: #666;
      outline: none;
      text-decoration: none;
    }

    &.disabled {
      opacity: 0.5;
      pointer-events: none;
    }
    &.page-item {
      font-size: 0.875rem;
      line-height: 30px;
      text-align: center;
      width: 30px;

      &.disabled {
        opacity: 1;
      }
      &:hover,
      &.active {
        background-color: #ffb94a;
        color: #fff;
      }
    }
    &:first-child {
      text-align: left;
      width: 20px;
    }
    &:last-child {
      margin-right: 0;
      text-align: right;
      width: 20px;
    }
  }
}
</style>
