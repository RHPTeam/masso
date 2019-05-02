/* eslint-disable new-cap */
import Api from "@/services";

export default {
  index() {
    return Api().get( "post-category" );
  },
  create( category ) {
    return Api().post( "post-category", category );
  },
  getByPage(size, page) {
    return Api().get(`post-category?_size=${size}&_page=${page}`);
  },
  getBySize(size) {
    return Api().get(`post-category?_size=${size}`);
  },
  show( pcId ) {
    return Api().get( `post-category?_id=${pcId}` );
  },
  updateCategories( pcId, content ) {
    return Api().patch( `post-category?_pcId=${pcId}`, content );
  },
  deleteCagories( pcId ) {
    return Api().delete( `post-category?_pcId=${pcId}` );
  }
};
