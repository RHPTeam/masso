<template>
  <div class="section" :data-theme="currentTheme">
    <div
      class="section--header d_flex justify_content_start align_items_center"
    >
      <a
        class="btn--back mr_2"
        @click="$router.go(-1)"
        v-if="historyRouteLength > 1"
      >
        « Quay lại
      </a>
      <div class="divider mr_3"
           v-if="historyRouteLength > 1"
      ></div>
      <router-link
        class="nav--link"
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
      historyRouteLength: 0
    };
  },
  computed: {
    currentTheme(){
      return this.$store.getters.themeName;
    }
  },
  created() {
    this.historyRouteLength = window.history.length;
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
    span.space {
      height: 1rem;
      margin: 0 0.75rem 0 1rem;
      width: 1px;
    }
    .btn--back {
      cursor: pointer;
      font-size: .825rem;
      padding-right: .5rem;
      transition: all .4s ease;
      &:hover {
        color: #F7F7F7;
        text-decoration: underline;
      }
    }
    .nav--link {
      font-size: .95rem;
      font-weight: 600;
      text-decoration: none;
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
    .nav--link {
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
    .nav--link {
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
