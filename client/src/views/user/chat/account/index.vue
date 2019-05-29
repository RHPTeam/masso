<template>
  <div class="main">
    <!-- Start: Desktop Component-->
    <div class="d_none d_md_block">
      <breadcrumb
        :nameBread="$t('chat.account.title')"
        :subBread="$t('chat.account.desc')"
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
  </div>
</template>

<script src="./index.script.js"></script>

<style lang="scss" scoped></style>
