import Vue from "vue";
import Vuex from "vuex";

import DashBoard from "./modules/dashboard.store";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    DashBoard
  },
  state: {},
  mutations: {},
  actions: {}
});
