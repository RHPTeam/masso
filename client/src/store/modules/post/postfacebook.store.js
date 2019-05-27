import PostFacebookService from "@/services/modules/post/postfacebook.service";

const state = {
  allPostsFacebook: [],
  postsFacebookByKey: [],
  postPush: []
};
const getters = {
  allPostsFacebook: state => state.allPostsFacebook,
  postsFacebookByKey: state => state.postsFacebookByKey,
  postPush: state => state.postPush
};
const mutations = {
  setAllPostsFacebook: ( state, payload ) => {
    state.allPostsFacebook = payload;
  },
  setPostsFacebookByKey: ( state, payload ) => {
    state.postsFacebookByKey = payload;
  },
  setPostPush: (state, payload) => {
    payload.map(item => {
      state.postPush.push(item);
    })
    // state.postPush.concat(payload);
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
    console.log(result.data.data);
    commit("setPostPush", result.data.data.results);
    commit( "setPostsFacebookByKey", result.data.data );
  },
  setPostSearchDefault: async ({ commit }, payload) => {
    commit("set_push_post", payload);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}
