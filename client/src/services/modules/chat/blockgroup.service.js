import Api from "@/services";

export default {
  index() {
    return Api().get("item-block");
  },
  create() {
    return Api().post("item-block");
  },
  deleteGroup(groupId) {
    return Api().delete(`group-block?_groupId=${groupId}`);
  },
  // Update name item block (Sky Albert)
  updateGroupBlock(groupBlockId, groupBlock) {
    return Api().patch(`group-block?_groupId=${groupBlockId}`, groupBlock);
  }
};
