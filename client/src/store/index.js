/* eslint-disable prettier/prettier */
import Vue from "vue";
import Vuex from "vuex";

import AccountStore from "./modules/account.store";
import CampaignsStore from "./modules/campaigns.store";
import CategoriesStore from "./modules/categories.store";
import DashBoard from "./modules/dashboard.store";
import EventsStore from "./modules/events.store";
import FacebookStore from "./modules/facebook.store";
import FacebookCookie from "./modules/facebookcookie.store";
import FacebookFriend from "./modules/facebookfriend.store";
import PostStore from "./modules/post.store";
import PostGroupStore from "./modules/postgroup.store";

Vue.use( Vuex );

export default new Vuex.Store( {
  modules: {
    AccountStore,
    CampaignsStore,
    CategoriesStore,
    DashBoard,
    EventsStore,
    FacebookStore,
    FacebookCookie,
    FacebookFriend,
    PostStore,
    PostGroupStore
  }
} );
