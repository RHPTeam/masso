/* eslint-disable prettier/prettier */
import Vue from "vue";
import Router from "vue-router";

import customerGeneralChatRouter from "./modules/user/chat";
import customerGeneralPostRouter from "./modules/user/post";
import customerResetPassword from "./modules/user/password";
import customerWelcomeRouter from "./modules/user/welcome";
import customerMessengerRouter from "./modules/user/messenger";

import error404Router from "./modules/errors/404";
import error500Router from  "./modules/errors/500";

import guideGeneralRouter from "./modules/help";

Vue.use( Router );

export default new Router( {
  base: process.env.BASE_URL,
  routes: [
    customerGeneralChatRouter,
    customerGeneralPostRouter,
    customerResetPassword,
    customerWelcomeRouter,
    customerMessengerRouter,
    error404Router,
    error500Router,
    guideGeneralRouter,
    {
      path: "/signin",
      redirect: "/welcome"
    },
    {
      path: "/signup",
      redirect: "/welcome"
    },
    {
      path: "*",
      redirect: "/404"
    }
  ]
} );
