<template>
  <div class="wrapper" :data-theme="currentTheme">
    <!-- Start: Desktop Component-->
    <div class="wrap--content d_md_flex d_none position_relative">
      <div class="wrap--content-sidebar">
        <app-sidebar />
      </div>
      <div class="wrap--content-main">
        <app-header
          @openExpire="showExpire = $event"
        />
        <router-view />
      </div>
    </div>
    <!-- End: Desktop Component-->

    <!-- Start: Notification for check login facebook account-->
    <app-notification :statusNetwork="statusNetwork"></app-notification>
    <!-- End: Notification for check login facebook account-->

    <!-- Mobile -->
    <div class="wrap--content-mobile d_block d_md_none position_relative">
      <header-mobile />
      <VuePerfectScrollbar class="mobile-scroll">
        <!-- <search-mobile /> -->
        <router-view />
      </VuePerfectScrollbar>
      <footer-mobile />
    </div>
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


// ============ RESPONSIVE 

// @media screen and (max-width: 768px) {
//   .wrapper {
//     .wrap--content-sidebar {
//       position: absolute;
//       z-index: 1000;
//       background: #000;
//       top: 70px;
//     }
//     .wrap--content-main {
//       padding: 1.875rem 1rem;
//     }
//   }
// }
</style>
