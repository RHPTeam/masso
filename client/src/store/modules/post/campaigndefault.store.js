import CampaignDefaultService from "@/services/modules/post/campaigndefault.service";

const state = {
  campSimple: [],
  campStatus: ""
};
const getters = {
  campStatus: state => state.campStatus,
  campSimple: state => state.campSimple
};
const mutations = {
  camp_request: state => {
    state.campStatus = "loading";
  },
  camp_success: state => {
    state.campStatus = "success";
  },
  setCampaignSimple: (state, payload) => {
    state.campSimple = payload;
  }
};
const actions = {
  getCampaignSimple: async ({commit}) => {
    commit("camp_request");
    const result = await CampaignDefaultService.index();
    commit("setCampaignSimple", result.data.data);
    commit("camp_success");
  },
  duplicateCampaignSimple: async ({commit}, payload) => {
    commit("camp_request");
    const objSender = {
      facebookId: payload.facebookId
    };
    await CampaignDefaultService.duplicateCampaign(payload.campaignId, objSender);
    commit("camp_success");
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}
