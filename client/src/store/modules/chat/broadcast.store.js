import BroadcastService from "@/services/modules/chat/broadcast.service";

const state = {
  allBroadcasts: [],
  allBroadcastsStatus: "",
  scheduleBlocks: [],
};
const getters = {
  allBroadcasts: ( state ) => state.allBroadcasts,
  allBroadcastsStatus: ( state ) => state.allBroadcastsStatus,
  scheduleBlocks: ( state ) => state.scheduleBlocks,
};
const mutations = {
  setAllBroadcasts: ( state, payload ) => {
    state.allBroadcasts = payload;
  },
  setAllBroadcastsStatus: ( state, payload ) => {
    state.allBroadcastsStatus = payload;
  },
  setScheduleBlocks: ( state, payload ) => {
    state.scheduleBlocks = payload;
  }
};
const actions = {
  getAllBroadcasts: async ( { commit } ) => {
    commit( "setAllBroadcastsStatus", "loading" );
    // Get all broadcasts
    const res = await BroadcastService.index(),
      allBroadcasts = res.data.data;

    await commit( "setAllBroadcasts", allBroadcasts );

    // Get all blocks of schedule broadcast
    const scheduleBroadcast = allBroadcasts.filter( ( item ) => {
      return item.typeBroadCast === "Thiết lập bộ hẹn";
    } );
    await commit( "setScheduleBlocks", scheduleBroadcast[0].blocks );

    commit( "setAllBroadcastsStatus", "success" )
  }
};
export default {
  state,
  getters,
  mutations,
  actions
};
