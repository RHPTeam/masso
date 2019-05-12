<template>
  <div class="post--data my_3" :data-theme="currentTheme">
    <div class="item--header d_flex align_items_center px_3 py_2">
<!--      <div class="col col&#45;&#45;checkbox px_2">-->
<!--        <label class="custom&#45;&#45;checkbox mb_0">-->
<!--          <input type="checkbox" />-->
<!--        </label>-->
<!--      </div>-->
      <div class="col col--name px_2">Tên bài viết</div>
      <div class="col col--category px_2">Danh mục</div>
      <div class="col col--image px_4">Hình ảnh</div>
      <div class="col col--action px_4">Hành động</div>
    </div>
    <!-- if all post === undefined call component loading -->
    <div v-if="filterAllPost.length === 0"
         class="item--body data--empty d_flex align_items_center justify_content_center px_3 py_2">
      Không có dữ liệu
    </div>
    <!-- else call component item post -->
    <div v-else>
      <div v-if="this.$store.getters.statusPost === 'loading'">đang tải kết quả</div>
      <item-post
        v-for="(item, index) in filterAllPost"
        :key="index"
        :item="item"
        @showDeletePopup="showDeletePopup($event)"
      />
    </div>
    <!--*********** POPUP *************-->
    <transition name="popup">
      <delete-popup
        v-if="isShowDeletePopup === true"
        :data-theme="currentTheme"
        title="Xoá bài đăng"
        @closePopup="isShowDeletePopup = $event"
        storeActionName="deletePost"
        :targetId="postDelete._id"
        :targetName="postDelete.title"
        typeName="bài đăng"
      ></delete-popup>
    </transition>
  </div>
</template>

<script>
import DeletePopup from "@/components/popups/delete";
import ItemPost from "./item";

export default {
  components: {
    DeletePopup,
    ItemPost
  },
  props: [ "filterCategorySelected", "filterShowSelected", "search" ],
  data() {
    return {
      isShowDeletePopup: false,
      postDelete: {}
    }
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    allPost() {
      return this.$store.getters.allPost;
    },
    filterAllPost() {
      if ( this.filterCategorySelected.id === "all" ) {
        return this.allPost.filter( ( post ) => {
          return post.title
            .toString()
            .toLowerCase()
            .includes( this.search.toString().toLowerCase() );
        } );
      }
      return this.allPost.filter( ( post ) => {
        const checkedArr = post._categories.filter( ( category ) => {
          return category._id === this.filterCategorySelected.id;
        } );

        return post.title.toString()
          .toLowerCase()
          .includes( this.search.toString().toLowerCase() ) && checkedArr.length !== 0;
      } );
    }
  },
  async created  () {
    await this.$store.dispatch( "getAllPost" );
  },
  methods: {
    showDeletePopup( post ) {
      this.postDelete = post;
      this.isShowDeletePopup = true;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>
