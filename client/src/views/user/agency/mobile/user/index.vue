<template>
  <div class="user">
    <VuePerfectScrollbar class="list--user">
      <div v-if="!agency">Không có dữ liệu</div>
      <app-item
        v-else
        v-for="(member, index) in agency"
        :key="index"
        :member="member"
        @openEdit="isShowPopupDetail = $event"
      />
    </VuePerfectScrollbar>
    <transition name="popup--mobile">
      <popup-detail v-if="isShowPopupDetail === true" @closePopup="isShowPopupDetail = $event"/>
    </transition>
  </div>
</template>

<script>
import AppItem from "./item";
import PopupDetail from "./popup/detail";
import VuePerfectScrollbar from "vue-perfect-scrollbar";

export default {
  components: {
    AppItem,
    PopupDetail,
    VuePerfectScrollbar
  },
  data() {
    return {
      isShowPopupDetail: false
    }
  },
  computed: {
    agency(){
      return this.$store.getters.memberAgency;
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./index.style";
.popup--mobile-enter {
  transform: translateX(100%);
}

.popup--mobile-enter-to {
  transition: transform 0.75s;
  transform: translateX(0);
}

.popup--mobile-leave-to {
  transition: transform 0.75s;
  transform: translateX(100%);
}
.list--user {
  max-height: 66vh;
}
</style>
