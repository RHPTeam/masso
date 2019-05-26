// import SequenceService from "@/services/modules/chat/sequence.service";
// import BlockServices from "@/services/modules/chat/block.service";

const state = {
  statusSqc: "",
  statusItemSqc: "",
  groupSqc: {},
  itemSqc: {}
};
const getters = {
  statusSqc: state => state.statusSqc,
  statusItemSqc: state => state.statusItemSqc,
  groupSqc: state => state.groupSqc,
  itemSqc: state => state.itemSqc
};
const mutations = {
  /******************** CHECK STATUS SEQUENCE *********************/
  sequence_request: state => {
    state.statusSqc = "loading";
  },
  sequence_success: state => {
    state.statusSqc = "success";
  },
  sequence_error: state => {
    state.statusSqc = "errors.js";
  },
  /******************** CHECK STATUS ITEM SEQUENCE *********************/
  sequenceItem_request: state => {
    state.statusItemSqc = "loading";
  },
  sequenceItem_success: state => {
    state.statusItemSqc = "success";
  },
  sequenceItem_error: state => {
    state.statusItemSqc = "errors.js";
  },
  /******************** SEQUENCE *********************/
  setSequence: (state, payload) => {
    state.groupSqc = payload;
  },
  /******************** ITEM SEQUENCE *********************/
  setItemSqc: (state, payload) => {
    state.itemSqc = payload;
  }
};
const actions = {
  // Create group sequence
  createSequence: async ({ commit }) => {
    await commit("sequence_request");
    await SequenceService.create();
    const resultCreate = await SequenceService.index();
    await commit("setSequence", resultCreate.data.data);
    await commit("sequence_success");
  },
  // Create block on sequence
  createItemSequences: async ({ commit }, payload) => {
    await commit("sequenceItem_request");
    await SequenceService.createItemSequence(payload);
    const resultDataItem = await SequenceService.index();
    await commit("setSequence", resultDataItem.data.data);
    await commit("sequenceItem_success");
  },
  //Delete Group Sequence
  deleteSequence: async ({ commit }, payload) => {
    await commit("sequence_request");
    await SequenceService.deleteSequence(payload);
    const resultDelete = await SequenceService.index();
    await commit("setSequence", resultDelete.data.data);
    await commit("sequence_success");
  },
  // Delete block in sequence
  deleteBlockOnSequence: async ({ commit }, payload) => {
    await commit("sequence_request");
    await SequenceService.deleteItemSequence(payload.sq_id, payload.blockId);
    const resultDelete = await SequenceService.index();
    await commit("setSequence", resultDelete.data.data);
    await BlockServices.index();
    await commit("sequence_success");
  },
  // Get info group sequence
  getSequence: async ({ commit }) => {
    const result = await SequenceService.index();
    await commit("setSequence", result.data.data);
  },
  //Get info block on sequence
  getItemSqc: async ({ commit }, payload) => {
    await commit("sequenceItem_request");
    const result = await BlockServices.show(payload);
    await commit("setBlock", result.data.data[0]);
    await commit("sequenceItem_success");
  },
  // Update number time Block on sequence
  updateNumberTimeItemSqc: async ({ commit }, payload) => {
    const objSender = {
      numberTime: payload.value
    };
    await SequenceService.updateItemSqc(
      payload.sqId,
      payload.itemId,
      objSender
    );
    const resultUpdate = await BlockServices.index();
    await commit("setBlock", resultUpdate.data.data[0]);
  },
  //Update description time block on sequence
  updateDescTimeItemSqc: async ({ commit }, payload) => {
    const objSender = {
      descTime: payload.value
    };
    await SequenceService.updateItemSqc(
      payload.sqId,
      payload.itemId,
      objSender
    );
    const resultUpdate = await BlockServices.index();
    await commit("setBlock", resultUpdate.data.data[0]);
  },
  // Update name group sequence
  updateSequence: async ({ commit }, payload) => {
    await SequenceService.update(payload.sq_id, { name: payload.name });
  }
};
export default {
  state,
  getters,
  mutations,
  actions
};
