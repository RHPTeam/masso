/* eslint-disable prettier/prettier */
import Vue from "vue";
import Router from "vue-router";

import customerWelcomeRouter from "./modules/customer/welcome";
import customerGeneralRouter from "./modules/customer";

Vue.use( Router );

export default new Router( {
  mode: "history",
  base: process.env.BASE_URL,
  routes: [ customerWelcomeRouter, customerGeneralRouter ]
} );
