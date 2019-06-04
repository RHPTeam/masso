import PostScheduleService from "@/services/modules/post/postschedule.service";

const state = {

};
const getters = {

};
const mutations = {

};
const actions = {
  postNow: async ( { commit }, payload ) => {
    await PostScheduleService.postNow( payload.id, payload.dataSender );
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}
