<template>
  <div class="main">
    <!-- Start: Desktop Component-->
    <div class="d_none d_md_block">
      <div class="d_flex align_items_center">
        <breadcrumb
          nameBread="Thiết lập kho nội dung"
          subBread="Giúp bạn lưu các bài đăng vào thư viện và quản lý bài đăng theo nhóm mong muốn"
        />

        <div class="guide ml_3" @click="redirectBlogHelp">
          <icon-base
            class="icon icon--help"
            width="18px"
            height="18px"
            icon-name="Hướng dẫn"
            viewBox="0 0 320 320"
          >
            <icon-help />
          </icon-base>
        </div>
      </div>

      <!-- Start: Content -->
      <div class="main--content">
        <!-- Start: Filter -->
        <app-navigation v-if="showNavigation" />

        <!-- End: Filter -->
        <transition name="slide-fade">
          <router-view :key="$route.path" />
        </transition>
      </div>
      <!-- End: Content -->
    </div>
    <!-- End: Desktop Component-->

    <!--Start: Mobile Component-->
    <div class="d_block d_md_none">
      <app-mobile />
    </div>
    <!--End: Mobile Component-->
  </div>
</template>

<script>
import AppNavigation from "./desktop/layouts/navigation/index";
import AppMobile from "./mobile";

export default {
  components: {
    AppNavigation,
    AppMobile
  },
  computed: {
    showNavigation() {
      const isCategoriesRoute = this.$route.name === "post_postCategories",
            isPostRoute = this.$route.name === "post_posts",
            isPostCategoriesRoute = this.$route.name === "post_categories",
            isPostCategoriesDeFaultRoute =
              this.$route.name === "categories_default";

      return (
        isCategoriesRoute ||
        isPostRoute ||
        isPostCategoriesRoute ||
        isPostCategoriesDeFaultRoute
      );
    }
  },
  watch: {
    $route(to, from) {
      if (from.query.categoryId && to.name === "post_posts") {
        const dataSender = {
          size: 25,
          page: 1
        };
        this.$store.dispatch("getPostsByPage", dataSender);
      }
    }
  },
  methods: {
    redirectBlogHelp() {
      const routes =
        "https://www.zinbee.vn/#/help/viet-bai-moi-trong-kho-noi-dung-nhu-the-nao";
      window.open(routes, "_blank");
    }
  }
};
</script>

<style lang="scss" scoped>
.guide {
  cursor: pointer;
  margin-bottom: -2.3rem;
}
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all 0.3s ease;
  animation: fadeInRight 1s;
}
.slide-fade-leave-active {
  transition: all 0.1s ease;
}

@keyframes fadeInRight {
  0% {
    opacity: 0;
    transform: translateX(50px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
