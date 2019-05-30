import SequenceService from "@/services/modules/chat/sequence.service";
// import BlockServices from "@/services/modules/chat/block.service";

const state = {
  /******************** SEQUENCE *********************/
  allSequenceScript: [],
  idSequence: []
};
const getters = {
  /******************** SEQUENCE *********************/
  allSequenceScript: state => state.allSequenceScript,
  idSequence: state => state.idSequence
};
const mutations = {  
  /******************** SEQUENCE *********************/
  setAllSequenceScript: (state, payload) => {
    state.allSequenceScript = payload;
  },
  // set sequence by id
  setSequenceById: (state, payload) => {
    state.idSequence = payload;
  }
};
const actions = {
  /******************** SEQUENCE *********************/
  createSequenceScript: async ( { commit } ) => {
    const rsCreateSequence = await SequenceService.createNewSequence();
    commit("setCreateScript", rsCreateSequence.data.data);

    const rsGetAllSequence = await SequenceService.getAllSequence();
    commit("setAllSequenceScript", rsGetAllSequence.data.data);
  },
  // get id a sequence
  getSequenceById: async ( { commit }, payload ) => {
    const rsGetSequenceById = await SequenceService.getSequenceById( payload._id );
    commit("setSequenceById", rsGetSequenceById.data.data);
    console.log("rsGetSequenceById.data.data");
    console.log(rsGetSequenceById.data.data);
  },

  // get all sequence
  getAllSequenceScript: async ( { commit } ) => {
    const rsGetAllSequence = await SequenceService.getAllSequence();
    commit("setAllSequenceScript", rsGetAllSequence.data.data);
    console.log("rsGetAllSequence.data.data");
    console.log(rsGetAllSequence.data.data);
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
  }
};
export default {
  state,
  getters,
  mutations,
  actions
};
