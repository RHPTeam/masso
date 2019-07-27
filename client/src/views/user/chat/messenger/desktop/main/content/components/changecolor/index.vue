<template>
  <div class="modal--wrapper">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <div class="modal--content px_3 py_4">
        <div class="modal--header">
          <div class="title text_left">Chọn màu cho cuộc trò chuyện</div>
        </div>
        <div class="modal--body my_3">
          <div class="mb_3">Mọi người trong cuộc trò chuyện sẽ thấy được sự thay đổi này</div>
          <div class="option">
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
          </div>
        </div>
        <div
          class="modal--footer d_flex justify_content_between align_items_center"
        >
          <span class="ml_auto" @click="closeSelectColor">HỦY</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    closeSelectColor() {
      this.$store.dispatch("setVariableControl", {
        key: "color",
        value: false
      });
    }
  },
};
</script>

<style lang="scss" scoped>
  @import "index.style";
</style>
