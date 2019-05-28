import Vue from "vue";
import request from "axios";
import CookieFunction from "@/utils/functions/cookie";

Vue.config.productionTip = false;
Vue.prototype.$http = request;

const cookie = `sid=${CookieFunction.getCookie( "sid" )}; uid=${CookieFunction.getCookie( "uid" )}; cfr=${CookieFunction.getCookie( "cfr" )};`;

if ( cookie ) {
  Vue.prototype.$http.defaults.headers[ "Authorization" ] = cookie
}
