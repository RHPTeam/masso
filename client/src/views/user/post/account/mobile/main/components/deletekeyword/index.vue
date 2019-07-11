<template>
  <div class="modal--delete">
    <div class="content text_center">
      <div class="delete mb_2">
        <p class="mb_2 pb_2 text px_2">Bạn có chắc chắn muốn xóa từ khóa này?</p>
        <div class="px_2" @click="confirmPopupDelete">Xóa</div>
      </div>
      <div class="cancel" @click="closePopupDelete">Hủy</div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    closePopupDelete() {
      this.$emit("closePopupDelete", false);
    },
    confirmPopupDelete(){
      this.$emit("confirmPopupDelete", true);
    }
  },
};
</script>

<style scoped lang="scss">
.modal--delete {
  height: 100vh;
  width: 100vw;
  // background: #404040b0;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 10;
  .content {
    height: 170px;
    color: #333;
    position: absolute;
    bottom: 0;
    width: 90vw;
    left: 5vw;
    font-size: 1rem;
    .delete {
      border: 1px solid #ccc;
      background: #fff;
      border-radius: 0.625rem;
      padding: 0.625rem 0;
      .text {
        border-bottom: 1px solid #ccc;
      }
    }
    .cancel {
      border: 1px solid #ccc;
      background: #fff;
      border-radius: 0.625rem;
      padding: 0.625rem 0;
    }
  }
}
</style>
