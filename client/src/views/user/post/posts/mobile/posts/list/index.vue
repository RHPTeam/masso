<template>
  <div class="main--list">
    <!-- Start: List post -->
    <!-- <div class="item--header py_2 pl_3">Tên bài viết</div> -->
    <VuePerfectScrollbar class="list--post-group">
      <div v-if="allPost.length === 0" class="text_center py_2">Không có bài viết nào</div>
      <item-post v-else v-for="(item, index) in allPost" :key="index" :item="item" @showDetailPost="showPopupDetail($event)" @showPopupDelete="showPopupDelete($event)"/>
    </VuePerfectScrollbar>
    <!-- End: List post -->
    <!-- Start: Transition -->
    <transition name="popup">
      <popup-delete
        v-if="isShowPopupDelete === true"
        @closePopup="isShowPopupDelete = $event"
        title="bài viết"
        :name="postSelected.title"
        storeActionName="deletePost"
        :targetData="targetDataDelete"
      />
    </transition>
    <!-- End: Transition -->
    <!-- Start: Popup Detail Post -->
    <transition name="popup--mobile">
      <popup-detail
        :post="postSelected"
        v-if="isShowDetailPost === true"
        @closePopup="isShowDetailPost = $event"
      />
      <!-- <popup-post-now /> -->
    </transition>
    <!-- Start: Popup Detail Post -->
  </div>
</template>

<script>
import PopupDelete from "@/components/popups/mobile/delete";
import PopupDetail from "../popup/detail";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import PopupPostNow from "../popup/postnow";
import ItemPost from "./item";
export default {
  data() {
    return {      
      isShowPopupDelete: false,
      isShowDetailPost: false,
      postSelected: {},
      targetDataDelete: {}
    };
  },
  components: {
    VuePerfectScrollbar,
    PopupPostNow,
    ItemPost,
    PopupDetail, 
    PopupDelete
  },
  computed: {
    post() {
      return this.$store.getters.defaultPost;
    },
    currentTheme() {
      return this.$store.getters.themeName;
    },
    allPost() {
      return this.$store.getters.allPost;
    }
  },
  methods: {
    showPopupDetail(post) {
      this.postSelected = post;
      this.isShowDetailPost = true;
    },
    showPopupDelete(post) {      
      this.postSelected = post;
      this.targetDataDelete = {
        id: post._id
      };
      this.isShowPopupDelete = true;
    }
  },
  async created() {
    const postNo = this.$store.getters.allPost;
    if( postNo.length === 0 ) {
      // this.$store.dispatch("getAllPost");
      const dataSender = {
        size: 25,
        page: 1
      };
      await this.$store.dispatch( "getPostsByPage", dataSender );
    }
  }
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
    max-height: calc(100vh - 204px);
    &.ps.ps--active-x > .ps__scrollbar-x-rail,
    &.ps.ps--active-y > .ps__scrollbar-y-rail {
      display: none !important;
    }
  }
}
</style>