import request from "axios";
import CookieFunction from "@/utils/functions/cookie";

export default {

  // get all product
  allProduct() {
    return request( {
        "method": "get",
        "url": `${process.env.VUE_APP_API_MAIN_URL}/market/products`,
        "headers": {
          "Authorization": `sid=${CookieFunction.getCookie( "sid" )}; uid=${CookieFunction.getCookie( "uid" )}; cfr=${CookieFunction.getCookie( "cfr" )};`
        }
      } );
  }
};
