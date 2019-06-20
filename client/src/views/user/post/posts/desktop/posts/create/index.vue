<template>
  <div class="section" :data-theme="currentTheme">
    <div
      class="section--header d_flex justify_content_start align_items_center"
    >
      <keep-alive>
        <a
          class="btn--link mr_2"
          @click="$router.go(-1)"
          active-class="active"
          exact
        >
          Quay lại
        </a>
      </keep-alive>
      <div class="divider"></div>
      <router-link
        class="btn--link ml_2"
        tag="a"
        :to="{ name: 'post_postCategories', query: { size: 25, page: 1 } }"
        active-class="active"
      >Danh mục</router-link
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
  },
  computed: {
    currentTheme(){
      return this.$store.getters.themeName;
    }
  }
};
</script>

<style lang="scss" scoped>
.section {
  .section--header {
    margin-bottom: 2rem;
    > h5 {
      font-size: 18px;
      font-weight: 600;
    }
    a {
      text-decoration: none;
    }
    span.space {
      height: 1rem;
      margin: 0 0.75rem 0 1rem;
      width: 1px;
    }
    .btn--link {
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
    .divider {
      height: 16px;
      width: 2px;
    }
  }
}

/* Theme color */
.section[data-theme="light"] {
  .section--header {
    color: #666;
    span.space {
      background-color: #666;
    }
    > a {
      color: #666;
      &:hover {
        color: #ffb94a;
      }
    }
    .divider {
      background-color: #ccc;
    }
  }
}
.section[data-theme="dark"] {
  .section--header {
    color: #999999;
    span.space {
      background-color: #999999;
    }
    > a {
      color: #999999;
      &:hover {
        color: #ffb94a;
      }
    }
    .divider {
      background-color: #666;
    }
  }
}
</style>
