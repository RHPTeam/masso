import FeedServices from "@/services/modules/post/feed.service";
import PostFacebookService from "@/services/modules/post/postfacebook.service";

const state = {
  allPostLibraries: [],
  newPostLibraries: [],
  postLibraries: [],
  postSearch: [],
  statusLib: ""
};
const getters = {
  allPostLibraries: state => state.allPostLibraries,
  newPostLibraries: state => state.newPostLibraries,
  postLibraries: state => state.postLibraries,
  postSearch: state => state.postSearch,
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
  },
  setPostSearchFromLibraries: (state, payload) => {
    state.postSearch = payload;
  }
};
const actions = {
  createNewPostLibraries: async ( {commit}, payload ) => {
    commit( "lib_request" );

    const result = await FeedServices.create( payload );
    commit( "setNewPostLibraries", result.data.data );

    const resultUpdate = await FeedServices.index();
    commit ( "setAllPostLibraries", resultUpdate.data.data);

    commit( "lib_success" );
  },
  getAllPostLibraries: async ( { commit } ) => {
    commit( "lib_request" );

    const result = await FeedServices.index();
    commit( "setAllPostLibraries", result.data.data );

    commit( "lib_success" );
  },
  getPostLibrariesById: async ( { commit }, payload ) => {
    commit( "post_request" );

    const result = await FeedServices.getById( payload );
    commit( "setPostLibraries", result.data.data );

    commit( "post_success" );
  },
  updatePostLibraries: async ( { commit }, payload ) => {
    commit( "post_request" );
    await FeedServices.updatePost(
      payload.postId,
      payload.content
    );
    const result = await FeedServices.getById( payload.postId );
    commit( "setPostLibraries", result.data.data );

    const resultUpdate = await FeedServices.index();
    commit ( "setAllPostLibraries", resultUpdate.data.data);

    commit( "post_success" );
  },
  updateAttachmentPostLibraries: async ( { commit }, payload ) => {
    await FeedServices.updateAttachmentPost(
      payload.id,
      payload.formData
    );

    const result = await FeedServices.getById( payload.id );
    commit( "setPostLibraries", result.data.data );

    const resultUpdate = await FeedServices.index();
    commit ( "setAllPostLibraries", resultUpdate.data.data);
  },
  deletePostLibrariesFacebook: async ( { commit }, payload ) => {
    await FeedServices.deletePostFacebook(payload);
    const result = await FeedServices.index1();
    commit( "setAllPostLibraries", result.data.data );
  },
  deleteItemAttachmentLibraries: async ( { commit }, payload ) => {
    await FeedServices.deleteItemAttachment(
      payload.postId,
      payload.attachmentId
    );
    const result = await FeedServices.getById( payload.postId );
    commit( "setPostLibraries", result.data.data );

    const results = await FeedServices.index();
    commit( "setAllPostLibraries", results.data.data );
  },
  searchPostFromLibrariesByKey: async ( { commit }, payload ) => {
    commit( "post_request" );
    const result = await FeedServices.searchPostFromLibararies(
      payload.key,
      payload.size
    );
    commit( "setAllPostLibraries", result.data.data.results );
    commit( "post_success" );
  },
  searchPostFromLibrariesByPage: async ( { commit }, payload ) => {
    commit( "post_request" );
    const result = await PostFacebookService.searchByKeyword(
      payload.key,
      payload.size,
      payload.page
    );

    commit( "setPostSearchFromLibraries", result.data.data );
    commit( "post_success" );
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}
