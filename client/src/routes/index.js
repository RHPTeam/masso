import Vue from "vue";
import Router from "vue-router";

import customer_wellcomeRouter from "./modules/customer/wellcome";
import customer_generalRouter from "./modules/customer";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [customer_wellcomeRouter, customer_generalRouter]
});
