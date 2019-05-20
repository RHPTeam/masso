import AdminHelp from "@/services/modules/adminhelp.services";

const state = {
  getCateAdmin: [],
  getNoParent: [],
  categoriesById: [],
  getCategories: [],
  getCategoriesDelete: [],
  getAllBlog: [],
  createAllBlog: []
};

const getters = {
  // Start Category
  getCateAdmin: state => state.getCateAdmin,
  getNoParent: state => state.getNoParent,
  categoriesById: state => state.categoriesById,
  getCategories: state => state.getCategories,
  getCategoriesDelete: state => state.getCategoriesDelete,
  // End Category

  // Start Blog help
  getAllBlog: state => state.getAllBlog,
  createAllBlog: state => state.createAllBlog
  // End Blog Help
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
  },

  // Start Blog Help

  setCreateBlogHelp: (state, payload) => {
    state.createAllBlog = payload;
  },
  // get
  setAllBlog: (state, padload) => {
    state.getAllBlog = padload;
  },
  // End Blog Help
};

const actions = {

  // ============= Start Category

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
  },

  // ============= End Category

  // ======= Start blog help

  // create
  createBlogHelpAdmin: async ( { commit }, payload ) => {
      const res = await AdminHelp.createBlogHelpAdmin( payload );
      commit("setCreateBlogHelp", res.data.data);
  },
  // get all
  getAllBlogAdmin: async ( { commit } ) => {
    const resAllBlog = await AdminHelp.getAllBlogAdmin();
    commit("setAllBlog", resAllBlog.data.data);
    console.log(resAllBlog.data.data);
  },
  // update
  updateBlogHelp: async ( { commit }, payload ) => {

    // const rsUpdateBlog = await
  },
  // delete
  // ======= end blog help
};

export default {
  state,
  getters,
  mutations,
  actions
}
