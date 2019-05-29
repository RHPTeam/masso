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
    // all group friends
    setAllGroupFriend: (state, payload) => {
        state.allGroupFriends = payload;
    }
}
const actions = {
    // createGroup: async ({ commit }) => {
    //     // commit("set")
    // },

    // get all group friend
    getAllGroupFriend: async ( { commit } ) => {
        const rsGetAllGroup = await GroupFriend.getAllGroupFriends();
        commit("setAllGroupFriend", rsGetAllGroup.data.data);
        console.log(rsGetAllGroup.data.data);
    } 
}

export default {
    state,
    getters,
    mutations,
    actions
}