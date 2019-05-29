import GroupFriend from "@/services/modules/chat/groupfriend.service";

const state = {
    // all group friends
    allGroupFriends: []
}
const getters = {
    // all group friends
    allGroupFriends: state => state.allGroupFriends

}
const mutations = {
    // set create group friend
    setCreateGroup: (state, payload) => {
        // state.
    },
    // all group friends
    setAllGroupFriend: (state, payload) => {
        state.allGroupFriends = payload;
    }
}
const actions = {
    // create group friend
    createGroup: async ({ commit }, payload) => {
        const rsCreateGroup = await GroupFriend.createGroupFriend( payload );
        commit("setCreateGroup", rsCreateGroup.data.data);
    },

    // get all group friend
    getAllGroupFriend: async ( { commit } ) => {
        const rsGetAllGroup = await GroupFriend.getAllGroupFriends();
        commit("setAllGroupFriend", rsGetAllGroup.data.data);
        console.log(rsGetAllGroup.data.data);
    },
    // update Group friend
    updateGroupFriend: async ( { commit }, payload ) => {
        const rsUpdate = await GroupFriend.updateGroupFriend( payload._id, payload);
        commit("setUpdateGroupFriend", rsUpdate.data.data);
        console.log("rsUpdate.data.data");
        console.log(rsUpdate.data.data);
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}