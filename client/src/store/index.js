/* eslint-disable prettier/prettier */
import Vue from "vue";
import Vuex from "vuex";

import DashBoard from "./modules/dashboard.store";
import AccountStore from "./modules/account.store";
import CampaignsStore from "./modules/campaigns.store";
import CategoriesStore from "./modules/categories.store";
import EventsStore from "./modules/events.store";
import PostStore from "./modules/post.store";
Vue.use( Vuex );

export default new Vuex.Store( {
  modules: {
    DashBoard,
    AccountStore,
    CampaignsStore,
    CategoriesStore,
    EventsStore,
    PostStore
  }
} );
