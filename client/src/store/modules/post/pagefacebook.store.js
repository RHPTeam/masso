import PageFacebookServices from "@/services/modules/post/pagefacebook.service";

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

      const res = await PageFacebookServices.index1();

      await commit( "setFacebookPages", res.data.data );
      commit( "setFacebookPagesStatus", "success" );

    },
    updateFacebookPages: () => {
      PageFacebookServices.update();
    }
  };

export default {
  state,
  getters,
  mutations,
  actions
};
