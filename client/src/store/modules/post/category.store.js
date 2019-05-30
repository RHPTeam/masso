import CategoriesServices from "@/services/modules/post/category.service";

const state = {
  allCategories: [],
  categoryById: {},
  categoriesPage: [],
  categoriesPageSize: 1,
  statusCategories: "",
  statusError: ""
};
const getters = {
  allCategories: ( state ) => state.allCategories,
  categoryById: ( state ) => state.categoryById,
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
  setCategoryById: ( state, payload ) => {
    state.categoryById = payload;
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
    const resultCategories = await CategoriesServices.index1();
    commit( "setAllCategories", resultCategories.data.data );
    commit( "cate_success" );
  },
  getCategoryById: async ( { commit }, payload ) => {
    commit( "cate_request" );
    const res = await CategoriesServices.show( payload );
    commit( "setCategoryById", res.data.data );
    commit( "cate_success" );
  },
  getCategoriesByPage: async (  { commit }, payload ) => {
    commit( "cate_request"  );

    const res = await CategoriesServices.getByPage( payload.size, payload.page );
    commit( "setCategoriesPage", res.data.data.results );
    commit( "setCategoriesPageSize", res.data.data.page );

    commit( "cate_success"  );
  },
  createCategory: async ( { commit }, payload ) => {
    try {
      commit( "cate_request" );
      await CategoriesServices.create( payload.category );

      const res = await CategoriesServices.getByPage( payload.size, payload.page );
      commit( "setCategoriesPage", res.data.data.results );
      commit( "setCategoriesPageSize", res.data.data.page );

      commit( "cate_success" );
    } catch (e) {
      if( e.response.status === 403 ) {
        commit( "createCateError", e.response.data );
      }
    }
  },
  updateCategory: async ( { commit }, payload ) => {
    await CategoriesServices.updateCategory( payload.id, payload.category );

    const res = await CategoriesServices.getByPage( payload.size, payload.page );
    commit( "setCategoriesPage", res.data.data.results );
    commit( "setCategoriesPageSize", res.data.data.page );
  },
  deleteCategory: async ( { commit }, payload ) => {
    const categories = state.categoriesPage.filter( ( category ) => {
      return category._id !== payload.id;
    } );

    let res;

    commit( "setCategoriesPage", categories );
    commit( "setCategoriesPageSize", categories.length );

    await CategoriesServices.deleteCategory( payload.id );

    res = await CategoriesServices.getByPage( payload.size, payload.page );
    commit( "setCategoriesPage", res.data.data.results );
    commit( "setCategoriesPageSize", res.data.data.page );
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
