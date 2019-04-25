/* eslint-disable camelcase */
/* eslint-disable no-shadow */
/* eslint-disable one-var */
import PostServices from "@/services/modules/post.services";

const state = {
    statusPost: "",
    post: []
  },
  getters = {
    statusPost: ( state ) => state.statusPost,
    post: ( state ) => state.post
  },
  mutations = {
    post_request: ( state ) => {
      state.statusPost = "loading";
    },
    post_success: ( state ) => {
      state.statusPost = "success";
    },
    setPost: ( state, payload ) => {
      state.post = payload;
    }
  },
  actions = {
    getAllPost: async ( { commit } ) => {
      commit( "post_request" );

      const resultAllPost = await PostServices.index();

      commit( "setPost", resultAllPost.data.data );
      commit( "post_success" );
    },
    createNewPost: async ( { commit }, payload ) => {
      commit( "post_request" );
      const resultPostCreate = await PostServices.createNewPost( payload );

      commit( "setPost", resultPostCreate.data.data );
      const result = await PostServices.index();

      commit( "setPost", result.data.data );
      commit( "post_success" );
    }
  };

export default {
  state,
  getters,
  mutations,
  actions
};
