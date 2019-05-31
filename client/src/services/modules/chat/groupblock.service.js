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
        console.log("groupId api");
        console.log(idGroup);
        return Api().get(`group-block?_id=${idGroup}`);
    }
}