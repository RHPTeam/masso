<template>
  <div class="modal--wrapper" :data-theme="currentTheme">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <div class="modal--content pb_4">
        <!-- Start: Modal Header -->
        <div class="modal--header pt_3 d_flex align_items_center">
          <div @click="closePopup">
            <icon-base
              icon-name="arrow-down"
              class="arrow-down"
              width="20"
              height="20"
              viewBox="0 0 130 130"
            >
              <icon-arrow-down />
            </icon-base>
          </div>
          <div class="title">Nội dung</div>
          <div class="edit mr_3" @click="editPost">Sửa</div>
        </div>
        <!-- End: Modal Header -->
        <!-- Start: Modal Body -->
        <vue-perfect-scrollbar class="modal--scroll my_3">
          <div class="modal--body px_2">
            <!-- <detail-post /> -->
            Nội dung xxx
          </div>
        </vue-perfect-scrollbar>
        <!-- End: Modal Body -->
        <!-- Start: Transition  -->
        <transition name="popup--mobile">
          <modal-body :fbPost="fbPost" :post="post" v-if="isShowEdit === true" @closePopup="isShowEdit = $event"/>
        </transition>
        <!-- End: Transition  -->
      </div>
    </div>
  </div>
</template>

<script>
import ModalBody from "./body";
import DetailPost from "../detail"

export default {
  components: {
    ModalBody,
    DetailPost
  },
  props: ["fbPost"],
  data() {
    return {
      isShowEdit: false
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
  methods: {
    resetPost() {
      this.post.title = "";
      this.post.content = "";
    },
    closePopup() {
      this.$emit("closePopup", false);
    },
    createPost() {
      // Map _categories
      const cate = this.post._categories.map(item => {
        return {
          _id: item._id,
          title: item.title
        };
      });
      this.post._categories = cate;

      // Create post request
      this.$store.dispatch("createPostByContent", this.post);
      this.closePopup();
    },
    editPost() {
      this.isShowEdit = true;
      // this.closePopup();
    },
  }
};
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>

