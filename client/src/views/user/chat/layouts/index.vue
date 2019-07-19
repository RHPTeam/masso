<template>
    <div class="wrapper" :data-theme="currentTheme">
      <!-- Loading -->
      <loading v-if="false"/>
      <!-- <mobile-loading v-if="status == 'loading'"/> -->

      <!-- Desktop -->
      <div class="d_none d_md_block">
        <div class="wrap--content d_md_flex">
          <div class="wrap--content-sidebar">
            <app-sidebar />
          </div>
          <div class="wrap--content-main">
            <app-header @openExpire="isShowPopupExpire = $event"></app-header>
            <router-view />
          </div>
        </div>
      </div>

      <!-- Start: Notification for check login facebook account-->
      <app-notification :statusNetwork="statusNetwork" />
      <!-- End: Notification for check login facebook account-->

      <!-- Start: Popup checkout price system and contact expire  -->
      <app-expire
        v-if="isShowPopupExpire === true"
        @close="isShowPopupExpire = $event"
      >
      </app-expire>
      <!-- End: Popup checkout price system and contact expire -->

    </div>
</template>
<script src="./index.script.js"></script>

<style scoped lang="scss">
@import "./index.style";
</style>
