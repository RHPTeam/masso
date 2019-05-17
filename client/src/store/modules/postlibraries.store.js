import PostLibrariesServices from "@/services/modules/postlibraries.services";

const state = {
  allPostLibraries: [],
  newPostLibraries: [],
  postLibraries: [],
  statusLib: ""
};
const getters = {
  allPostLibraries: state => state.allPostLibraries,
  newPostLibraries: state => state.newPostLibraries,
  postLibraries: state => state.postLibraries,
  statusLib: state => state.statusLib
};
const mutations = {
  lib_request: state => {
    state.statusLib = 'loading';
  },
  lib_success: state => {
    state.statusLib = 'success';
  },
  setAllPostLibraries: ( state, payload) => {
    state.allPostLibraries =  payload;
  },
  setNewPostLibraries: (state, payload) => {
    state.newPostLibraries = payload;
  },
  setPostLibraries: (state, payload) => {
    state.postLibraries = payload;
  }
};
const actions = {
  createNewPostLibraries: async ( {commit}, payload ) => {
    commit( "lib_request" );
    const result = await PostLibrariesServices.create( payload );
    commit( "setNewPostLibraries", result.data.data );
    commit( "lib_success" );
  },
  getAllPostLibraries: async ( { commit } ) => {
    commit( "lib_request" );
    const result = await PostLibrariesServices.index();
    console.log(result.data.data);
    commit( "setAllPostLibraries", result.data.data );
    commit( "lib_success" );
  },
  getPostLibrariesById: async ( { commit }, payload ) => {
    commit( "post_request" );
    const result = await PostLibrariesServices.getById( payload );
    commit( "setPostLibraries", result.data.data );
    commit( "post_success" );
  },
  updatePostLibraries: async ( { commit }, payload ) => {
    commit( "post_request" );
    await PostLibrariesServices.updatePost( payload.postId, payload.content );
    const resultUpdate = await PostLibrariesServices.index();
    commit ( "setAllPostLibraries", resultUpdate.data.data);
    commit( "post_success" );
  },
  updateAttachmentPostLibraries: async ( { commit }, payload ) => {
    await PostLibrariesServices.updateAttachmentPost( payload.id, payload.formData );
    const result = await PostLibrariesServices.getById( payload.id );
    commit( "setPostLibraries", result.data.data );
  },
  deletePostLibrariesFacebook: async ( { commit }, payload ) => {
    await PostLibrariesServices.deletePostFacebook(payload);
    const result = await PostLibrariesServices.index();
    commit( "setAllPostLibraries", result.data.data );
  },
  deleteItemAttachmentLibraries: async ( { commit }, payload ) => {
    await PostLibrariesServices.deleteItemAttachment( payload.postId, payload.attachmentId );
    const result = await PostLibrariesServices.getById( payload.postId );
    commit( "setPostLibraries", result.data.data );
    const results = await PostLibrariesServices.index();
    commit( "setAllPostLibraries", results.data.data );
  },
  searchPostFromLibrariesByKey: async ( { commit }, payload ) => {
    commit( "post_request" );
    const result = await PostLibrariesServices.searchPostFromLibararies( payload.key, payload.size );
    console.log(result.data.data.results);
    commit( "setAllPostLibraries", result.data.data.results );
    commit( "post_success" );
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}
