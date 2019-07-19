<template>
  <div class="modal--wrapper" :data-theme="currentTheme">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <div class="modal--content pb_4">
        <!-- Start: Modal Header -->
        <div class="modal--header d_flex align_items_center mb_2">
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
        <vue-perfect-scrollbar class="modal--scroll">
          <div class="modal--body px_2">
            <div class="like mb_1">Số lượt like: {{ fbSelected.like }}</div>
            <div class="share mb_1">Số lượt share: {{ fbSelected.share }}</div>
            <div class="content">
              <p class="mb_0">Nội dung:</p>
              <p class="mb_0 pl_2 text">{{ fbSelected.content}}</p>
            </div>
          </div>
        </vue-perfect-scrollbar>
        <!-- End: Modal Body -->
        <!-- Start: Transition  -->
        <transition name="popup--mobile">
          <modal-edit :post="post" v-if="isShowEdit === true" @closePopup="isShowEdit = $event" />
        </transition>
        <!-- End: Transition  -->
      </div>
    </div>
  </div>
</template>

<script>
import ModalEdit from "./edit";

export default {
  components: {
    ModalEdit
  },
  props: ["fbSelected"],
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
    sliceImage() {
      return this.item.attachments.slice(0, 3);
    },
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
      this.$store.dispatch("updateDefaultPostByFbPost", {
        content: this.fbSelected.content,
        attachments: this.fbSelected.attachments
      });
      // this.closePopup();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>

