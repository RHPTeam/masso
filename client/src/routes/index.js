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

Vue.use( Router );

const scrollBehavior = (to, from, savedPosition) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ x: 0, y: 0 })
    }, 500)
  })
};

export default new Router( {
  scrollBehavior,
  base: process.env.BASE_URL,
  routes: [
    customerGeneralChatRouter,
    customerGeneralPostRouter,
    customerWelcomeRouter,
    customerMessengerRouter,
    error404Router,
    error500Router,
    redirectRouter,
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
