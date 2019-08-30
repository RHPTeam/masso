<template>
  <div class="main">
    <!-- Start: Desktop Component-->
    <div class="d_none d_md_block">
      <breadcrumb
        nameBread="Thiết lập tài khoản"
        subBread="Giúp bạn thiết lập những cài đặt cá nhân về thông tin tài khoản của mình."
      />
      <app-desktop :user="user"></app-desktop>
    </div>
    <!-- End: Desktop Component-->

    <!--Start: Mobile Component-->
    <div class="d_block d_md_none">
      <!-- Start: Top -->
      <app-header-mobile :user="user"></app-header-mobile>
      <!-- End: Top -->
      <!-- Start: Content -->      
      <app-main-mobile :user="user"></app-main-mobile>
      <!-- End: Content -->     
    </div>
    <!--End: Mobile Component-->
  </div>
</template>

<script src="./index.script.js"></script>

<style lang="scss" scoped></style>
