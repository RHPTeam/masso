import AgencyServices from "@/services/modules/agency.services";
import CookieFunction from "@/utils/functions/cookie";

const state = {
  agency: {},
  agencyStatus: "",
  errorStatus: "",
  error: "",
  memberAgency: [],
  memberInfo: {}
};
const getters = {
  agency: state => state.agency,
  agencyStatus: state => state.agencyStatus,
  errorStatus: state => state.errorStatus,
  error: state => state.error,
  memberInfo: state => state.memberInfo,
  memberAgency: state => state.memberAgency
};
const mutations = {
  agency_request: state =>  {
    state.agencyStatus = "loading";
  },
  agency_success: state => {
    state.agencyStatus = "success";
  },
  setAgency: (state, payload) => {
    state.agency = payload;
  },
  setErrorAgency: (state, payload) => {
    state.error = payload;
  },
  setMemberAgency: (state, payload) => {
    state.memberInfo = payload;
  },
  setMemberOfAgency: (state, payload) => {
    state.memberAgency = payload;
  },
  setErrorStatus: (state, payload) => {
    state.errorStatus = payload;
  }
};
const actions = {
  createNewMember: async ({commit}, payload) => {
    try {
      commit("agency_request");
      await AgencyServices.create(payload);
      const agencyId = CookieFunction.getCookie("uid");
      const result = await AgencyServices.getInfo(agencyId);
      commit("setAgency", result.data.data);
      commit("setMemberOfAgency", result.data.data.customer.listOfUser);
      commit("agency_success");
    } catch (e) {
      if (e.response.status === 403) {
        commit("setErrorStatus", "error");
        commit("setErrorAgency", e.response.data.phone);
      } else if (e.response.status === 405) {
        commit("setErrorStatus", "error");
        commit("setErrorAgency", e.response.data.phone);
      }
    }
  },
  getInfoAgency: async ({commit}) => {
    commit("agency_request");
    const agencyId = CookieFunction.getCookie("uid");
    const result = await AgencyServices.getInfo(agencyId);
    commit("setAgency", result.data.data);
    commit("setMemberOfAgency", result.data.data.customer.listOfUser);
    commit("agency_success");
  },
  getInfoMember: async ({commit}, payload) => {
    commit("agency_request");
    const result = await AgencyServices.getInfoMember(payload);
    commit("setMemberAgency", result.data.data);
    commit("agency_success");
  },
  expireMember: async ({commit}, payload) => {
    commit("agency_request");
    const objSender = {
      expireDate: payload.expireDate
    };
    const result = await AgencyServices.expireInfoMember(payload.userId, objSender);
    commit("setMemberAgency", result.data.data);
    commit("agency_success");
  },
  updateAgencyInfo: async ({commit}, payload) => {
    commit("agency_request");
    const result = await AgencyServices.updateAgencyInfo( CookieFunction.getCookie("uid"), payload );
    commit("setAgency", result.data.data);
    commit("agency_success");
  },
  searchMemberByAgency: async ({commit}, payload) => {
    commit("agency_request");
    const agencyId = CookieFunction.getCookie("uid");
    // const objSender = {
    //   value: payload
    // };
    const result = await AgencyServices.searchMember(agencyId, payload);
    console.log(result.data.data);
    commit("agency_success");
  }

};

export default {
  state,
  getters,
  mutations,
  actions
}
