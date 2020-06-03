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
  @import "./index.style";
</style>

