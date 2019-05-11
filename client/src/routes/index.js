/* eslint-disable prettier/prettier */
import Vue from "vue";
import Router from "vue-router";

import adminGeneralRouter from "./modules/admin";

import customerGeneralRouter from "./modules/customer";
import customerResetPassword from "./modules/customer/resetpassword";
import customerSigninRouter from "./modules/customer/signin";
import customerSignupRouter from "./modules/customer/signup";
import customerWelcomeRouter from "./modules/customer/welcome";

Vue.use( Router );

export default new Router( {
  base: process.env.BASE_URL,
  routes: [
    adminGeneralRouter,
    customerGeneralRouter,
    customerResetPassword,
    customerSigninRouter,
    customerSignupRouter,
    customerWelcomeRouter
  ]
} );
