<template>
  <div class="main">
    <!-- Start: Desktop Component-->
    <div class="d_none d_md_block">
      <breadcrumb
        nameBread="Thiết lập tài khoản"
        subBread="Giúp bạn thiết lập những cài đặt cá nhân về thông tin tài khoản của mình."
      />
      <!-- Start: Top -->
      <app-top :user="user" />
      <!-- End: Top -->
      <!-- Start: Content -->
      <div class="main--content">
        <!-- Start: User Expire -->
        <user-info :user="user" />
        <!-- End: User Info -->
        <!-- Start: User Keywords -->
        <user-keywords :user="user" />
        <!-- End: User Keywords -->
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

<script src="./index.script.js"></script>

<style lang="scss" scoped></style>
