import Api from "@/services";

export default {
  getAllFriend(){
    return Api().get( "facebook/friends" );
  }
}
