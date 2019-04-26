
import CampaignsServices from "@/services/modules/campaigns.services";

const state = {
    campaigns: []
  },
  getters = {
    campaigns: ( s ) => {
      return s.campaigns;
    }
  },
  mutations = {
    setCampaigns: ( s, payload ) => {
      s.campaigns = payload;
    }
  },
  actions = {
    getAllCampaigns: async ( { commit } ) => {
      const campaigns = await CampaignsServices.index();
      
      await commit( "setCampaigns", campaigns.data.data );
    }
  };

export default {
  state,
  getters,
  mutations,
  actions
};
