import BlockServices from "@/services/modules/chat/block.service";
import GroupBlockServices from "@/services/modules/chat/groupblock.service";

const state = {
  statusGroupBlocks: "",
  statusBlocks: "",
  groups: [],
  block: {},
  blocks: [],
  dataPreviewUpdate: {}
};
const getters = {
  statusGroupBlocks: state => state.statusGroupBlocks,
  statusBlocks: state => state.statusBlocks,
  groups: state => state.groups,
  block: state => state.block,
  blocks: state => state.blocks,
  dataPreviewUpdate: state => state.dataPreviewUpdate
};
const mutations = {
  /******************** CHECK STATUS GROUP BLOCK *********************/
  groupBlock_request: state => {
    state.statusGroupBlocks = "loading";
  },
  groupBlock_success: state => {
    state.statusGroupBlocks = "success";
  },
  /******************** CHECK STATUS BLOCK *********************/
  block_request: state => {
    state.statusBlocks = "loading";
  },
  block_success: state => {
    state.statusBlocks = "success";
  },
  /******************** GROUP BLOCKS *********************/
  setGroupBlock: (state, payload) => {
    state.groups = payload;
  },
  /******************** BLOCK *********************/
  setBlock: (state, payload) => {
    state.block = payload;
  },
  setBlocks: (state, payload) => {
    state.blocks = payload;
  },
  setPreviewUpdate: (state, payload) => {
    state.dataPreviewUpdate = payload;
  }
};
const actions = {
  /******************** GROUP BLOCKS *********************/
  createGroupBlock: async ({ commit }) => {
    await commit("groupBlock_request");
    await GroupBlockServices.create();
    const groupBlock = await GroupBlockServices.index();
    await commit("setGroupBlock", groupBlock.data.data);
    await commit("groupBlock_success");
  },
  deleteGroup: async ({ commit }, payload) => {
    await commit("groupBlock_request");
    await GroupBlockServices.deleteGroup(payload);
    const resultDeleteGroup = await GroupBlockServices.index();
    await commit("setGroupBlock", resultDeleteGroup.data.data);
    await commit("groupBlock_success");
  },
  getBlocks: async ({ commit }) => {
    const results = await BlockServices.index();
    commit("setBlocks", results.data.data);
  },
  getGroupBlock: async ({ commit }) => {
    await commit("groupBlock_request");
    const groupBlock = await GroupBlockServices.index();
    await commit("setGroupBlock", groupBlock.data.data);
    await commit("groupBlock_success");
  },
  updateGroupBlock: async ({ commit }, payload) => {
    await GroupBlockServices.updateGroupBlock(payload.gr_id, {
      name: payload.name
    });
  },
  /******************** BLOCK *********************/
  createBlock: async ({ commit }, payload) => {
    await commit("block_request");
    const block = await BlockServices.create(payload);
    const groups = await GroupBlockServices.index();
    await commit("setGroupBlock", groups.data.data);
    await commit("setBlock", block.data.data);
    await commit("block_success");
  },
  createItemBlock: async ({ commit }, payload) => {
    await commit("block_request");
    const itemSender = {
      valueText: payload.value
    };
    const resultItemBlock = await BlockServices.createItemBlock(
      itemSender,
      payload.id,
      payload.type
    );
    await commit("setBlock", resultItemBlock.data.data);
    await commit("block_success");
  },
  deleteBlock: async ({ commit }, payload) => {
    await commit("block_request");
    await BlockServices.delete(payload);
    const resultDelBlock = await BlockServices.index();
    await commit("setBlock", resultDelBlock.data.data);
    const resultGroupBlock = await GroupBlockServices.index();
    await commit("setGroupBlock", resultGroupBlock.data.data);
    await commit("block_success");
  },
  deleteItemBlock: async ({ commit }, payload) => {
    await commit("block_request");
    await BlockServices.deleteItemBlock(payload.blockId, payload.itemId);
    const resultDataUpdate = await BlockServices.show(payload.blockId);
    // console.log(resultDataUpdate.data.data);
    commit("setBlock", resultDataUpdate.data.data);
    const resultDelItem = await BlockServices.index();
    await commit("setBlock", resultDelItem.data.data);
    await commit("block_success");
  },
  deleteItemAttrInBlock: async ({ commit }, payload) => {
    await commit("block_request");
    await BlockServices.deleteItemAttrBlock(
      payload.blockId,
      payload.itemId,
      payload.valueText
    );
    const resultDataUpdate = await BlockServices.show(payload.blockId);
    commit("setBlock", resultDataUpdate.data.data);
    const resultDelItemAttr = await BlockServices.index();
    await commit("setBlock", resultDelItemAttr.data.data);
    await commit("block_success");
  },
  deleteItemSequenceInBlock: async ({ commit }, payload) => {
    await commit("block_request");

    await BlockServices.deleteItemSequenceInBlock(
      payload.blockId,
      payload.itemId,
      payload.sequenceId
    );

    const resultDataUpdate = await BlockServices.show(payload.blockId);
    commit("setBlock", resultDataUpdate.data.data);

    const resultDelItemSequence = await BlockServices.index();
    await commit("setBlock", resultDelItemSequence.data.data);

    await commit("block_success");
  },
  /**
   * Get info block by id
   * @param commit set status block and set value of block
   * @param payload : id of block
   * @returns {Promise<void>}
   */
  getInfoBlock: async ({ commit }, payload) => {
    await commit("block_request");
    const result = await BlockServices.show(payload);
    await commit("setBlock", result.data.data);
    await commit("block_success");
  },
  updateBlock: async ({ commit }, payload) => {
    await BlockServices.update(payload);
    const resultGroupBlock = await GroupBlockServices.index();
    await commit("setGroupBlock", resultGroupBlock.data.data);
  },
  pushPreviewUpdateItemSubcribe: async ({commit}, payload) => {
    commit("setPreviewUpdate", payload);
  },
  updateItemBlock: async ({ commit }, payload) => {
    const objSender = {
      valueText: payload.valueText,
      typeContent: payload.type
    };
    await BlockServices.updateItemBlock(
      objSender,
      payload.itemId,
      payload.block
    );
  },
  updateItemImageBlock: async ({ commit }, payload) => {
    const resultBlock = await BlockServices.updateItemBlock(
      payload.formData,
      payload.id,
      payload.block
    );
    await commit("setBlock", resultBlock.data.data);
    const resultGroupBlock = await GroupBlockServices.index();
    await commit("setGroupBlock", resultGroupBlock.data.data);
  },
  updateItemAttrBlock: async ({ commit }, payload) => {
    const resultBlock = await BlockServices.updateItemAttrBlock(
      payload.itemId,
      payload.block
    );
    await commit("setBlock", resultBlock.data.data);
    const resultGroupBlock = await GroupBlockServices.index();
    await commit("setGroupBlock", resultGroupBlock.data.data);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
