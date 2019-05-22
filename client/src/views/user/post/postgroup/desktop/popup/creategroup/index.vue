<template>
  <div class="modal--wrapper">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <div class="modal--content">
        <div class="modal--header mb_3">
          <div class="title mb_3">
            Tạo nhóm mới
          </div>
          <div class="desc">
            Nhập tên nhóm vào ô bên dưới để tạo mới.
          </div>
        </div>
        <div class="modal--body mb_3">
            <input
              type="text"
              class="modal--body-input input--custom"
              placeholder="Nhập tên nhóm"
              v-model="newPostGroup"
              @keyup.enter="createPostGroup"
            />
        </div>
        <div
          class="modal--footer d_flex justify_content_between align_items_center mt_4"
        >
          <button class="btn--modal btn--skip" @click="closePopup">
            Hủy
          </button>
          <button class="btn--modal btn--submit" @click="createPostGroup">
            Lưu
          </button>
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
      this.$emit( "closePopup", false );
    },
    createPostGroup() {
      const dataSender = {
        title: this.newPostGroup
      };

      this.$store.dispatch( "createPostGroup", dataSender );
      this.$emit( "closePopup", false );
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../style";
</style>

