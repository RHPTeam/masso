<template>
  <div class="post--filter d_flex justify_content_start align_items_center">
    <router-link
      class="mr_3"
      tag="button"
      :to="{ name: 'posts' }"
      active-class="active"
      exact
      >Tất cả bài viết</router-link
    >
    <router-link
      class="mr_3"
      tag="button"
      :to="{ name: 'categories' }"
      active-class="active"
      >Danh mục</router-link
    >
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.post--filter {
  margin: 2rem 0;
  height: 42px;
  font-size: 0.875rem;
  > button {
    background-color: transparent;
    border: 0;
    border-radius: 10px;
    color: #999999;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
    height: 100%;
    outline: none;
    padding: 0 1.5rem;
    transition: all 0.4s ease;
    &:hover,
    &.active {
      background-color: #ffb94a;
      color: #ffffff;
    }
  }
}
</style>
