<template>
  <div class="modal--wrapper" :data-theme="currentTheme">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <div class="modal--content px_3 py_4" v-click-outside="closePopup">
        <div class="modal--header">
          <div class="title text_left">Kích hoạt tài khoản</div>
        </div>
        <div class="modal--body my_3">
          <div class="desc">
            Kích hoạt tài khoản nâng cao bằng mã kích hoạt. Vui lòng nhập đúng
            mã kích hoạt và thời gian gia hạn cho các tài khoản cần kích hoạt
          </div>
          <div class="content mt_3">
          </div>
        </div>
        <div
          class="modal--footer d_flex justify_content_between align_items_center"
        >
          <button class="btn--skip" @click="closePopup">HỦY</button>
          <button class="btn--submit">
            KÍCH HOẠT
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    };
  },
  computed: {

    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    closePopup() {
      this.$emit("close", false);
    }
  }
};
</script>

<style lang="scss" scoped>
  @import "index.style";
</style>
