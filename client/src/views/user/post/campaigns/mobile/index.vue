<template>
  <div class="main--mobile px_3">
    <!-- Start: Search -->
    <div
      class="campaign-search mb_3 d_flex align_items_center position_relative"
      :data-theme="currentTheme"
    >
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
        <input class="search--input" placeholder="Tìm kiếm" type="text">
      </div>
    </div>
    <!-- End: Search -->

    <!-- Start: Tabs - Campaigns and Campaigns Default -->
    <div class="tabs--campaigns text_center d_flex align_items_center mb_3">
      <div
        class="campaign items"
        @click="showCampaigns"
        :class="isShowCampaigns === true ? 'active' : '' "
      >Danh sách</div>
      <div
        class="campaign--default items"
        @click="showCampaignDefault"
        :class="isShowCampaignDefault === true ? 'active' : '' "
      >Chiến dịch mẫu</div>
    </div>
    <!-- End: Tabs - Campaigns and Campaigns Default -->

    <!-- Start: List Campagin -->
    <list-campaign v-if="isShowCampaigns === true"/>
    <!-- End: List Campagin -->

    <!-- Start: Campagin Default -->
    <campaign-default v-if="isShowCampaignDefault === true"/>
    <!-- End: Campagin Default -->
  </div>
</template>

<script>
import ListCampaign from "./list";
import CampaignDefault from "./default"
export default {
  components: {
    ListCampaign,
    CampaignDefault
  },
  data() {
    return {
      isShowCampaigns: true,
      isShowCampaignDefault: false
    }
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    showCampaigns() {
      this.isShowCampaigns = true;
      this.isShowCampaignDefault = false;
    },
    showCampaignDefault() {
      this.isShowCampaignDefault = true;
      this.isShowCampaigns = false;
    }
  },
};
</script>

<style lang="scss" scoped>
.main--mobile {
  .campaign-search {
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
      // width: calc(100%-24px);
      &:active,
      &:focus,
      &:visited {
        outline: 0 !important;
        box-shadow: none;
      }
    }
  }
  .tabs--campaigns {
    .items {      
      font-size: 0.93rem;
      padding: 0.4rem 0;
      border-bottom: 1px solid #484848;
      flex: 1;
      &.active {
        color: #ffb94a;
        border-color: #ffb94a;
      }
    }
  }
}
</style>