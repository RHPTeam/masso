import GroupFriend from "@/services/modules/chat/groupfriend.service";

const state = {
    // all item friends
    allGroupFriends: [],
    allCreateGroupFriends: [],
    idGroupFriend: [],
  groupFriend: {},
  groupStatus: "",
  friendsOfGroup: [],
  selectedUIDs: [],
  uidSelectDelete: []
};
const getters = {
    // all item friends
    allGroupFriends: state => state.allGroupFriends,
    allCreateGroupFriends: state => state.allCreateGroupFriends,
    idGroupFriend: state => state.idGroupFriend,
  groupFriend: state => state.groupFriend,
  groupStatus: state => state.groupStatus,
  friendsOfGroup: state => state.friendsOfGroup,
  selectedUIDs: state => state.selectedUIDs,
  uidSelectDelete: state => state.uidSelectDelete
};
const mutations = {
  group_request: (state) => {
    state.groupStatus = "loading";
  },
  group_success: (state) => {
    state.groupStatus = "success";
  },
    // set create item friends
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
  setListFriendOfGroup: (state, payload) => {
    state.friendsOfGroup  = payload;
  },
  selectedUIDs: (state, payload) => {
    state.selectedUIDs = payload;
  },
  uidSelectDelete: (state, payload) => {
    state.uidSelectDelete = payload;
  }

}
const actions = {
  /**
   *
   * @param commit: status, setGroup, setAll item
   * @param payload: Array id friends
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
    commit("setAllGroupFriend", resultAllGroup.data.data.data);
    commit("group_success");
  },
    // create item friends
  createGroupFriend: async ({ commit }, payload) => {
      await GroupFriend.createGroupFriend( payload );

      const rsGetAllGroup = await GroupFriend.getAllGroupFriends();
      commit("setAllGroupFriend", rsGetAllGroup.data.data.data);
    },

    // get all item friends
  getAllGroupFriend: async ( { commit } ) => {
        const rsGetAllGroup = await GroupFriend.getAllGroupFriends();
        commit("setAllGroupFriend", rsGetAllGroup.data.data.data);
    },
    // update Group friends
    updateGroupFriend: async ( { commit }, payload ) => {
        await GroupFriend.updateGroupFriend( payload._id, payload );
        const rsGetAllGroup = await GroupFriend.getAllGroupFriends();
    },

    // get Id Group Friend
  getGroupFriendById: async ( { commit }, payload ) => {
    const rsGetId = await GroupFriend.getInfoGroupFriend( payload );
    commit("setGroupFriend", rsGetId.data.data.data);
    commit("setListFriendOfGroup", rsGetId.data.data.friends);

  },

    // delete item friends
    deleteGroupFriend: async ( { commit }, payload ) => {
        await GroupFriend.deleteGroupFriends( payload._id );
        const rsDelete = await GroupFriend.getAllGroupFriends();
        commit("setAllGroupFriend", rsDelete.data.data.data);

        // const rsGetAllGroup = await GroupFriend.getAllGroupFriends();
        // commit("setAllGroupFriend", rsGetAllGroup.data.data);
    },
  deleteFriendFromGroup: async ({commit}, payload) => {
    commit("group_request");
    const dataSender = {
      friendId: payload.friendsId
    };
    await GroupFriend.deleteFriendsOnGroup(payload.gr_id, dataSender);

    const rsGetId = await GroupFriend.getInfoGroupFriend( payload.gr_id );
    commit("setGroupFriend", rsGetId.data.data.data);
    commit("setListFriendOfGroup", rsGetId.data.data.friends);

    commit("group_success");
  },
  selectedUIDs: async ({commit}, payload) => {
    commit("selectedUIDs", payload);
  },
  selectDeleteUID: async ({commit}, payload) => {
    commit("uidSelectDelete", payload);
  }
};

export default {
    state,
    getters,
    mutations,
    actions
}
