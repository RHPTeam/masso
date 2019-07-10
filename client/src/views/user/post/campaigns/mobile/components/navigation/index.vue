<template>
  <div class="main--header px_3" :data-theme="currentTheme">
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
    <!-- Start: Header Left-->
    <div class="nav--left d_flex justify_content_start align_items_center">
      <router-link
        class
        tag="button"
        :to="{ name: 'post_campaigns', query: { size: 25, page: 1 } }"
        active-class="active"
      >Danh sách</router-link>
      <router-link
        class
        tag="button"
        :to="{ name: 'campaigns_default' }"
        active-class="active"
      >Chiến dịch mẫu</router-link>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      isShowCreatCampaignPopup: false
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    updateFilterShowSelected(val) {
      this.$emit("updateFilterShowSelected", val);
    },
    updateFilterStatusSelected(val) {
      if (val.id === "all") {
        const dataSender = {
          size: this.sizeDefault,
          page: this.pageDefault
        };
        this.$store.dispatch("getCampaignsByPage", dataSender);
      } else {
      }
      this.$emit("updateFilterStatusSelected", val);
    },
    async updateSearch() {
      const dataSender = {
        keyword: this.search,
        size: this.sizeDefault,
        page: this.pageDefault
      };
      await this.$store.dispatch("getCampaignsByKey", dataSender);

      this.$emit("updateSearch", this.search);
    }
  }
};
</script>

<style lang="scss" scoped>
.main--header {
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
  .nav--left {
     button {
      flex: 1;
      background-color: transparent;
      border: 0;
      border-bottom: 1px solid #484848;
      cursor: pointer;
      font-size: 0.95rem;
      display: block;
      color: #ccc;
      font-weight: 600;
      height: 100%;
      outline: none;
      padding-bottom: 0.5rem;
      transition: all 0.4s ease;
      &.active {
        border-color: #ffb94a;
        color: #ffb94a;
      }
    }
  }
}
/* Theme color */
.main--header[data-theme="light"] {
}
.main--header[data-theme="dark"] {
}

/*  ======== RESPONSIVE ======*/
@media screen and (min-width: 768px) and (max-width: 991px) {
}
</style>
