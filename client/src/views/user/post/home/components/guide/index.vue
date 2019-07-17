<template>
  <div class="modal--wrapper">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <vue-perfect-scrollbar class="modal--content">
        <div class="modal--header d_flex flex_column align_items_center justify_content_center">
          <div class="title">Hướng dẫn sử dụng phần mềm ZinBee</div>
          <div class="divine mt_2 mb_1"></div>
        </div>
        <div class="modal--body mt_3">
          <div class="content d_flex align_items_center">
            <slides />
          </div>
        </div>
        <div
          class="modal--footer d_flex justify_content_end align_items_center px_3"
        >
          <button
            class="btn--skip"
            @click="close()"
          >
            TÔI ĐÃ HIỂU
          </button>
        </div>
      </vue-perfect-scrollbar>
    </div>
  </div>
</template>

<script>
import Slides from "./utilities";
export default {
  components: {
    Slides
  },
  data() {
    return {
      introduces: [
        {
          name: "Anh 1",
          src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxkN9uiYwQxDb6z8KfH1ZoLJmI9kwVKyyvkw5bpKYvgV3iWnSO"
        },
        {
          name: "Anh 2",
          src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCaa3BD5KE2-0s-id80USb_NMSBEhB-pMVfb9PxaQDzGWwvpFj"
        },
        {
          name: "Anh 3",
          src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyCzA64tMiOidKXn6VZzU-wNxRzN1zU0U-ioqz1_TvYxzbDIYJ"
        }
      ],
      imageBack: require("@/assets/images/message/left-arrow.png"),
      imageNext: require("@/assets/images/message/right-arrow.png"),
      currentIndex: 0
    }
  },
  methods: {
    close() {
      this.$store.dispatch("setVariableControlGuide", 0);
    }
  },
}
</script>

<style lang="scss" scoped>
  @import "index.style";
</style>
