import AgencyServices from "@/services/modules/agency.services";
import CookieFunction from "@/utils/functions/cookie";

const state = {
  agency: {},
  agencyStatus: ""
};
const getters = {
  agency: state => state.agency,
  agencyStatus: state => state.agencyStatus,
};
const mutations = {
  agency_request: state =>  {
    state.agencyStatus = "loading";
  },
  agency_success: state => {
    state.agencyStatus = "success";
  },
  agency: (state, payload) => {
    state.agency = payload;
  }
};
const actions = {
  getInfoAgency: async ({commit}) => {
    commit("agency_request");
    const agencyId = CookieFunction.getCookie("uid");
    const result = await AgencyServices.getInfo(agencyId);
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
