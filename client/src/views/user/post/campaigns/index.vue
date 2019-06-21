<template>
  <div class="main">
    <!-- Start: Desktop Component-->
    <div class="d_none d_md_block">
      <breadcrumb
        nameBread="Thiết lập chiến dịch"
        subBread="Giúp bạn thiết lập bộ hẹn cho bài đăng theo ý muốn và trực quan hơn"
      />
      <!-- Start: Content -->
      <app-header />
      <div class="main--content">
        <router-view/>
      </div>
      <!-- End: Content -->
    </div>
    <!-- End: Desktop Component-->
  </div>
</template>

<script>
import AppHeader from "./desktop/components/navigation";
export default {
  components: {
    AppHeader
  },
  computed: {

  }
};
</script>

<style lang="scss" scoped></style>
