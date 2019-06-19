import CategoryDefaultService from "@/services/modules/post/categorydefault.service";

const state = {
  allCateDefault: [],
  cateDefaultStatus: "",
  postCateDefault: {}
};
const getters = {
  cateDefaultStatus: state => state.cateDefaultStatus,
  allCateDefault: state => state.allCateDefault,
  postCateDefault: state => state.postCateDefault
};
const mutations = {
  cate_default_request: state => {
    state.cateDefaultStatus = "loading";
  },
  cate_default_success: state => {
    state.cateDefaultStatus = "success";
  },
  setAllCateDefault: (state, payload) => {
    state.allCateDefault = payload;
  },
  setPost: (state, payload) => {
    state.postCateDefault = payload;
  }
};
const actions = {
  getCategoryDefault: async ({commit}) => {
    commit("cate_default_request");
    const results = await CategoryDefaultService.index();
    console.log(results.data.data);
    commit("setAllCateDefault", results.data.data);
    commit("cate_default_success");
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}
