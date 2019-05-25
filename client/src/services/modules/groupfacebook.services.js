/* eslint-disable new-cap */
import Api from "@/services";

export default {
  index() {
    return Api().get( "group-facebook" );
  },
  update() {
    return Api().patch( "group-facebook" );
  },
};
