/* eslint-disable prettier/prettier */
import Vue from "vue";
import Router from "vue-router";

import customerGeneralChatRouter from "./modules/user/chat";
import customerGeneralPostRouter from "./modules/user/post";
import customerWelcomeRouter from "./modules/user/welcome";
import customerMessengerRouter from "./modules/user/messenger";
import redirectRouter from "./modules/user/redirect";

import error404Router from "./modules/errors/404";
import error500Router from  "./modules/errors/500";

import guideGeneralRouter from "./modules/help";

Vue.use( Router );

export default new Router( {
  scrollBehavior(){
    return { x: 0, y: 0 };
  },
  base: process.env.BASE_URL,
  routes: [
    customerGeneralChatRouter,
    customerGeneralPostRouter,
    customerWelcomeRouter,
    customerMessengerRouter,
    redirectRouter,
    error404Router,
    error500Router,
    guideGeneralRouter,
    {
      path: "/",
      redirect: "/welcome"
    },
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
