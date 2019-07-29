<template>
  <div class="agency">
    <breadcrumb
      nameBread="Trang quản lý thành viên cho đại lý"
      subBread="Trang giúp bạn thiết lập các tài khoản Facebook"
    />
    <app-header/>
    <app-navigation @openPopup="isShowPopupInfo = $event"/>
    <app-main
      @openPopupEdit="isShowPopupEdit = $event"
    />

    <!--************* POPUP SIGNUP AND UPDATE ***************-->
    <transition name="popup">
      <app-info
        v-if="isShowPopupInfo === true"
        @closePopup="isShowPopupInfo = $event"
      />

      <app-edit
        v-if="isShowPopupEdit === true"
        @closeAddEdit="isShowPopupEdit = $event"
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
import AppEdit from "./components/popup/edit";
export default {
  components: {
    AppHeader,
    AppNavigation,
    AppMain,
    AppInfo,
    AppDelete,
    AppEdit
  },
  data() {
    return {
      isShowPopupInfo: false,
      isShowPopupDelete: false,
      isShowPopupEdit: false
    }
  },
  async created(){
    await this.$store.dispatch("getInfoAgency");
  }
}
</script>

<style scoped>

</style>
