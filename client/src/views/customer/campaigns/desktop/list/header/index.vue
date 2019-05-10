<template>
  <div class="r main--header mb_4" :data-theme="currentTheme">
    <!-- Start: Header Left-->
    <div class="c_md_12 c_lg_6 main--header-left d_flex">
      <div class="btn--add-campaign mr_3"
				@click="isShowCreatCampaignPopup = true"
      >Thêm chiến dịch</div>
      <div class="campaign--search">
        <span class="ml_2">
          <icon-base
            class="ic--search"
            icon-name="ic--search"
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
          @input="updateSearch()"
        />
      </div>
    </div>
    <!-- End: Header Left-->
    <!-- Start: Header Right-->
    <div class="c_md_12 c_lg_6 main--header-right text_right">
      <app-filter
        class="mr_2"
        :filterList="filterShowList"
        :filterSelected="filterShowSelected"
        @updateFilterSelected="updateFilterShowSelected($event)"
      />
      <app-filter
        :filterList="filterStatusList"
        :filterSelected="filterStatusSelected"
        @updateFilterSelected="updateFilterStatusSelected($event)"
      />
    </div>
    <!-- End: Header Right-->
		<!--	Start: Create Campaign Popup	-->
		<transition name="popup">
			<create-campaign-popup
        v-if="isShowCreatCampaignPopup === true"
        @closePopup="isShowCreatCampaignPopup = $event"
      />
		</transition>
		<!--	End: Create Campaign Popup	-->
  </div>
</template>

<script>
import AppFilter from "./filter/index";
import CreateCampaignPopup from "../../popup/created/createcapaigns";
export default {
  components: {
    AppFilter,
    CreateCampaignPopup
  },
  props: [ "filterShowSelected", "filterStatusSelected" ],
  data() {
    return {
      filterShowList: [
        { id: 25, name: "Hiển thị 25" },
        { id: 50, name: "Hiển thị 50" },
        { id: 100, name: "Hiển thị 100" }
      ],
      filterStatusList: [
        { id: "all", name: "Tất cả trạng thái" },
        { id: "active", name: "Đang hoạt động" },
        { id: "deactive", name: "Ngừng hoạt động" }
      ],
      isShowCreatCampaignPopup: false,
      search: ""
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    updateFilterShowSelected( val ) {
      this.$emit( "updateFilterShowSelected", val );
    },
    updateFilterStatusSelected( val ) {
      this.$emit( "updateFilterStatusSelected", val );
    },
    updateSearch() {
      this.$emit( "updateSearch", this.search );
    }
  }
};
</script>

<style lang="scss" scoped>
.main--header {
  .main--header-left {
    .btn--add-campaign {
      border-radius: 0.5rem;
      cursor: pointer;
      font-size: 0.875rem;
      font-weight: 600;
      height: 40px;
      line-height: 40px;
      padding: 0 .75rem;
      &:active,
      &:focus,
      &:visited {
        outline: 0 !important;
        box-shadow: none;
      }
    }
    .campaign--search {
      background-clip: padding-box;
      border: 0;
      border-radius: 0.5rem;
      svg.ic--search {
        vertical-align: middle;
      }
      .search--input {
        background-clip: padding-box;
        border: 0;
        border-radius: 0.5rem;
        font-size: 0.875rem;
        height: 40px;
        line-height: 40px;
        padding: 0.375rem 0.75rem 0.375rem 0.25rem;
        width: calc(100%-24px);
        &:active,
        &:focus,
        &:visited {
          outline: 0 !important;
          box-shadow: none;
        }
      }
    }
  }
  .main--header-right {
    font-size: 0.875rem;
  }
}
/* Theme color */
.main--header[data-theme="light"] {
  .main--header-left {
    .btn--add-campaign {
      background-color: #ffb94a;
      color: #fff;
      &:hover {
        background-color: #ff9e4a;
      }
    }
    .campaign--search {
      background-color: #fff;
      svg.ic--search {
        color: #999999;
      }
      .search--input {
        background-color: #fff;
        color: #444;
        &::placeholder {
          color: #ccc;
        }
      }
    }
  }
}
.main--header[data-theme="dark"] {
  .main--header-left {
    .btn--add-campaign {
      background-color: #ffb94a;
      color: #fff;
      &:hover {
        background-color: #ff9e4a;
      }
    }
    .campaign--search {
      background-color: #27292d ;
      svg.ic--search {
        color: #999999;
      }
      .search--input {
        background-color: #27292d ;
        color: #f7f7f7;
        &::placeholder {
          color: #666;
        }
      }
    }
  }
}
</style>
