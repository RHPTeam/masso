import AgencyServices from "@/services/modules/agency.services";
import CookieFunction from "@/utils/functions/cookie";

const state = {
  agency: {},
  agencyStatus: "",
  memberAgency: [],
  memberInfo: {}
};
const getters = {
  agency: state => state.agency,
  agencyStatus: state => state.agencyStatus,
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
  setMemberAgency: (state, payload) => {
    state.memberInfo = payload;
  },
  setMemberOfAgency: (state, payload) => {
    state.memberAgency = payload;
  }
};
const actions = {
  createNewMember: async ({commit}, payload) => {
    commit("agency_request");
    await AgencyServices.create(payload);
    const agencyId = CookieFunction.getCookie("uid");
    const result = await AgencyServices.getInfo(agencyId);
    commit("setAgency", result.data.data);
    commit("agency_success");
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
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}
