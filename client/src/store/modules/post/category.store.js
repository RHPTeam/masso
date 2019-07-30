import CategoriesServices from "@/services/modules/post/category.service";
import CategoryDefaultService from "@/services/modules/post/categorydefault.service";

const state = {
  allCategories: [],
  categoryById: {},
  categoriesPage: [],
  categoriesPageMobile: [],
  categoriesPageSize: 1,
  mixCategories: [],
  statusCategories: "",
  statusError: ""
};
const getters = {
  allCategories: ( state ) => state.allCategories,
  categoryById: ( state ) => state.categoryById,
  categoriesPage: ( state ) => state.categoriesPage,
  categoriesPageMobile: state => state.categoriesPageMobile,
  categoriesPageSize: ( state ) => state.categoriesPageSize,
  mixCategories: ( state ) => state.mixCategories,
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
  setCategoriesPageByKeyMobile: (state, payload) => {
    state.categoriesPageMobile = payload;
  },
  setCategoriesPageSize: ( state, payload ) => {
    state.categoriesPageSize = payload;
  },
  // Mobile
  setCategoriesPageMobile: (state, payload) => {
    state.categoriesPage = state.categoriesPage.concat(payload);
  },
  setDeleteCategoryWhenSearch: (state, payload) => {
    state.categoriesPageMobile = payload;
  },
  setMixCategories: ( state, payload ) => {
    state.mixCategories = payload;
  }
};
const actions = {
  getAllCategories: async ( { commit } ) => {
    commit( "cate_request" );
    const resultCategories = await CategoriesServices.index();
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
  // Mobile - get cate by page and concat array
  getCategoriesByPageMobile: async (  { commit }, payload ) => {
    commit( "cate_request"  );

    const res = await CategoriesServices.getByPage( payload.size, payload.page );
    commit( "setCategoriesPageMobile", res.data.data.results );
    commit( "setCategoriesPageSize", res.data.data.page );

    commit( "cate_success"  );
  },
  getCategoriesByKey: async (  { commit }, payload ) => {
    commit( "cate_request"  );
    const res = await CategoriesServices.searchByKey( payload.keyword, payload.size, payload.page );

    commit( "setCategoriesPage", res.data.data.results );
    commit( "setCategoriesPageSize", res.data.data.page );

    commit( "cate_success"  );
  },
  // search mobile
  getCategoriesByKeyMobile: async (  { commit }, payload ) => {
    commit( "cate_request"  );
    const res = await CategoriesServices.searchByKey( payload.keyword, payload.size, payload.page );

    commit( "setCategoriesPageByKeyMobile", res.data.data.results );
    // commit( "setCategoriesPageSize", res.data.data.page );

    commit( "cate_success"  );
  },
  getMixCategories: async ( { commit } ) => {
    const result = await CategoriesServices.getMixCategories();
    await  commit( "setMixCategories", result.data.data );
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
  },
  // mobile: delete category when search
  deleteCategorySearch: async ( { commit }, payload ) => {
    const categories = state.categoriesPageMobile.filter( ( category ) => {
      return category._id !== payload.id;
    } );

    commit( "setDeleteCategoryWhenSearch", categories );
    // commit( "setCategoriesPageSize", categories.length );

    await CategoriesServices.deleteCategory( payload.id );

    // res = await CategoriesServices.getByPage( payload.size, payload.page );
    // commit( "setCategoriesPageMobile", res.data.data.results );
    // commit( "setCategoriesPageSize", res.data.data.page );
  },
  duplicateCategoriesDefault: async ( {commit}, payload ) => {
    await CategoryDefaultService.duplicateFolder(payload);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
