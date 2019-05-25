<template>
  <div class="post--filter d_flex justify_content_start align_items_center mb_4" :data-theme="currentTheme">
    <router-link
      class="mr_3"
      tag="button"
      :to="{ name: 'post_posts' }"
      active-class="active"
      exact
      >Tất cả bài viết</router-link
    >
    <div class="divider"></div>
    <router-link
      class="mr_3"
      tag="button"
      :to="{ name: 'post_postCategories' }"
      active-class="active"
      >Danh mục</router-link
    >
  </div>
</template>

<script>
export default {
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  }
};
</script>

<style lang="scss" scoped>
.post--filter {
  height: 40px;
  > button {
    background-color: transparent;
    border: 0;
    border-radius: .625rem;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
    height: 100%;
    outline: none;
    padding: 0 .75rem;
    transition: all 0.4s ease;
  }
}

/* Theme Color */
.post--filter[data-theme="light"] {
  button {
    color: #999999;
    &:hover,
    &.active {
      background-color: #fff;
      color: #ffb94a;
    }
  }
}

.post--filter[data-theme="dark"] {
  button {
    color: #999999;
    &:hover,
    &.active {
      background-color: #27292c;
      color: #ffb94a;
    }
  }
}
</style>
