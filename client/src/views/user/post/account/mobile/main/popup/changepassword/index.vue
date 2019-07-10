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
      <div class="active mr_3">Xong</div>
    </div>
    <!-- End: Header -->
    <div class="items--main mt_3 px_3">
      <div class="item">          
        <p class="mb_2 text">Mật khẩu mới</p>
        <!-- Start: Password -->
        <input type="text" class="form--input" placeholder="Nhập mật khẩu" />
        <!-- End: Password -->
        <!-- Start: Error -->
        <p class="error">Mày ngu à mà nhập sai!</p>
        <!-- End: Error -->
      </div>
      <div class="item">          
        <p class="mb_2 text">Nhập lại mật khẩu</p>
        <!-- Start: Password -->
        <input type="text" class="form--input" placeholder="Nhập lại mật khẩu" />
        <!-- End: Password -->
        <!-- Start: Error -->
        <p class="error">Mày ngu à mà nhập không trùng nhau.</p>
        <!-- End: Error -->
      </div>
    </div>
    <!-- Start: Action -->
    <div class="text_center action mx_3">Tiếp tục</div>
    <!-- End: Action -->
  </div>
</template>

<script>
export default {
  methods: {
    closeChangePassword() {
      this.$emit("closeChangePassword", false);
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
    .item {
      .form--input {
        color: #ccc;
        padding: 0.55rem 0.625rem;
        border: 1px solid #ccc;
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
</style>