<template>
  <div class="modal--wrapper" :data-theme="currentTheme">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <!-- Start: Delete Popup -->
      <div class="modal--content text_center">
        <div class="item mb_2 delete">
          <div class="text mb_2 pb_2">Các nhóm và trang đã chọn sẽ bị xóa khỏi nhóm. Bạn chắc chắn muốn xóa {{ title }} này không?</div>
          <div @click="deleteTargets">Xóa</div>
        </div>
        <div class="item mb_2 cancel" @click="closePopup">Hủy</div>
      </div>
      <!-- End: Delete Popup -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    storeActionName: {
      type: String,
      default: ""
    },
    targetData: {
      type: Object
    }
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    closePopup() {
      this.$emit("closePopup", false);
    },
    deleteTargets() {
      this.closePopup();
      this.$store.dispatch(this.storeActionName, this.targetData);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>


