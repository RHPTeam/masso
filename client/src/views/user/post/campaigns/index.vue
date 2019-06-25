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

    <!--Start: Mobile Component-->
    <div class="d_block d_md_none">
      <app-mobile />
    </div>
    <!--End: Mobile Component-->
  </div>
</template>
<script>
import AppHeader from "./desktop/components/navigation";
import AppMobile from "./mobile"
export default {
  components: {
    AppHeader,
    AppMobile
  },
  computed: {

  }
};
</script>

<style lang="scss" scoped></style>
