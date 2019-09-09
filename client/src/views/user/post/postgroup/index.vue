<template>
  <div class="main" :data-theme="currentTheme">
    <!-- Start: Desktop Component-->
    <div class="d_none d_md_block">
      <div class="d_flex align_items_center">
        <breadcrumb
          nameBread="Nhóm và trang"
          subBread="Trang giúp bạn quản các trang và nhóm Facebook"
        />
        <div class="guide ml_3" @click="redirectBlogHelp">
          <icon-base
            class="icon icon--help"
            width="18px"
            height="18px"
            icon-name="Hướng dẫn"
            viewBox="0 0 320 320"
          >
            <icon-help />
          </icon-base>
        </div>
      </div>

      <!-- Start: Content -->
      <div class="main--content">
        <!-- Start: Group -->
        <app-group
          :groupSelected="groupSelected"
          @updateGroupSelected="groupSelected = $event"
        />
        <!-- End: Group -->
        <!-- Start: Info -->
        <app-info
          :groupSelected="groupSelected"
          :typeFilterSelected="typeFilterSelected"
          @updateFilterSelected="typeFilterSelected = $event"
          @updateSearch="search = $event"
        />
        <!-- End: Info -->
        <!-- Start: List -->
        <app-table
          :groupSelected="groupSelected"
          :typeFilterSelected="typeFilterSelected"
          :search="search"
          @updateGroupSelected="groupSelected = $event"
        />
        <!-- End: List -->
      </div>
      <!-- End: Content -->
    </div>
    <!-- End: Desktop Component-->

    <!--Start: Mobile Component-->
    <div class="d_block d_md_none">
      <app-mobile />
    </div>
    <!--End: Mobile Component-->
  </div>
</template>

<script>
import AppGroup from "./desktop/group/index";
import AppInfo from "./desktop/info/index";
import AppTable from "./desktop/table/index";
import AppMobile from "./mobile"

export default {
  components: {
    AppGroup,
    AppInfo,
    AppTable,
    AppMobile
  },
  data(){
    return {
      groupSelected: false,
      typeFilterSelected: "Tất cả",
      search: ""
    }
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  created() {
    this.$store.dispatch( "postGroupGroupsSelected", [] );
    this.$store.dispatch( "postGroupPagesSelected", [] );
  },
  methods: {
    redirectBlogHelp() {
      const routes = "https://www.zinbee.vn/#/help/5d284e9aed508f518567722d?type=hc_global_nav";
      window.open(routes, '_blank');
    }
  },
};
</script>

<style lang="scss" scoped>
  .guide {
    cursor: pointer;
    margin-bottom: -0.75rem;
  }
</style>
