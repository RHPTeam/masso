import request from "axios";
import CookieFunction from "@/utils/functions/cookie";

export default {
  expireByCode(content) {
    return request( {
      "method": "post",
      "url": `${process.env.VUE_APP_API_MAIN_URL}/users/renew/code/auto`,
      "data": content,
      "headers": {
        "Authorization": `sid=${CookieFunction.getCookie( "sid" )}; uid=${CookieFunction.getCookie( "uid" )}; cfr=${CookieFunction.getCookie( "cfr" )};`
      }
    } );
  }
}
