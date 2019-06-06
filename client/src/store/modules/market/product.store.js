import ProductService from "@/services/modules/market/product.service";

const state = {
    allProduct: [],
};
const getters = {
    allProduct: state => state.allProduct,
};
const mutations = {
    // all product
  setAllProduct: (state, payload) => {
    state.allProduct = payload;
  },
};
const actions = {
    // get all product
  allProduct: async ({ commit }) => {
    const rsAllProduct = await ProductService.products();
    commit("setAllProduct", rsAllProduct.data.data);
    console.log("rsAllProduct.data.data");
    console.log(rsAllProduct.data.data);
  },
};

export default {
    state,
    getters,
    actions,
    mutations
}