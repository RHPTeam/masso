import PostScheduleService from "@/services/modules/post/postschedule.service";

const state = {
  allPostSchedules: []
};
const getters = {
  allPostSchedules: ( state ) => state.allPostSchedules.reverse()
};
const mutations = {
  setAllPostSchedules: ( state, payload ) => {
    state.allPostSchedules = payload;
  }
};
const actions = {
  getAllPostSchedules: async ( { commit } ) => {
    const res = await PostScheduleService.index();
    await commit( "setAllPostSchedules", res.data.data );
  },
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
