import Vue from "vue";
import SocketIO from "socket.io-client";
import VueSocketIO from "vue-socket.io";

Vue.use(
  new VueSocketIO({
    connection: SocketIO( `${process.env.VUE_APP_ROOT}:${process.env.VUE_APP_SOCKET_PORT}`, { transports: ['websocket'] } )
  })
);
