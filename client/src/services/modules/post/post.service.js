/* eslint-disable new-cap */
import Api from "@/services";

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
  },

  // get Newest Post
  getNewestPost( number ) {
    return Api().get( `posts/newest?number=${number}` );
  }
};
