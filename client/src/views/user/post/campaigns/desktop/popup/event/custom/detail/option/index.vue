<template>
  <div class="detail">
    <!-- Start: Top -->
    <div class="top d_flex align_items_center justify_content_between mb_3">
      <div class="top--left"
           @click="back"
      >Tiếp tục >></div>
      <div class="top--right d_flex align_items_center">
        <div class="content">Kho nội dung</div>
      </div>
    </div>
    <!-- End: Top -->
    <!-- Start: Action -->
    <div class="action d_flex align_items_center justify_content_between">
      <div class="left position_relative">
        <div class="icon position_absolute">
          <icon-base
            class="icon--search"
            width="20"
            height="20"
            viewBox="0 0 20 20"
          >
            <icon-input-search />
          </icon-base>
        </div>
        <input type="text" placeholder="Tìm kiếm" v-model="search"/>
      </div>
      <div class="right position_relative">
        <categories-filter
          :filterList="filterCategoriesList"
          :filterSelected="filterCategorySelected"
          @updateFilterSelected="filterCategorySelected = $event"
        ></categories-filter>
      </div>
    </div>
    <div class="body">
      <div class="result d_flex align_items_center mt_3 px_3 py_2">
        <div class="name text_left pr_3">Tên bài viết</div>
        <div class="categories text_left">Danh mục</div>
        <div class="content text_left">Nội dung</div>
        <div class="action text_center">
          Hành động
        </div>
      </div>
      <div v-if="allPosts">
        <div v-if="this.$store.getters.statusPost === 'loading'">
          <loading-component />
        </div>
        <div class="result--item empty d_flex align_items_center px_3 py_2 justify_content_center" v-if="filterPostsByCategories.length === 0">Không có dữ liệu</div>
        <div class="result--item d_flex align_items_center px_3 py_2" v-for="(post, index) in filterPostsByCategories" :key="`p-${index}`">
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
      </div>
    </div>
    <!-- End: Body -->
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
      filterCategoriesList: [ { id: "all", name: "Tất cả" } ],
      filterCategorySelected: { id: "all", name: "Tất cả" },
      search: ""
    }
  },
  computed: {
    allPosts(){
      return this.$store.getters.allPost;
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
    }
  },
  async created() {
    await this.categories.forEach( ( item ) => {
      const data = {
        id: item._id,
        name: item.title
      };

      this.filterCategoriesList.push( data );
    } );
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
    selectPost( value ) {
      this.$store.dispatch( "setEventPush", {
        key: "post_custom",
        value: value
      } )
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
