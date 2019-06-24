<template>
  <div class="main--mobile p_3">
    <!-- Start: Content -->
    <div class="main--content position_relative">
      <!-- Start: Search -->
      <div class="page--group-search mb_3 d_flex align_items_center position_relative" :data-theme="currentTheme">
        <div class="mr_auto search">
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
      <app-group :groupSelected="groupSelected" @updateGroupSelected="groupSelected = $event"/>
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
  </div>
</template>

<script>
import AppGroup from "./group";
import AppInfo from "../desktop/info";
import AppTable from "./table";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
export default {
  components: {
    AppGroup,
    AppInfo,
    AppTable,
    VuePerfectScrollbar
  },
  data() {
    return {
      groupSelected: false,
      typeFilterSelected: "Tất cả",
      search: ""
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
  },
};
</script>

<style lang="scss" scoped>
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
      max-height: 50vh;
      overflow: hidden;
    }
  }
}
</style>