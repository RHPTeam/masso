import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./routes";
// import Axios from "axios";

import "@/utils/components.util";

Vue.config.productionTip = false;
// Vue.prototype.$http = Axios;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

/********************* CUSTOM LIBRARY DIRECTIVE ************************/
Vue.directive("click-outside", {
  bind: function(el, binding) {
    const bubble = binding.modifiers.bubble;
    const handler = e => {
      if (bubble || (!el.contains(e.target) && el !== e.target)) {
        binding.value(e);
      }
    };
    el.__vueClickOutside__ = handler;

    document.addEventListener("click", handler);
  },

  unbind: function(el) {
    document.removeEventListener("click", el.__vueClickOutside__);
    el.__vueClickOutside__ = null;
  }
});
