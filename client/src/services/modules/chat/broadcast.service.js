import Api from "@/services";

export default {
  index() {
    return Api().get( "broadcast" );
  },
  createScheduleBlock( id ) {
    return Api().post(`broadcast/addBlock?_bcId=${id}`);
  },
  createItemSchedule(broadId, blockId, item) {
    console.log( item );
    return Api().patch(
      `broadcast?_broadId=${broadId}&_blockId=${blockId}`,
      item
    );
  },
  createScheduleBlockItem(broadId, blockId, typeItem) {
    return Api().post(
      `broadcast/addBlock?_bcId=${broadId}&_blockId=${blockId}&_typeItem=${typeItem}`
    );
  },
  deleteItemSchedule(bcId, blockId, contentId) {
    return Api().delete(
      `broadcast?_bcId=${bcId}&_blockId=${blockId}&_contentId=${contentId}`
    );
  },
  deleteItemSubcribeSchedule(bcId, blockId, contentId, sqcId) {
    return Api().delete(
      `broadcast?_bcId=${bcId}&_blockId=${blockId}&_contentId=${contentId}&_sequenceId=${sqcId}`
    );
  },
  deleteSchedule(bId, sId) {
    return Api().delete(`broadcast?_bcId=${bId}&_blockId=${sId}`);
  },
  getScheduleBlockById(broadId, blockId) {
    return Api().get(`broadcast?_id=${broadId}&_blockId=${blockId}`);
  },
  changeStatusBroadcast(broadId, blockId) {
    return Api().patch(
      `broadcast?_bcId=${broadId}&_blockId=${blockId}&_status=true`
    );
  },
  updateItemSchedule(bcId, blockId, contentId, content) {
    return Api().patch(
      `broadcast?_bcId=${bcId}&_blockId=${blockId}&_contentId=${contentId}`,
      content
    );
  },
  updateTimeSettingScheduleBlock(bc_id, b_id, type, block) {
    return Api().patch(
      `broadcast?_bcId=${bc_id}&_blockId=${b_id}&_type=${type}`,
      block
    );
  },
  updateTimeSchedule(bcId, blockId, content) {
    return Api().patch(`broadcast?_bcId=${bcId}&_blockId=${blockId}`, content);
  },
  addFriendToBroadcasts(broadId,  blockId, friendId) {
    return Api().post(`broadcast/addBlock?_bcId=${broadId}&_blockId=${blockId}`, friendId)
  }
};
