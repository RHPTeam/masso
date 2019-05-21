import Vue from "vue";
import App from "./App.vue";
import i18n from "./locales";
import store from "./store";
import router from "./routes";
import SocketIO from "socket.io-client";
import VueSocketIO from "vue-socket.io";

import "@/utils/interfaces/components";
import "@/utils/secures/headers";
import "@/utils/secures/guards";

Vue.use(
  new VueSocketIO({
    connection: SocketIO( `http://localhost:8889` )
  })
);
import VueQuillEditor from "vue-quill-editor";
Vue.use(VueQuillEditor /* { default global options } */);


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
