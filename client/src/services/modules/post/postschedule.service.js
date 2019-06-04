/* eslint-disable new-cap */
import Api from "@/services";

export default {
  postNow( id, dataSender ) {
    return Api().post( `posts/now/?_postId=${id}`, dataSender );
  },
};
