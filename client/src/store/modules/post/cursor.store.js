const state = {
  gestureUser: Number,
  gestureCursorMenuUser: Number
};
const getters = {
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
  }
};
const actions = {
  // Action cursor post show button
  /*
      // Posts
      11: Tat ca bai viet
      12: Danh muc
      13: Danh muc mau
      14: Filter Categoory
      15: Create post
      16: Create Category
      // Setup Account
      61: Tên người dùng
      62: Số điện thoại
      63: Thay đổi mật khẩu
  */
  actionCursor: ({ commit }, payload) => {
    commit("setActionCursor", payload);
  },
  // Action gesture tab menu
  /*
      0: Dashboard
      1: Posts
      2: Campagin
      3: Postgroup
      4: Account Fb
      5: Search Fb
      6: Setup account
      7: Pricing Plan
  */
  actionCursorMenu: ({ commit }, payload) => {
    commit("setActionCursorMenu", payload);
  },

};

export default {
  state,
  getters,
  mutations,
  actions
};
