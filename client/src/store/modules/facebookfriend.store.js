import FacebookFriendServices from "@/services/modules/facebookfriend.services";

const state = {
  allFriend: [],
  frStatus: ""
};
const getters = {
  allFriend: state => state.allFriend,
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
  }
};
const actions = {
  getAllFriendFb: async ( {commit} ) => {
    commit( "fr_request" )
    const result =  await FacebookFriendServices.getAllFriend();
    // console.log( result.data.data.results );
    commit( "setAllFriend", result.data.data.results );
    commit( "fr_success" )
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}
