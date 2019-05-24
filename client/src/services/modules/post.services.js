/* eslint-disable new-cap */
import Api from "@/synchronize";

export default {
  index() {
    return Api().get( "posts" );
  },
  createNewPost() {
    return Api().post( "posts" );
  },
  getById( postId ) {
    return Api().get( `posts?_id=${postId}` );
  },
  getByCategories( categoryId ) {
    return Api().get( `posts?_categoryId=${categoryId}` );
  },
  getPostsByPage( size, page ) {
    return Api().get( `posts?_size=${size}&_page=${page}` );
  },
  updatePost ( postId, content ) {
    return Api().patch( `posts?_postId=${postId}`, content );
  },
  updateAttachmentPost ( postId, content ) {
    return Api().patch( `posts?_postId=${postId}`, content );
  },
  deleteAttachmentPost ( postId, attachmentId ) {
    return Api().delete( `posts?_postId=${postId}&_attachmentId=${attachmentId}` );
  },
  deletePost( id ) {
    return Api().delete( `posts?_postId=${id}` );
  }
};
