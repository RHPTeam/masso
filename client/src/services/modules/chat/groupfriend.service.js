import Api from "@/services"

export default {
  /**
   *
   * @param grId
   * @param data has id friends
   * @returns {*}
   */
  addFriendGroup( grId, data ){
    return Api().post(`group-friend/addFriend?_groupId=${grId}`, data);
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
      return Api().get(`group-friend?_id=${id}`);
    },

    // update item friends
    updateGroupFriend( id, content){
        return Api().patch(`group-friend?_groupId=${id}`, content );
    },

    // delete item friends
    deleteGroupFriends( id ){
        return Api().put(`group-friend?_groupId=${id}`)
    }

}
