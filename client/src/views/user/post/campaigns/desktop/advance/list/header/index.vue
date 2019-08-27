<template>
  <div class="r main--header" :data-theme="currentTheme">
    <!-- Start: Header Left-->
    <div class="c_md_6 main--header-left d_flex">
      <!-- START: FILTER  -->
      <div class="campaign--search d_flex align_items_center">
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
        <input class="search--input"
          placeholder="Tìm kiếm chiến dịch"
          type="text"
          v-model="keyword"
          @keydown.enter="searchCampaign(keyword)"
        />
      </div>
      <!-- END: FILTER -->
    </div>
    <!-- End: Header Left-->

    <!-- Start: Header Right-->
    <div class="c_md_6 main--header-right text_right">

      <!-- START: SHOW OPTION FILTER ABOUT AMOUNT  -->
      <app-filter
        class="mr_2"
        :filterList="filterShowList"
        :filterSelected="filterShowSelected"
        @updateFilterSelected="updateFilterShowSelected($event)"
      />
      <!-- END: SHOW OPTION FILTER ABOUT AMOUNT  -->

      <!-- START: SHOW OPTION FILTER ABOUT STATUS ACTION  -->
      <!--<app-filter
        :filterList="filterStatusList"
        :filterSelected="filterStatusSelected"
        @updateFilterSelected="updateFilterStatusSelected($event)"
      />-->
      <!-- END: SHOW OPTION FILTER ABOUT STATUS ACTION  -->
    </div>
    <!-- End: Header Right-->
		<!--	Start: Create Campaign Popup	-->
		<transition name="popup">
			<create-campaign-popup
        v-if="isShowCreatCampaignPopup === true"
        @closePopup="isShowCreatCampaignPopup = $event"
        @closeCreateCamppaign="isShowCreatCampaignPopup = $event"
      >
      </create-campaign-popup>
		</transition>
		<!--	End: Create Campaign Popup	-->
  </div>
</template>

<script>
import AppFilter from "./filter/index";
import CreateCampaignPopup from "../../../popup/campaigns/create/index";

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
      keyword: "",
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  watch: {
    keyword( val ) {
      if ( val.length === 0 ) {
        const dataSender = {
          size: this.filterShowSelected.id,
          page: 1
        };
        this.$store.dispatch( "getCampaignsByPage", dataSender );

        this.$router.replace( {
          name: "post_campaigns",
          query: {
            size: this.filterShowSelected.id,
            page: 1
          }
        } );

        this.$emit( "updateCurrentPage", 1 );
        this.$emit( "updateSearch", this.keyword );
      }
    }
  },
  created() {
    const search = this.$route.query.search;

    if ( search !== undefined ) {
      this.keyword = search;
    }
  },
  methods: {
    /**
     * @Description: function change value when use filter amount
     * @param val is value received from function emit
     */
    updateFilterShowSelected( val ) {
      this.$emit( "updateFilterShowSelected", val );
    },
    /**
     * @Description: function change value when use filter status options: active, don't active, all campaign
     * @param val is value received from function emit contain size with page default is 1
     */
    updateFilterStatusSelected( val ) {
      if ( val.id === "all" ) {
        const dataSender = {
          size: this.sizeDefault,
          page: this.pageDefault
        };
        this.$store.dispatch("getCampaignsByPage", dataSender);
      } else {

      }
      this.$emit( "updateFilterStatusSelected", val );
    },
    /**
     * @Description: function search campaign with key words
     * if key word is empty dispatch function get campaign with page = 1 and size default. then use query for router
     * @param: if key word difference empty then dispatch function search on store with data contain: key word, size, page. then replace params in router
     */
    async searchCampaign(keyword) {
      console.log(3);
      if(keyword.length !== 0) {
        console.log(2);
        const dataSender = {
          keyword: this.keyword,
          size: this.filterShowSelected.id,
          page: 1
        };
        await this.$store.dispatch("getCampaignsByKey", dataSender);

        this.$router.replace( {
          name: "post_campaigns",
          query: {
            search: this.keyword,
            size: this.filterShowSelected.id,
            page: 1
          }
        } );

        this.$emit( "updateSearch", this.keyword );

      } else {


        console.log(1);

        const dataSender = {
          size: this.filterShowSelected.id,
          page: 1
        };

        await this.$store.dispatch( "getCampaignsByPage", dataSender );

        this.$router.replace( {
          name: "post_campaigns",
          query: {
            size: this.filterShowSelected.id,
            page: 1
          }
        } );
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.main--header {
  .nav--left {
    height: 40px;
    > button {
      background-color: transparent;
      border: 0;
      border-radius: .625rem;
      cursor: pointer;
      font-size: .95rem;
      font-weight: 600;
      height: 100%;
      outline: none;
      padding: 0 .5rem;
      transition: all 0.4s ease;
    }
    .btn--create {
      background-color: #ffb94a;
      border-radius: 0.5rem;
      color: #fff;
      cursor: pointer;
      font-size: .95rem;
      font-weight: 600;
      height: 40px;
      line-height: 40px;
      padding: 0 .75rem;
      transition: all 0.4s ease;
      &:hover {
        background-color: #FF9E4A;
      }
    }
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
    .divider {
      height: 16px;
      width: 2px;
    }
  }
  .main--header-left {
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
        max-width: 100%;
        // width: calc(100%-24px);
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
  .nav--left {
    button {
      color: #ccc;
      &:hover,
      &.active {
        color: #ffb94a;
      }
    }
    .divider {
      background-color: #666;
    }
    .btn--add-campaign {
      background-color: #ffb94a;
      color: #fff;
      &:hover {
        background-color: #ff9e4a;
      }
    }
  }
  .main--header-left {
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
