<template>
  <div class="modal--wrapper">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <div
        class="modal--content position_relative"
        v-click-outside="closePopup"
      >
        <div class="modal--body mt_4">
          <div class="error--title">Tài khoản Facebook đã tồn tại</div>
          <div class="error--desc mt_2 mb_4">
            Chúng tôi nhận thấy tài khoản Facebook của bạn đã được thêm vào hệ
            thống. Hãy chắc chắn rằng bạn đã thêm đúng tài khoản của mình và
            chưa sử dụng nó trong bất kì tài khoản Zinbee nào.
          </div>
        </div>
        <div class="btn--close position_absolute" @click="closePopup">
          <icon-base
            class="icon--close mr_1"
            icon-name="remove"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <icon-close />
          </icon-base>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    closePopup() {
      this.$store.dispatch("setAddAccountErrorEmpty");
    }
  }
};
</script>

<style lang="scss" scoped>
  // @import "../../../list/index.style";

  .modal--wrapper {
    background-color: rgba(153, 153, 153, 0.4);
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    .modal--dialog {
      height: 100vh;
    }
    .modal--content {
      background-color: #27292d;
      margin: 0 1rem;
      padding: 0 1rem;
    }
    .btn--close {
      cursor: pointer;
      right: .325rem;
      top: 0.625rem;
    }
    .modal--body {
      .error--title {
        font-size: 0.93rem;
        font-weight: 600;
        color: #F96666;
        text-align: left;
      }
      .error--desc {
        font-size: 0.8125rem;
        text-align: left;
      }
      .modal--title {
        font-size: 1rem;
        font-weight: 700;
        margin-top: 10px;
      }
      .modal--desc {
        font-size: 14px;
        color: #999999;
        margin: 15px 0 20px 0;
      }
      textarea {
        width: 100%;
        height: 164px;
        padding: 15px 20px;
        border-radius: 10px;
        font-size: 14px;
        border: 0;
        resize: none;
        outline: none;
      }
    }
  }

  .modal--wrapper[data-theme="light"] {
    .btn--close {
      svg {
        color: #ccc;
      }
    }
  }

  .modal--wrapper[data-theme="dark"] {
    .btn--close {
      svg {
        color: #666;
      }
    }
  }
</style>
