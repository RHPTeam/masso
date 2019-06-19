import PostFacebookService from "@/services/modules/post/postfacebook.service";

const state = {
  listPostFacebookDefault: [],
  numberPageCurrent: 2,
  listPostFacebookByKey: [],
  listPostFacebookStatus: "",
};
const getters = {
  listPostFacebookDefault: state => state.listPostFacebookDefault,
  listPostFacebookByKey: state => state.listPostFacebookByKey,
  listPostFacebookStatus: state => state.listPostFacebookStatus,
  numberPageCurrent: state => state.numberPageCurrent
};
const mutations = {
  setListPostFacebookDefault: ( state, payload ) => {
    state.listPostFacebookDefault = payload;
  },
  setListPostFacebookByKey: ( state, payload ) => {
    state.listPostFacebookDefault = state.listPostFacebookDefault.concat(payload.data);
    state.numberPageCurrent = payload.number;
  },
  setListPostFacebookStatus: ( state, payload ) => {
    state.listPostFacebookStatus = payload;
  }
};
const actions = {
  getListPostFacebookDefault: async ( { commit }, payload ) => {
    commit( "setListPostFacebookStatus", "loading" );

    const res = await PostFacebookService.searchByKeyword(
      payload.keyword,
      payload.size,
      payload.page
    );
    commit( "setListPostFacebookDefault", res.data.data.results );

    commit( "setListPostFacebookStatus", "success" );
  },
  searchPostsFacebookByKey: async ( { commit }, payload ) => {
    commit( "setListPostFacebookStatus", "loading" );

    const result = await PostFacebookService.searchByKeyword(
      payload.keyword,
      payload.size,
      payload.page
    );
    commit( "setListPostFacebookByKey", {
      data: result.data.data.results,
      number: result.data.data.page
    } );

    commit( "setListPostFacebookStatus", "success" );
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}
