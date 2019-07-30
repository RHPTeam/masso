<template>
  <div class="modal--search-mobile">
    <div class="modal--content">
      <!-- Start: Header - Search -->
      <div class="items--header d_flex align_items_center p_3">
        <div class="list--input d_flex justify_content_between align_items_center">
          <span class="ml_3 mt_1" @click="searchPost(keyword)">
            <icon-base icon-name="Tìm kiếm" width="20" height="20" viewBox="0 0 20 20">
              <icon-input-search />
            </icon-base>
          </span>
          <input
            type="text"
            placeholder="Tìm kiếm"
            v-model="keyword"
            @keydown.enter="searchPost(keyword)"
          />
        </div>
        <div class="cancel ml_auto" @click="closePopupSearch">Hủy</div>
      </div>
      <!-- End: Header - Search -->
      <!-- Start: Search Near -->
      <div class="near px_3" v-if="isStatusKeywordHistory === false">
        <h6>Tìm kiếm gần đây</h6>
        <div class="list">
          <ul class="p_0 m_0" v-if="keyPopular && keyPopular.length > 0">
            <li
              v-for="(item, index) in keyPopular"
              :key="index"
              @click="searchPostFromKeywordHistory( item )"
            >{{ item }}</li>
          </ul>
          <p v-else>Bạn chưa tìm gì.</p>
        </div>
      </div>
      <!-- End: Search Near -->
      <!-- Start: Main - Search -->
      <div class="items--body px_3" v-else>
        <!-- Start: List Content -->
        <vue-perfect-scrollbar class="infinite">
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
          <div class="content item--body">
            <div v-if="this.$store.getters.listPostFacebookStatus === 'loading'" class="mt_3">
              <loading-component></loading-component>
            </div>
            <div
              v-if="this.$store.getters.listPostFacebookStatus === 'success' && listPostFacebookDefault.length === 0"
              class="item--body empty--data d_flex align_items_center justify_content_center px_2 py_2"
            >Không có dữ liệu</div>
            <add-item
              v-for="(item, index) in listPostFacebookDefault"
              :key="`s+${index}`"
              :item="item"
              @showPost="showPost($event)"
            />
          </div>
        </vue-perfect-scrollbar>
        <!-- Start: List Content -->
      </div>
      <!-- End: Main - Search -->
    </div>
    <transition name="popup--mobile">
      <popup-create-post
        v-if="isShowPost === true"
        @closePopup="isShowPost = $event"
        :fbSelected="fbSelected"
        @closeAllEdit="isShowPost = $event"
      />
    </transition>
  </div>
</template>

<script>
import AddItem from "../../list/item";
import PopupCreatePost from "../create";
export default {
  components: {
    AddItem,
    PopupCreatePost
  },
  data() {
    return {
      fbSelected: {},
      isShowPost: false,
      isStatusKeywordHistory: false,
      keyword: ""
    };
  },
  watch: {
    // "keyword"(value) {
    //   if (value.length === 0) {
    //     if(this.keyPopular) {
    //       this.$store.dispatch("getListPostFacebookDefault", {
    //         keyword: this.keyPopular[0],
    //         size: 25,
    //         page: 1
    //       });
    //     }
    //   }
    // }
  },
  computed: {
    listPostFacebookDefault() {
      return this.$store.getters.listPostFacebookDefault;
    },
    keyPopular() {
      if (
        Object.entries(this.user).length === 0 &&
        this.user.constructor === Object
      )
        return;
      return this.user.keywords.slice(0, 5);
    },
    user() {
      return this.$store.getters.userInfo;
    }
  },
  methods: {
    closePopupSearch() {
      this.$emit("closePopupSearch", false);
    },
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
    async searchPost() {
      this.isStatusKeywordHistory = true;
      // this.currentPage = 1;
      await this.$store.dispatch("getListPostFacebookDefault", {
        keyword: this.keyword,
        size: 25,
        page: 1
      });
      await this.$store.dispatch("getUserInfo");
    },
    searchPostFromKeywordHistory(keyword) {
      this.keyword = keyword;
      this.searchPost();
    },
    showPost(value) {
      this.isShowPost = true;
      this.fbSelected = value;
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
    .item--body {
      // background-color: #27292d;
      border-radius: 0.625rem;
      font-size: 0.875rem;
      overflow: hidden;
      .right {
        max-width: 90%;
        overflow: hidden;
      }
      .title {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .near {
      .list {
        li {
          list-style: none;
          border-bottom: 1px solid #444;
          padding: 0.5rem 0;
          &:last-child {
            border: 0;
          }
        }
      }
    }
  }
}
.infinite {
  max-height: calc(100vh - 80px);
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
</style>
