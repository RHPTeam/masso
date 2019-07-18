import request from "axios";
import CookieFunction from "@/utils/functions/cookie";

export default {
  index() {
    return request( {
      "method": "get",
      "url": `${process.env.VUE_APP_API_MAIN_URL}/help/posts`,
      "headers": {
        "Authorization": `sid=${CookieFunction.getCookie( "sid" )}; uid=${CookieFunction.getCookie( "uid" )}; cfr=${CookieFunction.getCookie( "cfr" )};`
      }
    } );
  },
  getDetailBlogHelp(slug){
    return request( {
      "method": "get",
      "url": `${process.env.VUE_APP_API_MAIN_URL}/help/posts?slug=${slug}`,
      "headers": {
        "Authorization": `sid=${CookieFunction.getCookie( "sid" )}; uid=${CookieFunction.getCookie( "uid" )}; cfr=${CookieFunction.getCookie( "cfr" )};`
      }
    } )
  }
};
