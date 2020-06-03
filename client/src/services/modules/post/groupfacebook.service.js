/* eslint-disable new-cap */
import Api from "@/services";

export default {
  index() {
    return Api().get( "group-facebook" );
  },
  update(accountId) {
    return Api().patch( `group-facebook?_id=${accountId}` );
  },
};
