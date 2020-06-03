<template>
  <div data-theme="currentTheme">
    <div class="d_flex align_items_center">
      <breadcrumb
        nameBread="Facebook Tìm Kiếm"
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
      <app-list></app-list>
    </div>
    <!-- End: Content-->
  </div>
</template>

<script>
import AppList from "./list";

export default {
  components: {
    AppList
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    redirectBlogHelp() {
      const routes = "https://www.zinbee.vn/#/help/lam-cach-nao-de-tim-kiem-cac-bai-viet-tren-facebook";
      window.open(routes, '_blank');
    }
  },
}
</script>

<style scoped lang="scss">
  .guide {
    cursor: pointer;
    margin-bottom: -2.3rem;
  }
</style>
