import PostFacebookService from "@/services/modules/post/postfacebook.service";

const state = {
  listPostFacebookDefault: [],
  numberPageCurrent: 2,
  listPostFacebookByKey: [],
};
const getters = {
  listPostFacebookDefault: state => state.listPostFacebookDefault,
  listPostFacebookByKey: state => state.listPostFacebookByKey,
  numberPageCurrent: state => state.numberPageCurrent
};
const mutations = {
  setListPostFacebookDefault: ( state, payload ) => {
    state.listPostFacebookDefault = payload;
  },
  setListPostFacebookByKey: ( state, payload ) => {
    state.listPostFacebookDefault = state.listPostFacebookDefault.concat(payload.data);
    state.numberPageCurrent = payload.number;
  }
};
const actions = {
  getListPostFacebookDefault: async ( { commit }, payload ) => {
    const res = await PostFacebookService.searchByKeyword(
      payload.keyword,
      payload.size,
      payload.page
    );
    commit( "setListPostFacebookDefault", res.data.data.results );
  },
  searchPostsFacebookByKey: async ( { commit }, payload ) => {
    const result = await PostFacebookService.searchByKeyword(
      payload.keyword,
      payload.size,
      payload.page
    );
    commit( "setListPostFacebookByKey", {
      data: result.data.data.results,
      number: result.data.data.page
    } );
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}
