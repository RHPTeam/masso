import Api from "@/services"

export default {
  /**
   *
   * @param grId
   * @param data has userID friends get from Facebook
   * @returns {*}
   */
  addFriendGroup( grId, data ){
    return Api().post(`group-friends/addFriend?_groupId=${grId}`, data);
  },
    // create a item in friends
    createGroupFriend( name ){
        return Api().post("group-friends?_name=true", name);
    },

    // get all item friends
    getAllGroupFriends(){
        return Api().get("group-friends");
    },

    // get info group friends by id
    getInfoGroupFriend( id ){
      return Api().get(`group-friends?_id=${id}`);
    },

    // update item friends
    updateGroupFriend( id, content){
        return Api().patch(`group-friends?_groupId=${id}`, content );
    },

    // delete item friends
    deleteGroupFriends( id ){
        return Api().put(`group-friends?_groupId=${id}`)
    },
  deleteFriendsOnGroup( groupId,friendId ){
    return Api().put(`group-friends?_groupId=${groupId}&_friend=true`, friendId);
  }

}
