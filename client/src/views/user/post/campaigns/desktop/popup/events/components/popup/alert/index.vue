<template>
  <div class="modal--wrapper" :data-theme="currentTheme">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <div class="modal--content px_3 py_4" v-click-outside="closePopup">
        <div class="modal--body my_3">
          Thời gian chờ giữa các lần gửi tối thiểu là 5 phút, vui lòng xem lại giá trị bạn vừa cập nhật.
        </div>
        <div class="modal--footer d_flex justify_content_between align_items_center">
          <button
            class="btn--submit ml_auto"
            @click="closePopup()"
          > Đã hiểu </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    closePopup() {
      this.$emit("closeAlert", false);
    }
  },
}
</script>

<style lang="scss" scoped>
  @import "index.style";
</style>


