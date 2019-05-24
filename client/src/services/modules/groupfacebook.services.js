/* eslint-disable new-cap */
import Api from "@/synchronize";

export default {
  index() {
    return Api().get( "group-facebook" );
  },
  update() {
    return Api().patch( "group-facebook" );
  },
};
