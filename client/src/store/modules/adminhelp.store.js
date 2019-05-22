import AdminHelp from "@/services/modules/adminhelp.services";

const state = {
  getCateAdmin: [],
  getNoParent: [],
  categoriesById: [],
  getCategories: [],
  getCategoriesDelete: [],
  getAllBlog: [],
  createAllBlog: [],
  getBlogUpdate: [],
  getBlogHelpById: [],
  getIdToDeleteBlogAdmin: [],
  getCreateQuestionHelp: [],
  help: []
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
  createAllBlog: state => state.createAllBlog,
  getBlogUpdate: state => state.getBlogUpdate,
  getBlogHelpById: state => state.getBlogHelpById,
  getIdToDeleteBlogAdmin: state => state.getIdToDeleteBlogAdmin,
  // End Blog Help

  // Start question help
  getCreateQuestionHelp: state => state.getCreateQuestionHelp,
  help: state => state.help
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
  // update
  setUpdateBlog: (state, payload) => {
    state.getBlogUpdate = payload;
  },
  setBlogHelpById: (state, payload) => {
    state.getBlogHelpById = payload;
  },
  // delete
  setDeleteBlogHelp: (state, payload) => {
    state.getIdToDeleteBlogAdmin = payload;
  },
  // End Blog Help

  // Start Question Help
  setCreateQuestion: (state, payload) => {
    state.getCreateQuestionHelp = payload;
  },
  setHelp: (state, payload ) => {
    state.help = payload;
  },


  set_help: (state, payload) => {
    state.help[payload.key] = payload.value;
  }
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
    console.log("payload ne");
    console.log(payload);
    const rsupdateCategoriesById = await AdminHelp.updateCateById( payload._id, payload );
    commit("setCategories", rsupdateCategoriesById.data.data);
  },
  // delete
  deleteCategoryById: async ({ commit }, payload) => {
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
  },
  // update
  updateBlogHelp: async ( { commit }, payload ) => {

    const rsUpdateBlog = await AdminHelp.updateBlogHelp( payload._id, payload);
    commit("setUpdateBlog", rsUpdateBlog.data.data);
  },
  getIdBlogHelpAdmin: async ( {commit}, payload ) => {
    const rsGetIdBlog = await AdminHelp.getIdBlogHelp( payload );
    commit("setBlogHelpById", rsGetIdBlog.data.data);
  },
  // delete
  deleteBlogById: async ( { commit }, payload ) => {
    await AdminHelp.deleteBlogHelpAdmin( payload );
    const rsDeleteBlogHelp = await AdminHelp.getAllBlogAdmin();
    commit("setAllBlog", rsDeleteBlogHelp.data.data);
  },
  // ======= end blog help


  // Start Question Help
  updatePopularHelp: async ( { commit }, payload ) => {
    /// Remove list object, change to list id popular blog and category
    console.log(payload);
    const rsCreateQuestion = await AdminHelp.updateQuestion( payload._id, payload );
    commit("setCreateQuestion", rsCreateQuestion.data.data);
  },
  getHelp: async ( { commit } ) => {
    const rsGetAllQuestion = await AdminHelp.getHelp();
    commit("setHelp", rsGetAllQuestion.data.data[0]);
  },

  setHelp: async( { commit }, payload ) => {
    commit( "set_help", payload );
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}
