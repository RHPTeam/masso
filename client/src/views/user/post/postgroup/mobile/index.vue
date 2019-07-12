<template>
  <div class="main--mobile px_2">
    <!-- Start: Content -->
    <div class="main--content position_relative">
      <!-- Start: Search -->
      <div class="page--group-search mb_3 d_flex align_items_center position_relative" :data-theme="currentTheme">
        <div class="mr_auto search" @click="showPopupSearch">
          <span class="ml_2">
            <icon-base
              class="ic--search"
              icon-name="Tìm kiếm"
              width="20"
              height="20"
              viewBox="0 0 20 20"
            >
              <icon-input-search/>
            </icon-base>
          </span>
          <input class="search--input" placeholder="Tìm kiếm" type="text" v-model="search">
        </div>
      </div>
      <!-- End: Search -->
      <!-- Start: Group -->
      <app-group @updateGroupSelected="isShowPopupDetailGroup = $event"/>
      <!-- End: Group -->
      <!-- Start: Info -->
      <!-- <app-info
        :groupSelected="groupSelected"
        :typeFilterSelected="typeFilterSelected"
        @updateFilterSelected="typeFilterSelected = $event"
      /> -->
      <!-- End: Info -->

      <!-- Start: Edit & Add && Xoa -->
      <!-- <div class="d_flex action align_items_center">
        <div class="edit mr_auto">
          <icon-base class="mr_2" icon-name="Chỉnh sửa" viewBox="0 0 20 20">
            <icon-edit />
          </icon-base>Edit</div>
        <div class="add--remove ml_auto">Add</div>
      </div> -->
      <!-- End: Edit & Add && Xoa -->

      <!-- Start: List -->
      <VuePerfectScrollbar class="list--post-group">
        <app-table />
      </VuePerfectScrollbar>
      <!-- End: List -->
    </div>
    <!-- End: Content -->

    <!-- Start: Transition Popup -->
    <transition name="popup--mobile">
      <popup-search v-if="isShowPopupSearch === true" @closePopupSearch="isShowPopupSearch = $event"/>
      <popup-detail-group @closePopup="isShowPopupDetailGroup = $event" v-if="isShowPopupDetailGroup === true"/>
    </transition>
    <!-- End: Transition Popup -->
  </div>
</template>

<script>
import AppGroup from "./group";
import AppInfo from "../desktop/info";
import AppTable from "./table";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import PopupSearch from "./popup/search";
import PopupDetailGroup from "./detail";
export default {
  components: {
    AppGroup,
    // AppInfo,
    AppTable,
    VuePerfectScrollbar,
    PopupSearch,
    PopupDetailGroup
  },
  data() {
    return {
      groupSelected: false,
      typeFilterSelected: "Tất cả",
      search: "",
      isShowPopupSearch: false,
      isShowPopupDetailGroup: false
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  created() {
    this.$store.dispatch("postGroupGroupsSelected", []);
    this.$store.dispatch("postGroupPagesSelected", []);
  },
  methods: {
    showPopupSearch() {
      this.isShowPopupSearch = true;
    },
    showPopupDetailGroup() {
      this.isShowPopupDetailGroup = true;
    }
  },
};
</script>

<style lang="scss" scoped>
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

.page--group-search {
  background-clip: padding-box;
  background: #2b2d33;
  color: #ccc;
  border-radius: 0.5rem;
  .search {
    width: 90%;
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
    width: 87%;
    color: #ccc;
    border: 0;
    font-size: 0.875rem;
    height: 40px;
    line-height: 40px;
    padding: 0.375rem 0.75rem 0.375rem 0.25rem;
    // width: calc(100%-24px);
    &:active,
    &:focus,
    &:visited {
      outline: 0 !important;
      box-shadow: none;
    }
  }
}
.main--mobile {
  .main--content {
    .list--post-group {
      max-height: 60vh;
      overflow: hidden;
    }
  }
}
</style>
