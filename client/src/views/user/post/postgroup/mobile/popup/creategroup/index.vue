<template>
  <div class="modal--wrapper">
    <div class="modal--dialog">
      <div class="modal--content">
        <div class="modal--header mb_3 d_flex align_items_center">
          <div @click="closePopup">
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
          <p class="name--modal mb_0 m_auto">Tạo nhóm mới</p>
          <div class="active mr_3" @click="createPostGroup">Lưu</div>
        </div>
        <div class="modal--body mb_3 px_2">
          <p>Nhập tên nhóm vào ô bên dưới để tạo mới.</p>
          <input
            type="text"
            class="modal--body-input input--custom"
            placeholder="Nhập tên nhóm"
            v-model="newPostGroup"
            @keyup.enter="createPostGroup"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      newPostGroup: ""
    };
  },
  methods: {
    closePopup() {
      this.$emit("closePopup", false);
    },
    createPostGroup() {
      const dataSender = {
        title: this.newPostGroup
      };

      this.$store.dispatch("createPostGroup", dataSender);
      this.$emit("closePopup", false);
    }
  }
};
</script>
<style lang="scss" scoped>
// @import "../style";
.modal--wrapper {
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background: #2f3136;
  color: #ccc;
  z-index: 10;
  font-size: 0.875rem;
  .modal--header {
    padding: 0.625rem 0;
    border-bottom: 1px solid #ccc;
    .arrow-down {
      transform: rotate(90deg);
      margin-left: 0.5rem;
    }
  }
  .modal--body-input {
    border-radius: 0.625rem;
    font-size: 0.875rem;
    padding: 0.5rem 0.75rem;
    width: 100%;
    background-color: #27292d;
    border: 1px solid #444;
    color: #f7f7f7;
    outline: none;
  }
}
</style>

