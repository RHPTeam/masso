import StaticCampaign from "@/services/modules/analytic.services";

const state = {
  sttStaticCampaign: "",
  allStaticCampaign: [],

  statusCampain: "",
  allAnalysis: [],

  statusNumberPost: "",
  allSttPost: []
};
const getters = {
  sttStaticCampaign: state => state.sttStaticCampaign,
  getAllStaticCampaign: state => state.allStaticCampaign,

  statusCampain: state  => state.statusCampain,
  allAnalysis: state  => state.allAnalysis,

  statusNumberPost: state => state.statusNumberPost,
  getAllSttPost: state => state.allSttPost
};
const mutations = {
  campaign_request: state => {
    state.sttStaticCampaign = 'loading';
  },
  campaign_success: state => {
    state.sttStaticCampaign = 'success';
  },
  setAllStaticCampaign: (state, payload) => {
    state.allStaticCampaign = payload;
  },

  status_request: state => {
    state.statusCampain = 'loading';
  },
  status_success: state => {
    state.statusCampain = 'success';
  },
  setAllAnalysis: (state, payload) => {
    state.allAnalysis = payload;
  },

  statusPost_request: state => {
    state.statusNumberPost = 'loading';
  },
  statusPost_success: state => {
    state.statusNumberPost = 'success';
  },
  setAllSttPost: (state, payload) => {
    state.allSttPost = payload;
  }

};
const actions = {
  getAllStaticCampagin: async ({commit}) => {
    commit('campaign_request');
    const resultSttStaticCampaign = await StaticCampaign.indexStaticCampaign();
    commit('setAllStaticCampaign', resultSttStaticCampaign.data.data);
    commit('campaign_success');
  },

  getAllAnalysis: async ({commit}) => {
    commit('status_request');
    const result = await StaticCampaign.indexStistic();
    commit( "setAllAnalysis", result.data.data );
    commit('status_success');
  },

  getAllSttPost: async ({ commit }) => {
    commit('statusPost_request');
    const resultPost = await StaticCampaign.indexStatisticPost();
    commit('setAllSttPost', resultPost.data.data);
    commit('statusPost_success');
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}
