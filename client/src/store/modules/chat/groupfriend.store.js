import GroupFriend from "@/services/modules/chat/groupfriend.service";

const state = {
    // all group friends
    allGroupFriends: [],
    allCreateGroupFriends: [],
    idGroupFriend: []
}
const getters = {
    // all group friends
    allGroupFriends: state => state.allGroupFriends,
    allCreateGroupFriends: state => state.allCreateGroupFriends,
    idGroupFriend: state => state.idGroupFriend

}
const mutations = {
    // set create group friend
    setCreateGroup: (state, payload) => {
        state.allCreateGroupFriends = payload;
    },
    // all group friends
    setAllGroupFriend: (state, payload) => {
        state.allGroupFriends = payload;
    },
    // get id 
    setIdGroupFriend: (state, payload) => {
        state.idGroupFriend = payload;
    },
    // update

}
const actions = {
    // create group friend
    createGroup: async ({ commit }, payload) => {
        const rsCreateGroup = await GroupFriend.createGroupFriend( payload );
        commit("setCreateGroup", rsCreateGroup.data.data);

        const rsGetAllGroup = await GroupFriend.getAllGroupFriends();
        commit("setAllGroupFriend", rsGetAllGroup.data.data);
    },

    // get all group friend
    getAllGroupWhenCreate: async ( { commit } ) => {
        const rsGetAllGroup = await GroupFriend.getAllGroupFriends();
        commit("setAllGroupFriend", rsGetAllGroup.data.data);
    },
    // update Group friend
    updateGroupFriend: async ( { commit }, payload ) => {
        console.log("payloadupdate");
        console.log(payload);

        await GroupFriend.updateGroupFriend( payload._id, payload );
        const rsUpdate = GroupFriend.getAllGroupFriends();
        commit("setAllGroupFriend", rsUpdate.data.data);

        console.log("rsUpdate.data.data");
        console.log(rsUpdate);
    },

    // get Id Group Friend
    getIdGroupFriend: async ( { commit }, payload ) => {
        const rsGetId = await GroupFriend.getIdGroupFriend( payload );
        commit("setIdGroupFriend", rsGetId.data.data);
    },

    // delete group friend
    deleteGroupFriend: async ( { commit }, payload ) => {
        await GroupFriend.deleteGroupFriends( payload._id );
        const rsDelete = await GroupFriend.getAllGroupFriends();
        commit("setAllGroupFriend", rsDelete.data.data);

        const rsGetAllGroup = await GroupFriend.getAllGroupFriends();
        commit("setAllGroupFriend", rsGetAllGroup.data.data);
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}