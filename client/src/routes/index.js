/* eslint-disable prettier/prettier */
import Vue from "vue";
import Router from "vue-router";

import customerGeneralRouter from "./modules/customer";
import customerLoginRouter from "./modules/customer/login";
import customerWelcomeRouter from "./modules/customer/welcome";

Vue.use( Router );

export default new Router( {
  mode: "history",
  base: process.env.BASE_URL,
  routes: [ customerGeneralRouter, customerLoginRouter, customerWelcomeRouter ]
} );
