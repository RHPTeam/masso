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
          <div class="active mr_3" @click="createEvent">Tạo</div>
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
            <post-custom @setErrorPost="errorPost = $event" />
            <!-- End: Post Custom -->
            <div
              class="alert--text"
              v-if="errorPostContent === true"
            >Vui lòng chọn danh mục hoặc bài đăng!</div>

            <!-- Start: Post Location -->
            <post-location @setErrorLocation="errorLocation = $event" />
            <div class="alert--text" v-if="errorPostLocation === true">Vui lòng chọn nơi đăng!</div>
            <!-- End: Post Location -->
          </div>
        </VuePerfectScrollbar>
        <!-- End: Modal Body -->
      </div>

      <!-- Start: Transition Popup -->
      <transition name="popup--mobile">
        <popup-time v-if="isShowPopupTime === true" @closePopup="isShowPopupTime = $event" />
        <popup-category
          v-if="isShowPopupCategory === true"
          @closePopup="isShowPopupCategory = $event"
          :event="event"
        />
        <popup-post-place
          v-if="isShowPopupPostPlace === true"
          @closePopupAddress="isShowPopupPostPlace = $event"
          :event="event"
        />
      </transition>
      <!-- End: Transition Popup -->
    </div>
  </div>
</template>

<script>
import AppHeader from "./components/header";
import PostCustom from "./components/postcontent";
import PopupTime from "./components/time";
import PopupCategory from "./components/category";
import PopupPostPlace from "./components/postplace";
import PostLocation from "./components/postlocation";
import PostTime from "./components/posttime";
export default {
  components: {
    AppHeader,
    PopupTime,
    PopupCategory,
    PopupPostPlace,
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
      errorPostLocation: false
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
      console.log("Create 1", this.event);
      // Validate
      if (this.event.post_custom && this.event.post_category) {
        if (
          this.event.post_custom.length === 0 &&
          this.event.post_category.length === 0
        ) {
          this.errorPostContent = true;
          return;
        }
      } else if (
        this.event.target_custom.length === 0 &&
        !this.event.target_category &&
        this.event.timeline.length === 0
      ) {
        this.errorPostLocation = true;
        return;
      }

      console.log("Create 2", this.event);
      await this.$store.dispatch("createEvent", {
        campaignId: this.campaign._id,
        event: this.event
      });

      this.$store.dispatch("setEventReset");

      this.closePopup();
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
.error {
  color: red;
}
</style>
