import VocateServices from "@/services/modules/chat/vocate.service";

const state = {
  allVocate: [],
  vocate: {},
  vocateDefault: {},
  vocateStatus: ""
};
const getters = {
  allVocate: state => state.allVocate,
  vocate: state => state.vocate,
  vocateDefault: state => state.vocateDefault,
  vocateStatus: state => state.vocateStatus
};
const mutations = {
  vocate_request: state => {
    state.vocateStatus = "loading";
  },
  vocate_success: state => {
    state.vocateStatus = "success";
  },
  setAllVocate: (state, payload) => {
    state.allVocate = payload
  },
  setVocate: (state, payload) => {
    state.vocate = payload
  },
  setVocateDefault: (state, payload) => {
    state.vocateDefault = payload;
  }
};
const actions = {
  createVocate: async ({commit}, payload) => {
    commit("vocate_request");
    await VocateServices.createVocate(payload);
    const result = await VocateServices.getAllVocate();
    commit("setAllVocate", result.data.data);
    commit("vocate_success");
  },
  getAllVocate: async ({commit}) => {
    commit("vocate_request");
    const result = await VocateServices.getAllVocate();
    commit("setAllVocate", result.data.data);
    commit("vocate_success");
  },
  getVocateById: async ({commit}, payload) => {
    commit("vocate_request");
    const result = await VocateServices.getVocateById(payload);
    commit("setVocate", result.data.data);
    commit("vocate_success");
  },
  setVocateDefault: async ({commit}, payload) => {
    commit("setVocateDefault", payload);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}
