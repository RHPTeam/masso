<template>
  <div class="detail mt_2">
    <div class="back text_center mb_2" @click="back">Quay lại</div>
    <div class="header d_flex align_items_center justify_content_between">
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
        <input type="text" placeholder="Tìm kiếm ..." />
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
          <div v-if="!categories"></div>
          <div
            v-else
            class="suggest--item"
            v-for="(item, index) in categories"
            :key="`c-${index}`"
            @click="filterPostByCategories(item._id)"
          >
            {{ item.title }}
          </div>
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
      <div v-if="allPosts">
        <div v-if="this.$store.getters.statusPost === 'loading'">
          <loading-component />
        </div>
        <div class="result--item d_flex align_items_center px_3 py_2 justify_content_center" v-if="allPosts.length === 0">Không tìm thấy bài đăng</div>
        <div class="result--item d_flex align_items_center px_3 py_2" v-for="(post, index) in allPosts" :key="`p-${index}`">
          <div class="name text_left">{{post.title}}</div>
          <div class="categories text_left">
            <span v-for="(item, index) in post._categories" :key="index">{{item.title + ', '}}</span>
          </div>
          <div class="content text_left">{{post.content}}</div>
          <div class="action">
            <div class="btn--choose checked text_center m_auto" v-if="event.post_custom.filter(function(e) { return e._id === post._id; }).length > 0">Đã chọn</div>
            <div class="btn--choose text_center m_auto" @click="selectPost(post)" v-else>Chọn</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShowSuggest: false,
      listOption: []
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
    }
  },
  methods: {
    back(){
      this.$store.dispatch( "setCaseEvent", {
        key: "libraries",
        value: 0
      } );
    },
    close() {
      this.isShowSuggest = false;
    },
    filterPostByCategories( val ){
      this.$store.dispatch( "getPostByCategories", val );
    },
    selectPost( value ) {
      this.$store.dispatch( "setEventPush", {
        key: "post_custom",
        value: value
      } )
    }
  },
}
</script>

<style lang="scss" scoped>
  @import "./index.style";
</style>
