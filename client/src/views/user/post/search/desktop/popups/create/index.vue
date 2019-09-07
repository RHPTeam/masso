<template>
  <div class="modal--wrapper" :data-theme="currentTheme">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <div class="modal--content py_4">
        <!-- Start: Modal Header -->
        <div class="modal--header px_4">
          <div class="title">Thêm vào kho nội dung
          </div>
        </div>
        <!-- End: Modal Header -->
        <!-- Start: Modal Body -->
        <div class="modal--scroll r_scrollbar my_3">
          <div class="modal--body">
            <modal-body
              :fbPost="fbPost"
              :post="post"
            ></modal-body>
          </div>
        </div>
        <!-- End: Modal Body -->
        <!-- Start: Modal Footer -->
        <div class="modal--footer d_flex justify_content_between align_items_center px_4">
          <button
            class="btn--skip"
            @click="closePopup()"
          > {{ $t('chat.common.popup.delete.cancle') }} </button>
          <button
            class="btn--submit"
            @click="createPost()"
          >LƯU</button>
        </div>
        <!-- Start: Modal Footer -->
      </div>
    </div>
  </div>
</template>

<script>
import ModalBody from "./body";

export default {
  components: {
    ModalBody
  },
  props: [ "fbPost" ],
  data() {
    return {
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    post() {
      return this.$store.getters.defaultPost;
    }
  },
  // beforeDestroy () {
  //   this.resetPost();
  // },
  methods: {
    resetPost() {
      this.post.title = "";
      this.post.content = "";
      this.post._categories = [];
      this.post.attachments = [];
      this.post.place = "";
      this.post.tags = [];
      this.post.activity = "";
      this.post.color = "";
    },
    closePopup() {
      this.$emit( "closePopup", false );
      this.resetPost();
    },
    async createPost() {
      // Map _categories
      const cate = this.post._categories.map( ( item ) => {
        return {
          _id: item._id,
          title: item.title
        }
      } );
      this.post._categories = cate;

      // Create post request
      await this.$store.dispatch( "createPostByContent", this.post );
      this.closePopup();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>

