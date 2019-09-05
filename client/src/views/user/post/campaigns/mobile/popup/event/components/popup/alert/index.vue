<template>
  <div class="modal--wrapper" :data-theme="currentTheme">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <div class="modal--content mb_2" v-click-outside="closePopup">
        <div class="modal--body mb_2 p_3">
          Không thể thiết lập thời gian chờ giữa các lần đăng dưới 5 phút.
          Việc đăng quá nhanh có thể dẫn đến vi phạm tiêu chuẩn cộng đồng của Facebook.
        </div>
        <div class="modal--footer">
          <button
            class="btn--submit"
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
  @import "./index.style";
</style>


