<template>
  <div class="search mt_2">
    <div class="btn--back d_flex align_items_center" @click="comeBackBefore">
      Trở lại
    </div>
    <div class="header d_flex align_items_center justify_content_between mt_2">
      <div class="left position_relative">
        <div class="icon position_absolute">
          <icon-base
            icon-name="input-search"
            width="20"
            height="20"
            viewBox="0 0 20 20"
          >
            <icon-input-search />
          </icon-base>
        </div>
        <input type="text" placeholder="Tìm kiếm ..." v-model="keySearch" />
      </div>
      <div class="right position_relative">
        <div class="categories d_flex align_items_center" @click="isShowSuggest = true" v-click-outside="close">
          Danh mục
          <div class="icon--down ml_2">
            <icon-base
              class="icon--sort-down"
              icon="icon--sort-down"
              width="14px"
              heigh="14px"
              viewBox="0 0 14 14"
            >
              <icon-sort-down></icon-sort-down>
            </icon-base>
          </div>
        </div>
        <div class="suggest position_absolute" v-if="isShowSuggest === true">
          <vue-perfect-scrollbar class="show">
            <div
              class="suggest--item"
              v-for="(cate, index) in allCategories" :key="`c-${index}`"
              @click="searchPostByCategories(cate._id)"
            >
              {{ cate.title }}
            </div>
          </vue-perfect-scrollbar>
        </div>
      </div>
    </div>
    <div class="body">
      <div class="result d_flex align_items_center mt_3 px_3 py_2">
        <div class="name text_left">Tên bài viết</div>
        <div class="categories text_left">Danh mục</div>
        <div class="content text_left">Nội dung</div>
        <div class="action text_center">
          Hành động
        </div>
      </div>
      <!--  Start: Show result default all post  -->
      <div v-if="showResultDefault === true">
        <div v-for="(item, index) in allPost" :key="index">
          <item-table :item="item" @pushIdPostToArray="updateToChildrenComponent($event)" />
        </div>
      </div>
      <!--  End: Show result default all post  -->
      <!--  Start: Show result search post by categories  -->
      <!--  End: Show result search post by categories  -->
    </div>
  </div>
</template>

<script>
import ItemTable from "./item";
export default {
  components: {
    ItemTable
  },
  props: {
    dataPost: {
      type: Array
    },
  },
  data() {
    return {
      isShowSuggest: false,
      showResultDefault: true,
      keySearch: "",
      isActive: false
    }
  },
  computed: {
    allCategories(){
      return this.$store.getters.categories;
    },
    allPost() {
      return this.$store.getters.allPost;
    }
  },
  watch: {
    keySearch( val ) {
      return this.allPost.filter(item => {
        return item.title.toString().toLowerCase().includes(val.toString().toLowerCase());
      })
    }
  },
  methods: {
    close() {
      this.isShowSuggest = false;
    },
    comeBackBefore(){
      this.$emit( "back", false);
    },
    updateToChildrenComponent( val ){
      this.$emit( "pushIdContentToArray", val );
    },
    searchPostByCategories( val ) {
      this.$store.dispatch( "getPostByCategories", val );
    }
  },
}
</script>

<style lang="scss" scoped>
 @import "./index.style";
   .btn--back {
     background-color: #cccccc;
     border: none;
     border-radius: .5rem;
     color: #ffffff;
     cursor: pointer;
     height: 30px;
     padding: .5rem 1rem;
     width: 80px;
   }
</style>
