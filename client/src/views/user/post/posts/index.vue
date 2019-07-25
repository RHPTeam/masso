<template>
  <div class="main">
    <!-- Start: Desktop Component-->
    <div class="d_none d_md_block">
      <breadcrumb
        nameBread="Thiết lập kho nội dung"
        subBread="Giúp bạn lưu các bài đăng vào thư viện và quản lý bài đăng theo nhóm mong muốn"
      />
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
import AppMobile from "./mobile"

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
            isPostCategoriesDeFaultRoute = this.$route.name === "categories_default";

      return isCategoriesRoute || isPostRoute || isPostCategoriesRoute || isPostCategoriesDeFaultRoute;
    }
  }
};
</script>

<style lang="scss" scoped>
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
