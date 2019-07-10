<template>
  <div class="modal--confirm-password">
    <!-- Start: Header -->
    <div class="items--header d_flex align_items_center">
      <div @click="closeAddKeywords">
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
      <p class="name--modal mb_0">Thêm từ khóa</p>
      <div class="active mr_3">Xong</div>
    </div>
    <!-- End: Header -->
    <div class="items--main mt_3 px_3">
      <div class="content">
        <p class="mb_2 text">Nhập từ khóa</p>
        <!-- Start: Password -->        
        <input type="text" class="form--input" placeholder="Nhập từ khóa" />
        <!-- End: Password -->
        <p class="error">Mày ngu à mà nhập sai!</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    closeAddKeywords() {
      this.$emit("closeAddKeywords", false);
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
    .content {
      .form--input {
        color: #ccc;
        background: none;
        width: 100%;
        padding: 0.55rem 0.625rem;
        border: 0;
        outline: none;
        border: 1px solid #ccc;
        border-radius: 5px;
      }
    }
    .error {
      font-size: 0.8125rem;
      color: #e01313;
      margin: 0.375rem 0;
    }
  }
}
</style>