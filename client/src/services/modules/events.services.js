/* eslint-disable new-cap */
import Api from "@/services";

export default {
  index() {
    return Api().get( "events" );
  },
  create( event ) {
    return Api().post( "events", event );
  }
};
