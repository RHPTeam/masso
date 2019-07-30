const state = {
  caseControl: {
    messenger: false,
    color: false,
    new: false
  }
};
const getters = {
  caseControl: state => state.caseControl
};
const mutations = {
  setVariableControl: (state, payload) => {
    state.caseControl[ payload.key ] = payload.value;
  }
};
const actions = {
  setVariableControl: async ({commit}, payload) => {
    commit("setVariableControl", payload);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}
