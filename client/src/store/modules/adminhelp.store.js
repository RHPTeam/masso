import AdminHelp from "@/services/modules/adminhelp.services";

const state = {
  getCateAdmin: [],
  getNoParent: [],
  categoriesById: [],
  getCategories: [],
  getCategoriesDelete: []
};

const getters = {
  getCateAdmin: state => state.getCateAdmin,
  getNoParent: state => state.getNoParent,
  categoriesById: state => state.categoriesById,
  getCategories: state => state.getCategories,
  getCategoriesDelete: state => state.getCategoriesDelete
};

const mutations = {
  setAllCateAdmin: (state, payload) => {
    state.getCateAdmin = payload;
  },
  setNoParent: (state, payload) => {
    state.getNoParent = payload;
  },
  setCategoriesById: (state, payload ) => {
    state.categoriesById = payload;
  },
  setCategories: (state, payload) => {
    state.getCategories = payload;
  }
};

const actions = {

  getAllCategoriesAdmin: async ( {commit } ) => {
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
    const dataSender = {
      title: payload.name,
      parent: payload.parent
    };
    await AdminHelp.createNewCategory( dataSender );
    const rsHaveParent = await AdminHelp.getNewCategory();
      commit("setAllCateAdmin", rsHaveParent.data.data);
  },

  // get Id click category
  getCategoriesById: async ( {commit }, payload ) => {
    const rsUpdate = await AdminHelp.getCateById( payload );
    commit("setCategoriesById", rsUpdate.data.data);
  },
  // update
  updateCategoriesById: async ( { commit }, payload) => {
    const rsupdateCategoriesById = await AdminHelp.updateCateById( payload._id, payload );
    commit("setCategories", rsupdateCategoriesById.data.data);
  },
  // delete
  deleteCategoryById: async ({ commit }, payload) => {
    console.log( payload );
    await AdminHelp.deleteCategoryAdmin( payload );
    const rsdeleteCategory = await AdminHelp.getNewCategory();
    commit("setAllCateAdmin", rsdeleteCategory);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}
