import AccountServices from "@/services/modules/account.service";
import CookieFunction from "@/utils/functions/cookie";
import StringFunction from "@/utils/functions/string";

import axios from "axios";

const state = {
  status: "",
  token: CookieFunction.getCookie( "sid" ) || "",
  user: {},
  statusNotification: "",
  mailSender: "",
  statusResetPassword: false,
  textAuth: "",
  users: [],
  usersFilter: [],
  fileAvatar: "",
  roles: [],
  activeAccountError: "",
};

const getters = {
  isLoggedIn: ( state ) => !!state.token,
  status: ( state ) => state.status,
  userInfo: ( state ) => state.user,
  statusNotification: ( state ) => state.statusNotification,
  mailSender: ( state ) => state.mailSender,
  statusResetPassword: ( state ) => state.statusResetPassword,
  textAuth: ( state ) => state.textAuth,
  users: ( state ) => state.users,
  usersFilter: ( state ) => state.usersFilter,
  fileAvatar: ( state ) => state.fileAvatar,
  roles: ( state ) => state.roles,
  activeAccountError: ( state ) => state.activeAccountError,
  keywordRecentList: ( state ) => state.user.keywordSearch.reverse().splice( 0, 8 )
};

const mutations = {
  auth_request: ( state ) => {
    state.status = "loading";
  },
  auth_request_success: ( state ) => {
    state.status = "success";
  },
  auth_success: ( state ) => {
    state.status = "success";
  },
  auth_error: ( state, payload ) => {
    state.status = payload;
  },
  setUser: ( state, payload ) => {
    state.user = payload;
  },
  user_set: (state, payload) => {
    state.user = payload;
  },
  user_action: ( state, payload ) => {
    state.statusNotification = payload;
  },
  logout: ( state ) => {
    state.status = "";
    state.token = "";
  },
  updateUser: ( state, payload ) => {
    state.user = payload;
  },
  mailSender: ( state, payload ) => {
    state.mailSender = payload;
  },
  statusResetPassword_set: ( state, payload ) => {
    state.statusResetPassword = payload;
  },
  set_textAuth: ( state, payload ) => {
    state.textAuth = payload;
  },
  getUsers: ( state, payload ) => {
    state.users = payload;
  },
  getUsersFilter: ( state, payload ) => {
    state.usersFilter = payload;
  },
  setActiveAccount: ( state, payload ) => {
    state.activeAccountError = payload;
  },
  setFileAvatar: ( state, payload ) => {
    state.fileAvatar = payload;
  },
  setRoles: ( state, payload ) => {
    state.roles = payload;
  }
};

const actions = {
  logOut: async ( { commit } ) => {
    commit( "logout" );
    // remove cookie
    CookieFunction.removeCookie( "sid" );
    CookieFunction.removeCookie( "uid" );
    CookieFunction.removeCookie( "cfr" );
    CookieFunction.removeCookie( "token" );
    CookieFunction.removeCookie( "_sub" );
    CookieFunction.removeCookie( "__v" );
    // delete token on headers
    delete axios.defaults.headers["Authorization"];
  },
  getUserInfo: async ( { commit } ) => {
    commit( "auth_request" );
    const userInfoRes = await AccountServices.show(
      CookieFunction.getCookie( "uid" )
    );

    commit( "setUser", userInfoRes.data.data );
  },
  updateUser: async ( { commit }, payload ) => {
    const userInfoRes = await AccountServices.update( payload );

    commit( "updateUser", userInfoRes.data.data );
  },
  updateUserByAdmin: async ( { commit }, payload ) => {
    const res = await AccountServices.updateUserByAdmin( payload );

    commit( "updateUser", res.data.data );
    const users = await AccountServices.index();

    await commit( "getUsers", users.data.data );
  },
  deleteUsers: async ( { commit }, payload ) => {
    await AccountServices.deleteUsers( payload );
    const users = await AccountServices.index();

    await commit( "getUsersFilter", users.data.data );
  },
  changePassword: async ( { commit }, payload ) => {
    try {
      const resetPassword = {
        password: payload.password,
        newPassword: payload.newPassword
      };

      await AccountServices.changePassword( resetPassword );
      commit( "auth_success" );
    } catch ( e ) {
      if ( e.response.status === 403 ) {
        commit( "auth_error" );
        commit(
          "set_textAuth",
          "Mật khẩu cũ của bạn không đúng, vui lòng thử lại !"
        );
      }
    }
  },
  resetPassword: async ( { commit }, payload ) => {
    commit( "auth_request" );
    const sendEmail = {
      email: payload
    };

    await AccountServices.resetPassword( sendEmail );
    const userData = await AccountServices.showUserByEmail( payload );

    commit( "user_set", userData.data.data );
    commit( "mailSender", payload );
    commit( "auth_request_success" );
  },
  checkCode: async ( { commit, state }, payload ) => {
    commit( "auth_request" );
    const data = {
      code: payload,
      email: state.mailSender
    };

    await AccountServices.checkCode( data );
    commit( "auth_request_success" );
  },
  newPassword: async ( { commit, state }, payload ) => {
    commit( "auth_request" );
    const objSender = {
      newPassword: payload
    };

    await AccountServices.createNewPassword( objSender, state.user._id );
    commit( "statusResetPassword_set", true );
    commit( "auth_request_success" );
  },
  set_error: async ( { commit }, payload ) => {
    commit( "set_textAuth", payload );
    commit( "auth_error" );
  },
  getUsers: async ( { commit } ) => {
    const users = await AccountServices.index();

    await commit( "getUsers", users.data.data );
  },
  getUsersFilter: async ( { commit }, payload ) => {
    await commit( "getUsersFilter", payload );
  },
  getRoles: async ( { commit } ) => {
    const res = await AccountServices.getRoles();

    await commit( "setRoles", res.data.data );
  },
  sendFile: async ( { commit }, payload ) => {
    commit( "setFileAvatar", payload );
    await AccountServices.upload( payload );

    const result = await AccountServices.show(
      CookieFunction.getCookie( "uid" )
    );

    commit( "user_set", result.data.data );
  },
  activeAccount: async ( { commit }, payload ) => {
    commit( "setActiveAccount", "" );
    try {
      commit( "auth_request" );
      await AccountServices.active( payload );
      commit( "auth_request_success" );

      const users = await AccountServices.index();
      await commit( "getUsersFilter", users.data.data );
    }
    catch ( e ) {
    if ( e.response.status === 404 ) {
      commit(
        "setActiveAccount",
        "Mã kích hoạt không tồn tại!"
      );
    }
  }


  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
