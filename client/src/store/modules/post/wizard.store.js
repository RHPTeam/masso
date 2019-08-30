const state = {
  isShowWizard: false,
  finishedStep: '',
};
const getters = {
  finishedStep: (state) => state.finishedStep,
  isShowWizard: (state) => state.isShowWizard
};
const mutations = {
  setFinishedStep: (state, payload) => {
    state.finishedStep = payload;
  },
  setisShowWizard: (state, payload) => {
    state.isShowWizard = payload;
  }
};
const actions = {
  updateFinishedStep: async ({ commit }, payload) => {
    commit('setFinishedStep', payload);
  },
  toggleWizard: async ({ commit }, payload) => {
    commit('setisShowWizard', payload);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
