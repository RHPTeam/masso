import AgencyServices from "@/services/modules/agency.services";
import CookieFunction from "@/utils/functions/cookie";

const state = {
  agency: {},
  agencyStatus: "",
  variableControlAgency: 0
};
const getters = {
  agency: state => state.agency,
  agencyStatus: state => state.agencyStatus,
  variableControlAgency: state => state.variableControlAgency
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
    commit("agency_success");
  },
  getInfoMember: async ({commit}, payload) => {
    commit("agency_request");
    const result = await AgencyServices.getInfoMember(payload);
    console.log(result.data.data);
    commit("setAgency", result.data.data);
    commit("agency_success");
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}
