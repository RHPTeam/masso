import PostServices from "@/services/modules/post/post.service";
import CategoryDefaultService from "@/services/modules/post/categorydefault.service";
import RemoveFunction  from "@/utils/functions/array";

const state = {
  allPost: [],
  allPostSearchMobile: [],
  errorPost: "",
  newPost: [],
  defaultPost: {
    title: "",
    content: "",
    _categories: [],
    attachments: [],
    place: "",
    tags: [],
    activity: "",
    color: ""
  },
  post: {
    color: {
      id: "",
      value: ""
    },
    place: {
      id: "",
      text: ""
    }
  },
  postAttachmentsUpload: [],
  postsFilterByCategory: [],
  postOfCate: [],
  postsPage: [],
  postsPageMobile: [],
  postsPageInfinite: [],
  postsPageSize: 1,
  postsPageSizeFilter: 1,
  statusPost: "",
  statusOnePost: "",
  totalPost: null,
  newestPost: [],
  infoPostCateDefault: 0,
  statusPostCateDefault: "",
  titleCategory: "",
  idCategoryToLoadMore: "",
  postsPageSizeSearch: 1
};
const getters = {
  allPost: ( state ) => state.allPost,
  allPostSearchMobile: state => state.allPostSearchMobile,
  errorPost: ( state ) => state.errorPost,
  defaultPost: ( state ) => state.defaultPost,
  newPost: ( state ) => state.newPost,
  post: ( state ) => state.post,
  postAttachmentsUpload: ( state ) => state.postAttachmentsUpload,
  postsFilterByCategory: state => state.postsFilterByCategory,
  postOfCate: ( state ) => state.postOfCate,
  postsPage: ( state ) => state.postsPage,
  postsPageMobile: (state) => state.postsPageMobile,
  postsPageInfinite: ( state ) => state.postsPageInfinite,
  postsPageSize: ( state ) => state.postsPageSize,
  postsPageSizeFilter: state => state.postsPageSizeFilter,
  statusPost: ( state ) => state.statusPost,
  statusOnePost: ( state ) => state.statusOnePost,
  totalPost: ( state ) => state.totalPost,
  newestPost: state => state.newestPost,
  infoPostCateDefault: state => state.infoPostCateDefault,
  statusPostCateDefault: state => state.statusPostCateDefault,
  titleCategory: state => state.titleCategory,
  idCategoryToLoadMore: state => state.idCategoryToLoadMore,
  postsPageSizeSearch: state => state.postsPageSizeSearch
};
const mutations = {
  post_request: ( state ) => {
    state.statusPost = "loading";
  },
  post_request_success: (state, payload) => {
    state.statusOnePost = payload
  },
  post_success: ( state ) => {
    state.statusPost = "success";
  },
  post_cate_default_request: (state, payload) => {
    state.statusPostCateDefault = payload;
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
  setPostAttachmentsUpload: ( state, payload ) => {
    state.postAttachmentsUpload = payload;
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
    state.allPost = payload;
  },
  setPostsPageMobile: (state, payload) => {
    state.allPostSearchMobile = payload;
  },
  // mobile - search - load more
  setPostsPageMobileSearch: (state, payload) => {
    state.allPostSearchMobile = state.allPostSearchMobile.concat(payload);
  },
  setPostsPageInfinite: ( state, payload ) => {
    state.postsPageInfinite = state.postsPageInfinite.concat( payload );
  },
  setPostsPageSize: ( state, payload ) => {
    state.postsPageSize = payload;
  },
  setPostsPageSizeCreate: ( state, payload ) => {
    state.postsPageSize = payload;
  },
  // mobile
  setPostsPageSizeFilter: ( state, payload ) => {
    state.postsPageSizeFilter = payload;
  },
  setPostsPageSizeSearch: (state, payload) => {
    state.postsPageSizeSearch = payload;
  },
  setTotalPost: (state, payload) => {
    state.totalPost = payload;
  },
  setUpdatePost: (state, payload) => {
    //get index of post in all post then filter item
    const position = state.allPost.map((item,index) => {
      if (payload._id === item._id) return index;
    }).filter(item => item !== undefined)[0];

    state.allPost[position] = payload;
  },
  setDeletePost: (state, payload) => {
    state.allPost = payload;
  },
  // mobile
  setDeletePostSearch: (state, payload) => {
    state.allPostSearchMobile = payload;
  },
  // setNewestPost
  setNewestPost: (state, payload) => {
    state.newestPost = payload;
    state.allPost.push(payload);
  },
  setPostCateDefault: (state, payload) => {
    state.infoPostCateDefault = payload;
  },
  resetPostsPageInfinite: ( state, payload ) => {
    state.postsPageInfinite = payload;
  },
  updateDefaultPostByFbPost: ( state, payload ) => {
    state.defaultPost.content = payload.content;
    state.defaultPost.attachments = payload.attachments;
  },
  setPostsCategoryInfinite: (state, payload) => {
    state.postsPageInfinite = payload;
  },
  setTitleCategories: (state, payload) => {
    state.titleCategory = payload;
  },
  // set post by page to get number posts in that page
  setPostByPage: (state, payload) => {
    state.allPost = state.allPost.concat(payload);
    // state.allPost = [... new(state.allPost)];
  },
  // Mobile
  setPostsFilterByCategoryMobile: (state, payload) => {
    state.postsFilterByCategory = payload;
  },
  setPostsByCategoryToLoadMore: (state, payload) => {
    state.postsFilterByCategory = state.postsFilterByCategory.concat(payload);
  },
  setIdCategoryToLoadmore: (state, payload) => {
    state.idCategoryToLoadMore = payload;
  }
};
const actions = {
  createNewPost: async ( { commit }, payload ) => {
    commit( "post_request" );
    
    const resultPostCreate = await PostServices.createNewPost( payload );
    commit( "setNewPost", resultPostCreate.data.data );

    commit( "post_success" );
  },
  createPostByContent: async ( { commit }, payload ) => {
    const res = await PostServices.createPostByContent( payload );
    commit( "setNewPost", res.data.data );
  },
  deletePost: async ( { commit }, payload ) => {

    const allPost = state.allPost.filter(
      ( allPost ) => allPost._id !== payload.id
    );

    commit("setDeletePost", allPost);
    await PostServices.deletePost( payload.id );
  },
  // delete post when search for mobile
  deletePostSearch: async ( { commit }, payload ) => {

    const allPostSearchMobile = state.allPostSearchMobile.filter(
      ( allPostSearchMobile ) => allPostSearchMobile._id !== payload.id
    );

    commit("setDeletePostSearch", allPostSearchMobile);
    await PostServices.deletePost( payload.id );
  },
  getAllPost: async ( { commit } ) => {
    commit( "post_request" );
    const resultAllPost = await PostServices.index();
    commit( "setAllPost", resultAllPost.data.data );
    commit( "post_success" );
  },
  getPostById: async ( { commit }, payload ) => {
    commit( "post_request" );

    const resultPost = await PostServices.getById( payload );
    commit( "setPost", resultPost.data.data );

    commit("post_request_success", resultPost.data.status);
    commit( "post_success" );
  },
  getPostByCategories: async ( { commit }, payload ) => {
    commit( "post_request" );

    const res = await PostServices.getByCategories(
      payload.categoryId,
      payload.size,
      payload.page
    );
    await commit( "setPostsPage", res.data.data.results );
    await commit( "setPostsPageSize", res.data.data.page );
    await commit( "setTotalPost", res.data.data.total );

    commit( "post_success" );
  },
  // mobile ...
  getPostByCategoriesMobile: async ( { commit }, payload ) => {
    commit( "post_request" );

    const res = await PostServices.getByCategories(
      payload.categoryId,
      payload.size,
      payload.page
    );
    await commit( "setPostsFilterByCategoryMobile", res.data.data.results );
    await commit( "setPostsPageSizeFilter", res.data.data.page );
    await commit( "setIdCategoryToLoadmore", payload.categoryId );

    commit( "post_success" );
  },
  getPostByCategoriesLoadMoreMobile: async ( { commit }, payload ) => {
    commit( "post_request" );

    const res = await PostServices.getByCategories(
      payload.categoryId,
      payload.size,
      payload.page
    );
    await commit( "setPostsByCategoryToLoadMore", res.data.data.results );
    await commit( "setPostsPageSizeFilter", res.data.data.page );

    commit( "post_success" );
  },

  showPostCateDefaultById: async ({commit}, payload) => {
    commit("post_request");
    const result = await CategoryDefaultService.showInfoCateById(payload);
    commit( "setAllPost", result.data.data.postList );
    commit("post_success");
  },
  setPostCateDefault:async ({commit}, payload) => {
    commit("setPostCateDefault", payload);
  },
  showPostDuplicate: async ({commit}, payload) => {
    commit("cate_default_request");

    const result = await CategoryDefaultService.editPost(payload);

    commit("setPost", result.data.data);

    commit("post_cate_default_request", "success");

    commit("cate_default_success");
  },
  setTitleCate: async ({commit}, payload) => {
    commit("setTitleCategories", payload);
  },
  getPostsByPage: async ( { commit }, payload ) => {
    commit( "post_request" );

    const res = await PostServices.getPostsByPage( payload.size, payload.page );
    await commit( "setPostsPage", res.data.data.results );
    await commit( "setPostsPageSize", res.data.data.page );
    await commit( "setTotalPost", res.data.data.total );
    await commit( "setPostsPageInfinite", res.data.data.results );

    commit( "post_success" );
  },
  // get post by page to concat post to load more
  getPostsByPageMobile: async ( { commit }, payload ) => {
    commit( "post_request" );

    const res = await PostServices.getPostsByPage( payload.size, payload.page );
    await commit( "setPostByPage", res.data.data.results );
    await commit( "setPostsPageSize", res.data.data.page );
    await commit( "setTotalPost", res.data.data.total );
    // await commit( "setPostsPageInfinite", res.data.data.results );

    commit( "post_success" );
  },
  getPostsPageInfinite: async ( { commit }, payload ) => {
    commit( "post_request" );

    const res = await PostServices.getPostsByPage( payload.size, payload.page );
    await commit( "setPostsPageSize", res.data.data.page );
    await commit( "setPostsPageInfinite", res.data.data.results );

    commit( "post_success" );
  },
  getPostsPageInfiniteByKey: async ( { commit }, payload ) => {
    commit( "post_request" );

    const res = await PostServices.searchByKey(payload.keyword, payload.size, payload.page );
    await commit( "setPostsPageSize", res.data.data.page );
    await commit( "setPostsPageInfinite", res.data.data.results );

    commit( "post_success" );
  },
  getPostsPageInfiniteCategory: async ( { commit }, payload ) => {
    commit( "post_request" );
    const resultPost = await PostServices.getByCategories( payload );
    commit( "setPostsCategoryInfinite", resultPost.data.data );
    commit( "post_success" );
  },
  getPostsByKey: async ( { commit }, payload ) => {
    commit( "post_request" );

    const res = await PostServices.searchByKey( payload.keyword, payload.size, payload.page );

    await commit( "setPostsPage", res.data.data.results );
    await commit( "setPostsPageSize", res.data.data.page );
    await commit( "setPostsPageInfinite", res.data.data.results );

    commit( "post_success" );
  },
  // get post by key when search mobile
  getPostsByKeyMobile: async ( { commit }, payload ) => {
    commit( "post_request" );
    const res = await PostServices.searchByKey( payload.keyword, payload.size, payload.page );

    await commit( "setPostsPageMobile", res.data.data.results );
    await commit( "setPostsPageSizeSearch", res.data.data.page );
    
    commit( "post_success" );
  },
  getPostsByKeyMobileLoadMore: async ({commit}, payload) => {
    commit( "post_request" );
    const res = await PostServices.searchByKey( payload.keyword, payload.size, payload.page );

    await commit( "setPostsPageMobileSearch", res.data.data.results );
    await commit( "setPostsPageSizeSearch", res.data.data.page );
    
    commit( "post_success" );
  },
  resetPostsPageInfinite: async ( { commit } ) => {
    commit( "resetPostsPageInfinite", [] );
  },
  sendErrorUpdate: async ( { commit } ) => {
    // commit( "post_request" );
    commit( "setError", 'error' );
    // commit( "post_success" );
  },
  setPostDefault: async ({ commit }, payload) => {
    commit("set_post", payload);
  },
  setPostArray: async ({commit}, payload) => {
    commit("set_post_array", payload);
  },
  setPostRemove: ( { commit }, payload ) => {
    commit( "set_post_remove", payload );
  },
  setPageSizeDefault: async ({commit}, payload) => {
    await commit("setPostsPageSize", payload);
  },
  updatePost: async ( { commit }, payload ) => {
    commit( "post_request" );

    await PostServices.updatePost( payload._id, payload );

    const resultPostById = await PostServices.getById( payload._id );
    commit( "setPost", resultPostById.data.data );

    commit("setPost", payload);

    commit("setUpdatePost", payload);

    commit( "post_success" );
  },
  // Mobile: update dont get info
  updatePostMobile: async ( { commit }, payload ) => {
    commit( "post_request" );

    await PostServices.updatePost( payload._id, payload );

    // const resultPostById = await PostServices.getById( payload._id );
    // commit( "setPost", resultPostById.data.data );

    // commit("setPost", payload);

    commit("setUpdatePost", payload);

    commit( "post_success" );
  },
  updatePostColor: async ( { commit }, payload ) => {
    commit( "post_request" );
    await PostServices.updatePost( payload._id, payload );

    const resultPostById = await PostServices.getById( payload._id );
    commit( "setPost", resultPostById.data.data );

    commit("setPost", payload);

    commit("setUpdatePost", payload);

    commit( "post_success" );
  },
  updateAttachmentPost: async ( { commit }, payload ) => {
    await PostServices.updateAttachmentPost( payload.id, payload.formData );
    const resultPost = await PostServices.getById( payload.id );
    commit( "setPost", resultPost.data.data );
  },
  updateDefaultPostByFbPost: async ( { commit }, payload ) => {
    commit( "updateDefaultPostByFbPost", payload );
  },
  uploadPostAttachments: async ( { commit }, payload ) => {
    const res = await PostServices.uploadAttachments(payload);
    await commit("setPostAttachmentsUpload", res.data.data);
  },
  deleteAttachmentPost: async ( { commit }, payload ) => {
    await PostServices.deleteAttachmentPost(payload.postId, payload.attachmentId);
    const resultPost = await PostServices.getById( payload.postId );
    commit( "setPost", resultPost.data.data );
  },
  // get newest post -- Khanh 13.06
  getNewestPosts: async ({ commit }, payload) => {
    const resGetNewestPost = await PostServices.getNewestPost(payload);
    commit("setNewestPost", resGetNewestPost.data.data);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
