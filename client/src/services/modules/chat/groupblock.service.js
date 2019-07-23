import Api from '@/services';

export default {
  index() {
    return Api().get('group-block');
  },
  create() {
    return Api().post('group-block');
  },
  deleteGroup(groupId) {
    return Api().delete(`group-block?_groupId=${groupId}&_type=default`);
  },
  // Update name group block (Sky Albert)
  // updateGroupBlock(groupBlockId, groupBlock) {
  //   return Api().patch(`group-block?_groupId=${groupBlockId}`, groupBlock);
  // }
  updateGroupBlock(groupBlock) {
    console.log('😀', groupBlock.gr_id);
    return Api().patch(`group-block?_groupId=${groupBlock.gr_id}`, {
      gr_id: groupBlock.gr_id,
      name: groupBlock.name
    });
  }
};
