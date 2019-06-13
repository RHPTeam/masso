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
  searchByKey(keyword, size) {
    return Api().get(`post-categories/search?keyword=${keyword}&_size=${size}&_page=${page}`);
  },
  show( pcId ) {
    return Api().get( `post-categories?_id=${pcId}` );
  },
  updateCategory( cateId, category ) {
    return Api().patch( `post-categories?_categoryId=${cateId}`, category );
  },
  deleteCategory( cateId ) {
    return Api().delete( `post-categories?_categoryId=${cateId}` );
  }
};
