<template>
  <div class="list" :data-theme="currentTheme">
    <div class="list--header">
    </div>
    <div class="list--content">
      <div class="list--filter mb_3">
        <div
          class="list--input d_flex justify_content_between align_items_center mx_auto mb_2 position_relative"
          v-click-outside="closeKeywordRecentList"
        >
            <span class="ml_3 mt_1">
              <icon-base
                icon-name="Tìm kiếm"
                width="20"
                height="20"
                viewBox="0 0 20 20"
              >
                <icon-input-search />
              </icon-base>
            </span>
          <input type="text"
                 placeholder="Tìm kiếm"
                 v-model="keyword"
                 @click="isStatusKeywordHistory = true"
                 @keydown.enter="searchPost(keyword)" />
          <!-- Start: History Search -->
          <div class="history position_absolute" v-if="isStatusKeywordHistory === true">
            <div class="history--header">
              <div class="d_flex justify_content_between">
                <span>Tìm kiếm gần đây</span>
              </div>
            </div>
            <div class="history--body">
              <ul v-if="keywordRecentList.length > 0">
                <li v-for="( keyword, index ) in keywordRecentList" :key="index" @click="searchPostFromKeywordHistory( keyword.content )">{{ keyword.content }}</li>
              </ul>
              <ul v-if="keywordRecentList.length === 0">
                <li>Bạn không có từ khóa tìm kiếm nào trước đây...</li>
              </ul>
            </div>
          </div>
          <!-- End: History Search -->
        </div>
        <!-- Start: User Keywords -->
        <div
          class="list--keywords d_flex justify_content_center align_items_center flex_wrap m_n1"
        >
          <span
            v-show="keyPopular && keyPopular.length > 0"
            class="list--keywords-item py_1 m_1"
            v-for="(item, index) in keyPopular"
            :key="index"
            @click="searchPostByKeyword(item)"
          >
            {{ item }}
          </span>
        </div>
        <!-- End: User Keywords -->
      </div>
      <div class="list--data my_3">
        <div class="item--header d_flex align_items_center px_2 py_2">
          <div class="col col--content px_3">Nội dung</div>
          <div class="col col--image px_3">Hình ảnh</div>
          <div class="col col--like px_3">Thích</div>
          <div class="col col--share px_3">Chia sẻ</div>
          <div class="col col--action px_3">Hành động</div>
        </div>
        <!-- Start: List Content -->
        <vue-perfect-scrollbar class="infinite" @ps-y-reach-end="loadMore">
          <div v-for="(item, index) in listPostFacebookDefault" :key="index">
            <app-item :item="item" />
          </div>
          <div v-if="this.$store.getters.listPostFacebookStatus === 'loading'" class="mt_3">
            <loading-component></loading-component>
          </div>
          <div v-if="this.$store.getters.listPostFacebookStatus === 'success' && listPostFacebookDefault.length === 0"
               class="item--body empty--data d_flex align_items_center justify_content_center px_2 py_2"
          >
            Không có dữ liệu
          </div>
        </vue-perfect-scrollbar>
        <!-- Start: List Content -->
      </div>
    </div>
  </div>
</template>

<script>
import AppItem from "./item";
export default {
  components: {
    AppItem
  },
  data() {
    return {
      currentPage: 1,
      maxPerPage: 20,
      keyword: "",
      isLoadingData: true,
      isStatusKeywordHistory: false
    }
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    listPostFacebookDefault(){
      return this.$store.getters.listPostFacebookDefault;
    },
    keyPopular(){
      if ( Object.entries( this.user ).length === 0 && this.user.constructor === Object ) return;
      return this.user.keywords.slice( 0, 5 );
    },
    numberPageCurrent() {
      return this.$store.getters.numberPageCurrent;
    },
    user(){
      return this.$store.getters.userInfo;
    },
    keywordRecentList() {
      return this.$store.getters.keywordRecentList;
    }
  },
  async created () {
    await this.$store.dispatch( "getUserInfo" );
    const keywordDefault = this.user.keywords[Math.floor(Math.random() * this.user.keywords.length)]
    await this.$store.dispatch( "getListPostFacebookDefault", {
      keyword: keywordDefault,
      size: this.maxPerPage,
      page: this.currentPage
    } );
    this.keyword = keywordDefault;
  },
  methods: {
    async loadMore() {
      if ( this.isLoadingData === true ) {
        if ( this.keyword !== "" ) {
          if ( this.currentPage >= this.numberPageCurrent ) {
            return false;
          } else {
            this.isLoadingData = false;
            this.currentPage += 1;

            await this.$store.dispatch( "searchPostsFacebookByKey", {
              keyword: this.keyword,
              size: this.maxPerPage,
              page: this.currentPage
            } );
            this.isLoadingData = true;
          }
        }
      }
    },
    async searchPost() {
      this.isStatusKeywordHistory = false;
      this.currentPage = 1;
      await this.$store.dispatch( "getListPostFacebookDefault", {
        keyword: this.keyword,
        size: this.maxPerPage,
        page: this.currentPage
      } );
      await this.$store.dispatch("getUserInfo");
    },
    async searchPostByKeyword(keyword) {
      this.currentPage = 1;
      this.keyword = keyword;
      this.$store.dispatch( "getListPostFacebookDefault", {
        keyword: keyword,
        size: this.maxPerPage,
        page: this.currentPage
      } );
    },
    searchPostFromKeywordHistory( keyword ) {
      this.keyword = keyword;
      this.searchPost();
    },
    closeKeywordRecentList () {
      this.isStatusKeywordHistory = false;
    }
  },
};
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>
