import AdminHelp from "@/services/modules/adminhelp.services";

const state = {
  getCateAdmin: [],
  getNoParent: []
};

const getters = {
  getCateAdmin: state => state.getCateAdmin,
  getNoParent: state => state.getNoParent
};

const mutations = {
  setAllCateAdmin: (state, payload) => {
    state.getCateAdmin = payload;
  },
  setNoParent: (state, payload) => {
    state.getNoParent = payload;
  }
};

const actions = {
  getAllCategoriesAdmin: async ( {commit }, payload) => {
    const rsGetAllCateAdmin = await AdminHelp.getNewCategory();
    commit("setAllCateAdmin", rsGetAllCateAdmin.data.data);
  },
  NoParent: async ({commit}, payload) => {
    const title = {
      title: payload
    };
    const rsNoParent = await AdminHelp.createNewCategory( title );
    commit("setNoParent", rsNoParent.data.data);
  },
  HaveParent: async ( {commit}, payload ) => {
    console.log(payload);
    const dataSender = {
      title: payload.name,
      parent: payload.parent
    };
    await AdminHelp.createNewCategory( dataSender );
    const rsHaveParent = await AdminHelp.getNewCategory();
      commit("setAllCateAdmin", rsHaveParent.data.data);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}
