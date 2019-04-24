/* eslint-disable prettier/prettier */
import Vue from "vue";
import Vuex from "vuex";

import DashBoard from "./modules/dashboard.store";
import AccountStore from "./modules/account.store";
Vue.use( Vuex );

export default new Vuex.Store( {
  modules: {
    DashBoard,
    AccountStore
  }
} );
