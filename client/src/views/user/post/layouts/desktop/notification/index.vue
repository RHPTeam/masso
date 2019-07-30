<template>
  <div :data-theme="currentTheme">
    <div class="position_fixed notification d_none d_md_block">
      <!-- Then put toasts within -->
      <div
        class="toast fade show"
        role="alert"
        data-autohide="false"
        aria-live="assertive"
        aria-atomic="true"
        v-for="facebook in accountFacebookList"
        :key="facebook._id"
        v-if="accountFacebookList.length > 0 && facebook.status === false"
        @click="goToAccountFacebook"
      >
        <div class="toast--header">
          <svg
            class="bd--placeholder-img rounded mr_2"
            width="20"
            height="20"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
            role="img"
          >
            <rect fill="#007aff" width="100%" height="100%" />
          </svg>
          <strong class="mr_auto">Thông báo</strong>
          <small class="text_muted">vừa xong</small>
          <button type="button" class="ml_2 mb_1 close" data-dismiss="toast" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="toast--body">
          Chúng tôi nhận thấy rằng, bạn đã đăng xuất tài khoản
          <b
            class="im"
          >{{ facebook.userInfo.name }}</b>
          trên facebook. Vui lòng cập nhật lại mã kích hoạt tài khoản facebook tại đây!
        </div>
      </div>

      <!-- Then put toasts within -->
      <div
        class="toast fade show"
        role="alert"
        data-autohide="false"
        aria-live="assertive"
        aria-atomic="true"
        v-if="statusNetwork === false"
      >
        <div class="toast--header">
          <svg
            class="bd--placeholder-img rounded mr_2"
            width="20"
            height="20"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
            role="img"
          >
            <rect fill="#007aff" width="100%" height="100%" />
          </svg>
          <strong class="mr_auto">Thông báo</strong>
          <small class="text_muted">vừa xong</small>
          <!-- <button type="button" class="ml_2 mb_1 close" data-dismiss="toast" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>-->
        </div>
        <div class="toast--body">
          Chúng tôi nhận thấy rằng, kết nối mạng của bạn bị
          <span class="im">mất</span>, hoặc
          <span class="im">quá yếu</span>.
          Vui lòng kiểm tra lại đường truyền mạng để có được trải nghiệp tốt nhất trên hệ thống!
        </div>
      </div>
    </div>
    <div class="position_fixed notification d_block d_md_none" :class="isHidePopup === true ? 'active' : ''">
      <!-- Then put toasts within -->
      <div
        class="toast fade show"
        role="alert"
        data-autohide="false"
        aria-live="assertive"
        aria-atomic="true"
        v-for="facebook in accountFacebookList"
        :key="facebook._id"
        v-if="accountFacebookList.length > 0 && facebook.status === false"
        @click="goToAccountFacebook"
      >
        <div class="toast--header">
          <svg
            class="bd--placeholder-img rounded mr_2"
            width="20"
            height="20"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
            role="img"
          >
            <rect fill="#007aff" width="100%" height="100%" />
          </svg>
          <strong class="mr_auto">Thông báo</strong>
          <small class="text_muted">vừa xong</small>
          <button type="button" class="ml_2 mb_1 close" data-dismiss="toast" aria-label="Close" @click="closePopup">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="toast--body">
          Chúng tôi nhận thấy rằng, bạn đã đăng xuất tài khoản
          <b
            class="im"
          >{{ facebook.userInfo.name }}</b>
          trên facebook. Vui lòng cập nhật lại mã kích hoạt tài khoản facebook tại đây!
        </div>
      </div>

      <!-- Then put toasts within -->
      <div
        class="toast fade show"
        role="alert"
        data-autohide="false"
        aria-live="assertive"
        aria-atomic="true"
        v-if="statusNetwork === false"
      >
        <div class="toast--header">
          <svg
            class="bd--placeholder-img rounded mr_2"
            width="20"
            height="20"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
            role="img"
          >
            <rect fill="#007aff" width="100%" height="100%" />
          </svg>
          <strong class="mr_auto">Thông báo</strong>
          <small class="text_muted">vừa xong</small>
          <!-- <button type="button" class="ml_2 mb_1 close" data-dismiss="toast" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>-->
        </div>
        <div class="toast--body">
          Chúng tôi nhận thấy rằng, kết nối mạng của bạn bị
          <span class="im">mất</span>, hoặc
          <span class="im">quá yếu</span>.
          Vui lòng kiểm tra lại đường truyền mạng để có được trải nghiệp tốt nhất trên hệ thống!
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    statusNetwork: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isHidePopup: false
    }
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    accountFacebookList() {
      return this.$store.getters.accountsFB;
    }
  },
  methods: {
    closePopup() {
      this.isHidePopup = true;
    },
    goToAccountFacebook() {
      this.$router.push({ name: "post_fbaccount" });
    }
  }
};
</script>
<style lang="scss" scoped>
.notification {
  bottom: 4rem;
  left: 1rem;
  z-index: +10;
  &.active {
    display: none!important;
  }
}
.close {
  font-size: 1.3125rem;
  line-height: 1;
  text-shadow: 0 1px 0 #fff;
  opacity: 0.5;
  outline: none;
}

button.close {
  padding: 0;
  background-color: transparent;
  border: 0;
}

.toast {
  background-clip: padding-box;
  cursor: pointer;
  overflow: hidden;
}

.toast {
  max-width: 280px;
  font-size: 0.875rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 0.25rem;
  &.show {
    display: block;
    opacity: 1;
  }
  &:not(:last-child) {
    margin-bottom: 0.75rem;
  }
  &--header {
    display: flex;
    align-items: center;
    padding: 0.25rem 0.75rem;
    color: #6c757d;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }
  &--body {
    color: rgba(0, 0, 0, 0.6);
    padding: 0.75rem;
  }
}

.toast {
  background-color: #fff;
  color: #000;
}

.fade {
  transition: opacity 0.15s linear;
}

.im {
  color: rgba(255, 0, 3, 0.56);
}

//  ================== CHANGE THEME

div[data-theme="dark"] {
  .toast {
    background-color: #27292d;
    &--header {
      color: #ccc;
    }
    &--body {
      color: #999;
    }
    .im {
      color: #ffb94a;
    }
  }
}

// RESPONSIVE
@media screen and (max-width: 767px) {
  .notification {
    width: 90%;
    bottom: 3.5rem;
    left: 5%;
    // border: 1px solid #444;
    border-radius: 0.625rem;
    .toast {
      max-width: 100%;
    }
  }
}
</style>
