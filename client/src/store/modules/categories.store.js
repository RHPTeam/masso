import CategoriesServices from "@/services/modules/categories.services";

const state = {
  allCategories: [],
  categoriesById: {},
  categoriesPage: [],
  categoriesPageSize: 1,
  statusCategories: "",
  statusError: ""
};
const getters = {
  allCategories: ( state ) => state.allCategories,
  categoriesById: ( state ) => state.categoriesById,
  categoriesPage: ( state ) => state.categoriesPage,
  categoriesPageSize: ( state ) => state.categoriesPageSize,
  statusCategories: ( state ) => state.statusCategories,
  statusError: ( state ) => state.statusError
};
const mutations = {
  cate_request: ( state ) => {
    state.statusCategories = "loading";
  },
  cate_success: ( state ) => {
    state.statusCategories = "success";
  },
  createCateError: ( state, payload ) => {
    state.statusError = payload
  },
  setAllCategories: ( state, payload ) => {
    state.allCategories = payload;
  },
  setCategoriesById: ( state, payload ) => {
    state.categoriesById = payload;
  },
  setCategoriesPage: ( state, payload ) => {
    state.categoriesPage = payload
  },
  setCategoriesPageSize: ( state, payload ) => {
    state.categoriesPageSize = payload;
  }
};
const actions = {
  getAllCategories: async ( { commit } ) => {
    commit( "cate_request" );
    const resultCategories = await CategoriesServices.index();
    commit( "setAllCategories", resultCategories.data.data );
    commit( "cate_success" );
  },
  getCategoriesById: async ( { commit }, payload ) => {
    commit( "cate_request" );
    const resultCategories = await CategoriesServices.show( payload );
    commit( "setCategoriesById", resultCategories.data.data );
    commit( "cate_success" );
  },
  getCategoriesByPage: async (  { commit }, payload ) => {
    commit( "cate_request"  );

    const res = await CategoriesServices.getByPage( payload.size, payload.page );
    commit( "setCategoriesPage", res.data.data.results );
    commit( "setCategoriesPageSize", res.data.data.page );

    commit( "cate_success"  );
  },
  createCategories: async ( { commit }, payload ) => {
    try {
      commit( "cate_request" );
      await CategoriesServices.create( payload );
      const resultCategories = await CategoriesServices.index();

      commit( "setCategories", resultCategories.data.data );
      commit( "cate_success" );
    } catch (e) {
      if( e.response.status === 403 ) {
        commit( "createCateError", e.response.data );
      }
    }
  },
  updateCategories: async ( { commit }, payload ) => {
    const objSender = {
      title: payload.title,
      description: payload.description
    };

    await CategoriesServices.updateCategories( payload._id, objSender );
    // commit( "setCategories", resultUpdate.data.data );
    const resultCategories = await CategoriesServices.index();

    commit( "setCategories", resultCategories.data.data );
  },
  deleteCategory: async ( { commit }, payload ) => {
    const categories = state.categories.filter( ( category ) => {
      return category._id !== payload;
    } );

    let res;

    commit( "setCategories", categories );

    await CategoriesServices.deleteCategory( payload );

    res = await CategoriesServices.index();
    commit( "setCategories", res.data.data );
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
