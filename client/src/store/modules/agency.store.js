import AgencyServices from "@/services/modules/agency.services";
import CookieFunction from "@/utils/functions/cookie";

const state = {
  agency: {},
  agencyStatus: "",
  errorStatus: "",
  errorAgency: "",
  infoMember: {},
  memberAgency: [],
  member: {}
};
const getters = {
  agency: state => state.agency,
  agencyStatus: state => state.agencyStatus,
  errorStatus: state => state.errorStatus,
  errorAgency: state => state.errorAgency,
  infoMember: state => state.infoMember,
  member: state => state.member,
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
    state.member = payload;
  },
  setMemberOfAgency: (state, payload) => {
    state.memberAgency = payload;
  },
  setInfoMemberAgency: (state, payload) => {
    state.infoMember = payload;
  }
};
const actions = {
  /**
   * @Description create member by agency.
   * @param commit
   * @param payload information member receiver
   * @returns fresh info of agency and list member of agency. If have error then respond error
   */
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
  /**
   * @Description get uid on cookie header and request get info agency from server
   * @param commit info of agency, list member
   * @returns Object have info agency
   */
  getInfoAgency: async ({commit}) => {
    commit("agency_request");
    const agencyId = CookieFunction.getCookie("uid");
    const result = await AgencyServices.getInfo(agencyId);
    commit("setAgency", result.data.data);
    commit("setMemberOfAgency", result.data.data.customer.listOfUser);
    commit("agency_success");
  },
  /**
   * @Description get info member of agency
   * @param commit info member for variable
   * @param payload is id of member
   * @returns Object have info member
   */
  getInfoMember: async ({commit}, payload) => {
    commit("agency_request");
    const result = await AgencyServices.getInfoMember(payload);
    commit("setMemberAgency", result.data.data);
    commit("agency_success");
  },
  /**
   * @Description expire for member by agency: request server with date expire and id member then return data of agency
   * @param commit info of member after expired and info of agency
   * @param payload contain date and id of member
   * @returns Object have info member and agency
   */
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
  /**
   * @Description update sub domain of agency
   * @param commit info of agency after update
   * @param payload is sub domain
   * @returns Object contain info agency
   */
  updateAgencyInfo: async ({commit}, payload) => {
    commit("agency_request");
    const result = await AgencyServices.updateAgencyInfo( CookieFunction.getCookie("uid"), payload );
    commit("setAgency", result.data.data);
    commit("agency_success");
  },
  /**
   * @Description search member of agency with email or number phone
   * @param commit object contain info member
   * @param payload is email or number phone of member
   * @returns object contain info member
   */
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
