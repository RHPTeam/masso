<template>
  <div class="section">
    <div
      class="section--header d_flex justify_content_start align_items_center"
    >
      <h5 class="mb_0">Viết bài mới</h5>
      <span class="space"></span>
      <router-link
        class="mr_3"
        tag="a"
        :to="{ name: 'posts' }"
        active-class="active"
        exact
        >Xem tất cả bài viết</router-link
      >
    </div>
    <div class="section--body ct_0">
      <div class="r">
        <div class="c_12 c_lg_12 c_xl_6 mb_0 mb_md_5">
          <app-form />
        </div>
        <div class="c_12 c_lg_12 c_xl_6">
          <app-list />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppForm from "./form/index";
import AppList from "./list/index";
export default {
  components: {
    AppForm,
    AppList
  },
  data() {
    return {
    };
  }
};
</script>

<style lang="scss" scoped>
.section--header {
  color: #666;
  margin-bottom: 2rem;
  > h5 {
    font-size: 18px;
    font-weight: 600;
  }

  span.space {
    background-color: #666;
    height: 1rem;
    margin: 0 0.75rem 0 1rem;
    width: 1px;
  }
  > a {
    color: #666;
    font-size: 14px;
    text-decoration: none;
    transition: all 0.4s ease;
    &:hover {
      color: #ffb94a;
    }
  }
}
</style>
