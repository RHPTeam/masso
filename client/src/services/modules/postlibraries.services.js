import Api from "@/services";

export default {
  index(){
    return Api().get( "post-facebook" );
  },
  create( data ){
    return Api().post( "post-facebook", data );
  },
  getById( postId ) {
    return Api().get( `post-facebook?_id=${postId}` );
  },
  updatePost ( postId, content ) {
    return Api().patch( `post-facebook?_postFacebookId=${postId}`, content );
  },
  updateAttachmentPost ( postId, content ) {
    return Api().patch( `post-facebook?_postFacebookId=${postId}`, content );
  },
  deletePostFacebook( postId ){
    return Api().delete( `post-facebook?_postFacebookId=${postId}`);
  }
}
