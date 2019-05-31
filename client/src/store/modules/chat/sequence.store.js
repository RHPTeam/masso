import SequenceService from "@/services/modules/chat/sequence.service";
// import BlockServices from "@/services/modules/chat/block.service";

const state = {
  /******************** SEQUENCE *********************/
  allSequenceScript: [],
  idSequence: [],
  newBlockInSequence: [],
  allBlockInASequence: [],
  newSequenceScript: []
};
const getters = {
  /******************** SEQUENCE *********************/
  allSequenceScript: state => state.allSequenceScript,
  idSequence: state => state.idSequence,
  newBlockInSequence: state => state.newBlockInSequence,
  allBlockInASequence: state => state.allBlockInASequence,
  newSequenceScript: state => state.newSequenceScript
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
  setUpdateTimeBlockSequence: (state, payload) => {
    // state.
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
    // commit("setAllSequenceScript", rsGetAllSequence.data.data);
  },

  // create new block in sequence
  createBlockInSequence: async ( { commit }, payload ) => {
    const rsCreateBlockInSequence = await SequenceService.createBlockInASequence( payload );

    // commit("setCreateBlockInSequence", rsCreateBlockInSequence.data.data);
    // console.log("rsCreateBlockInSequence.data.data");
    // console.log(rsCreateBlockInSequence.data.data);
    const rsGetAllSequence = await SequenceService.getAllSequence();
    commit("setAllSequenceScript", rsGetAllSequence.data.data);
  },

  // get all block in a sequence 
  getAllBlockInSequence: async ( { commit }, payload ) => {
    console.log("Pay load getAllBlockInSequence");
    console.log(payload);
    const rsAllBlockInSequence = await SequenceService.getAllBlockSequenceById( payload );
    commit("setAllBlockInSequence", rsAllBlockInSequence.data.data);
  },

  // update time sequence
  updateTimeBlockSequence: async ( { commit }, payload ) => {
    console.log("payload");
    console.log(payload);

    SequenceService.updateTimeSequence(payload._id, payload.sequences._id, payload);
    
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
