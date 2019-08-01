<template>
  <div class="modal--main-mobile">
    <!-- Start: Search -->
    <div class="items--header mx_3 d_flex align_items_center position_relative mb_3">
      <div class="mr_auto search" @click="showPopupSearch">
        <span class="ml_2">
          <icon-base
            class="ic--search"
            icon-name="Tìm kiếm"
            width="20"
            height="20"
            viewBox="0 0 20 20"
          >
            <icon-input-search />
          </icon-base>
        </span>
        <input class="search--input" placeholder="Tìm kiếm" type="text" />
      </div>
    </div>
    <!-- End: Search -->
    <!-- Start: Main -->
    <div class="items--body px_3">
      <!-- Start: Months -->
      <app-month />
      <!-- End: Months -->
      <!-- Start: List user -->
      <list-user />
      <!-- Start: List user -->
    </div>
    <!-- End: Main -->
    <transition name="popup--mobile">
      <app-search v-if="isShowPopupSearch === true" @closePopup="isShowPopupSearch = $event"/>    
    </transition>
  </div>
</template>

<script>
import AppSearch from "./user/popup/search";
import AppMonth from "./components/months";
import ListUser from "./user";
export default {
  data() {
    return {
      isShowPopupSearch: false
    }
  },
  components: {
    AppSearch,
    AppMonth,
    ListUser
  },
  methods: {
    showPopupSearch() {
      this.isShowPopupSearch = true;
    }
  },
  async created(){
    await this.$store.dispatch("getInfoAgency");
  }
};
</script>

<style scoped lang="scss">
.modal--main-mobile {
  .items--header {
    background-clip: padding-box;
    background: #2b2d33;
    color: #ccc;
    border-radius: 0.5rem;

    .search {
      width: 100%;
      // background: #2b2d33;
    }

    svg.ic--search {
      vertical-align: middle;
    }

    .ic--options {
      height: 20px;
      text-align: center;
      // width: 30px;
      font-size: 14px;
    }

    .search--input {
      background-clip: padding-box;
      background: #2b2d33;
      width: 89%;
      color: #ccc;
      border: 0;
      font-size: 0.875rem;
      height: 40px;
      line-height: 40px;
      padding: 0.375rem 0.75rem 0.375rem 0.25rem;
      pointer-events: none;

      // width: calc(100%-24px);
      &:active,
      &:focus,
      &:visited {
        outline: 0 !important;
        box-shadow: none;
      }
    }
  }
  // TRANSITION 
  
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
}
</style>
