<template>
  <div class="d_none d_md_block" data-theme="currentTheme">
    <breadcrumb
      nameBread="Facebook Tìm Kiếm"
    />
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
  }
}
</script>

<style scoped lang="scss">

</style>
