import ProductStore from "@/services/modules/market/product.service";

const state = {
  allProduct: []
};
const getters = {
  allProduct: state => state.allProduct
};
const mutations = {
  // all product
  setAllProduct: (state, payload) => {
    state.allProduct = payload;
  }
};
const actions = {
  // get all product
  products: async ({ commit }) => {
    const rsAllProduct = await ProductStore.allProduct();
    commit("setAllProduct", rsAllProduct.data.data);
  },
};

export default {
  state,
  getters,
  mutations,
  actions
};
