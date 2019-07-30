<template>
  <div class="modal--wrapper">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <div class="modal--content">
        <div class="modal--header">
          <div class="title--small mt_2">Xóa bạn bè khỏi nhóm</div>
          <div class="desc mt_3">Hành động này sẽ không thể hoàn tác. Bạn có chắc chắn muốn xóa không?</div>
        </div>
        <div
          class="modal--footer d_flex justify_content_between align_items_center"
        >
          <button class="btn-skip" @click="closePopup">HỦY</button>
          <button class="btn-submit" @click="deleteSelected">
            XÓA
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
    };
  },

  computed: {
    selectedUIDs() {
      return this.$store.getters.selectedUIDs;
    },
    friendSelected() {
      return this.$store.getters.uidSelectDelete;
    }
  },

  methods: {
    closePopup() {
      this.$emit("closePopup", false);
    },
    deleteSelected() {
      const dataSender = {
        gr_id: this.$route.query.gid,
        friendsId: this.friendSelected.map(item => item.userID)
      };
      console.log(dataSender);
      this.$store.dispatch("deleteFriendFromGroup", dataSender);
      this.$store.dispatch("selectDeleteUID", []);
      this.closePopup();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../index.style";
@import "./index.style";
</style>
