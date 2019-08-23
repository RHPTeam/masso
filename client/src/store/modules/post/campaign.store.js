
import CampaignsServices from "@/services/modules/post/campaign.service";

const state = {
    allCampaigns: [],
    campaigns: [],
    campaignsMobile: [],
    campaignDetail: {},
    campaignsPagesSize: 1,
    campaignStatus: "",
    variableControlCampaign: 0,
    variableCampaign: 0
  },
  getters = {
    allCampaigns: ( s ) => {
      return s.allCampaigns.reverse();
    },
    campaigns: ( s ) => {
      return s.campaigns;
    },
    campaignsMobile: state => state.campaignsMobile,
    campaignDetail: ( s ) => {
      return s.campaignDetail;
    },
    campaignsPagesSize: ( s ) => {
      return s.campaignsPagesSize;
    },
    campaignStatus: ( s ) => {
      return s.campaignStatus;
    },
    variableControlCampaign: state => state.variableControlCampaign,
    variableCampaign: state => state.variableCampaign
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
    setCampaignsSearch: (s, payload) => {
      s.campaignsMobile = payload;
    },
    setCampaignsByKeyMobile: (state, payload) => {
      state.campaignsMobile = payload;
    },
    // concat campaign to load more
    setCampaignsMobile: (state, payload) => {
      state.campaigns = state.campaigns.concat(payload);
    },
    setCampaignDetail: ( s, payload ) => {
      s.campaignDetail = payload;
    },
    setCampaignsPagesSize: ( s, payload ) => {
      s.campaignsPagesSize = payload;
    },
    setCampaignStatus: ( s, payload ) => {
      s.campaignStatus = payload;
    },
    setVariableControl: (state, payload) => {
      state.variableControlCampaign = payload;
    },
    setVariableCampaign: (state, payload) => {
      state.variableCampaign = payload;
    }
  },
  actions = {
    createCampaign: async ( { commit }, payload ) => {
      const res = await CampaignsServices.create( payload );

      await commit( "createCampaign", res.data.data );
    },
    /**
     *
     * @param commit object contain have id differen payload
     * @param payload is id campaign
     * @returns {Array}
     */
    deleteCampaign: async ( { commit }, payload ) => {
      const campaigns = state.campaigns.filter(
        ( campaign ) => campaign._id !== payload
      );

      let res;

      commit( "setCampaigns", campaigns );
      commit( "setCampaignsPagesSize", campaigns.length );

      await CampaignsServices.delete( payload );
    },
    // Delete campaign and get totals page = campage.page for mobile
    deleteCampaignMobile: async ( { commit }, payload ) => {
      const campaigns = state.campaigns.filter(
        ( campaign ) => campaign._id !== payload.id
      );

      let res;

      commit( "setCampaigns", campaigns );

      await CampaignsServices.delete( payload.id );
    },
    // mobile: delete when search
    deleteCampaignMobileWhenSearch: async ( { commit }, payload ) => {
      const campaigns = state.campaignsMobile.filter(
        ( campaign ) => campaign._id !== payload.id
      );

      let res;

      commit( "setCampaignsSearch", campaigns );

      await CampaignsServices.delete( payload.id );
    },
    duplicateCampaign: async ( { commit }, payload ) => {
      const res = await CampaignsServices.duplicate( payload );
      await commit( "setCampaignDetail", res.data.data );
    },
    getAllCampaigns: async ( { commit } ) => {
      commit ( "setCampaignStatus", "loading" );

      const res = await CampaignsServices.index();
      await commit( "setAllCampaigns", res.data.data );

      commit ( "setCampaignStatus", "success" );
    },
    getCampaignsByPage: async ( { commit }, payload ) => {
      commit ( "setCampaignStatus", "loading" );

      const res = await CampaignsServices.getCampaignsByPage( payload.size, payload.page );

      await commit( "setCampaigns", res.data.data.results );
      await commit( "setCampaignsPagesSize", res.data.data.page );

      commit ( "setCampaignStatus", "success" );
    },
    // Get campaign and concat campaign for mobile
    getCampaignsByPageMobile: async ( { commit }, payload ) => {
      commit ( "setCampaignStatus", "loading" );

      const res = await CampaignsServices.getCampaignsByPage( payload.size, payload.page );

      await commit( "setCampaignsMobile", res.data.data.results );
      await commit( "setCampaignsPagesSize", res.data.data.page );

      commit ( "setCampaignStatus", "success" );
    },
    getCampaignsByPageWithStatus: async ( { commit }, payload ) => {
      commit ( "setCampaignStatus", "loading" );

      const res = await CampaignsServices.getCampaignsByPage( payload.size, payload.page );

      await commit( "setCampaigns", res.data.data.results );
      await commit( "setCampaignsPagesSize", res.data.data.page );

      commit ( "setCampaignStatus", "success" );
    },
    getCampaignsByKey: async ( { commit }, payload ) => {
      commit ( "setCampaignStatus", "loading" );

      const res = await CampaignsServices.searchCampaignsByKey( payload.keyword, payload.size, payload.page );

      await commit( "setCampaigns", res.data.data.results );
      await commit( "setCampaignsPagesSize", res.data.data.page );

      commit ( "setCampaignStatus", "success" );
    },
    // search mobile: get campaign by key
    getCampaignsByKeyMobile: async ( { commit }, payload ) => {
      commit ( "setCampaignStatus", "loading" );

      const res = await CampaignsServices.searchCampaignsByKey( payload.keyword, payload.size, payload.page );

      await commit( "setCampaignsByKeyMobile", res.data.data.results );

      commit ( "setCampaignStatus", "success" );
    },
    getCampaignDetail: async ( { commit }, payload ) => {
      const res = await CampaignsServices.getCampaignById( payload );
      await commit( "setCampaignDetail", res.data.data );
    },
    updateCampaignDetail: async ( { commit }, payload ) => {
      const res = await CampaignsServices.updateCampaign( payload );
      await commit( "setCampaignDetail", res.data.data );
    },
    updateCampaignStatus: async ( { commit }, payload ) => {
      const res = await CampaignsServices.updateStatus( payload );
      await commit( "setCampaignDetail", res.data.data );
    },
    setCampainControl: async ({commit}, payload) => {
      await commit("setVariableControl", payload);
    },
    setVariableDuplicateCampaign: async ({commit}, payload) => {
      await commit("setVariableCampaign", payload);
    }
  };

export default {
  state,
  getters,
  mutations,
  actions
};
