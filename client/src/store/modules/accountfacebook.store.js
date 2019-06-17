import AccountFacebookChatService from "@/services/modules/accountfacebook.service";
import GroupFacebookServices from "@/services/modules/post/groupfacebook.service";
import PageFacebookServices from "@/services/modules/post/pagefacebook.service";

const state = {
  addAccountError: "",
  accountsFB: [],
  fbAccountInfo: {},
  facebookStatus: "",
  statusDeleteFacebook: ""
};
const getters = {
  addAccountError: state => state.addAccountError,
  accountsFB: state => state.accountsFB,
  fbAccountInfo: state => state.fbAccountInfo,
  facebookStatus: state => state.facebookStatus,
  statusDeleteFacebook: state => state.statusDeleteFacebook
};

const mutations = {
  addAccountError: (state, payload) => {
    state.addAccountError = payload;
  },
  facebook_request: state => {
    state.facebookStatus = "loading";
  },
  facebook_success: state => {
    state.facebookStatus = "success";
  },
  facebook_error: state => {
    state.facebookStatus = "error";
  },
  setAccountsFB: (state, payload) => {
    state.accountsFB = payload;
  },
  setFbAccountInfo: (state, payload) => {
    state.fbAccountInfo = payload;
  },
  statusDeleteFacebook_request: state =>
    (state.statusDeleteFacebook = "loading"),
  statusDeleteFacebook_success: state =>
    (state.statusDeleteFacebook = "success"),

  addNewAccountFacebook: (state, payload) => {
    state.accountsFB.push(payload);
  }
};

const actions = {
  addCookie: async ({ commit }, payload) => {
    try {
      commit("facebook_request");
      const dataSender = {
        cookie: payload
      };
      const result = await AccountFacebookChatService.create(dataSender);
      await commit("addNewAccountFacebook", result.data.data);

      // Update facebook pages and groups
      await PageFacebookServices.update();
      await GroupFacebookServices.update();

      commit("facebook_success");
    } catch (e) {
      if (e.response.status === 403) commit("addAccountError", "error");
      commit("facebook_success");
    }
  },
  deleteAccountFacebook: async ({ commit, state }, payload) => {
    commit("statusDeleteFacebook_request");
    state.accountsFB.map((account, index, list) => {
      if (account._id === payload) return list.splice(index, 1);
    });
    await commit("setAccountsFB", state.accountsFB);
    const accountsFB = await AccountFacebookChatService.delete(payload);
    //  = await AccountFacebookChatService.index();
    await commit("setAccountsFB", accountsFB.data.data);
    commit("statusDeleteFacebook_success");
  },
  getAccountsFB: async ({ commit }) => {
    commit("facebook_request");
    const accountsFB = await AccountFacebookChatService.index();
    await commit("setAccountsFB", accountsFB.data.data);
    commit("facebook_success");
  },
  getFBAccountById: async ({ commit }, payload) => {
    const res = await AccountFacebookChatService.getFBAccountById( payload );
    await commit( "setFbAccountInfo", res.data.data );
  },
  setAddAccountErrorEmpty: async ({ commit }) => {
    commit("addAccountError", "");
  },
  updateFacebook: async ({ commit }, payload) => {
    try {
      commit("facebook_request");
      const dataSender = {
        cookie: payload.cookie
      };
      await AccountFacebookChatService.update(payload.fbId , dataSender);
      // If status === true then index account.
      const result = await AccountFacebookChatService.index();
      await commit("addNewAccountFacebook", result.data.data);
      commit("facebook_success");

    } catch (e) {
      if (e.response.status === 403) commit("addAccountError", "error");
      commit("facebook_success");
    }
  }
};
export default {
  state,
  getters,
  mutations,
  actions
};
