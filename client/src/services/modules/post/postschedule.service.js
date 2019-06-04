/* eslint-disable new-cap */
import Api from "@/services";

export default {
  index() {
    return Api().get( "posts/now" );
  },
  postNow( id, dataSender ) {
    return Api().post( `posts/now/?_postId=${id}`, dataSender );
  },
};
