import SequenceService from "@/services/modules/chat/sequence.service";
// import BlockServices from "@/services/modules/chat/block.service";

const state = {
  /******************** SEQUENCE *********************/
  allSequenceScript: [],
  idSequence: [],
  newBlockInSequence: [],
  allBlockInASequence: [],
  newSequenceScript: [],
  inforABlockInSequence: []
};
const getters = {
  /******************** SEQUENCE *********************/
  allSequenceScript: state => state.allSequenceScript,
  idSequence: state => state.idSequence,
  newBlockInSequence: state => state.newBlockInSequence,
  allBlockInASequence: state => state.allBlockInASequence,
  newSequenceScript: state => state.newSequenceScript,
  inforABlockInSequence: state => state.inforABlockInSequence
};
const mutations = {
  /******************** SEQUENCE *********************/
  setAllSequenceScript: (state, payload) => {
    state.allSequenceScript = payload;
  },
  // set sequence by id
  setSequenceById: (state, payload) => {
    state.idSequence = payload;
  },

  // set new block in sequence
  setCreateBlockInSequence: ( state, payload ) => {
    state.newBlockInSequence = payload;
  },

  // set all block in a sequence
  setAllBlockInSequence: (state, payload) => {
    state.allBlockInASequence = payload;
  },
  // set create sequence
  setCreateSequenceScript: (state, payload) => {
    state.newSequenceScript = payload;
  },
  // update time block sequence
  setAllBlockInSequenceById: (state, payload) => {
    state.inforABlockInSequence = payload;
  }
};
const actions = {
  /******************** SEQUENCE *********************/
  createSequenceScript: async ( { commit } ) => {
    const rsCreateSequence = await SequenceService.createNewSequence();
    commit("setCreateSequenceScript", rsCreateSequence.data.data);

    const rsGetAllSequence = await SequenceService.getAllSequence();
    commit("setAllSequenceScript", rsGetAllSequence.data.data);
  },
  // get id a sequence
  getSequenceById: async ( { commit }, payload ) => {
    const rsGetSequenceById = await SequenceService.getSequenceById( payload._id );
    commit("setSequenceById", rsGetSequenceById.data.data);
  },

  // get all sequence
  getAllSequenceScript: async ( { commit } ) => {
    const rsGetAllSequence = await SequenceService.getAllSequence();
    commit("setAllSequenceScript", rsGetAllSequence.data.data);
  },

  // delete a sequence
  deleteASequence: async ( { commit }, payload ) => {
    await SequenceService.deleteASequence( payload );
    const rsGetAllSequence = await SequenceService.getAllSequence();
    commit("setAllSequenceScript", rsGetAllSequence.data.data);
  },

  // updata a sequence
  updateSequence: async ( { commit }, payload ) => {
    await SequenceService.updateSequence( payload._id, payload);
    const rsGetAllSequence = await SequenceService.getAllSequence();
  },

  // create new block in sequence
  createBlockInSequence: async ( { commit }, payload ) => {
    const rsCreateBlockInSequence = await SequenceService.createBlockInASequence( payload );

    const rsGetAllSequence = await SequenceService.getAllSequence();
    commit("setAllSequenceScript", rsGetAllSequence.data.data);
  },

  // get all block in a sequence
  getAllBlockInSequenceById: async ( { commit }, payload ) => {
    const rsAllBlockInSequence = await SequenceService.getAllBlockSequenceById( payload );
    commit("setAllBlockInSequenceById", rsAllBlockInSequence.data.data);
  },

  // Update number time Block on sequence
  updateNumberTimeItemSqc: async ({ commit }, payload) => {
    await SequenceService.updateTimeBlockSequence(
      payload.sqId,
      payload.blockId,
      payload.numberTime
    );
  },
  //Update description time block on sequence
  updateDescTimeItemSqc: async ({ commit }, payload) => {
    await SequenceService.updateDescTimeBlockSequence(
      payload.sqId,
      payload.blockId,
      payload.descTime
    );

    const rsGetAllSequence = await SequenceService.getAllSequence();
    commit("setAllSequenceScript", rsGetAllSequence.data.data);
  },

  // delete a block in sequence
  deleteBlockInSequence: async ( { commit }, payload ) => {
    await SequenceService.deleteBlockInSequence( payload.sqId, payload.blockId );

    const rsGetAllSequence = await SequenceService.getAllSequence();
    commit("setAllSequenceScript", rsGetAllSequence.data.data);
  }
};
export default {
  state,
  getters,
  mutations,
  actions
};
