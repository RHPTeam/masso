import HelpHome from "@/services/modules/help.services";

const state = {
  stateHelpHome: '',
  getAllHelpHome: [],
  categoriesAdmin: []
};

const getters = {
  stateHelpHome: state => state.stateHelpHome,
  categoriesAdmin: state => state.categoriesAdmin,
  getAllHelpHome: state => state.getAllHelpHome
};

const mutations = {
  statusHelp_request: state => {
    state.stateHelpHome = 'loading';
  },
  statusHelp_success: state => {
    state.stateHelpHome = 'success';
  },
  setAllHelp: (state, payload) => {
    state.getAllHelpHome = payload;
  },
  setCategoriesAdmin: ( state, payload ) => {
    state.categoriesAdmin = payload;
  }
};

const actions = {
  getAllHelp: async ({ commit }) => {
    commit("statusHelp_request");
    const resultAllHelp = await HelpHome.indexHelp();
    commit("setAllHelp", resultAllHelp.data.data);
    commit("statusHelp_success");
  },
  getAllCategoriesAdmin: async ( { commit } ) => {
    const results = await HelpHome.getAllCategories();
    commit( "setCategoriesAdmin", results.data.data );
  },
};

export default {
  state,
  getters,
  mutations,
  actions
}
