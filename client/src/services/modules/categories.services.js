/* eslint-disable new-cap */
import Api from "@/services";

export default {
  index() {
    return Api().get( "post-categories" );
  },
  create( categories ) {
    return Api().post( "post-categories", categories );
  },
  getByPage(size, page) {
    return Api().get(`post-categories?_size=${size}&_page=${page}`);
  },
  getBySize(size) {
    return Api().get(`post-categories?_size=${size}`);
  },
  show( pcId ) {
    return Api().get( `post-categories?_id=${pcId}` );
  },
  updateCategories( pcId, content ) {
    return Api().patch( `post-categories?_pcId=${pcId}`, content );
  },
  deleteCagories( pcId ) {
    return Api().delete( `post-categories?_pcId=${pcId}` );
  }
};
