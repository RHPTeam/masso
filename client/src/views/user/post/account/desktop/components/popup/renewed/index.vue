<template>
  <div class="modal--wrapper">
    <div class="modal--dialog d_flex justify_content_center">
      <div class="modal--content px_4 py_3">
        <!-- Start: Header -->
        <div class="modal--header">
          <div class="title text_center mb_4">Nhập mã code để gia hạn</div>
        </div>
        <!-- End: Header -->
        <!-- Start: Body -->
        <div class="modal--body d_flex align_items_center">
          <div class="title mr_auto">Mã code</div>
          <div class="ml_auto input">
            <input type="text" placeholder="Nhập code ..." v-model="code" />
            <div class="text--error mt_1" v-if="isShowErrorCode === true">{{ errorCode }}</div>
          </div>
        </div>
        <!-- End: Body -->
        <!-- Start: Footer -->
        <div class="modal--footer d_flex align_items_center mt_4">
          <div class="left mr_auto cancel" @click="closePopup">HỦY</div>
          <div class="right ml_auto done" @click="expireByCode">XONG</div>
        </div>
        <!-- End: Footer -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      code: "",
      isShowErrorCode: false
    }
  },
  computed: {
    errorCode() {
      return this.$store.getters.errorCode;
    },
    statusCode() {
      return this.$store.getters.statusCode;
    }    
  },
  watch: {
    "code"(value) {
      if(value.length === 0) {
        this.isShowErrorCode = false;
      }
    }
  },
  methods: {
    closePopup() {
      this.$emit("closePopup", false);
    },
    async expireByCode() {
      await this.$store.dispatch("ExpireAccountByCode", this.code);
      if(this.statusCode === "success") {
        await this.$store.dispatch("getUserInfo");
        this.isShowErrorCode = false;
        this.closePopup();
      } else {
        this.isShowErrorCode = true;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.modal--wrapper {
  background-color: rgba(153, 153, 153, 0.4);
  bottom: 0;
  font-family: "Open Sans", sans-serif;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 999;

  .modal--dialog {
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: center;
    width: 100%;

    .modal--content {
      background-color: #2f3236;
      border-radius: 0.625rem;
      max-height: calc(100vh - 10%);
      width: 50%;
    }
  }
  .modal--header {
    font-size: 1.3rem;
  }
  .modal--body {
    .title {
      width: 35%;
    }
    .input {
      width: 63%;
    }
    input {
      color: #ccc;
      border-radius: 0.625rem;
      border: 0;
      background-color: #27292d;
      font-size: 0.95rem;
      outline: none;
      padding: 10px 15px;
      transition: all 0.4s ease;
      width: 100%;
      &:focus {
        box-shadow: none;
        outline: 0;
      }
    }
    .text--error {
      color: #dd3131;
      font-size: 0.8315rem;
    }
  }
  .modal--footer {
    color: #fff;
    .done {
      padding: 0.5rem 1.5rem;
      background-color: #ffb94a;
      border-radius: 0.625rem;
      border: 1px solid #ffb94a;
      cursor: pointer;
      transition: all 0.4s ease;
      &:hover {
        background-color: #ff9e4a;
      }
    }
    .cancel {
      // padding: 0.5rem 1.5rem;
      background-color: #2f3136;
      // border-radius: 0.625rem;
      // border: 1px solid #e4e4e4;
      cursor: pointer;
    }
  }
}

/*Transition popup*/
.popup-enter-active,
.popup-leave-active {
  transition: opacity 1s;
}
.popup-enter,
.popup-leave-to {
  opacity: 0;
}
</style>
