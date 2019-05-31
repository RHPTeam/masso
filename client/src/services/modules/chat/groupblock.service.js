import Api from "@/services"

export default {
    // get all block scripts
    getAllGroupBlock(){
        return Api().get("group-block");
    },

    // create a group block
    createAGroupBlock(){
        return Api().post("group-block");
    },

    // update group block
    updateGroupBlock( groupId, content ){
        return Api().patch(`group-block?_groupId=${groupId}`, content);
    },

    // delete group block
    deleteGroupBlock( group ){
        return Api().delete(`group-block?_groupId=${group.groupId}&_type=default`);
    },

    // create block in a group
    createBlockInGroup( groupId ){
        return Api().post(`group-block/add-block?_groupId=${groupId}`);
    },

    // get all block in a group
    getAllBlockInGroupById( idGroup ){
        return Api().get(`group-block?_id=${idGroup}`);
    },

    // get infor block group
    getInforBlockGroup( id ){
        console.log("id api");
        console.log(id);
        return Api().get(`block?_id=${id}`);
    }
}