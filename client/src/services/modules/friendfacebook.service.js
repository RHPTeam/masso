import Api from "@/services";

export default {
  getAllFriend(){
    return Api().get( "facebook/friends" );
  },
  getAllFriendFB( id ) {
    return Api().get( `friend?_fbId=${id}` );
  },
  getFriendFriendById ( id ) {
    return Api().get( `friend?_id=${id}` );
  }
}
