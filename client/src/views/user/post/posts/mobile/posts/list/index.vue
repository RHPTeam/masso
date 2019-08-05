<template>
  <div class="main--list">
    <!-- Start: List post -->
    <!-- <div class="item--header py_2 pl_3">Tên bài viết</div> -->
    <VuePerfectScrollbar class="list--post-group">
      <div v-if="gestureUser === 14">
        <div class="mb_2 filter">
          Lọc theo danh mục:
          <b>{{ categoryById.title }}</b>
        </div>
        <div
          v-if="postsFilterByCategory.length === 0"
          class="text_center py_2 no--post"
        >Không có bài viết nào</div>
        <div v-else>
          <item-post
            v-for="item in postsFilterByCategory"
            :key="item._id"
            :item="item"
            @showDetailPost="showPopupDetail($event)"
            @showPopupDelete="showPopupDelete($event)"
          />
          <div class="text_center" v-if="postsPageSizeFilter === currentPageFilter"></div>
          <div
            class="text_center py_2 load--more"
            @click="loadMorePostWhenFilter"
            v-else
          >Hiển thị thêm...</div>
        </div>
      </div>
      <div v-else>
        <div v-if="allPost.length === 0" class="text_center py_2 no--post">Không có bài viết nào</div>
        <div v-else>
          <item-post
            v-for="item in allPost"
            :key="item._id"
            :item="item"
            @showDetailPost="showPopupDetail($event)"
            @showPopupDelete="showPopupDelete($event)"
            @showPopupPostNow="showPopupPostNow($event)"
          />
          <div class="text_center" v-if="postsPageSize === currentPage"></div>
          <div class="text_center py_2 load--more" @click="loadMore" v-else>Hiển thị thêm...</div>
        </div>
      </div>
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
      <popup-post-now :post="postSelected" v-if="isShowPopupPostNow === true" @closePopup="isShowPopupPostNow = $event"/>
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
  components: {
    VuePerfectScrollbar,
    PopupPostNow,
    ItemPost,
    PopupDetail,
    PopupDelete
  },
  data() {
    return {
      currentPage: 1,
      currentPageFilter: 1,
      isFirstTime: false,
      isShowPopupDelete: false,
      isShowPopupPostNow: false,
      isShowDetailPost: false,
      isLoadingData: true,
      pageSize: 25,
      postSelected: {},
      targetDataDelete: {}
    };
  },
  computed: {
    allPost() {
      // console.log("this.$store.getters.allPost", this.$store.getters.allPost);
      return this.$store.getters.allPost;
    },
    currentTheme() {
      return this.$store.getters.themeName;
    },
    categoryById() {
      return this.$store.getters.categoryById;
    },
    postsPageSize() {
      return this.$store.getters.postsPageSize;
    },
    postsPageSizeFilter() {
      return this.$store.getters.postsPageSizeFilter;
    },
    gestureUser() {
      return this.$store.getters.gestureUser;
    },
    postsFilterByCategory() {
      return this.$store.getters.postsFilterByCategory;
    },
    idCategoryToLoadMore() {
      return this.$store.getters.idCategoryToLoadMore;
    }
  },
  watch: {
    gestureUser(value) {
      if (value === 14) {
        this.currentPage = 1;
      }
    }
  },
  async created() {},
  methods: {
    async loadMore() {
      // if(this.$store.getters.gestureUser === 15) {
      //   this.currentPage = 1;
      // }
      this.currentPage += 1;

      await this.$store.dispatch("getPostsByPageMobile", {
        size: this.pageSize,
        page: this.currentPage
      });
    },
    loadMorePostWhenFilter() {
      this.currentPageFilter += 1;

      this.$store.dispatch("getPostByCategoriesLoadMoreMobile", {
        categoryId: this.idCategoryToLoadMore,
        size: this.pageSize,
        page: this.currentPageFilter
      });
    },
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
    },
    showPopupPostNow(post) {
      this.postSelected = post;
      this.isShowPopupPostNow = true;
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
  .filter {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  }
  .no--post {
    font-size: 0.9315rem;
  }
  .item--header {
    background: #27292d;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    font-size: 0.875rem;
    line-height: 32px;
  }
  .list--post-group {
    max-height: 74vh;
    &.ps.ps--active-x > .ps__scrollbar-x-rail,
    &.ps.ps--active-y > .ps__scrollbar-y-rail {
      display: none !important;
    }
  }
}
</style>
