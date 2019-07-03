import request from "axios";
import CookieFunction from "@/utils/functions/cookie";

export default {
  getInfo(agencyId) {
    return request( {
      "method": "get",
      "url": `${process.env.VUE_APP_API_MAIN_URL}/agency?_id=${agencyId}`,
      "headers": {
        "Authorization": `sid=${CookieFunction.getCookie( "sid" )}; uid=${CookieFunction.getCookie( "uid" )}; cfr=${CookieFunction.getCookie( "cfr" )};`
      }
    } );
  }
};
