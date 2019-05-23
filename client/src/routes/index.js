/* eslint-disable prettier/prettier */
import Vue from "vue";
import Router from "vue-router";

import customerGeneralRouter from "./modules/user";
import customerResetPassword from "./modules/user/password";
import customerSigninRouter from "./modules/user/signin";
import customerSignupRouter from "./modules/user/signup";
import customerWelcomeRouter from "./modules/user/welcome";

import error404Router from "./modules/errors/404";
import error500Router from  "./modules/errors/500";

import guideGeneralRouter from "./modules/help";

Vue.use( Router );

export default new Router( {
  base: process.env.BASE_URL,
  routes: [
    customerGeneralRouter,
    customerResetPassword,
    customerSigninRouter,
    customerSignupRouter,
    customerWelcomeRouter,
    error404Router,
    error500Router,
    guideGeneralRouter,
    {
      path: "*",
      redirect: "/404"
    }
  ]
} );
