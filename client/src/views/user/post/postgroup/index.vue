<template>
  <div class="main" :data-theme="currentTheme">
    <!-- Start: Desktop Component-->
    <div class="d_none d_md_block">
      <breadcrumb
        nameBread="Quản lý nhóm"
        subBread="Trang giúp bạn quản các trang và nhóm Facebook"
      />
      <!-- Start: Content -->
      <div class="main--content">
        <!-- Start: Group -->
        <app-group
          :groupSelected="groupSelected"
          @updateGroupSelected="groupSelected = $event"

        />
        <!-- End: Group -->
        <!-- Start: Search -->
        <div class="page--group-search mb_2 mt_3" :data-theme="currentTheme">
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
          <input class="search--input"
            placeholder="Tìm kiếm"
            type="text"
            v-model="search"
          />
        </div>
        <!-- End: Search -->
        <!-- Start: Info -->
        <app-info
          :groupSelected="groupSelected"
          :typeFilterSelected="typeFilterSelected"
          @updateFilterSelected="typeFilterSelected = $event"
        />
        <!-- End: Info -->
        <!-- Start: List -->
        <app-table
          :groupSelected="groupSelected"
          :typeFilterSelected="typeFilterSelected"
          :search="search"
        />
        <!-- End: List -->
      </div>
      <!-- End: Content -->
    </div>
    <!-- End: Desktop Component-->
  </div>
</template>

<script>
import AppGroup from "./desktop/group/index";
import AppInfo from "./desktop/info/index";
import AppTable from "./desktop/table/index";

export default {
  components: {
    AppGroup,
    AppInfo,
    AppTable
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
  },
  computed: {    
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
};
</script>

<style lang="scss" scoped>
.page--group-search {
    background-clip: padding-box;
    background: #fff;
    border: 0;
    border-radius: 0.5rem;
    svg.ic--search {
    vertical-align: middle;
    }
    .search--input {
    background-clip: padding-box;
    width: 80%;
    border: 0;
    border-radius: 0.5rem;
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

// =============== CHANGE THEME

.main[data-theme="dark"] {
  .main--content {
    .page--group-search {
      background: #2b2d33;
      color: #ccc;
      .search--input {
        background: #2b2d33;
        color: #ccc;
      }
    }
  }
}
</style>
