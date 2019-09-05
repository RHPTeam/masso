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
          <div class="modal--body px_3">
            <p class="mb_1">Nội dung bài viết:</p>
            <div class="content--post">
              <div
                class="p_2 content"
                style="white-space: pre-wrap; word-wrap: break-word; font-family: inherit;font-size:0.8315rem;"
                v-html="fbSelected.content"
              ></div>
              <div class="pl_2 mt_2 gallery d_flex justify_content_start align_items_center flex_wrap">
                <div
                  class="gallery--block position_relative"
                  v-for="(gallery, index) in fbSelected.attachments.slice(0,3)"
                  :key="`i-${index}`"
                >
                  <div class="image--wrap position_relative">
                    <img :src="gallery.link" />
                  </div>
                </div>
                <div class="gallery--block position_relative" v-if="fbSelected.attachments.length > 4">
                  <div class="image--wrap position_relative">
                    <img
                      src="https://is1-ssl.mzstatic.com/image/thumb/Purple124/v4/26/40/90/264090b4-017b-758e-9e32-f4cb602fe70e/AppIcon-0-1x_U007emarketing-0-0-GLES2_U002c0-512MB-sRGB-0-0-0-85-220-0-0-0-4.png/246x0w.jpg"
                      alt
                    />
                  </div>
                  <div
                    class="gallery--block-more d_flex align_items_center justify_content_center position_absolute"
                  >+ {{ fbSelected.attachments.length - 4 }}</div>
                </div>
              </div>
            </div>
            <div class="other">
              <p class="mb_1 mt_2">Lượt tương tác:</p>
              <div class="d_flex align_items_center">
                <div class="like mb_2">
                  <icon-base
                    class="mr_1"
                    icon-name="icon-like"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                  >
                    <icon-like />
                  </icon-base>{{ fbSelected.like }}
                </div>
                <div class="share mb_2 ml_auto">
                  <icon-base
                    class="mr_1"
                    icon-name="icon-share"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                  >
                    <icon-share />
                  </icon-base>{{ fbSelected.share }}
                </div>
              </div>
            </div>
          </div>
        </vue-perfect-scrollbar>
        <!-- End: Modal Body -->
        <!-- Start: Transition  -->
        <transition name="popup--mobile">
          <modal-edit
            :post="post"
            v-if="isShowEdit === true"
            @closePopup="isShowEdit = $event"
            @closeAllEdit="closeAllEdit($event)"
          />
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
    closeAllEdit(event) {
      this.$emit("closeAllEdit", event);
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
    },
    resetPost() {
      this.post.title = "";
      this.post.content = "";
    },
    sliceImage() {
      return this.item.attachments.slice(0, 3);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>

