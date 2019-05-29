<template>
  <div class="post--navigation d_flex justify_content_start align_items_center mb_4" :data-theme="currentTheme">
    <div class="btn--create mr_3"
         @click="createPost"
    >Viết bài mới</div>
    <router-link
      class="mr_2"
      tag="button"
      :to="{ name: 'post_posts' }"
      active-class="active"
      exact
      >Tất cả bài viết</router-link
    >
    <div class="divider"></div>
    <router-link
      class="ml_2"
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
    },
    newPost() {
      return this.$store.getters.newPost;
    }
  },
  methods: {
    async createPost() {
      const dataSender = {};

      await this.$store.dispatch( "createNewPost", dataSender );
      this.$router.push( {
        name: "post_update_post",
        params: { id: this.newPost._id }
      } );
    },
  }
};
</script>

<style lang="scss" scoped>
.post--navigation {
  height: 40px;
  > button {
    background-color: transparent;
    border: 0;
    border-radius: .625rem;
    cursor: pointer;
    font-size: .95rem;
    font-weight: 600;
    height: 100%;
    outline: none;
    padding: 0 .5rem;
    transition: all 0.4s ease;
  }
  .btn--create {
    background-color: #ffb94a;
    border-radius: 0.5rem;
    color: #fff;
    cursor: pointer;
    font-size: .95rem;
    font-weight: 600;
    height: 40px;
    line-height: 40px;
    padding: 0 .75rem;
    transition: all 0.4s ease;
    &:hover {
      background-color: #FF9E4A;
    }
  }
  .divider {
    height: 16px;
    width: 2px;
  }
}

/* Theme Color */
.post--navigation[data-theme="light"] {
  button {
    color: #999999;
    &:hover,
    &.active {
      color: #ffb94a;
    }
  }
  .divider {
    background-color: #ccc;
  }
}

.post--navigation[data-theme="dark"] {
  button {
    color: #999999;
    &:hover,
    &.active {
      color: #ffb94a;
    }
  }
  .divider {
    background-color: #666;
  }
}
</style>
