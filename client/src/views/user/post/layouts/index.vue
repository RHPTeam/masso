<template>
  <div class="wrapper position_relative" :data-theme="currentTheme">
    <!-- Start: Desktop Component-->
    <div class="wrap--content d_md_flex d_none position_relative" v-if="innerWidth > 768">
      <div class="wrap--content-sidebar">
        <app-sidebar></app-sidebar>
      </div>
      <div class="wrap--content-main">
        <app-header @openExpire="showExpire = $event"></app-header>
        <router-view />
      </div>
    </div>
    <!-- End: Desktop Component-->

    <!-- Mobile -->
    <div class="wrap--content-mobile d_block d_md_none position_relative" v-else>
      <header-mobile></header-mobile>
      <VuePerfectScrollbar class="mobile-scroll">
        <!-- <search-mobile /> -->
        <router-view />
      </VuePerfectScrollbar>
      <footer-mobile></footer-mobile>
    </div>

    <!-- Start: Notification for check login facebook account-->
    <app-notification :statusNetwork="statusNetwork"></app-notification>
    <!-- End: Notification for check login facebook account-->

    <!-- Start: Pricing account-->
    <app-expire
      v-if="showExpire === true"
      @close="showExpire = $event"
    >
    </app-expire>
    <!-- End: Pricing account-->

    <!-- Start: Notification guide for user -->
    <guide-popup
      v-if="variableControlGuide === 1"
    >
    </guide-popup>
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
