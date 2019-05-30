import PostServices from "@/services/modules/post/post.service";
import RemoveFunction  from "@/utils/functions/array";

const state = {
  allPost: [],
  errorPost: "",
  newPost: [],
  post: {
    color: "",
    place: {
      id: "",
      text: ""
    }
  },
  postOfCate: [],
  postsPage: [],
  postsPageSize: 1,
  statusPost: ""
};
const getters = {
  allPost: ( state ) => state.allPost,
  errorPost: ( state ) => state.errorPost,
  newPost: ( state ) => state.newPost,
  post: ( state ) => state.post,
  postOfCate: ( state ) => state.postOfCate,
  postsPage: ( state ) => state.postsPage,
  postsPageSize: ( state ) => state.postsPageSize,
  statusPost: ( state ) => state.statusPost,
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
  set_post: ( state, payload ) => {
    state.post[ payload.key ] = payload.value;
  },
  set_post_array: ( state, payload ) => {
    state.post[ payload.key ] =  payload.value;
    state.post[ payload.key ] = RemoveFunction.removeDuplicateObjectInArray(payload.value, "uid");
  },
  set_post_remove: ( state, payload) => {
    delete state.post[ payload.key ];
  },
  setPostByCate: ( state, payload ) => {
    state.setPostByCate = payload;
  },
  setPostsPage: ( state, payload ) => {
    state.postsPage = payload;
  },
  setPostsPageSize: ( state, payload ) => {
    state.postsPageSize = payload;
  }
};
const actions = {
  createNewPost: async ( { commit }, payload ) => {
    commit( "post_request" );
    const resultPostCreate = await PostServices.createNewPost( payload );

    commit( "setNewPost", resultPostCreate.data.data );

    commit( "post_success" );
  },
  deletePost: async ( { commit }, payload ) => {
    const posts = state.postsPage.filter( ( post ) => {
      return post._id = payload.id;
    } );

    let res;

    await commit( "setPostsPage", posts );
    await commit( "setPostsPageSize", posts.length );

    await PostServices.deletePost( payload.id );

    res = await PostServices.getPostsByPage( payload.size, payload.page );
    await commit( "setPostsPage", res.data.data.results );
    await commit( "setPostsPageSize", res.data.data.page );
  },
  getAllPost: async ( { commit } ) => {
    commit( "post_request" );
    const resultAllPost = await PostServices.index1();
    commit( "setAllPost", resultAllPost.data.data );
    commit( "post_success" );
  },
  getPostById: async ( { commit }, payload ) => {
    commit( "post_request" );

    const resultPost = await PostServices.getById( payload );
    commit( "setPost", resultPost.data.data );
    commit( "post_success" );
  },
  getPostByCategories: async ( { commit }, payload ) => {
    commit( "post_request" );
    const resultPost = await PostServices.getByCategories( payload );
    commit( "setAllPost", resultPost.data.data );
    commit( "post_success" );
  },
  getPostsByPage: async ( { commit }, payload ) => {
    commit( "post_request" );

    const res = await PostServices.getPostsByPage( payload.size, payload.page );

    await commit( "setPostsPage", res.data.data.results );
    await commit( "setPostsPageSize", res.data.data.page );

    commit( "post_success" );
  },
  sendErrorUpdate: async ( { commit } ) => {
    // commit( "post_request" );
    commit( "setError", 'errors.js' );
    // commit( "post_success" );
  },
  setPostDefault: async ({ commit }, payload) => {
    commit("set_post", payload)
  },
  setPostArray: async ({commit}, payload) => {
    commit("set_post_array", payload);
  },
  setPostRemove: ( { commit }, payload ) => {
    commit( "set_post_remove", payload );
  },
  updatePost: async ( { commit }, payload ) => {
    commit( "post_request" );

    await PostServices.updatePost( payload._id, payload );

    const resultPost = await PostServices.index1();
    commit( "setAllPost", resultPost.data.data );

    commit( "post_success" );
  },
  updatePostColor: async ( { commit }, payload ) => {
    commit( "post_request" );

    await PostServices.updatePost( payload._id, payload );

    const resultPostById = await PostServices.getById( payload._id );
    commit( "setPost", resultPostById.data.data );

    const resultPost = await PostServices.index1();
    commit( "setAllPost", resultPost.data.data );

    commit( "post_success" );
  },
  updateAttachmentPost: async ( { commit }, payload ) => {
    await PostServices.updateAttachmentPost( payload.id, payload.formData );
    const resultPost = await PostServices.getById( payload.id );
    commit( "setPost", resultPost.data.data );
  },
  deleteAttachmentPost: async ( { commit }, payload ) => {
    await PostServices.deleteAttachmentPost(payload.postId, payload.attachmentId);
    const resultPost = await PostServices.getById( payload.postId );
    commit( "setPost", resultPost.data.data );
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
