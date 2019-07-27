/* eslint-disable new-cap */
import Api from "@/services";

export default {
  index() {
    return Api().get( "posts" );
  },
  createNewPost() {
    return Api().post( "posts" );
  },
  createPostByContent( post ) {
    return Api().post( "posts/create", post );
  },
  getById( postId ) {
    return Api().get( `posts?_id=${postId}` );
  },
  getByCategories( categoryId, size, page ) {
    return Api().get( `posts?_categoryId=${categoryId}&_size=${size}&_page=${page}` );
  },
  getPostsByPage( size, page ) {
    return Api().get( `posts?_size=${size}&_page=${page}` );
  },
  searchByKey(keyword, size, page){
    return Api().post(`posts/search?keyword=${keyword}&_size=${size}&_page=${page}`);
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
  uploadAttachments( files ) {
    return Api().post( `posts/upload`, files );
  },

  // get Newest Post
  getNewestPost( number ) {
    return Api().get( `posts/newest?number=${number}` );
  }
};
