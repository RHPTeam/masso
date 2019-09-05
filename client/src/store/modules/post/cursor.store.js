const state = {
  actionPopup: Number,
  gestureUser: Number,
  gestureCursorMenuUser: Number
};
const getters = {
  actionPopup: state => state.actionPopup,
  // Action gesture show button
  gestureUser: state => state.gestureUser,
  // Action gesture show tab menu
  gestureCursorMenuUser: state => state.gestureCursorMenuUser
};
const mutations = {
  setActionCursor: (state, payload) => {
    state.gestureUser = payload;
  },
  setActionCursorMenu: (state, payload) => {
    state.gestureCursorMenuUser = payload;
  },
  setActionPopup: (state, payload) => {
    state.actionPopup = payload;
  }
};
const actions = {
  // Action cursor post show button
  /*
      // Posts
      11: Tat ca bai viet
      12: Danh muc
      13: Danh muc mau
      14: Filter Category
      15: Create post
      16: Create Category
      17: Loadmore post
      18: loadmore category
      19: loadmore campaign
      // Setup Account
      61: Tên người dùng
      62: Số điện thoại
      63: Thay đổi mật khẩu
      // Campaign
      20: Create campaign
      
  */
  actionCursor: ({ commit }, payload) => {
    commit("setActionCursor", payload);
  },
  // Action gesture tab menu
  /*
      0: Dashboard
      1: Posts
      2: Campaign
      3: Post group
      4: Account Fb
      5: Search Fb
      6: Setup account
      7: Pricing Plan
  */
  actionCursorMenu: ({ commit }, payload) => {
    commit("setActionCursorMenu", payload);
  },

  // action when create and back for popup
  /*
    113: Return step
    114: Done
  */
 actionPopup: ({ commit }, payload) => {
   commit("setActionPopup", payload);
 }
};

export default {
  state,
  getters,
  mutations,
  actions
};
