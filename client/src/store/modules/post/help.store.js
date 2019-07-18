import HelpServices from "@/services/modules/post/help.services";

const state = {
  blogs: [],
  helpStatus: ""
};
const getters = {
  blogs: state => state.blogs.slice(0, 5),
  helpStatus: state => state.helpStatus
};
const mutations = {
  help_request: state => {
    state.helpStatus = "loading";
  },
  help_success: state => {
    state.helpStatus = "success";
  },
  setBlogs: (state, payload) => {
    state.blogs = payload
  }
};
const actions = {
  getBlogHelp: async ({commit}) => {
    commit("help_request");
    const result = await HelpServices.index();
    commit("setBlogs", result.data.data);
    commit("help_success");
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}
