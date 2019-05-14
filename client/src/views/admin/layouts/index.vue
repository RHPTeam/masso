<template>
  <div class="wrapper" :data-theme="currentTheme">
    <div class="wrap--content d_none d_md_flex">
      <div class="wrap--content-sidebar">
        <app-sidebar />
      </div>
      <div class="wrap--content-main">
        <app-header />
        <router-view />
      </div>
    </div>
  </div>
</template>
<script src="./index.script.js"></script>

<style scoped lang="scss">
.wrapper {
  .wrap--content-main {
    min-height: 100vh;
    width: 100%;
  }
  .wrap--content-sidebar {
    background-color: #27292D;
  }
}

/* Theme Color */
/* Light */
.wrapper[data-theme="light"] {
  background-color: #ffffff;
  color: #666;
  .wrap--content-main {
    background-color: #f7f7f7;
  }
  .wrap--content-sidebar {
    background-color: #27292D;
  }
}
/* Dark */
.wrapper[data-theme="dark"] {
  background-color: #27292D;
  color: #ccc;
  .wrap--content-main {
    background-color: #2f3136;
  }
  .wrap--content-sidebar {
    background-color: #27292D;
  }
}
</style>
