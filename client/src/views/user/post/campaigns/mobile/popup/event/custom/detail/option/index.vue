<template>
  <div class="detail position_relative" :data-theme="currentTheme">
    <div>
      <!-- Start: Action -->
      <div class="action d_flex align_items_center justify_content_between">
        <div class="left position_relative">
          <div class="icon position_absolute">
            <icon-base
              class="icon--search"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              icon-name="Tìm kiếm"
            >
              <icon-input-search />
            </icon-base>
          </div>
          <input type="text"
                 placeholder="Tìm kiếm"
                 v-model="search"
                 @keydown.enter="searchPosts"
          />
        </div>
        <div class="right position_relative">
          <categories-filter
            :filterList="filterCategoriesList"
            :filterSelected="filterCategorySelected"
            @updateFilterSelected="searchPostByCategory"
          ></categories-filter>
        </div>
      </div>
      <!-- Start: Body -->
      <div class="body">
        <!-- Start: Header -->
        <div class="result d_flex align_items_center mt_3 px_3 py_2">
          <div class="name text_left pr_3">Tên bài viết</div>
          <div class="categories text_left">Danh mục</div>
          <div class="content text_left">Nội dung</div>
          <div class="action text_center">
            Hành động
          </div>
        </div>
        <!-- End: Header -->
        <div v-if="postsPageInfinite">
          <div class="result--item empty d_flex align_items_center px_3 py_2 justify_content_center"
               v-if="postsPageInfinite.length === 0">Không có dữ liệu
          </div>

          <VuePerfectScrollbar class="infinite scroll-categories" @ps-y-reach-end="loadMore">
            <div class="result--item d_flex align_items_center px_3 py_2"
                 v-for="(post, index) in postsPageInfinite"
                 :key="`p-${index}`"
            >
              <div class="name text_left pr_3">
                <div class="name--text">{{post.title}}</div>
              </div>
              <div class="categories text_left pr_3">
                <span v-for="(cate, index) in post._categories" :key="`c-${index}`">
                      {{cate.title +  [ index === post._categories.length - 1 ? null : ', ' ] }}
                </span>
              </div>
              <div class="content text_left">
                <div class="content--text">{{post.content}}</div>
              </div>
              <div class="action">
                <div class="btn--choose checked text_center m_auto"
                    @click="unselectPost(post._id)"
                    v-if="checkSelectedPost(post._id)"
                ></div>
                <div class="btn--choose text_center m_auto"
                    @click="selectPost(post)"
                    v-else
                ></div>
              </div>
            </div>
            <div v-if="this.$store.getters.statusPost === 'loading'">
              <loading-component />
            </div>
          </VuePerfectScrollbar>
        </div>
      </div>
      <!-- End: Body -->
    </div>
    <div class="footer--back d_flex pt_2">
      <div class="top--left ml_auto"
           @click="back"
      >Tiếp tục</div>
    </div>
  </div>
</template>

<script>
import CategoriesFilter from "../filter";

export default {
  components: {
    CategoriesFilter
  },
  data() {
    return {
      currentPage: 1,
      filterCategoriesList: [ { id: "all", name: "Tất cả" } ],
      filterCategorySelected: { id: "all", name: "Tất cả" },
      isFirstTime: false,
      postsArr: [],
      pageSize: 25,
      search: "",
      isLoadingData: true,
    }
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    postsPageInfinite(){
      return this.$store.getters.postsPageInfinite;
    },
    categories(){
      return this.$store.getters.allCategories;
    },
    event() {
      return this.$store.getters.event;
    },
    filterPostsByCategories() {
      if ( this.filterCategorySelected.id === "all" ) {
        return this.allPosts.filter( ( post ) => {
          return post.title
            .toString()
            .toLowerCase()
            .includes( this.search.toString().toLowerCase() );
        } );
      }
      return this.allPosts.filter( ( post ) => {
        const checkedArr = post._categories.filter( ( category ) => {
          return category._id === this.filterCategorySelected.id;
        } );

        return post.title.toString()
          .toLowerCase()
          .includes( this.search.toString().toLowerCase() ) && checkedArr.length !== 0;
      } );
    },
    postsPageSize() {
      return this.$store.getters.postsPageSize;
    }
  },
  async created() {
    // Reset posts page infinite
    if ( this.postsPageInfinite ) {
      await this.$store.dispatch( "resetPostsPageInfinite" );
    }
    // Get all categories
    if ( this.categories.length === 0 ) {
      await this.$store.dispatch( "getAllCategories" );
    }
    // Get Posts By Page
    const dataSender = {
      page: 1,
      size: this.pageSize
    };
    await this.$store.dispatch( "getPostsPageInfinite", dataSender );
    this.isFirstTime = true;
    // Convert categories
    await this.categories.forEach( ( item ) => {
      const data = {
        id: item._id,
        name: item.title
      };

      this.filterCategoriesList.push( data );
    } );
  },
  beforeDestroy() {
    this.currentPage = 1;
    this.isFirstTime = false;
  },
  methods: {
    back(){
      this.$store.dispatch( "setCaseEvent", {
        key: "libraries",
        value: 0
      } );
    },
    checkSelectedPost ( id ) {
      return this.event.post_custom.filter( ( item ) => {
        return item._id === id;
      }).length > 0
    },
    async loadMore() {
      if ( this.isLoadingData === true ) {
        if ( this.search === "" ) {
          if ( this.currentPage >= this.postsPageSize ) {
            return false;
          } else if ( this.isFirstTime === true ) {
            this.isLoadingData = false;
            this.currentPage += 1;

            await this.$store.dispatch( "getPostsPageInfinite", {
              page: this.currentPage,
              size: this.pageSize
            } );
            this.isLoadingData = true;
          }
        } else {
          if ( this.currentPage >= this.postsPageSize ) {
            return false;
          } else if ( this.isFirstTime === true ) {
            this.isLoadingData = false;
            this.currentPage += 1;

            await this.$store.dispatch( "getPostsPageInfiniteByKey", {
              keyword: this.search,
              page: this.currentPage,
              size: this.pageSize
            } );
            this.isLoadingData = true;
          }
        }
      }
    },
    selectPost( value ) {
      this.$store.dispatch( "setEventPush", {
        key: "post_custom",
        value: value
      } )
    },
    async searchPosts() {
      // Reset posts page infinite
      if ( this.postsPageInfinite ) {
        await this.$store.dispatch( "resetPostsPageInfinite" );
      }
      this.currentPage = 1;
      await this.$store.dispatch( "getPostsPageInfiniteByKey", {
        page: this.currentPage,
        size: this.pageSize,
        keyword: this.search
      } );
    },
    searchPostByCategory(val){
      this.filterCategorySelected = val;
      this.$store.dispatch("getPostsPageInfiniteCategory", val.id);
    },
    unselectPost( id ) {
      this.$store.dispatch( "setEventPostRemove", id );
    }
  },
}
</script>

<style lang="scss" scoped>
@import "index.style";
</style>
