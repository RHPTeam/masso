/* eslint-disable prettier/prettier */
import Vue from "vue";
import Router from "vue-router";

import customerGeneralChatRouter from "./modules/user/chat";
import customerGeneralPostRouter from "./modules/user/post";
import customerResetPassword from "./modules/user/password";
import customerSigninRouter from "./modules/user/signin";
import customerSignupRouter from "./modules/user/signup";
import customerWelcomeRouter from "./modules/user/welcome";

import guideGeneralRouter from "./modules/help";

Vue.use( Router );

export default new Router( {
  base: process.env.BASE_URL,
  routes: [
    customerGeneralChatRouter,
    customerGeneralPostRouter,
    customerResetPassword,
    customerSigninRouter,
    customerSignupRouter,
    customerWelcomeRouter,
    guideGeneralRouter
  ]
} );
