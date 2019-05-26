import request from "axios";
import CookieFunction from "@/utils/functions/cookie";

export default {
  index() {
    return request( {
      "method": "get",
      "url": `${process.env.VUE_APP_API_MAIN_URL}/posts`,
      "headers": {
        "Authorization": `sid=${CookieFunction.getCookie( "sid" )}; uid=${CookieFunction.getCookie( "uid" )}; cfr=${CookieFunction.getCookie( "cfr" )};`
      }
    } );
  },
  searchByKeyword(keyword, size, page) {
    return request( {
      "method": "post",
      "url": `${process.env.VUE_APP_API_MAIN_URL}/posts?keyword=${keyword}&_size=${size}&_page=${page}`,
      "headers": {
        "Authorization": `sid=${CookieFunction.getCookie( "sid" )}; uid=${CookieFunction.getCookie( "uid" )}; cfr=${CookieFunction.getCookie( "cfr" )};`
      }
    } )
  }
};
