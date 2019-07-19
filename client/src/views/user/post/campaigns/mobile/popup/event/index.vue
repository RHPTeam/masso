<template>
  <div class="modal--wrapper" :data-theme="currentTheme">
    <div class="modal--dialog d_flex justify_content_center">
      <div class="modal--content">
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
          <p class="name--modal mb_0 m_auto">Tạo sự kiện</p>
          <div class="active mr_1" @click="showMoreOptions">
            <icon-base
              icon-name="Thêm sự kiện"
              width="24"
              height="24"
              viewBox="0 0 68 68"
              class="mr_1"
            >
              <icon-plus />
            </icon-base>
          </div>
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
      </div>

      <!-- Start: Transition Popup -->
      <transition name="popup--mobile">
        <content-advance v-if="isShowContentAdvance === true" @closePopup="isShowContentAdvance = $event"/>
      </transition>
      <transition name="popup">
        <div class="more--options position_fixed" v-click-outside="closeMoreOptions" v-if="isShowMoreOptions === true">
          <div class="items text_center">
            <div class="item" @click="createEvent">Tạo mới</div>
            <div class="item" @click="showContentAdvane">Nội dung nâng cao</div>
            <div class="item mb_2">Sao chép</div>
            <div class="item mb_2" @click="closeMoreOptions">Hủy</div>
          </div>
        </div>
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
import PostLocation from "./components/postlocation";
import PostTime from "./components/posttime";
export default {
  components: {
    AppHeader,
    ContentAdvance,
    MixPlugin,
    PostCustom,
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
      isShowPopupTime: false,
      isShowPopupCategory: false,
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
    async createEvent() {
      this.isShowMoreOptions = false;
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

      await this.$store.dispatch("createEvent", {
        campaignId: this.campaign._id,
        event: this.event
      });

      await this.closePopup();

      this.$store.dispatch("setEventReset");
    },
    showContentAdvane() {
      this.isShowContentAdvance = true;
    },
    showMoreOptions() {
      this.isShowMoreOptions = true;
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
