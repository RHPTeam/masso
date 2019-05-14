import AdStaticServices from "@/services/modules/adstatic.services";

const state = {
  statusCampain: "",
  allAnalysis: []
};

const getters = {
  statusCampain: state  => state.statusCampain,
  allAnalysis: state  => state.allAnalysis
};

const mutations = {
  status_request: state => {
    state.statusCampain = 'loading';
  },
  status_success: state => {
    state.statusCampain = 'success';
  },
  setAllAnalysis: (state, payload) => {
    state.allAnalysis = payload;
  }
};

const actions = {
  getAllAnalysis: async ({commit}) => {
    commit('status_request');
    const result = await AdStaticServices.indexStistic();
    console.log(result.data.data);
    commit( "setAllAnalysis", result.data.data );
    commit('status_success');
  },

};

export default {
  state,
  getters,
  mutations,
  actions
};
