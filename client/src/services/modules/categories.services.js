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
  updateCategories( cateId, content ) {
    return Api().patch( `post-categories?_categoryId=${cateId}`, content );
  },
  deleteCagories( cateId ) {
    return Api().delete( `post-categories?_categoryId=${cateId}` );
  }
};
