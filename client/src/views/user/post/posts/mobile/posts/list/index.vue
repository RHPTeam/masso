<template>
  <div class="main--list py_2">
    <!-- Start: List post -->
    <!-- <div class="item--header py_2 pl_3">Tên bài viết</div> -->
    <VuePerfectScrollbar class="list--post-group">
      <div class="item--body d_flex align_items_center py_2 pl_2">
        <div class="content" @click="showDetailPost">
          <div class="title">Bài đăng chưa có tiêu đề</div>
          <div class="category--parent">Chưa phân loại</div>
        </div>
        <!-- Start: action posts -->
        <div
          class="col d_flex align_items_center justify_content_center col--action pr_2 text_center"
        >
          <span class="mr_1" @click="showPopupDelete">
            <icon-base icon-name="Xóa" width="20" height="20" viewBox="0 0 15 15">
              <icon-remove/>
            </icon-base>
          </span>
          <span class="mx_1">
            <icon-base class="icon--post-now" icon-name="Đăng ngay" viewBox="0 0 506 506">
              <icon-post-now/>
            </icon-base>
          </span>
        </div>
        <!-- End: action posts -->
      </div>
    </VuePerfectScrollbar>
    <!-- End: List post -->
    <!-- Start: Popup Detail Post -->
    <transition name="popup--mobile">
      <popup-detail :fbPost="fbPost" :post="post" v-if="isShowDetailPost === true" @closePopup="isShowDetailPost = $event"/>
      <!-- <popup-post-now /> -->
    </transition>
    <!-- Start: Popup Detail Post -->
    <!-- Start: Transition -->
    <transition name="popup">
      <popup-delete @closePopup="isShowPopupDelete = $event" v-if="isShowPopupDelete === true"/>
    </transition>
    <!-- End: Transition -->
  </div>
</template>

<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import PopupDetail from "../popup/detail";
import PopupDelete from "../popup/delete";
import PopupPostNow from "../popup/postnow";
export default {
  data() {
    return {
      isShowDetailPost: false,
      isShowPopupDelete: false
    }
  },
  props: ["fbPost"],
  components: {
    VuePerfectScrollbar,
    PopupDetail,
    PopupDelete,
    PopupPostNow
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    post() {
      return this.$store.getters.defaultPost;
    }
  },
  methods: {
    showDetailPost() {
      this.isShowDetailPost = true;
    },
    showPopupDelete() {
      this.isShowPopupDelete = true;
    }
  },
};
</script>

<style lang="scss" scoped>
// Start Transition
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
// End Transition

.main--list {
  .item--header {
    background: #27292d;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    font-size: 0.875rem;
    line-height: 32px;
  }
  .list--post-group {
    max-height: calc(100vh - 227px);
    &.ps.ps--active-x>.ps__scrollbar-x-rail, &.ps.ps--active-y>.ps__scrollbar-y-rail {
      display: none!important;
    }
    .item--body {
      border-bottom: 1px solid #484848;
      background: rgba(39, 41, 45, 0.4);
      .content {
        width: 100%;
        max-width: 90%;
        font-size: 0.875rem;
        .category--parent {
          font-size: 0.8125rem;
          color: #999;
        }
        .title, .category--parent {
          white-space: nowrap; 
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
</style>