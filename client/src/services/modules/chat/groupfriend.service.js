import Api from "@/services"

export default{
    // create a group in friend
    createGroupFriend(){
        return Api().post("group-friend");
    },

    // get all group friend
    getAllGroupFriends(){
        return Api().get( "group-friend" );
    },

}