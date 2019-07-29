import FriendFacebookStore from  "@/services/modules/chat/friend.services";

const state = {
  currentPage: 1,
  friendStatus: "",
  friend:  [],
  friends: []
};
const getters = {
  friendStatus: state  => state.friendStatus,
  friend: state  => state.friend,
  friends: state => state.friends,
  currentPage: state => state.currentPage
};
const mutations = {
  friend_request: state => {
    state.friendStatus = "loading";
  },
  friend_success: state => {
    state.friendStatus = "success";
  },
  setFriends: (state, payload) => {
    state.friends = payload;
  },
  setFriend: (state, payload) => {
    state.friend = payload;
  },
  setPage: (state, payload) =>  {
    state.currentPage = payload;
  }
};
const actions = {
  getAllFriendFbChat: async  ({commit}) => {
    commit("friend_request");
    const result = await FriendFacebookStore.index();
    commit("setFriends", result.data.data);
    commit("friend_success");
  },
  getFriendFbChatBySize: async ({commit}, payload)  => {
    commit("friend_request");
    const result =  await FriendFacebookStore.getBySize(payload.size, payload.page);
    await commit("setFriends", result.data.data.results);
    await commit("setPage", result.data.data.page);
    commit("friend_success");
  },
  getFriendChatById: async  ({commit}, payload) => {
    commit("friend_request");
    const result  = await FriendFacebookStore.getById(payload);
    commit("setFriend", result.data.data);
    commit("friend_success");
  },
  updateFriendFacebookForSystem: async ({commit}, payload) =>  {
    commit("friend_request");
    const results =  await FriendFacebookStore.create(payload.size, payload.page);
    commit("setFriends", results.data.data.results);
    commit("setPage", results.data.data.page);
    commit("friend_success");
  },
  searchFriendFacebookChat: async ({commit}, payload) => {
    commit("friend_request");

    const result = await FriendFacebookStore.searchFriend(payload.keyword, payload.size, payload.page);
    console.log(result.data.data);
    commit("setFriends", result.data.data.results);
    commit("setPage", result.data.data.page);

    commit("friend_success");
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}
