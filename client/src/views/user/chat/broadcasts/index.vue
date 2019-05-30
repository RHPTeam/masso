<template>
  <div class="main">
    <div class="d_none d_md_block">
      <app-bread-crumb
        :nameBread="$t('chat.broadcast.title')"
        :subBread="$t('chat.broadcast.desc')"
      />
      <!-- Start: Content -->
      <div class="main--content r">
        <div class="c_md_4 c_xl_4 pr_xl_0">
          <app-sidebar />
        </div>
        <div class="c_md_8 c_xl_8 mt_md_4 mt_xl_0">
          <router-view />
        </div>
      </div>
      <!-- End: Content -->
    </div>
  </div>
</template>
<script>
import AppBreadCrumb from "@/components/breadcrumb";
import AppSidebar from "./desktop/components/sidebar";
// import AppMobile from "./mobile/index_mobile";
export default {
  components: {
    AppBreadCrumb,
    AppSidebar
  }
};
</script>
<style lang="scss" scoped></style>
