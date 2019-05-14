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
    await PostLibrariesServices.updatePost( payload._id, payload );
    const result = await PostLibrariesServices.getById( payload._id );
    commit( "setPostLibraries", result.data.data );
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
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}
