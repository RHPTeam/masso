<template>
  <div class="agency">
    <breadcrumb
      nameBread="Trang quản lý thành viên cho đại lý"
      subBread="Trang giúp bạn thiết lập các tài khoản Facebook"
    />
    <app-header/>
    <app-navigation/>
    <app-main />
  </div>
</template>

<script>
import AppHeader from "./header";
import AppNavigation from "./navigation";
import AppMain from "./main";
export default {
  components: {
    AppHeader,
    AppNavigation,
    AppMain
  }
}
</script>

<style scoped>

</style>
