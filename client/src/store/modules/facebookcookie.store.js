import AccountFacebookService from "@/services/modules/accountfacebook.services";

const state = {
  addAccountError: "",
  allAccountFb: [],
  fbStatus: "",
  statusDeleteFb: ""
};
const getters = {
  allAccountFb: state => state.allAccountFb,
  addAccountError: state => state.addAccountError,
  fbStatus: state => state.fbStatus,
  statusDeleteFb: state => state.statusDeleteFb,
};
const mutations = {
  addAccountError: ( state, payload ) => {
    state.addAccountError = payload;
  },
  fb_request: state => {
    state.fbStatus = 'loading';
  },
  fb_success: state => {
    state.fbStatus = 'success';
  },
  setAllAccount: ( state, payload ) => {
    state.allAccountFb = payload;
  },
  setAccountFb: ( state, payload ) => {
    state.setAccountFb = payload;
  },
  statusDeleteFb_request: state =>
    (state.statusDeleteFb = "loading"),
  statusDeleteFb_success: state =>
    (state.statusDeleteFb = "success"),
  addNewAccountFacebook: ( state, payload ) => {
    state.allAccountFb.push( payload  );
  }
};
const actions = {
  createlAccountFb: async ( {commit}, payload ) => {
    try {
      commit( "fb_request" );
      const dataSender = {
        cookie: payload
      };
      const result = await AccountFacebookService.createAccountFb( dataSender );
      // FriendsFacebookService.create(result.data.data._id);
      await commit( "addNewAccountFacebook", result.data.data );
      commit( "fb_success" );
    } catch ( e ) {
      // if ( e.response.status === 403 ) commit( "addAccountError", "errors" );
      // commit( "fb_success" );
    }
  },
  getAllAccountFb: async ( {commit} ) => {
    commit( "fb_request" );
    const res = await AccountFacebookService.getAllAccountFb();
    commit( "setAllAccount", res.data.data );
    commit( "fb_success" );
  },
  getAccountFbById: async ( {commit}, payload ) => {
    commit( "fb_request" );
    const results = await AccountFacebookService.getFBAccountById( payload );
    commit( "setAccountFb", results.data.data );
    commit( "fb_success" );
  },
  updateAccountFb: async ( {commit}, payload ) => {
    try {
      commit( "fb_request" );
      const dataSender = {
        cookie: payload.cookie
      };
      await AccountFacebookService.updateCookieFb( payload.fbId , dataSender );
      const result = await AccountFacebookService.getAllAccountFb();
      await commit( "addNewAccountFacebook", result.data.data );
      commit( "fb_success" );

    } catch (e) {
      if (e.response.status === 403) commit( "addAccountError", "error" );
      commit( "fb_success" );
    }
  },
  deleteAccountFb: async ( { commit, state }, payload ) => {
    commit( "statusDeleteFb_request" );
    state.allAccountFb.map(( account, index, list ) => {
      if ( account._id === payload ) return list.splice( index, 1 );
    });
    await commit("setAllAccount", state.allAccountFb);
    await AccountFacebookService.deleteAccountFb( payload );
    const accountsFB = await AccountFacebookService.getAllAccountFb();
    await commit( "setAllAccount", accountsFB.data.data );
    commit( "statusDeleteFb_success" );
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}
