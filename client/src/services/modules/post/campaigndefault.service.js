import request from "axios";
import CookieFunction from "@/utils/functions/cookie";

export default {
  index() {
    return request( {
      "method": "get",
      "url": `${process.env.VUE_APP_API_MAIN_URL}/campaign-default`,
      "headers": {
        "Authorization": `sid=${CookieFunction.getCookie( "sid" )}; uid=${CookieFunction.getCookie( "uid" )}; cfr=${CookieFunction.getCookie( "cfr" )};`
      }
    } );
  },
  duplicateCampaign(campaignId, facebookId){
    return request( {
      "method": "post",
      "url": `${process.env.VUE_APP_API_MAIN_URL}/campaign-default/duplicate?_campaignId=${campaignId}`,
      "data": facebookId,
      "headers": {
        "Authorization": `sid=${CookieFunction.getCookie( "sid" )}; uid=${CookieFunction.getCookie( "uid" )}; cfr=${CookieFunction.getCookie( "cfr" )};`
      }
    } )
  }
};
