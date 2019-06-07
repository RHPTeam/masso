import Api from "@/services";

export default {
  getAllFriend(){
    return Api().get( "facebook/friends" );
  },
  getFriendsByChat(){
    return Api().post( "friend");
  },
  getAllFriendFB( id ) {
    return Api().get( `friend?_fbId=${id}` );
  },
  getFriendFriendById ( id ) {
    return Api().get( `friend?_id=${id}` );
  },
  getFriendBySize ( size, page ){
    return Api().post( `friend?_size=${size}&_page=${page}` );
  }
}
