/* eslint-disable new-cap */
import Api from "@/services";

export default {
  index() {
    return Api().get( "page-facebook" );
  },
  update(accountId) {
    return Api().patch( `page-facebook?_id=${accountId}` );
  },
};
