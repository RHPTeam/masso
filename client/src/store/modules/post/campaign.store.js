
import CampaignsServices from "@/services/modules/post/campaign.service";

const state = {
    allCampaigns: [],
    campaigns: [],
    campaignDetail: {},
    campaignsPagesSize: 1
  },
  getters = {
    allCampaigns: ( s ) => {
      return s.allCampaigns.reverse();
    },
    campaigns: ( s ) => {
      return s.campaigns;
    },
    campaignDetail: ( s ) => {
      return s.campaignDetail;
    },
    campaignsPagesSize: ( s ) => {
      return s.campaignsPagesSize;
    }
  },
  mutations = {
    createCampaign: ( s, payload ) => {
      s.campaigns.push( payload );
      s.campaignDetail = payload;
    },
    setAllCampaigns: ( s, payload ) => {
      s.allCampaigns = payload;
    },
    setCampaigns: ( s, payload ) => {
      s.campaigns = payload;
    },
    setCampaignDetail: ( s, payload ) => {
      s.campaignDetail = payload;
    },
    setCampaignsPagesSize: ( s, payload ) => {
      s.campaignsPagesSize = payload;
    }
  },
  actions = {
    createCampaign: async ( { commit }, payload ) => {
      const res = await CampaignsServices.create( payload );

      await commit( "createCampaign", res.data.data );
    },
    deleteCampaign: async ( { commit }, payload ) => {
      const campaigns = state.campaigns.filter(
        ( campaign ) => campaign._id !== payload.id
      );

      let res;

      commit( "setCampaigns", campaigns );
      commit( "setCampaignsPagesSize", campaigns.length );

      await CampaignsServices.delete( payload.id );

      res = await CampaignsServices.getCampaignsByPage( payload.size, payload.page );
      await commit( "setCampaigns", res.data.data.results );
      await commit( "setCampaignsPagesSize", res.data.data.page );
    },
    duplicateCampaign: async ( { commit }, payload ) => {
      const res = await CampaignsServices.duplicate( payload );
      await commit( "setCampaignDetail", res.data.data );
    },
    getAllCampaigns: async ( { commit } ) => {
      const res = await CampaignsServices.index();

      await commit( "setAllCampaigns", res.data.data );
    },
    getCampaignsByPage: async ( { commit }, payload ) => {
      const res = await CampaignsServices.getCampaignsByPage( payload.size, payload.page );

      await commit( "setCampaigns", res.data.data.results );
      await commit( "setCampaignsPagesSize", res.data.data.page );
    },
    getCampaignDetail: async ( { commit }, payload ) => {
      const res = await CampaignsServices.getCampaignById( payload );

      await commit( "setCampaignDetail", res.data.data );
    },
    updateCampaignDetail: async ( { commit }, payload ) => {
      await CampaignsServices.updateCampaign( payload );
      // Get campaign detail
      const res = await CampaignsServices.getCampaignById( payload.campId );
      await commit( "setCampaignDetail", res.data.data );
    },
    updateCampaignStatus: async ( { commit }, payload ) => {
      const res = await CampaignsServices.updateStatus( payload );
      await commit( "setCampaignDetail", res.data.data );

      const result = await CampaignsServices.index();
      await commit( "setAllCampaigns", result.data.data );
    },
  };

export default {
  state,
  getters,
  mutations,
  actions
};
