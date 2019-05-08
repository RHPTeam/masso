
import GroupFacebookServices from "@/services/modules/groupfacebook.services";

const state = {
    facebookGroups: [],
    facebookGroupsStatus: ""
  },
  getters = {
    facebookGroups: ( s ) => {
      return s.facebookGroups;
    },
    facebookGroupsStatus: ( s ) => {
      return s.facebookGroupsStatus;
    }
  },
  mutations = {
    setFacebookGroups: ( s, payload ) => {
      s.facebookGroups = payload;
    },
    setFacebookGroupsStatus: ( s, payload ) => {
      s.facebookGroupsStatus = payload;
    }
  },
  actions = {
    getFacebookGroups: async ( { commit } ) => {
      commit( "setFacebookGroupsStatus", "loading" );
      await GroupFacebookServices.update();

      const res = await GroupFacebookServices.index();

      await commit( "setFacebookGroups", res.data.data );
      commit( "setFacebookGroupsStatus", "success" );
    }
  };

export default {
  state,
  getters,
  mutations,
  actions
};
