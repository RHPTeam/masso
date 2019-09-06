import FacebookFriendServices from "@/services/modules/friendfacebook.service";
import CookieFunction from "@/utils/functions/cookie";

const state = {
  allFriend: [],
  friendFacebook: [],
  friendFacebookDefault: [],
  numberPageFriendCurrent: 2,
  frStatus: ""
};
const getters = {
  allFriend: state => state.allFriend,
  friendFacebook: state => state.friendFacebook,
  friendFacebookDefault: state => state.friendFacebookDefault,
  frStatus: state => state.frStatus
};
const mutations = {
  fr_request: state => {
    state.frStatus = 'loading';
  },
  fr_success: state => {
    state.frStatus = 'success';
  },
  setAllFriend: ( state, payload ) => {
    state.allFriend = payload;
  },
  setAllFriendFacebook: ( state, payload ) => {
    state.friendFacebook = payload;
  },
  setFriendFacebookDefault: (state, payload) => {
    state.friendFacebookDefault = payload;
  },
  setFriendFacebookBySize: (state, payload) => {
    state.friendFacebookDefault = state.friendFacebookDefault.concat(payload.data);
    state.numberPageFriendCurrent = payload.number;
  }
};
const actions = {
  getAllFriendFb: async ( {commit} ) => {
    commit( "fr_request" );
    const result =  await FacebookFriendServices.getAllFriend();
    commit( "setAllFriend", result.data.data.results );
    commit( "fr_success" );
  },
  getAllFriendFacebook: async ( {commit} ) => {
    commit( "fr_request" );

    const result =  await FacebookFriendServices.getAllFriendFB(
      CookieFunction.getCookie("uid")
    );
    commit( "setAllFriendFacebook", result.data.data );
    commit( "fr_request" );
  },
  getFriendFacebookBySizeDefault: async ({commit}, payload) => {
    commit( "fr_request" );
    const result = await FacebookFriendServices.getFriendBySize(
      payload.size,
      payload.page
    );
    commit("setFriendFacebookDefault", result.data.data.results);
    commit( "fr_request" );
  },
  getFriendFacebookBySize: async ( {commit}, payload ) => {
    commit( "fr_request" );
    const result = await FacebookFriendServices.getFriendBySize(
      payload.size,
      payload.page
    );
    commit("setFriendFacebookBySize", {
      data: result.data.data.results,
      number: result.data.data.page
    });
    commit( "fr_request" );
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}
