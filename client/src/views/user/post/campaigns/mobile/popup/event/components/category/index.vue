<template>
  <div class="main" v-if="caseEvent" :data-theme="currentTheme">
    <div class="section mb_3">
      <div class="header mb_2 d_flex align_items_center">
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
        <p class="name--modal mb_0 m_auto">Chọn danh mục</p>
        <div class="active mr_3">Xong</div>
      </div>
      <div class="body d_flex align_items_center">
        <div class="tabs" role="category" @click="selectPostType( 1 )">
          <div class="d_flex align_items_center justify_content_center">
            <div class="title text_center">Đăng bài viết từ danh mục</div>
            <!-- <div class="icon position_relative">
              <icon-base
                class="icon--info"
                height="14"
                width="14"
                viewBox="0 0 18 18"
                icon-name="Thông tin"
              >
                <icon-info />
              </icon-base>
              <div
                class="card--text position_absolute"
              >Tự động lựa chọn bài viết trong danh mục và đăng tới nơi thiết lập.</div>
            </div> -->
          </div>
        </div>
        <div class="tabs" role="custom" @click="selectPostType( 2 )">
          <div class="d_flex align_items_center justify_content_center">
            <div class="title text_center">Tùy chọn đăng bài viết cụ thể</div>
            <!-- <div class="icon position_relative">
              <icon-base
                class="icon--info"
                height="14"
                width="14"
                icon-name="Thông tin"
                viewBox="0 0 18 18"
              >
                <icon-info />
              </icon-base>
              <div
                class="card--text position_absolute"
              >Cho phép tùy chọn các bài viết mong muốn và đăng tới nơi thiết lập.</div>
            </div> -->
          </div>
        </div>
      </div>
    </div>
    
    <VuePerfectScrollbar class="scroll--category" ref="scroll">
    <!-- Start: Show option category -->
    <category-post class="px_2 pb_3" :event="event" v-if="caseEvent.post === 1" />
    <!-- End: Show option category -->
    <!-- Start: Show option detail -->
    <custom-post class="px_2 pb_3" v-else-if="caseEvent.post === 2" />
    <!-- End: Show option detail -->
    </VuePerfectScrollbar>
  </div>
</template>

<script>
import CategoryPost from "./category/index";
import CustomPost from "./detail/index";

export default {
  components: {
    CategoryPost,
    CustomPost
  },
  props: {
    event: Object
  },
  data() {
    return {
      isActive: true,
      isOption: false
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    caseEvent() {
      return this.$store.getters.caseEvent;
    }
  },
  methods: {
    selectPostType(value) {
      if (value === 1) {
        this.isOption = false;
        this.isActive = true;
      } else if (value === 2) {
        this.isOption = true;
        this.isActive = false;
        this.$store.dispatch("setEventRemove", "post_category");
      }
      this.$store.dispatch("setCaseEvent", {
        key: "post",
        value: value
      });
    },
    closePopup() {
      this.$emit("closePopup", false);
    }
  }
};
</script>

<style lang="scss" scoped>
.main {
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
  .scroll--category {
    max-height: calc(100vh - 133px);
  }
  label {
    color: $mainDark;
  }
  .time[role="date"] {
    border: 1px solid $mainDark;
  }
  .tabs {
    border-bottom: 2.25px solid transparent;
    background-color: #27292d;
    cursor: pointer;
    color: #ccc;
    font-weight: 600;
    flex: 0.5;
    padding: 0.65rem;
    transition: all 0.4s ease;
    &:hover {
      color: #999;
      .icon {
        .icon--info {
          color: #666;
          stroke: #666;
        }
      }
    }
    .title {
      font-size: 0.875rem;
    }
    .icon {
      &:hover {
        > .card--text {
          display: block;
        }
      }
      .icon--info {
        color: #999999;
        stroke: #999999;
        stroke-width: 0.5;
        transition: all 0.4s ease;
      }
    }
    .card--text {
      background: #2f3136;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      border: 1px solid #484848;
      border-radius: 0.25rem;
      color: #ccc;
      display: none;
      font-size: 0.825rem;
      font-weight: normal;
      right: -30px;
      top: 110%;
      padding: 0.375rem 0.75rem;
      width: 300px;
      z-index: 9;
    }
  }
  .off {
    border-bottom: 0 !important;
  }
  div[role="category"] {
  }
  div[role="custom"] {
  }
  .card[role="type"] {
    border: 0;
    border-radius: 0.5rem;
    cursor: pointer;
    color: $mainDarkLight;
    height: 100%;
    transition: all 0.4s ease;
    &:hover {
      box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
    }
    .card_body {
      .card--icon {
        border-radius: 100%;
        height: 100px;
        opacity: 0.75;
        transition: background-color 1s ease;
        width: 100px;
        svg {
          color: #fff;
          stroke: #fff;
          stroke-width: 1;
          &.icon--reply-post {
            margin-left: 4px;
          }
          &.icon--categories {
            stroke-width: 6;
          }
        }
      }
      .card--content {
        .card--text {
          color: #999;
          font-size: 0.825rem;
        }
      }
    }
  }
}

// ========================= CHANGE THEME

// dark
.main[data-theme="dark"] {
  background-color: #2f3136;
  .section {
  }
}
</style>
