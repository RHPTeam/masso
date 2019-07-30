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
      "url": `${process.env.VUE_APP_API_MAIN_URL}/users/info?_id=${agencyId}`,
      "headers": {
        "Authorization": `sid=${CookieFunction.getCookie( "sid" )}; uid=${CookieFunction.getCookie( "uid" )}; cfr=${CookieFunction.getCookie( "cfr" )};`
      }
    } );
  },
  expireInfoMember(userId, info) {
    return request( {
      "method": "patch",
      "url": `${process.env.VUE_APP_API_MAIN_URL}/agency/user?_account=${userId}`,
      "data": info,
      "headers": {
        "Authorization": `sid=${CookieFunction.getCookie( "sid" )}; uid=${CookieFunction.getCookie( "uid" )}; cfr=${CookieFunction.getCookie( "cfr" )};`
      }
    } );
  },
  updateAgencyInfo( agencyId, info ) {
    return request( {
      "method": "patch",
      "url": `${process.env.VUE_APP_API_MAIN_URL}/agency/info?_account=${agencyId}`,
      "data": info,
      "headers": {
        "Authorization": `sid=${CookieFunction.getCookie( "sid" )}; uid=${CookieFunction.getCookie( "uid" )}; cfr=${CookieFunction.getCookie( "cfr" )};`
      }
    } );
  },
  searchMember(agencyId, value){
    console.log(value);
    return request( {
      "method": "post",
      "url": `${process.env.VUE_APP_API_MAIN_URL}/agency/user/search?_id=${agencyId}&value=${value}`,
      "headers": {
        "Authorization": `sid=${CookieFunction.getCookie( "sid" )}; uid=${CookieFunction.getCookie( "uid" )}; cfr=${CookieFunction.getCookie( "cfr" )};`
      }
    } );
  }
};
