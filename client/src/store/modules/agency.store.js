import AgencyServices from "@/services/modules/agency.services";
import CookieFunction from "@/utils/functions/cookie";

const state = {
  agency: {},
  agencyStatus: "",
  errorStatus: "",
  errorAgency: "",
  infoOfMember: {},
  memberAgency: [],
  memberInfo: {}
};
const getters = {
  agency: state => state.agency,
  agencyStatus: state => state.agencyStatus,
  errorStatus: state => state.errorStatus,
  errorAgency: state => state.errorAgency,
  infoOfMember: state => state.infoOfMember,
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
  setErrorEmail: (state, payload) => {
    state.errorAgency = payload;
  },
  setErrorPhone: (state, payload) => {
    state.errorAgency = payload;
  },
  setMemberAgency: (state, payload) => {
    state.memberInfo = payload;
  },
  setMemberOfAgency: (state, payload) => {
    state.memberAgency = payload;
  },
  setInfoMemberAgency: (state, payload) => {
    state.infoOfMember = payload;
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
        commit("setErrorEmail", "Email đã tồn tại!");
      } 
      if (e.response.status === 405) {
        commit("setErrorPhone", "Số điện thoại đã tồn tại!");
      }
      commit("agency_request");
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
    //get agency info after update expire for member
    const agencyId = CookieFunction.getCookie("uid");
    const resultAgencyInfo = await AgencyServices.getInfo(agencyId);
    commit("setAgency", resultAgencyInfo.data.data);

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
    const result = await AgencyServices.searchMember(agencyId, payload);
    commit("setInfoMemberAgency", result.data.data);

    commit("agency_success");
  }

};

export default {
  state,
  getters,
  mutations,
  actions
}
