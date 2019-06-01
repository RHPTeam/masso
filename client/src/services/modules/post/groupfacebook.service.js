/* eslint-disable new-cap */
import Api from "@/services";

export default {
  index() {
    return Api().get( "item-facebook" );
  },
  update() {
    return Api().patch( "item-facebook" );
  },
};
