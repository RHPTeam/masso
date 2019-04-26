
import CampaignsServices from "@/services/modules/campaigns.services";

const state = {
    campaigns: [],
    campaignDetail: {}
  },
  getters = {
    campaigns: ( s ) => {
      return s.campaigns;
    },
    campaignDetail: ( s ) => {
      return s.campaignDetail;
    }
  },
  mutations = {
    createCampaign: ( s, payload ) => {
      s.campaigns.push( payload );
      s.campaignDetail = payload;
    },
    setCampaigns: ( s, payload ) => {
      s.campaigns = payload;
    },
    setCampaignDetail: ( s, payload ) => {
      s.campaignDetail = payload;
    }
  },
  actions = {
    createCampaign: async ( { commit }, payload ) => {
      const res = await CampaignsServices.create( payload );

      await commit( "createCampaign", res.data.data );
    },
    getAllCampaigns: async ( { commit } ) => {
      const campaigns = await CampaignsServices.index();

      await commit( "setCampaigns", campaigns.data.data );
    },
    getCampaignDetail: ( { commit }, payload ) => {
      commit( "setCampaignDetail", payload );
    }
  };

export default {
  state,
  getters,
  mutations,
  actions
};
