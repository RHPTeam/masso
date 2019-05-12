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
