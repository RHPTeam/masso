import Api from "@/synchronize";

export default {
  getAllFriend(){
    return Api().get( "facebook/friends" );
  }
}
