/* eslint-disable camelcase */
/* eslint-disable no-shadow */
/* eslint-disable one-var */
import PostServices from "@/services/modules/post.services";

const state = {
  allPost: [],
  postOfCate: [],
  errorPost: "",
  statusPost: "",
  post: [],
  newPost: []
};
const getters = {
  statusPost: ( state ) => state.statusPost,
  allPost: ( state ) => state.allPost,
  post: ( state ) => state.post,
  newPost: ( state ) => state.newPost,
  errorPost: ( state ) => state.errorPost,
  postOfCate: ( state ) => state.postOfCate
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
  setError: ( state, payload ) => {
    state.errorPost = payload;
  },
  setNewPost: ( state, payload ) => {
    state.newPost = payload;
  },
  setPost: ( state, payload ) => {
    state.post = payload;
  },
  setPostByCate: ( state, payload ) => {
    state.setPostByCate = payload;
  }
};
const actions = {
  getAllPost: async ( { commit } ) => {
    commit( "post_request" );
    const resultAllPost = await PostServices.index();
    console.log(resultAllPost.data.data);
    commit( "setAllPost", resultAllPost.data.data );
    commit( "post_success" );
  },
  getPostById: async ( { commit }, payload ) => {
    commit( "post_request" );

    const resultPost = await PostServices.getById( payload );
    // console.log( resultPost.data.data );
    commit( "setPost", resultPost.data.data );
    commit( "post_success" );
  },
  getPostByCategories: async ( { commit }, payload ) => {
    commit( "post_request" );
    console.log(payload);
    const resultPost = await PostServices.getByCategories( payload );
    console.log(resultPost.data.data);
    commit( "setAllPost", resultPost.data.data );
    commit( "post_success" );
  },
  createNewPost: async ( { commit }, payload ) => {
    commit( "post_request" );
    const resultPostCreate = await PostServices.createNewPost( payload );

    commit( "setNewPost", resultPostCreate.data.data );

    commit( "post_success" );
  },
  updatePost: async ( { commit }, payload ) => {
    commit( "post_request" );
    await PostServices.updatePost( payload._id, payload );

    const resultPost = await PostServices.getById( payload._id );
    commit( "setPost", resultPost.data.data );

    commit( "post_success" );
  },
  updateAttachmentPost: async ( { commit }, payload ) => {
    // console.log(payload)
    await PostServices.updateAttachmentPost( payload.id, payload.formData );
    const resultPost = await PostServices.getById( payload.id );
    // console.log(resultPost.data.data);
    commit( "setPost", resultPost.data.data );
  },
  sendErrorUpdate: async ( { commit } ) => {
    // commit( "post_request" );
    commit( "setError", 'error' );
    // commit( "post_success" );
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
