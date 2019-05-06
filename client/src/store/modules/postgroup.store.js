
import PostGroupServices from "@/services/modules/postgroup.services";

const state = {
    postGroups: [],
  },
  getters = {
    postGroups: ( s ) => {
      return s.postGroups;
    }
  },
  mutations = {
    createPostGroup: ( s, payload ) => {
      s.postGroups.push( payload );
    },
    setPostGroups: ( s, payload ) => {
      s.postGroups = payload;
    },
  },
  actions = {
    createPostGroup: async ( { commit }, payload ) => {
      const res = await PostGroupServices.create( payload );

      await commit( "createPostGroup", res.data.data );
    },
    getAllPostGroups: async ( { commit } ) => {
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
