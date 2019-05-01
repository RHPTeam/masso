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
  statusCategories: ""
};
const getters = {
  categories: ( state ) => state.categories,
  statusCategories: ( state ) => state.statusCategories,
  categoriesById: ( state ) => state.categoriesById
};
const mutations = {
  cate_request: ( state ) => {
    state.statusCategories = "loading";
  },
  cate_success: ( state ) => {
    state.statusCategories = "success";
  },
  setCategories: ( state, payload ) => {
    state.categories = payload;
  },
  setCategoriesById: ( state, payload ) => {
    state.categoriesById = payload;
  }
};
const actions = {
  getAllCategories: async ( { commit } ) => {
    commit( "cate_request" );
    const resultCategories = await CategoriesServices.index();

    commit( "setCategories", resultCategories.data.data );
    commit( "cate_success" );
  },
  getCategoriesById: async ( { commit }, payload ) => {
    commit( "cate_request" );
    const resultCategories = await CategoriesServices.show( payload );

    commit( "setCategoriesById", resultCategories.data.data[ 0 ] );
    commit( "cate_success" );
  },
  createCategories: async ( { commit }, payload ) => {
    commit( "cate_request" );
    const resultCreateCate = await CategoriesServices.create( payload );

    commit( "setCategories", resultCreateCate.data.data );
    const resultCategories = await CategoriesServices.index();

    commit( "setCategories", resultCategories.data.data );
    commit( "cate_success" );
  },
  updateCategories: async ( { commit }, payload ) => {
    commit( "cate_request" );
    const objSender = {
      title: payload.title,
      description: payload.description
    };

    await CategoriesServices.updateCategories( payload._id, objSender );
    const resultCategories = await CategoriesServices.index();

    commit( "setCategories", resultCategories.data.data );
    commit( "cate_success" );
  },
  deleteCategories: async ( { commit }, payload ) => {
    commit( "cate_request" );
    const resultDel = await CategoriesServices.deleteCagories( payload );
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
