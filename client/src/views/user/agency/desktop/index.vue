<template>
  <div class="agency">
    <breadcrumb
      nameBread="Trang quản lý thành viên cho đại lý"
      subBread="Trang giúp bạn thiết lập các tài khoản Facebook"
    />
    <app-header/>
    <app-navigation
      @openPopup="isShowPopupInfo = $event"
      @openUpdateAgencyInfo="isShowPopupAgencyInfo = $event"
      @showResultSearch="resultsDefault = $event"
    />
    <app-main
      :resultsDefault="resultsDefault"
      @openPopupEdit="isShowPopupEdit = $event"
      @openPopup="isShowPopupEdit = $event"
    />

    <!--************* POPUP SIGN UP AND UPDATE ***************-->
    <transition name="popup">
      <app-agency-info
        v-if="isShowPopupAgencyInfo === true"
        @close="isShowPopupAgencyInfo = $event"
      />

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
import AppAgencyInfo from "./components/popup/setting";
import AppDelete from "./components/popup/delete";
import AppEdit from "./components/popup/edit";

export default {
  components: {
    AppAgencyInfo,
    AppHeader,
    AppNavigation,
    AppMain,
    AppInfo,
    AppDelete,
    AppEdit
  },
  data() {
    return {
      isShowPopupAgencyInfo: false,
      isShowPopupInfo: false,
      isShowPopupDelete: false,
      isShowPopupEdit: false,
      resultsDefault: false
    }
  },
  async created(){
    await this.$store.dispatch("getInfoAgency");
  }
}
</script>

<style scoped>

</style>
