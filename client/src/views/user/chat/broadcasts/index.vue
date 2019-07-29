<template>
  <div class="main">
    <!-- Start: Desktop Component -->
    <div class="d_none d_md_block">
      <breadcrumb
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
    <!-- End: Desktop Component -->
  </div>
</template>
<script>
import AppSidebar from "./desktop/sidebar";

export default {
  components: {
    AppSidebar
  },
  async created() {
    this.$store.dispatch( "getAllBroadcasts" );
  }
};
</script>
<style lang="scss" scoped></style>
