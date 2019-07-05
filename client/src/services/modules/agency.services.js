import request from "axios";
import CookieFunction from "@/utils/functions/cookie";

export default {
  create(user){
    return request( {
      "method": "post",
      "url": `${process.env.VUE_APP_API_MAIN_URL}/agency/user`,
      "data": user,
      "headers": {
        "Authorization": `sid=${CookieFunction.getCookie( "sid" )}; uid=${CookieFunction.getCookie( "uid" )}; cfr=${CookieFunction.getCookie( "cfr" )};`
      }
    } );
  },
  getInfo(agencyId) {
    return request( {
      "method": "get",
      "url": `${process.env.VUE_APP_API_MAIN_URL}/agency?_account=${agencyId}`,
      "headers": {
        "Authorization": `sid=${CookieFunction.getCookie( "sid" )}; uid=${CookieFunction.getCookie( "uid" )}; cfr=${CookieFunction.getCookie( "cfr" )};`
      }
    } );
  },
  getInfoMember(agencyId) {
    return request( {
      "method": "get",
      "url": `${process.env.VUE_APP_API_MAIN_URL}/agency/user?_account=${agencyId}`,
      "headers": {
        "Authorization": `sid=${CookieFunction.getCookie( "sid" )}; uid=${CookieFunction.getCookie( "uid" )}; cfr=${CookieFunction.getCookie( "cfr" )};`
      }
    } );
  }
};
