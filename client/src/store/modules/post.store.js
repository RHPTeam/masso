/* eslint-disable camelcase */
/* eslint-disable no-shadow */
/* eslint-disable one-var */
import PostServices from "@/services/modules/post.services";

const state = {
  allPost: [],
  statusPost: "",
  post: [],
  newPost: []
};
const getters = {
  statusPost: ( state ) => state.statusPost,
  allPost: ( state ) => state.allPost,
  post: ( state ) => state.post,
  newPost: ( state ) => state.newPost
};
const mutations = {
  post_request: ( state ) => {
    state.statusPost = "loading";
  },
  post_success: ( state ) => {
    state.statusPost = "success";
  },
  setAllPost: ( state, payload ) => {
    state.allPost = payload;
  },
  setNewPost: ( state, payload ) => {
    state.newPost = payload;
  },
  setPost: ( state, payload ) => {
    state.post = payload;
  }
};
const actions = {
  getAllPost: async ( { commit } ) => {
    commit( "post_request" );

    const resultAllPost = await PostServices.index();

    commit( "setAllPost", resultAllPost.data.data );
    commit( "post_success" );
  },
  createNewPost: async ( { commit }, payload ) => {
    commit( "post_request" );
    const resultPostCreate = await PostServices.createNewPost( payload );

    commit( "setNewPost", resultPostCreate.data.data );

    commit( "post_success" );
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
