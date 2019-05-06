
import PageFacebookServices from "@/services/modules/pagefacebook.services";

const state = {
    facebookPages: [],
    facebookPagesStatus: "",
  },
  getters = {
    facebookPages: ( s ) => {
      return s.facebookPages;
    },
    facebookPagesStatus: ( s ) => {
      return s.facebookPagesStatus;
    }
  },
  mutations = {
    setFacebookPages: ( s, payload ) => {
      s.facebookPages = payload;
    },
    setFacebookPagesStatus: ( s, payload ) => {
      s.facebookPagesStatus = payload;
    }
  },
  actions = {
    getFacebookPages: async ( { commit } ) => {
      commit( "setFacebookPagesStatus", "loading" );
      await PageFacebookServices.update();

      const res = await PageFacebookServices.index();

      await commit( "setFacebookPages", res.data.data );
      commit( "setFacebookPagesStatus", "success" );

    }
  };

export default {
  state,
  getters,
  mutations,
  actions
};
