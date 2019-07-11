<template>
  <div class="target mb_2" :data-theme="currentTheme">
    <div class="header mb_2 d_flex align_items_center">
      <div @click="closePopupAddress">
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
      <p class="name--modal mb_0 m_auto">Chọn nơi đăng</p>
      <div class="active mr_3">Xong</div>
    </div>
    <!-- Start: Option Post detail -->
    <div class="body mb_4 px_2">
      <div class>
        <!-- Start: FB Profile -->
        <div class="mb_2 p_0">
          <div class="card" @click="showPopupProfile">
            <div class="card_body d_flex align_items_center">
              <div
                class="card--icon d_flex align_items_center justify_content_center mr_2"
                :style="{ backgroundColor: event.color }"
              >
                <icon-base class="icon--group" height="22px" width="22px" viewBox="0 0 500 500">
                  <icon-profile />
                </icon-base>
              </div>
              <div class="card--content">
                <div class="title mb_1">Trang cá nhân</div>
              </div>
            </div>
          </div>
          <div class="info">Bạn chọn 1 TCN</div>
        </div>
        <!-- Start: FB Profile -->
        <!-- Start: Target Group -->
        <div class="mb_2 p_0">
          <div class="card" @click="showPopupCustom">
            <div class="card_body d_flex align_items_center">
              <div
                class="card--icon d_flex align_items_center justify_content_center mr_2"
                :style="{ backgroundColor: event.color }"
              >
                <icon-base class="icon--group" height="22px" width="22px" viewBox="0 0 500 500">
                  <icon-group></icon-group>
                </icon-base>
              </div>
              <div class="card--content">
                <div class="title mb_1">Nhóm đã lưu</div>
              </div>
            </div>
          </div>
          <div class="info">Bạn chọn 1 TCN + 1 danh mục</div>
        </div>
        <!-- End: Target Group -->
        <!-- Start: Target Custom -->
        <div class="mb_2 p_0">
          <div class="card" @click="showPopupGroup">
            <div class="card_body d_flex align_items_center">
              <div
                class="card--icon d_flex align_items_center justify_content_center mr_2"
                :style="{ backgroundColor: event.color }"
              >
                <icon-base class="icon--group" height="22px" width="22px" viewBox="0 0 500 500">
                  <icon-conf />
                </icon-base>
              </div>
              <div class="card--content">
                <div class="title mb_1">Tùy chọn nơi đăng</div>
              </div>
            </div>
          </div>
          <div class="info">Bạn chọn 1 TCN + 1 Fanpage + 1 Group</div>
        </div>
        <!-- End: Target Custom -->
      </div>
    </div>
    <!-- End: Option Post detail -->
    <transition name="popup--mobile">
      <!-- Start: Show Option Newfeed -->
      <target-new-feed
        v-if="isShowPopupProfile === true"
        @closePopup="isShowPopupProfile = $event"
      />
      <!-- End: Show Option Newfeed -->
      <!-- Start: Show Option Page -->
      <target-custom v-if="isShowPopupCustom === true" @closePopup="isShowPopupCustom = $event" />
      <!-- End: Show Option Page -->
      <!-- Start: Show Option Group -->
      <target-group v-if="isShowPopupGroup === true" @closePopup="isShowPopupGroup = $event" />
      <!-- End: Show Option Group -->
    </transition>
  </div>
</template>

<script>
import TargetGroup from "./popup/category";
import TargetCustom from "./popup/custom";
import TargetNewFeed from "./popup/newfeed";

export default {
  components: {
    TargetGroup,
    TargetCustom,
    TargetNewFeed
  },
  data() {
    return {
      isShowOptionTarget: "none",
      isShowPopupGroup: false,
      isShowPopupCustom: false,
      isShowPopupProfile: false
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    caseEvent() {
      return this.$store.getters.caseEvent;
    },
    event() {
      return this.$store.getters.event;
    }
  },
  methods: {
    resetTargetType() {
      this.$store.dispatch("setEvent", {
        key: "target_custom",
        value: []
      });
      this.$store.dispatch("setEventRemove", "target_category");
      this.$store.dispatch("setCaseEvent", {
        key: "target",
        value: 0
      });
    },
    selectTargetType(value) {
      if (value === 1) {
        this.$store.dispatch("setEvent", {
          key: "target_custom",
          value: []
        });

        this.$store.dispatch("setEvent", {
          key: "timeline",
          value: []
        });
      } else if (value === 2) {
        this.$store.dispatch("setEventRemove", "target_category");
        this.$store.dispatch("setEvent", {
          key: "timeline",
          value: []
        });
      } else if (value === 3) {
        this.$store.dispatch("setEvent", {
          key: "target_custom",
          value: []
        });
        this.$store.dispatch("setEventRemove", "target_category");
      }

      this.$store.dispatch("setCaseEvent", {
        key: "target",
        value: value
      });
    },
    closePopupAddress() {
      this.$emit("closePopupAddress", false);
    },
    showPopupGroup() {
      this.isShowPopupGroup = true;
    },
    showPopupCustom() {
      this.isShowPopupCustom = true;
    },
    showPopupProfile() {
      this.isShowPopupProfile = true;
    }
  }
};
</script>

<style lang="scss" scoped>
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
.target {
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background: #2f3136;
  color: #ccc;
  z-index: 10;
  font-size: 0.875rem;
  .header {
    padding: 0.625rem 0;
    border-bottom: 1px solid #ccc;

    .arrow-down {
      transform: rotate(90deg);
      margin-left: 0.5rem;
    }
  }
  .info {
    font-size: 0.8135rem;
    margin-top: 5px;
  }
  .icon {
    color: #666;
    svg {
      margin-bottom: -10px;
    }
    span {
      font-weight: 600;
    }
  }
  .target--selected {
    font-size: 0.825rem;
    .title {
      border: 1px solid;
      border-radius: 0.375rem;
    }
    .change {
      color: #999;
      cursor: pointer;
      font-style: italic;
      &:hover,
      &:focus,
      &:active,
      &:visited {
        text-decoration: underline;
      }
    }
  }
  .body {
    .card {
      border: 1px solid #e4e4e4;
      border-radius: 0.5rem;
      cursor: pointer;
      height: 100%;
      transition: all 0.4s ease;
      &.active {
        box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
      }
      &:hover {
        box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
      }
      .card_body {
        padding: 0.75rem;
        .card--icon {
          border-radius: 100%;
          height: 36px;
          width: 36px;
          transition: all 1s ease;
          svg {
            color: #fff;
            stroke: #fff;
            &.icon--group {
            }
          }
        }
        .card--content {
          h5 {
            font-weight: 600;
          }
          .card--text {
            color: #999;
            font-size: 0.825rem;
          }
        }
      }
    }
    .empty {
      border: none !important;
    }
  }
}

// ========================= CHANGE THEME

// dark
.target[data-theme="dark"] {
  // background: #272a2c;
  background: #2f3136;
  .header {
    .icon {
      color: #ccc;
    }
  }
  .body {
    .card {
      background: none;
      color: #ccc;
      border-color: #444;
      &.active {
        box-shadow: 0 0 10px rgba(255, 255, 255, 0.15);
        font-weight: 600;
        transition: all 0.4s ease;
      }
      &:hover {
        box-shadow: 0 0 10px rgba(255, 255, 255, 0.15);
      }
    }
  }
}
</style>
