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
      <div class="main--content my_4">
        <!-- Start: User Expire -->
        <user-info :user="user" />
        <!-- End: User Info -->
      </div>
      <!-- End: Content -->
    </div>
    <!-- End: Desktop Component-->
  </div>
</template>

<script src="./main.js"></script>

<style lang="scss" scoped></style>
