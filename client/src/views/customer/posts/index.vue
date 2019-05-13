<template>
  <div class="main">
    <!-- Start: Desktop Component-->
    <div class="d_none d_md_block">
      <breadcrumb
        nameBread="Thiết lập bài đăng"
        subBread="Giúp bạn lưu các bài đăng vào thư viện và quản lý bài đăng theo nhóm mong muốn"
      />
      <!-- Start: Content -->
      <div class="main--content">
        <!-- Start: Filter -->
        <app-navigation v-if="showNavigation" />

        <!-- End: Filter -->
        <transition name="slide-fade">
          <router-view />
        </transition>
      </div>
      <!-- End: Content -->
    </div>
    <!-- End: Desktop Component-->
  </div>
</template>

<script>
import AppNavigation from "./desktop/layouts/navigation/index";
export default {
  components: {
    AppNavigation
  },
  computed: {
    showNavigation() {
      const isCategoriesRoute = this.$route.path === "/posts/categories",
            isPostRoute = this.$route.path === "/posts/";

      return isCategoriesRoute || isPostRoute;
    }
  },
  async created() {
    await this.$store.dispatch( "getAllFriendFb" );
    await this.$store.dispatch( "getPlaceFromFb" );
    await this.$store.dispatch( "getAllCategories" );
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
