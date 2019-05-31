import GroupFriend from "@/services/modules/chat/groupfriend.service";

const state = {
    // all item friends
    allGroupFriends: [],
    allCreateGroupFriends: [],
    idGroupFriend: [],
  groupFriend: {},
  groupStatus: "",
  selectedUIDs: []
}
const getters = {
    // all item friends
    allGroupFriends: state => state.allGroupFriends,
    allCreateGroupFriends: state => state.allCreateGroupFriends,
    idGroupFriend: state => state.idGroupFriend,
  groupFriend: state => state.groupFriend,
  groupStatus: state => state.groupStatus,
  selectedUIDs: state => state.selectedUIDs
}
const mutations = {
  group_request: (state) => {
    state.groupStatus = "loading";
  },
  group_success: (state) => {
    state.groupStatus = "success";
  },
    // set create item friend
    setCreateGroup: (state, payload) => {
        state.allCreateGroupFriends = payload;
    },
    // all item friends
    setAllGroupFriend: (state, payload) => {
        state.allGroupFriends = payload;
    },
    // get id 
    setIdGroupFriend: (state, payload) => {
        state.idGroupFriend = payload;
    },
  setGroupFriend: (state, payload) => {
    state.groupFriend = payload;
  },
  selectedUIDs: (state, payload) => {
    state.selectedUIDs = payload;
  }

}
const actions = {
  /**
   *
   * @param commit: status, setGroup, setAll item
   * @param payload: Array id friend
   * @returns {Promise<void>}
   */
  addFriendToGroup: async ({commit}, payload) =>  {
    commit("group_request");

    const dataSender = {
      friendId: payload.friendId
    };

    const result = await GroupFriend.addFriendGroup(payload.gr_id, dataSender);
    commit("setGroupFriend", result);
    const resultAllGroup = await GroupFriend.getAllGroupFriends();
    commit("setAllGroupFriend", resultAllGroup.data.data);
    commit("group_success");
  },
    // create item friend
  createGroupFriend: async ({ commit }, payload) => {
      await GroupFriend.createGroupFriend( payload );

      const rsGetAllGroup = await GroupFriend.getAllGroupFriends();
      commit("setAllGroupFriend", rsGetAllGroup.data.data);
    },

    // get all item friend
  getAllGroupFriend: async ( { commit } ) => {
        const rsGetAllGroup = await GroupFriend.getAllGroupFriends();
        commit("setAllGroupFriend", rsGetAllGroup.data.data);
    },
    // update Group friend
    updateGroupFriend: async ( { commit }, payload ) => {
        await GroupFriend.updateGroupFriend( payload._id, payload );
        const rsGetAllGroup = await GroupFriend.getAllGroupFriends();
        // commit("setAllGroupFriend", rsGetAllGroup.data.data);
    },

    // get Id Group Friend
  getGroupFriendById: async ( { commit }, payload ) => {
    const rsGetId = await GroupFriend.getInfoGroupFriend( payload );
    commit("setGroupFriend", rsGetId.data.data);
    },

    // delete item friend
    deleteGroupFriend: async ( { commit }, payload ) => {
        await GroupFriend.deleteGroupFriends( payload._id );
        const rsDelete = await GroupFriend.getAllGroupFriends();
        commit("setAllGroupFriend", rsDelete.data.data);

        // const rsGetAllGroup = await GroupFriend.getAllGroupFriends();
        // commit("setAllGroupFriend", rsGetAllGroup.data.data);
    },
  selectedUIDs: async ({commit}, payload) => {
    commit("selectedUIDs", payload);
  }
}

export default {
    state,
    getters,
    mutations,
    actions
}
