<template>
  <div class="mobile--search-fb px_3">
    <!-- Start: Search -->
    <div class="list--filter mb_2">
      <div class="list--input d_flex justify_content_between align_items_center mx_auto mb_2" @click="showPopupSearch">
        <span class="ml_3 mt_1">
          <icon-base icon-name="Tìm kiếm" width="20" height="20" viewBox="0 0 20 20">
            <icon-input-search/>
          </icon-base>
        </span>
        <input type="text" placeholder="Tìm kiếm">
      </div>
      <!-- <div class="list--keywork d_flex justify_content_center align_items_center flex_wrap m_n1">
        <span
          v-show="keyPopular && keyPopular.length > 0"
          class="list--keywork-item py_1 m_1"
          v-for="(item, index) in keyPopular"
          :key="index"
          @click="searchPostByKeyword(item)"
        >{{ item }}</span>
      </div> -->
    </div>
    <!-- End: Search -->

    <!-- Start: List Main -->
    <div class="list--data">
      <!-- Start: List Content -->
      <vue-perfect-scrollbar class="infinite" @ps-y-reach-end="loadMore">
        <div v-if="this.$store.getters.listPostFacebookStatus === 'loading'" class="mt_3">
          <loading-component></loading-component>
        </div>
        <div
          v-if="this.$store.getters.listPostFacebookStatus === 'success' && listPostFacebookDefault.length === 0"
          class="item--body empty--data d_flex align_items_center justify_content_center px_2"
        >Không có dữ liệu</div>
        <add-item v-for="(item, index) in listPostFacebookDefault" :key="`s+${index}`" :item="item" @showPost="showPost($event)"/>
      </vue-perfect-scrollbar>
      <!-- Start: List Content -->
    </div>
    <!-- End: List Main -->

    <transition name="popup--mobile">
      <popup-search @closePopupSearch="isShowPopupSearch = $event" v-if="isShowPopupSearch === true"/>
      <popup-create-post v-if="isShowPost === true" @closePopup="isShowPost = $event" :fbSelected="fbSelected" @closeAllEdit="isShowPost = $event"/>
    </transition>
  </div>
</template>

<script>
import AddItem from "./item";
import PopupSearch from "../popups/search";
import PopupCreatePost from "../popups/create";
export default {
  components: {
    PopupSearch,
    PopupCreatePost,
    AddItem
  },
  data() {
    return {
      currentPage: 1,
      maxPerPage: 12,
      keyword: "",
      isLoadingData: true,
      isShowPopupSearch: false,
      isShowPost: false,
      fbSelected: {}
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    post() {
      return this.$store.getters.defaultPost;
    },
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
    numberPageCurrent() {
      return this.$store.getters.numberPageCurrent;
    },
    user() {
      return this.$store.getters.userInfo;
    }
  },
  async created() {
    // await this.$store.dispatch("getUserInfo");
    // const keywordDefault = this.user.keywords[
    //   Math.floor(Math.random() * this.user.keywords.length)
    // ];
<<<<<<< HEAD
    // const fbSearch = this.$store.getters.listPostFacebookDefault;
    // if(fbSearch.length === 0) {
    //   await this.$store.dispatch("getListPostFacebookDefault", {
    //     keyword: this.user.keywords[0],
    //     size: 25,
    //     page: 1
    //   });
    // }
=======
    const fbSearch = this.$store.getters.listPostFacebookDefault;
    if(fbSearch.length === 0) {
      await this.$store.dispatch("getListPostFacebookDefault", {
        keyword: this.user.keywords[0],
        size: 25,
        page: 1
      });
    }
>>>>>>> ab7b2e308aeb87aa72ec6b4d56b7390667fca5f5
    // this.keyword = keywordDefault;
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
    async searchPost() {
      this.currentPage = 1;
      this.$store.dispatch("getListPostFacebookDefault", {
        keyword: this.keyword,
        size: this.maxPerPage,
        page: this.currentPage
      });
    },
    async searchPostByKeyword(keyword) {
      this.currentPage = 1;
      this.keyword = keyword;
      this.$store.dispatch("getListPostFacebookDefault", {
        keyword: keyword,
        size: this.maxPerPage,
        page: this.currentPage
      });
    },
    showPopupSearch() {
      this.isShowPopupSearch = true;
    },
    showPost(value) {
      this.isShowPost = true;
      this.fbSelected = value;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>
