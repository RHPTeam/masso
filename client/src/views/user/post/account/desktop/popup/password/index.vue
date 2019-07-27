<template>
  <div class="modal--wrapper">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <div class="modal--content">
        <div class="modal--header mb_3">
          <div class="title mb_3">
            Thay đổi mật khẩu
          </div>
          <div class="desc">
            Chúng tôi nhận thấy bạn vừa thay đổi mật khẩu của mình. Nhập mật
            khẩu cũ để xác nhận sự thay đổi này.
          </div>
        </div>
        <div class="modal--body mb_3">
          <div
            class="alert alert_danger"
            v-if="this.$store.getters.authStatus === 'error'"
          >
            {{ this.$store.getters.textAuth }}
          </div>
          <div class="position_relative">
            <div class="icon position_absolute">
              <icon-base icon-name="lock" viewBox="0 0 20 20">
                <icon-lock class="ic--lock" />
              </icon-base>
            </div>
            <input
              type="password"
              class="modal--body-input input--custom"
              placeholder="Nhập mật khẩu cũ"
              v-model="oldPassword"
            />
          </div>
        </div>
        <div
          class="modal--footer d_flex justify_content_between align_items_center mt_4"
        >
          <button class="btn--modal btn-skip" @click="closePopup">
            Hủy
          </button>
          <button class="btn--modal btn-submit" @click="updatePassword">
            Lưu
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: [ "reset" ],
  data() {
    return {
      oldPassword: ""
    };
  },
  computed: {},
  methods: {
    closePopup() {
      this.$emit( "closePopup", false );
    },
    async updatePassword() {
      const passwordSender = {
        password: this.oldPassword,
        newPassword: this.reset.newPassword
      };

      await this.$store.dispatch( "changePassword", passwordSender );
      if ( this.$store.getters.status === "success" ) {
        this.$emit( "closePopup", false );
        this.$router.push( {name: "post_account"} );
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../style";
.icon {
  left: 14px;
  top: 9px;
  .ic--lock {
    color: #999999;
  }
}
.input--custom {
  padding-left: 36px !important;
}
</style>
