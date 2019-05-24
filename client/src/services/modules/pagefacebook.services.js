/* eslint-disable new-cap */
import Api from "@/synchronize";

export default {
  index() {
    return Api().get( "page-facebook" );
  },
  update() {
    return Api().patch( "page-facebook" );
  },
};
