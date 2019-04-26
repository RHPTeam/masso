/* eslint-disable new-cap */
import Api from "@/services";

export default {
  index() {
    return Api().get( "campaigns" );
  },
  create() {
    return Api().post( "campaigns" );
  }
};
