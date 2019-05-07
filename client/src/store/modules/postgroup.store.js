
import PostGroupServices from "@/services/modules/postgroup.services";

const state = {
    postGroups: [],
    postGroupDetail: {},
    postGroupDetailStatus: "",
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
    }
  },
  mutations = {
    createPostGroup: ( s, payload ) => {
      s.postGroups.push( payload );
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
    createPostGroup: async ( { commit }, payload ) => {
      const res = await PostGroupServices.create( payload );

      await commit( "createPostGroup", res.data.data );
    },
    deletePostGroup: async ( { commit }, payload ) => {
      const postGroups = state.postGroups.filter(
        ( postGroup ) => postGroup._id !== payload
      );

      let res;

      commit( "setPostGroups", postGroups );

      await PostGroupServices.delete( payload );
      res = await PostGroupServices.index();
      commit( "setPostGroups", res.data.data );
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
    }
  };

export default {
  state,
  getters,
  mutations,
  actions
};
