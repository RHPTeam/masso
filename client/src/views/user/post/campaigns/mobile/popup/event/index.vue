<template>
  <div class="modal--wrapper" :data-theme="currentTheme">
    <div class="modal--dialog d_flex justify_content_center">
      <div class="modal--content" :class="isShowDropdownAction === true ? 'active' : ''">
        <!-- Start: Modal Header -->
        <div class="modal--header d_flex align_items_center">
          <div @click="closePopup">
            <icon-base
              icon-name="arrow-down"
              class="arrow-down"
              width="20"
              height="20"
              viewBox="0 0 130 130"
            >
              <icon-arrow-down />
            </icon-base>
          </div>
          <p class="name--modal mb_0 m_auto" v-if="event._id">Cập nhật sự kiện</p>
          <p class="name--modal mb_0 m_auto" v-else>Tạo sự kiện</p>
          <div class="active mr_2" @click="updateEvent" v-if="event._id">Lưu</div>
          <div class="active mr_2" @click="createEvent" v-else>Tạo</div>
        </div>
        <!-- End: Modal Header -->
        <!-- Start: Modal Body -->
        <VuePerfectScrollbar class="scroll-event" ref="scroll">
          <div class="modal--body px_2 mt_2">
            <!-- Start: Name -->
            <app-header :event="event" />
            <!-- End: Name -->
            <!-- Start: Post Time -->
            <post-time />
            <!-- End: Post Time -->

            <!-- Start: Post Custom -->
            <post-custom @setErrorPost="errorPost = $event" :error="errorPostContent" />
            <!-- End: Post Custom -->
            <!-- Start: Mix Plugin -->
            <mix-plugin
              v-if="event.plugins"
              :errorMixStatus="errorMixStatus"
              :errorMixText="errorMixText"
              @updateErrorMixStatus="errorMixStatus = $event"
              @updateErrorMixText="errorMixText = $event"
            ></mix-plugin>
            <!-- End: Mix Plugin -->

            <!-- Start: Post Location -->
            <post-location
              @setErrorLocation="errorLocation = $event"
              :errorPostLocation="errorPostLocation"
            />
            <!-- End: Post Location -->
          </div>
        </VuePerfectScrollbar>
        <!-- End: Modal Body -->
        <div class="modal--footer action--events">
          <div class="items d_flex align_items_center">
            <div
              class="mr_auto item pl_2 delete"
              v-if="event._id"
              @click="showPopupDeleteEvent"
            >Xóa sự kiện</div>
            <!-- <div class="ml_auto item pr_2" @click="showContentAdvane">Nội dung nâng cao</div> -->
          </div>
        </div>
      </div>
      <div class="action--more">
        <div class="action" @click="showDropdownAction">
          <icon-base icon-name="Thêm" width="27" height="27" viewBox="0 0 60 60" v-if="isShowDropdownAction === false">
            <icon-plus />
          </icon-base>
          <icon-base icon-name="close" width="20" height="20" viewBox="0 0 20 20" v-else>
            <icon-close/>
          </icon-base>
        </div>
        <div class="dropdown--action" v-if="isShowDropdownAction === true" :class="isShowDropdownAction === true ? 'active' : ''" v-click-outside="closeDropdownAction">
          <ul class="p_0 m_0">
            <li @click="showContentAdvane" class="d_flex align_items_center justify_content_end">
              <div class="title p_2">
                Nội dung nâng cao
              </div>
              <div class="ml_3">
                <icon-base
                  class="icon icon--mix mr_2"
                  height="14px"
                  width="14px"
                  viewBox="0 0 580 580"
                >
                  <icon-mix></icon-mix>
                </icon-base>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- Start: Transition Popup -->
      <transition name="popup--mobile">
        <content-advance
          v-if="isShowContentAdvance === true"
          @closePopup="isShowContentAdvance = $event"
        />
      </transition>
      <transition name="popup">
        <popup-delete
          v-if="isShowPopupDelete === true"
          title="sự kiện"
          :nameEvent="event.title"
          @closePopup="isShowPopupDelete = $event"
          @confirmDelete="deleteEvent"
          :selectedCampaign="campaign.title"    
        />
      </transition>
      <!-- End: Transition Popup -->
    </div>
  </div>
</template>

<script>
import AppHeader from "./components/header";
import ContentAdvance from "./components/advancecontent";
import MixPlugin from "./components/plugins/mix";
import PostCustom from "./components/postcontent";
import PopupDelete from "../delete";
import PostLocation from "./components/postlocation";
import PostTime from "./components/posttime";
export default {
  components: {
    AppHeader,
    ContentAdvance,
    MixPlugin,
    PostCustom,
    PopupDelete,
    PostLocation,
    PostTime
  },
  props: ["campaign"],
  data() {
    return {
      colors: [
        "#85CFFF",
        "#BE92E3",
        "#7BD48A",
        "#999999",
        "#FFB94A",
        "#FF8787"
      ],
      isShowColorDropdown: false,
      isShowDropdownAction: false,
      isShowPopupCategory: false,
      isShowPopupDelete: false,
      isShowPopupTime: false,
      isShowPopupPostPlace: false,
      errorPostContent: false,
      errorPostLocation: false,
      errorMixStatus: false,
      errorMixText: "",
      isShowMoreOptions: false,
      isShowContentAdvance: false
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    event() {
      return this.$store.getters.event;
    }
  },
  methods: {
    closeColorGrid() {
      this.isShowColorDropdown = false;
    },
    closeMoreOptions() {
      this.isShowMoreOptions = false;
    },
    changeColor(value) {
      this.$store.dispatch("setEvent", {
        key: "color",
        value: value
      });
      this.isShowColorDropdown = false;
    },
    closePopup() {
      this.$store.dispatch("setEventReset");
      this.$emit("closePopup", false);
    },
    closeDropdownAction() {
      this.isShowDropdownAction = false;
    },
    async createEvent() {
      // Validate
      if (
        this.event.post_custom.length === 0 &&
        this.event.post_category === ""
      ) {
        this.errorPostContent = true;
        return;
      } else if (
        this.event.target_custom.length === 0 &&
        !this.event.target_category &&
        this.event.timeline.length === 0
      ) {
        this.errorPostLocation = true;
        return;
      }
      this.$emit("closePopup", false);

      await this.$store.dispatch("createEvent", {
        campaignId: this.campaign._id,
        event: this.event
      });

      this.$store.dispatch("setEventReset");
    },
    async deleteEvent() {
      const data = {
        eventId: this.event._id,
        campaignId: this.campaign._id
      };
      await this.$store.dispatch("deleteEvent", data);
      this.closePopup();
    },
    showContentAdvane() {
      this.isShowContentAdvance = true;
    },
    showDropdownAction() {
      this.isShowDropdownAction = true;
    },
    showMoreOptions() {
      this.isShowMoreOptions = true;
    },
    showPopupDeleteEvent() {
      this.isShowPopupDelete = true;
    },
    showPopupTime() {
      this.isShowPopupTime = true;
    },
    showPopupCategory() {
      this.isShowPopupCategory = true;
      this.$store.dispatch("setCaseEvent", 1);
    },
    showPopupPostPlace() {
      this.isShowPopupPostPlace = true;
    },
    async updateEvent() {
      this.$emit("closePopup", false);
      // Mix Validate Empty data
      if (this.event.plugins) {
        if (
          this.event.plugins.mix.open === null &&
          this.event.plugins.mix.close === null
        ) {
          this.$emit("updateErrorMixStatus", true);
          this.$emit(
            "updateErrorMixText",
            "Bạn phải chọn danh mục mở bài hoặc kết bài!"
          );
          return;
        }
      }

      // Validate
      if (
        this.event.post_custom.length === 0 &&
        this.event.post_category === ""
      ) {
        this.$emit("updateErrorPostContent", true);
        return;
      } else if (this.errorMixStatus) {
        return;
      } else if (
        this.event.target_custom.length === 0 &&
        !this.event.target_category &&
        this.event.timeline.length === 0
      ) {
        this.$emit("updateErrorPostLocation", true);
        return;
      }

      // Convert event timeline to accounts id array
      let fbAccounts = [];
      this.event.timeline.forEach(account => {
        fbAccounts.push(account._id);
      });
      this.event.timeline = fbAccounts;

      await this.$store.dispatch("updateEvent", {
        campaignId: this.campaign._id,
        event: this.event
      });

      this.$store.dispatch("setEventReset");

      // this.$emit( "updateErrorPostContent", false );
      // this.$emit( "updateErrorPostLocation", false );
    }
  }
};
</script>

<style lang="scss" scoped>
@import "index.style";
.more--options {
  bottom: 0;
  left: 2.5%;
  width: 95%;
  .item {
    background: #27292c;
    padding: 0.625rem 0;
    border-bottom: 1px solid #444;
    &:last-child {
      border: 0;
    }
  }
}
.error {
  color: red;
}
</style>
