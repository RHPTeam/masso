/* eslint-disable new-cap */
import Api from "@/services";

export default {
  index() {
    return Api().get( "posts" );
  },
  createNewPost() {
    return Api().post( "posts" );
  }
};
