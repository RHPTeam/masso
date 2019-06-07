import Api from "@/services"

export default {
  /**
   *
   * @param grId
   * @param data has id friend
   * @returns {*}
   */
  addFriendGroup( grId, data ){
    return Api().post(`group-friend/addFriend?_groupId=${grId}`, data);
  },
    // create a item in friend
    createGroupFriend( name ){
        return Api().post("group-friend?_name=true", name);
    },

    // get all item friend
    getAllGroupFriends(){
        return Api().get("group-friend");
    },

    // get info group friend by id
    getInfoGroupFriend( id ){
      return Api().get(`group-friend?_id=${id}`);
    },

    // update item friend
    updateGroupFriend( id, content){
        return Api().patch(`group-friend?_groupId=${id}`, content );
    },

    // delete item friend
    deleteGroupFriends( id ){
        return Api().put(`group-friend?_groupId=${id}`)
    }

}
