import BroadcastService from "@/services/modules/chat/broadcast.service";

const state = {
  allBroadcasts: [],
  allBroadcastsStatus: ""
};
const getters = {
  allBroadcasts: ( state ) => state.allBroadcasts,
  allBroadcastsStatus: ( state ) => state.allBroadcastsStatus
};
const mutations = {
  setAllBroadcasts: ( state, payload ) => {
    state.allBroadcasts = payload;
  },
  setAllBroadcastsStatus: ( state, payload ) => {
    state.allBroadcastsStatus = payload;
  }
};
const actions = {
  getAllBroadcasts: async ( { commit } ) => {
    commit( "setAllBroadcastsStatus", "loading" );
    const res = await BroadcastService.index();
    console.log(res);
    await commit( "setAllBroadcasts", res.data.data );
    commit( "setAllBroadcastsStatus", "success" )
  }
};
export default {
  state,
  getters,
  mutations,
  actions
};
