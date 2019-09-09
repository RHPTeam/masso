<template>
  <div class="wrapper position_relative" :data-theme="currentTheme">
    <!-- START: DESKTOP COMPONENT-->
    <div class="wrap--content d_md_flex d_none position_relative" v-if="innerWidth > 768">
      <!-- START: DESKTOP SIDEBAR COMPONENT-->
      <div class="wrap--content-sidebar">
        <app-sidebar></app-sidebar>
      </div>
      <!-- END: DESKTOP SIDEBAR COMPONENT-->

      <!-- START: DESKTOP CONTENT COMPONENT-->
      <div class="wrap--content-main">
        <app-header @openExpire="showExpire = $event"></app-header>
        <router-view />
        <instant-post-button></instant-post-button>
      </div>
      <!-- END: DESKTOP CONTENT COMPONENT-->
    </div>
    <!-- END: DESKTOP COMPONENT-->

    <!--START: MOBILE COMPONENT -->
    <div class="wrap--content-mobile d_block d_md_none position_relative" v-else>
      <!--START: MOBILE HEADER COMPONENT -->
      <header-mobile></header-mobile>
      <!--END: MOBILE HEADER COMPONENT -->

      <!--START: MOBILE CONTENT COMPONENT -->
      <VuePerfectScrollbar class="mobile-scroll">
        <router-view />
      </VuePerfectScrollbar>
      <!--END: MOBILE CONTENT COMPONENT -->

      <!--START: MOBILE FOOTER COMPONENT -->
      <footer-mobile></footer-mobile>
      <!--END: MOBILE FOOTER COMPONENT -->
    </div>
    <!--END: MOBILE COMPONENT -->

    <!-- Start: Notification for check login facebook account-->
    <app-notification :statusNetwork="statusNetwork"></app-notification>
    <!-- End: Notification for check login facebook account-->

    <!-- Start: Pricing account-->
    <app-expire v-if="showExpire === true" @close="showExpire = $event"></app-expire>
    <!-- End: Pricing account-->

    <!-- Start: Notification guide for user -->
    <guide-popup v-if="variableControlGuide === 1"></guide-popup>
    <!-- End: Notification guide for user-->
  </div>
</template>
<script src="./index.script.js"></script>

<style lang="scss" scoped>
.wrapper {
  min-height: 100vh;
  .wrap--content-main {
    width: 100%;
    padding: 30px 60px 60px 0;
  }
  .mobile-scroll {
    height: calc(100vh - 110px);
  }
}

.wrapper[data-theme="light"] {
  color: #666;
  background-color: #f7f7f7;
  .wrap--content-mobile {
    background-color: #fff;
  }
  // background-color: #ddd;
}

.wrapper[data-theme="dark"] {
  color: #ccc;
  background-color: #2f3136;
}
</style>
