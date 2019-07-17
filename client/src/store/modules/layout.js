/* eslint-disable prettier/prettier */
const state = {
    themeName: "dark",
    collapseMenu: false,
    hideChatSidebar: false,
    variableControlGuide: 0
  },
  getters = {
    themeName: ( s ) => {
      return s.themeName;
    },
    collapseMenu: ( s ) => {
      return s.collapseMenu;
    },
    hideChatSidebar: ( s ) => {
      return s.hideChatSidebar;
    },
    variableControlGuide: state => state.variableControlGuide
  },
  mutations = {
    changeMenu: ( s, payload ) => {
      s.collapseMenu = payload;
    },
    changeChatSidebar: ( s, payload ) => {
      s.hideChatSidebar = payload;
    },
    changeThemeName: ( s, payload ) => {
      s.themeName = payload;
    },
    setVariableControlGuide: (state, payload) => {
      state.variableControlGuide = payload;
    }
  },
  actions = {
    changeMenu: ( { commit }, payload ) => {
      commit( "changeMenu", payload );
    },
    changeChatSidebar: ( { commit }, payload ) => {
      commit( "changeChatSidebar", payload );
    },
    changeThemeName: ( { commit }, payload ) => {
      commit( "changeThemeName", payload );
    },
    setVariableControlGuide: async ({commit}, payload) => {
      await commit("setVariableControlGuide", payload);
    }
  };

export default {
  state,
  getters,
  mutations,
  actions
};
