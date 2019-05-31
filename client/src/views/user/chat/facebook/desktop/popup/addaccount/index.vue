<template>
  <div class="modal--wrapper" :data-theme="currentTheme">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <div class="modal--content">
        <div class="modal--header">
          <icon-base
            icon-name="modal-cookie"
            width="440.4"
            height="156.808"
            viewBox="0 0 440.4 156.808"
          >
            <icon-modal-cookie />
          </icon-base>
        </div>
        <div class="modal--body">
          <div class="modal--title">Thêm tài khoản Facebook</div>
          <div class="modal--desc">
            Dán mã kích hoạt Facebook vào ô bên dưới để thêm tài khoản.
          </div>
          <textarea
            placeholder="Nhập mã kích hoạt tại đây ..."
            v-model="cookie"
            @keydown.enter.exact.prevent
            @keyup.enter.exact="addCookie"
            @keydown.enter.shift.exact="newline"
          ></textarea>
        </div>
        <div
          class="modal--footer d_flex justify_content_between align_items_center"
        >
          <button class="btn-skip" @click="closeAddPopup">HỦY</button>
          <button class="btn-add" @click="addCookie">
            XONG
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
      cookie: ""
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    closeAddPopup() {
      this.$emit( "closeAddPopup", false );
    },
    async addCookie() {
      await this.$emit( "closeAddPopup", false );
      await this.$store.dispatch( "createAccountFb", this.cookie );
    }
  }
};
</script>

<style lang="scss" scoped>
  @import "../../index.style";
</style>
