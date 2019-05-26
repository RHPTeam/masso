<template>
  <div class="wrapper--none">
    <div class="wrapper" :data-theme="currentTheme">
      <!-- Loading -->
      <loading v-if="false"/>
      <!-- <mobile-loading v-if="status == 'loading'"/> -->

      <!-- Desktop -->
      <div class="d_none d_md_block">
        <!-- Noification -->
        <app-notification
        ></app-notification>
        <div class="wrap--content d_md_flex">
          <div class="wrap--content-sidebar">
            <app-sidebar />
          </div>
          <div class="wrap--content-main">
            <app-header />
            <router-view />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./index.script.js"></script>

<style scoped lang="scss">
@import "./index.style";
</style>