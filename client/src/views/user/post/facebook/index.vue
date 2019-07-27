<template>
  <div class="main" :data-theme="currentTheme">
    <!--Start: Desktop Component-->
    <div class="d_none d_md_block">
      <div class="d_flex align_items_center">
        <breadcrumb
          nameBread="Tài khoản Facebook"
          subBread="Trang giúp bạn thiết lập các tài khoản Facebook"
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
        <router-view></router-view>
      </div>
      <!-- End: Content-->
    </div>
    <!--End: Desktop Component-->

    <!--Start: Mobile Component-->
    <div class="d_block d_md_none p_3">
      <app-mobile />
    </div>
    <!--End: Mobile Component-->
  </div>
</template>

<script>
import AppMobile from "./mobile"
export default {
  components: {
    AppMobile
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    async logOut() {
      await this.$store.dispatch("logOut");
      this.$router.push("/signin");
    },
    redirectBlogHelp(){
      const routes = "https://www.zinbee.vn/#/help/lam-cach-nao-de-ket-noi-toi-tai-khoan-facebook-cua-toi";
      window.open(routes, '_blank');
    }
  }
};
</script>

<style scoped lang="scss">
  .main {
    font-family: "Open Sans", sans-serif;
    .guide {
      cursor: pointer;
      margin-bottom: -2.3rem;
    }
    .main--header {
      margin-bottom: 25px;
      margin-top: 52px;
      .main--header-title {
        font-size: 30px;
        font-weight: 600;
      }
      .main--header-desc {
        font-size: 14px;
        font-weight: normal;
        margin-left: 16px;
        margin-bottom: 5px;
      }
    }
    .main--content {
      min-height: calc(100vh - 260px);
      border-radius: 10px;
    }
  }

  /* ChangeColor */
  // Light
  .main[data-theme="light"] {
    color: #666;
  }

  //Dark
  .main[data-theme="dark"] {
    color: #ccc;
  }
  @media screen and (min-width: 768px) and (max-width: 1200px) {
    .main--header {
      display: flex;
      flex-direction: column !important;
      .main--header-title {
        width: 100%;
        margin-bottom: 16px;
      }
      .main--header-desc {
        width: 100%;
      }
    }
  }
</style>
