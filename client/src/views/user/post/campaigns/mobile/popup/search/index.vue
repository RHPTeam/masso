<template>
  <div class="modal--search-mobile">
    <div class="modal--content">
      <!-- Start: Header - Search -->
      <div class="items--header d_flex align_items_center p_3">
        <div class="list--input d_flex justify_content_between align_items_center">
          <span class="ml_3 mt_1">
            <icon-base icon-name="Tìm kiếm" width="20" height="20" viewBox="0 0 20 20">
              <icon-input-search />
            </icon-base>
          </span>
          <input
            v-model="search"
            @keydown.enter="updateSearch()"
            type="text"
            placeholder="Tìm kiếm"
          />
        </div>
        <div class="cancel ml_auto" @click="closePopupSearch">Hủy</div>
      </div>
      <!-- End: Header - Search -->
      <!-- Start: Search Near -->
      <!-- <div class="near px_3">
        <h6>Tìm kiếm gần đây</h6>
        <div class="list">
          <ul class="p_0 m_0" v-if="keyPopular && keyPopular.length > 0">
            <li v-for="(item, index) in keyPopular" :key="index">{{ item }}</li>
          </ul>
          <p v-else>Bạn chưa tìm gì.</p>
        </div>
      </div>-->
      <!-- End: Search Near -->
      <!-- Start: Main - Search -->
      <div class="items--body px_2">
        <!-- Start: List Content -->
        <vue-perfect-scrollbar class="infinite" @ps-y-reach-end="loadMore">
          <!-- <div v-for="(item, index) in listPostFacebookDefault" :key="index">
          <app-item :item="item"/>
        </div>
        <div v-if="this.$store.getters.listPostFacebookStatus === 'loading'" class="mt_3">
          <loading-component></loading-component>
        </div>
        <div
          v-if="this.$store.getters.listPostFacebookStatus === 'success' && listPostFacebookDefault.length === 0"
          class="item--body empty--data d_flex align_items_center justify_content_center px_2 py_2"
          >Không có dữ liệu</div>-->
          <div class="item d_flex align_items_center">
            <div
              class="fanpage tab"
              :class="isShowPopupFanpage === true ? 'active' : ''"
              @click="showPopupFanpage"
            >Chiến dịch</div>
            <div
              class="group tab"
              :class="isShowPopupGroup === true ? 'active' : ''"
              @click="showPopupGroup"
            >Chiến dịch mẫu</div>
          </div>
          <div class="content mt_2">
            <!-- Start: Fanpage -->
            <div class="fanpage" v-if="isShowPopupFanpage === true">
              <item-campaign
                :item="item"
                v-for="item in campaigns"
                :key="item._id"
                @showDetailPost="showPopupDetailCampaign($event)"
                @showPopupDelete="showPopupDelete($event)"
              />
            </div>
            <div class="group" v-if="isShowPopupGroup === true">
              <item-campaign-default
                :item="item"
                v-for="item in campaignsDefault"
                :key="item._id"
                @showPopupCopy="showPopupCopy($event)"
              />
            </div>
            <!-- Start: Group -->
            <!-- Start: Post group -->
          </div>
        </vue-perfect-scrollbar>
        <!-- Start: List Content -->
      </div>
      <!-- End: Main - Search -->
    </div>
    <!-- Start: Transition Popup -->
    <transition name="popup--mobile">
      <popup-detail-campaign
        v-if="isShowPopupDetailCampaign === true"
        @closePopup="isShowPopupDetailCampaign = $event"
        :campaign="selectedCampaign"
      />
    </transition>
    <!-- End: Transition Popup -->
    <!-- Start: Popup delete -->
    <transition name="popup--delete">
      <popup-delete
        :selectedCampaign="selectedCampaign"
        @closePopup="isShowPopupDelete = $event"
        @confirmDelete="confirmDeleteCampaign($event)"
        v-if="isShowPopupDelete === true"
      />
      <popup-copy
        :selectedCampaign="selectedCampaign"
        @closePopup="isShowPopupCopy = $event"
        v-if="isShowPopupCopy === true"
      />
      <!-- <popup-duplicate-campaign/> -->
    </transition>
    <!-- End: Popup delete -->
  </div>
</template>

<script>
import PopupDelete from "../delete";
import PopupDetailCampaign from "../detail";
import PopupCopy from "../copy";
import ItemCampaign from "../../item/campaign";
import ItemCampaignDefault from "../../item/campaign-default";

export default {
  components: {
    PopupDelete,
    PopupCopy,
    PopupDetailCampaign,
    ItemCampaign,
    ItemCampaignDefault
  },
  props: ["campaigns", "campaignsDefault"],
  data() {
    return {
      search: "",
      isLoadingData: false,
      selectedCampaign: {},
      isShowPopupFanpage: true,
      isShowPopupGroup: false,
      isShowPopupPostGroup: false,
      isShowAddToGroup: false,
      isShowPopupDelete: false,
      isShowPopupCopy: false,
      isShowPopupDetailCampaign: false
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  watch: {
    async search(val) {
      if (val.length === 0) {
        const dataSender = {
          size: 25,
          page: 1
        };
        await this.$store.dispatch("getCampaignsByPage", dataSender);
        await this.$store.dispatch("getCampaignSimple");

        // this.$router.replace({
        //   name: "post_campaigns",
        //   query: {
        //     size: 25,
        //     page: 1
        //   }
        // });

        this.$emit("updateCurrentPage", 1);
        this.$emit("updateSearch", this.search);
      }
    }
  },
  created() {
    const search = this.$route.query.search;
    if (search !== undefined) {
      this.search = search;
    }
  },
  methods: {
    async loadMore() {
      if (this.isLoadingData === true) {
        if (this.keyword !== "") {
          if (this.currentPage > this.numberPageCurrent) {
            return false;
          } else {
            this.isLoadingData = false;

            this.currentPage += 1;

            await this.$store.dispatch("searchPostsFacebookByKey", {
              keyword: this.keyword,
              size: this.maxPerPage,
              page: this.currentPage
            });
            this.isLoadingData = true;
          }
        }
      }
    },
    async updateSearch() {
      const dataSender = {
        keyword: this.search,
        size: 25,
        page: 1
      };
      await this.$store.dispatch("getCampaignsByKey", dataSender);

      // Search Default Campaign on Client Side.
      await this.$store.dispatch("getCampaignSimple");
      await this.$store.dispatch("getCampaignsSimpleByKey", {
        search: this.search,
        campaignsDefault: this.campaignsDefault
      });
      this.$emit("updateSearch", this.search);

      // this.$router.replace({
      //   name: "post_campaigns",
      //   query: {
      //     search: this.search,
      //     size: 25,
      //     page: 1
      //   }
      // });
    },
    closePopupSearch() {
      this.$emit("closePopupSearch", false);
    },
    showPopupFanpage() {
      this.isShowPopupFanpage = true;
      this.isShowPopupGroup = false;
      this.isShowPopupPostGroup = false;
    },
    showPopupGroup() {
      this.isShowPopupFanpage = false;
      this.isShowPopupGroup = true;
      this.isShowPopupPostGroup = false;
    },
    showPopupPostGroup() {
      this.isShowPopupFanpage = false;
      this.isShowPopupGroup = false;
      this.isShowPopupPostGroup = true;
    },
    showPopupAddToGroup() {
      this.isShowAddToGroup = true;
    },
    showPopupDelete(campaign) {
      this.selectedCampaign = campaign;
      this.isShowPopupDelete = true;
    },
    showPopupSearch() {
      this.isShowPopupSearch = true;
    },
    showPopupCopy() {
      this.isShowPopupCopy = true;
    },
    showPopupDetailCampaign(campaign) {
      this.selectedCampaign = campaign;
      this.isShowPopupDetailCampaign = true;
    },
    formatDate(d) {
      const dateTime = new Date(d);
      const date = String(dateTime.getDate()).padStart(2, "0");
      const month = String(dateTime.getMonth() + 1).padStart(2, "0");
      const year = dateTime.getFullYear();

      return `${date}/${month}/${year}`;
    },
    selectCampaign(campaign) {
      this.selectedCampaign = campaign;
    },
    confirmDeleteCampaign(event) {
      if (event === true) {
        this.selectedCampaign.id = this.selectedCampaign._id;
        this.$store.dispatch("deleteCampaign", this.selectedCampaign);
      }
    },
    confirmCopyCampaign(event) {
      if (event === true) {
        this.selectedCampaign.id = this.selectedCampaign._id;
        // this.$store.dispatch("deleteCampaign", this.selectedCampaign);
      }
    }
  }
};
</script>

<style scoped lang="scss">
.modal--search-mobile {
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background: #2f3136;
  z-index: 10;
  .modal--content {
    font-size: 0.875rem;
    .items--header {
      .list--input {
        border-radius: 10px;
        font-size: 0.875rem;
        height: 40px;
        background: #27292d;
        width: calc(100vw - 2rem - 35px);
        > input[type="text"] {
          background-color: transparent;
          border: 0;
          color: #fff;
          height: 100%;
          outline: none;
          width: calc(100% - 48px);
          padding-right: 15px;
          &::placeholder {
            color: #666;
          }
        }
        svg {
          color: #999;
        }
      }
    }
    .items--body {
      .item {
        .tab {
          text-align: center;
          flex: 1;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #ccc;
          &.active {
            color: #ffb94a;
            border-color: #ffb94a;
          }
        }
      }
    }
    .near {
      .list {
        li {
          list-style: none;
          border-bottom: 1px solid #ccc;
          padding: 0.5rem 0;
        }
      }
    }
    .items--footer {
      position: fixed;
      border-top: 1px solid #454545;
      bottom: 0;
      left: 0;
      width: 100%;
    }
  }
}
.fanpage,
.group {
  .item--content {
    border-bottom: 1px solid #83838338;
    padding: 0.5rem 0;

    .left {
      width: 90%;
      overflow: hidden;

      p {
        max-width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .right {
      .active {
        height: 10px;
        width: 10px;
        border-radius: 50%;
        background: green;
        display: block;
        margin-right: 0.625rem;
      }
      .deactive {
        height: 10px;
        width: 10px;
        border-radius: 50%;
        background: gray;
        display: block;
        margin-right: 0.625rem;
      }
    }
    .content {
      width: 80%;
    }
    .action {
      width: 20%;
    }
  }
}
.infinite {
  max-height: calc(100vh - 112px);
}
.infinite--control-block {
  width: 100%;
  #scrollTrigger {
    height: 30px;
  }
  .circle--loading {
    animation: animate 1.5s infinite linear;
    border-radius: 50%;
    border: 3px solid rgba(255, 255, 255, 0.2);
    border-top: 3px solid #fff;
    height: 30px;
    margin-left: 50%;
    transform: translate(-50%, -50%);
    width: 30px;
  }

  @keyframes animate {
    0% {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
}
.popup-enter {
  transform: translateY(100%);
}

.popup-enter-to {
  transition: transform 0.2s;
  transform: translateY(0);
}

.popup-leave-to {
  transition: transform 0.2s;
  transform: translateY(100%);
}

.popup--delete-enter {
  transform: translateY(100%);
}

.popup--delete-enter-to {
  transition: transform 0.2s;
  transform: translateY(0);
}

.popup--delete-leave-to {
  transition: transform 0.2s;
  transform: translateY(100%);
}
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
</style>
