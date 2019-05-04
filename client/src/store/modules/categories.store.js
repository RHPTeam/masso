/* eslint-disable no-console */
/* eslint-disable arrow-parens */
/* eslint-disable one-var */
/* eslint-disable camelcase */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import CategoriesServices from "@/services/modules/categories.services";

const state = {
  categories: [],
  categoriesById: [],
  statusCategories: "",
  statusError: "",
  sizePageCategories: 1
};
const getters = {
  categories: ( state ) => state.categories,
  statusCategories: ( state ) => state.statusCategories,
  statusError: ( state ) => state.statusError,
  categoriesById: ( state ) => state.categoriesById,
  sizePageCategories: ( state ) => state.sizePageCategories
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
  setCategories: ( state, payload ) => {
    state.categories = payload;
  },
  setCategoriesById: ( state, payload ) => {
    state.categoriesById = payload;
  },
  setSizePageCategories: ( state, payload ) => {
    state.sizePageCategories = payload;
  }
};
const actions = {
  getAllCategories: async ( { commit } ) => {
    commit( "cate_request" );
    const resultCategories = await CategoriesServices.index();
    // console.log( resultCategories.data.data );
    commit( "setCategories", resultCategories.data.data );
    commit( "cate_success" );
  },
  getCategoriesById: async ( { commit }, payload ) => {
    commit( "cate_request" );
    const resultCategories = await CategoriesServices.show( payload );
    // console.log( resultCategories.data.data );
    commit( "setCategoriesById", resultCategories.data.data );
    commit( "cate_success" );
  },
  getCategoriesByPage: async (  { commit }, payload ) => {
    commit( "cate_request"  );
    const result = await CategoriesServices.getByPage( payload.size, payload.page );
    commit( "setCategories", result.data.data  );
    commit( "cate_success"  );
  },
  getCategoriesBySize: async (  { commit }, payload ) => {
    commit(  "cate_request" );
    const result = await CategoriesServices.getBySize(  payload  );
    commit( "setCategories", result.data.data  );
    // console.log( result.data.data );
    commit(  "setSizePageCategories", result.data.data.page );
    commit(  "cate_success" );
  },
  createCategories: async ( { commit }, payload ) => {
    try {
      commit( "cate_request" );
      const resultCreateCate = await CategoriesServices.create( payload );
      // console.log( resultCreateCate );
      commit( "setCategories", resultCreateCate.data.data );
      const resultCategories = await CategoriesServices.index();

      commit( "setCategories", resultCategories.data.data );
      commit( "cate_success" );
    } catch (e) {
      console.log( e.response.data );
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
  deleteCategories: async ( { commit }, payload ) => {
    commit( "cate_request" );
    await CategoriesServices.deleteCagories( payload );
    const resultCategories = await CategoriesServices.index();

    commit( "setCategories", resultCategories.data.data );
    commit( "cate_success" );
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
