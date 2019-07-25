
import PostGroupServices from "@/services/modules/post/postgroup.service";

const state = {
    postGroups: [],
    postGroupDetail: {},
    postGroupDetailStatus: "",
    postGroupGroupsSelected: [],
    postGroupPagesSelected: [],
    postProfileSelected: []
  },
  getters = {
    postGroups: ( s ) => {
      return s.postGroups;
    },
    postGroupDetail: ( s ) => {
      return s.postGroupDetail;
    },
    postGroupDetailStatus: ( s ) => {
      return s.postGroupDetailStatus;
    },
    postGroupGroupsSelected: ( s ) => {
      return s.postGroupGroupsSelected;
    },
    postGroupPagesSelected: ( s ) => {
      return s.postGroupPagesSelected;
    },
    postProfileSelected: (state) => {
      return state.postProfileSelected;
    }
  },
  mutations = {
    createPostGroup: ( s, payload ) => {
      s.postGroups.push( payload );
    },
    postGroupGroupsSelected: ( s, payload ) => {
      s.postGroupGroupsSelected = payload;
    },
    postGroupPagesSelected: ( s, payload ) => {
      s.postGroupPagesSelected = payload;
    },
    postProfileSelected: (state, payload) => {
      state.postProfileSelected = payload;
    },
    setPostGroups: ( s, payload ) => {
      s.postGroups = payload;
    },
    setPostGroupDetail: ( s, payload ) => {
      s.postGroupDetail = payload;
    },
    setPostGroupDetailStatus: ( s, payload ) => {
      s.postGroupDetailStatus = payload;
    }
  },
  actions = {
    addToPostGroup: async ( { commit }, payload ) => {
      await PostGroupServices.updatePostGroup( payload );
    },
    createPostGroup: async ( { commit }, payload ) => {
      const res = await PostGroupServices.create( payload );

      await commit( "createPostGroup", res.data.data );
    },
    deletePostGroup: async ( { commit }, payload ) => {
      const postGroups = state.postGroups.filter(
        ( postGroup ) => postGroup._id !== payload.id
      );

      commit( "setPostGroups", postGroups );
      commit( "setPostGroupDetail", {} );

      await PostGroupServices.delete( payload.id );
    },
    deletePagesNGroupsFromPostGroup: async ( { commit }, payload ) => {
      await PostGroupServices.deletePagesNGroups( payload );
      const postGroup = await PostGroupServices.getPostGroupById( payload.id );
      await commit( "setPostGroupDetail", postGroup.data.data );
      // reset selected pages and groups
      commit( "postGroupGroupsSelected", [] );
      commit( "postGroupPagesSelected", [] );
    },
    getAllPostGroups: async ( { commit } ) => {

      const res = await PostGroupServices.index();

      await commit( "setPostGroups", res.data.data );
    },
    getPostGroupById: async ( { commit }, payload ) => {
      commit( "setPostGroupDetailStatus", "loading" );
      const res = await PostGroupServices.getPostGroupById( payload );

      await commit( "setPostGroupDetail", res.data.data );
      commit( "setPostGroupDetailStatus", "success" );
    },
    postGroupGroupsSelected: ( { commit }, payload ) => {
      commit( "postGroupGroupsSelected", payload );
    },
    postGroupPagesSelected: ( { commit }, payload ) => {
      commit( "postGroupPagesSelected", payload );
    },
    postProfileSelected: ( { commit }, payload ) => {
      commit( "postProfileSelected", payload );
    },
    updatePostGroup: async ( { commit }, payload ) => {
      await PostGroupServices.updatePostGroup( payload );
      const postGroup = await PostGroupServices.getPostGroupById( payload.postGroupId );
      await commit( "setPostGroupDetail", postGroup.data.data );
    },
    // Mobile - update title
    updateTitlePostGroup: async ( { commit }, payload ) => {
      await PostGroupServices.updatePostGroup( payload );
      const res = await PostGroupServices.index();

      await commit( "setPostGroups", res.data.data );
    }
  };

export default {
  state,
  getters,
  mutations,
  actions
};
