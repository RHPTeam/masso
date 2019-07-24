<template>
  <div class="modal--confirm-password">
    <!-- Start: Header -->
    <div class="items--header d_flex align_items_center">
      <div @click="closeChangePassword">
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
      <p class="name--modal mb_0">Thay đổi</p>
      <div class="button--done active mr_3">
        <div v-if="isCompare" @click="confirmChangedPassword">Xong</div>
      </div>
    </div>
    <!-- End: Header -->
    <div class="items--main mt_3 px_3">
      <div class="item">
        <p class="mb_2 text">Mật khẩu mới</p>
        <!-- Start: Password -->
        <input
          v-model="reset.newPassword"
          type="password"
          class="form--input"
          placeholder="Nhập mật khẩu"
        />
        <!-- End: Password -->
        <!-- Start: Error -->
        <p
          class="error"
          :class="{
              errors: statusClassError.newPassword,
              passed: statusClassPassed.newPassword
            }"
        >{{ errorText.newPassword }}</p>
        <!-- End: Error -->
      </div>
      <div class="item">
        <p class="mb_2 text">Nhập lại mật khẩu</p>
        <!-- Start: Password -->
        <input
          v-model="reset.confirmNewPassword"
          type="password"
          class="form--input"
          placeholder="Nhập lại mật khẩu"
        />
        <!-- End: Password -->
        <!-- Start: Error -->
        <p
          class="error"
          :class="{
              errors: statusClassError.confirmNewPassword,
              passed: statusClassPassed.confirmNewPassword
            }"
        >{{ errorText.confirmNewPassword }}</p>
        <!-- End: Error -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      errorText: {
        newPassword: "",
        confirmNewPassword: ""
      },
      statusClassError: {
        newPassword: false,
        confirmNewPassword: false
      },
      statusClassPassed: {
        newPassword: false,
        confirmNewPassword: false
      },
      reset: {
        newPassword: "",
        confirmNewPassword: ""
      },
      isCompare: false
    };
  },
  computed: {
    verifyPasswordToken() {
      return this.$store.getters.verifyPasswordToken;
    }
  },
  watch: {
    "reset.newPassword"(value) {
      this.isCompare = false;
      this.errorText.newPassword = "Mật khẩu nằm trong khoảng 6-20 kí tự!";
      this.statusClassError.newPassword = true;
      this.statusClassPassed.newPassword = false;
      if (value.length > 5 && value.length < 20) {
        this.isCompare = false;
        this.errorText.newPassword = "";
        this.statusClassError.newPassword = false;
        this.statusClassPassed.newPassword = true;
      } else if (value.length === 0) {
        this.isCompare = false;
        this.errorText.newPassword = "";
        this.statusClassError.newPassword = false;
        this.statusClassPassed.newPassword = false;
      }
    },
    "reset.confirmNewPassword"(value) {
      this.isCompare = false;
      this.errorText.confirmNewPassword = "Mật khẩu không trùng nhau!";
      this.statusClassError.confirmNewPassword = true;
      this.statusClassPassed.confirmNewPassword = false;
      if (value === this.reset.newPassword) {
        this.isCompare = true;
        this.errorText.confirmNewPassword = "";
        this.statusClassError.confirmNewPassword = false;
        this.statusClassPassed.confirmNewPassword = true;
        this.showPopupPasswordChange = true;
      } else if (value.length === 0) {
        this.isCompare = false;
        this.errorText.confirmNewPassword = "";
        this.statusClassError.confirmNewPassword = false;
        this.statusClassPassed.confirmNewPassword = false;
      }
    }
  },
  methods: {
    closeChangePassword() {
      this.$emit("closeChangePassword", false);
    },
    async confirmChangedPassword() {
      this.isComparePassword();
      if (this.isCompare) {
        const passwordSender = {
          token: this.verifyPasswordToken,
          newPassword: this.reset.newPassword
        };
        await this.$store.dispatch(
          "changePasswordByVerifyToken",
          passwordSender
        );

        if (this.$store.getters.status === "success") {
          this.closeChangePassword();
        }
      }
    },
    isComparePassword() {
      if (
        this.reset.newPassword === "" ||
        this.reset.confirmNewPassword === ""
      ) {
        return (this.isCompare = false);
      }
      if (this.reset.newPassword !== this.reset.confirmNewPassword) {
        return (this.isCompare = false);
      }
      return (this.isCompare = true);
    }
  }
};
</script>

<style scoped lang="scss">
.modal--confirm-password {
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background: #2f3136;
  color: #ccc;
  z-index: 10;
  font-size: 0.875rem;
  .items--header {
    padding: 0.625rem 0;
    border-bottom: 1px solid #444;
    .arrow-down {
      transform: rotate(90deg);
      margin-left: 0.5rem;
    }
    .name--modal {
      margin: auto;
    }
  }
  .items--main {
    .item {
      .form--input {
        color: #ccc;
        padding: 0.55rem 0.625rem;
        border: 1px solid #444;
        border-radius: 10px;
        background: none;
        width: 100%;
        outline: none;
      }
    }
    .error {
      font-size: 0.8125rem;
      color: #e01313;
      margin: 0.375rem 0;
    }
  }
  .action {
    font-size: 1rem;
    background: green;
    padding: 0.6rem 0;
    border: 0;
    display: block;
    border-radius: 0.625rem;
  }
}

.button {
  &--done {
    width: 2rem;
  }
}
</style>
