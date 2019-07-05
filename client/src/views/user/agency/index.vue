<template>
  <div class="agency">
    <breadcrumb
      nameBread="Trang quản lý thành viên cho đại lý"
      subBread="Trang giúp bạn thiết lập các tài khoản Facebook"
    />
    <app-header/>
    <app-navigation @openPopup="isShowPopupInfo = $event"/>
    <app-main />

    <!--************* POPUP SIGNUP AND UPDATE ***************-->
    <transition name="popup">
      <app-info
        v-if="isShowPopupInfo === true"
        @closePopup="isShowPopupInfo = $event"
      />
      <app-delete
        v-if="isShowPopupDelete === true"
      />
    </transition>

  </div>
</template>

<script>
import AppHeader from "./components/header";
import AppNavigation from "./components/navigation";
import AppMain from "./components/main";
import AppInfo from "./components/popup/info";
import AppDelete from "./components/popup/delete";
export default {
  components: {
    AppHeader,
    AppNavigation,
    AppMain,
    AppInfo,
    AppDelete
  },
  data() {
    return {
      isShowPopupInfo: false,
      isShowPopupDelete: false
    }
  },
  async created(){
    await this.$store.dispatch("getInfoAgency");
  }
}
</script>

<style scoped>

</style>
