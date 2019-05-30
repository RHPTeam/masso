import Api from "@/services"

export default{
    // create a group in friend
    createGroupFriend( name ){
        return Api().post("group-friend?_name=true", name);
    },

    // get all group friend
    getAllGroupFriends(){
        return Api().get("group-friend");
    },

    // update group friend

    updateGroupFriend( id, content){
        return Api().patch(`group-friend?_groupId=${id}`, content );
    }

}