import Vue from "vue";
import App from "./App.vue";
import i18n from "./locales";
import store from "./store";
import router from "./routes";
import { VueHammer } from 'vue2-hammer'
VueHammer.config.pan = {
  threshold: 100,
  direction: 6
};
Vue.use(VueHammer);

import "@/utils/interfaces/components";
import "@/utils/secures/headers";
import "@/utils/secures/guards";
// import "@/utils/sockets";


new Vue( {
  sockets: {
    connect: function() {
      console.log(`✅ Connected! ✅`);
    }
  },
  i18n,
  router,
  store,
  render: ( h ) => h( App )
} ).$mount( "#app" );
