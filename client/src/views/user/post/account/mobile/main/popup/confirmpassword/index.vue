<template>
  <div class="modal--confirm-password">
    <!-- Start: Header -->
    <div class="items--header d_flex align_items_center">
      <div @click="closeConfirmPassword">
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
      <p class="name--modal mb_0">Xác nhận mật khẩu</p>
    </div>
    <!-- End: Header -->
    <div class="items--main mt_3 px_3">
      <div class="content">
        <p class="mb_0 p_2 text">Vì lý do bảo mật. Vui lòng nhập lại mật khẩu để tiếp tục.</p>
        <!-- Start: Password -->
        <div class="m_2">
          <input type="text" class="form--input" placeholder="Nhập mật khẩu" />
        </div>
        <!-- End: Password -->
      </div>
      <!-- Start: Error -->
      <p class="error">Mày ngu à mà nhập sai!</p>
      <!-- End: Error -->
    </div>
    <!-- Start: Action -->
    <div class="text_center action mx_3" @click="showActionInfo">Tiếp tục</div>
    <!-- End: Action -->
    <!-- Start: Popup -->
    <transition name="popup--mobile">
      <popup-change-name
        v-if="isShowChangeName === true"
        @closeChangeName="isShowChangeName = $event"
      />
      <popup-change-password
        v-if="isShowChangePassword === true"
        @closeChangePassword="isShowChangePassword = $event"
      />
      <popup-change-phone
        v-if="isShowChangePhone === true"
        @closeChangePhone="isShowChangePhone = $event"
      />
    </transition>
    <!-- End: Popup -->
  </div>
</template>

<script>
import PopupChangeName from "../changename";
import PopupChangePassword from "../changepassword";
import PopupChangePhone from "../changephone";
export default {
  components: {
    PopupChangeName,
    PopupChangePassword,
    PopupChangePhone
  },
  data() {
    return {
      isShowChangeName: false,
      isShowChangePassword: false,
      isShowChangePhone: false
    }
  },
  computed: {
    gestureUser() {
      return this.$store.getters.gestureUser;
    }
  },
  methods: {
    closeConfirmPassword() {
      this.$emit("closeConfirmPassword", false);
    },
    showActionInfo() {
      if (this.gestureUser === 61) {
        this.isShowChangeName = true;
      }
      if (this.gestureUser === 62) {
        this.isShowChangePhone = true;
      }
      if (this.gestureUser === 63) {
        this.isShowChangePassword = true;
      }
    }
  }
};
</script>

<style scoped lang="scss">
// Start: Transition
.popup--mobile-enter {
  transform: translateX(100%);
}

.popup--mobile-enter-to {
  transition: transform 0.75s;
  transform: translateX(0);
}

.popup--mobile-leave-to {
  transition: transform 0.75s;
  transform: translateX(100%);
}
// End: Transition
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
    border-bottom: 1px solid #ccc;
    .arrow-down {
      transform: rotate(90deg);
      margin-left: 0.5rem;
    }
    .name--modal {
      margin: auto;
    }
  }
  .items--main {
    .content {
      border: 1px solid #ccc;
      border-radius: 5px;
      .text {
        border-bottom: 1px solid #ccc;
      }
      .form--input {
        color: #ccc;
        background: none;
        width: 100%;
        border: 0;
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
</style>