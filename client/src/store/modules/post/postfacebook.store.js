import PostFacebookService from "@/services/modules/post/postfacebook.service";

const state = {
  allPostsFacebook: [],
  postsFacebookByKey: [],
};
const getters = {
  allPostsFacebook: state => state.allPostsFacebook,
  postsFacebookByKey: state => state.postsFacebookByKey,
};
const mutations = {
  setAllPostsFacebook: ( state, payload ) => {
    state.allPostsFacebook = payload;
  },
  setPostsFacebookByKey: ( state, payload ) => {
    state.postsFacebookByKey = payload;
  }
};
const actions = {
  getAllPostFacebook: async ( { commit } ) => {
    const res = await  PostFacebookService.index();
    commit( "setAllPostsFacebook", res.data.data );
  },
  searchPostsFacebookByKey: async ( { commit }, payload ) => {
    const result = await PostFacebookService.searchByKeyword(
      payload.key,
      payload.size,
      payload.page
    );
    commit( "setPostsFacebookByKey", result.data.data );
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}
