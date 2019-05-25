/* eslint-disable new-cap */
import Api from "@/services";

export default {
  index() {
    return Api().get( "post-group" );
  },
  create( postGroup ) {
    return Api().post( "post-group", postGroup );
  },
  delete( id ) {
    return Api().delete( `post-group?_postGroupId=${id}` );
  },
  getPostGroupById( id ) {
    return Api().get( `post-group?_id=${id}` );
  },
  updatePostGroup( data ) {
    const dataSender = {
      title: data.title,
      _pages: data._pages,
      _groups: data._groups
    };

    return Api().patch( `post-group?_postGroupId=${data.postGroupId}`, dataSender )
  }
};
