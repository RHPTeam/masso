<template>
  <div class="main" :data-theme="currentTheme">
    <!--Start: Desktop Component-->
    <div class="d_none d_md_block">
      <breadcrumb
        nameBread="Hỗ trợ tài khoản"
        subBread="Giúp bạn nhanh chóng giải quyết các vấn đề mắc phải"
      />
      <!-- Start: Content -->
      <div class="main--content">
        <router-view></router-view>
      </div>
      <!-- End: Content-->
    </div>
    <!--End: Desktop Component-->
  </div>
</template>

<script>
export default {
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    async logOut() {
      await this.$store.dispatch("logOut");
      this.$router.push("/signin");
    }
  }
};
</script>

<style scoped lang="scss">
  .main {
    font-family: "Open Sans", sans-serif;
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
