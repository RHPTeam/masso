<template>
  <div class="modal--wrapper">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <div class="modal--content">
        <div class="modal--header">
          <div class="title--small mt_2">{{ title }}</div>
          <div class="desc mt_3">Hành động này sẽ không thể hoàn tác. Bạn có chắc chắn muốn xóa không?</div>
        </div>
        <div
          class="modal--footer d_flex justify_content_between align_items_center"
        >
          <button class="btn-skip" @click="closeAddPopup">HỦY</button>
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
  props: [
    "isShowDeletePopup",
    "title",
    "groupTarget",
    "typeName",
    "targetData"
  ],

  data() {
    return {
    };
  },

  computed: {
    selectedUIDs() {
      return this.$store.getters.selectedUIDs;
    },
  },

  methods: {
    closeAddPopup() {
      this.$emit("closeAddPopup", false);
    },
    deleteSelected() {
      if (this.type === 'friends') {
        const dataSender = {
          gr_id: this.groupTarget._id,
          friends: this.selectedUIDs
        }
        this.$store.dispatch("deleteFriendsFromGroup", dataSender);
        this.$emit("closeAddPopup", false);
        this.$store.dispatch("selectedUIDs", []);
      }
      else if (this.typeName === 'group') {
        const gr_id = this.targetData._id;
        this.$store.dispatch("deleteGroupFriends", gr_id);
        this.$emit("closeAddPopup", false);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../index.style";
@import "./index.style";
</style>
