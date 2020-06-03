import request from "axios";
import CookieFunction from "@/utils/functions/cookie";

export default {
  index() {
    return request( {
      "method": "get",
      "url": `${process.env.VUE_APP_API_MAIN_URL}/category-default`,
      "headers": {
        "Authorization": `sid=${CookieFunction.getCookie( "sid" )}; uid=${CookieFunction.getCookie( "uid" )}; cfr=${CookieFunction.getCookie( "cfr" )};`
      }
    } );
  },
  showInfoCateById(cateId) {
    return request( {
      "method": "get",
      "url": `${process.env.VUE_APP_API_MAIN_URL}/category-default?_id=${cateId}`,
      "headers": {
        "Authorization": `sid=${CookieFunction.getCookie( "sid" )}; uid=${CookieFunction.getCookie( "uid" )}; cfr=${CookieFunction.getCookie( "cfr" )};`
      }
    } );
  },
  editPost(postId) {
    return request( {
      "method": "post",
      "url": `${process.env.VUE_APP_API_MAIN_URL}/posts/duplicate?_postId=${postId}`,
      "headers": {
        "Authorization": `sid=${CookieFunction.getCookie( "sid" )}; uid=${CookieFunction.getCookie( "uid" )}; cfr=${CookieFunction.getCookie( "cfr" )};`
      }
    } )
  },
  duplicateFolder(cateId){
    return request( {
      "method": "post",
      "url": `${process.env.VUE_APP_API_MAIN_URL}/posts/duplicate/folder?_categoryId=${cateId}`,
      "headers": {
        "Authorization": `sid=${CookieFunction.getCookie( "sid" )}; uid=${CookieFunction.getCookie( "uid" )}; cfr=${CookieFunction.getCookie( "cfr" )};`
      }
    } )
  }
};
