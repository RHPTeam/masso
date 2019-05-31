import BroadcastService from "@/services/modules/chat/broadcast.service";

const state = {
  allBroadcasts: [],
  broadcastStatus: "",
  scheduleBlocks: [],
  scheduleBlockDetail: {}
};
const getters = {
  allBroadcasts: ( state ) => state.allBroadcasts,
  broadcastStatus: ( state ) => state.allBroadcastsStatus,
  scheduleBlocks: ( state ) => state.scheduleBlocks,
  scheduleBlockDetail: ( state ) => state.scheduleBlockDetail
};
const mutations = {
  setAllBroadcasts: ( state, payload ) => {
    state.allBroadcasts = payload;
  },
  setBroadcastStatus: ( state, payload ) => {
    state.allBroadcastsStatus = payload;
  },
  setScheduleBlocks: ( state, payload ) => {
    state.scheduleBlocks = payload;
  },
  setScheduleBlockDetail: ( state, payload ) => {
    state.scheduleBlockDetail = payload;
  },
};
const actions = {
  createScheduleBlock: async ( { commit }, payload ) => {
    commit("setBroadcastStatus", "loading");
    await BroadcastService.createScheduleBlock( payload );

    // Get all broadcasts
    const res = await BroadcastService.index(),
      allBroadcasts = res.data.data;

    await commit( "setAllBroadcasts", allBroadcasts );

    // Get all blocks of schedule broadcast
    const scheduleBroadcast = allBroadcasts.filter( ( item ) => {
      return item.typeBroadCast === "Thiết lập bộ hẹn";
    } );
    await commit( "setScheduleBlocks", scheduleBroadcast[0].blocks );

    commit("setBroadcastStatus", "success");
  },
  getAllBroadcasts: async ( { commit } ) => {
    commit( "setBroadcastStatus", "loading" );
    // Get all broadcasts
    const res = await BroadcastService.index(),
      allBroadcasts = res.data.data;

    await commit( "setAllBroadcasts", allBroadcasts );

    // Get all blocks of schedule broadcast
    const scheduleBroadcast = allBroadcasts.filter( ( item ) => {
      return item.typeBroadCast === "Thiết lập bộ hẹn";
    } );
    await commit( "setScheduleBlocks", scheduleBroadcast[0].blocks );

    commit( "setBroadcastStatus", "success" );
  },
  getScheduleBlockDetail: ( { commit }, payload ) => {
    commit( "setScheduleBlockDetail", payload );
  },
  /**
   * Get schedule block detail by id
   * @param commit
   * @param payload is block detail id
   * @returns {Promise<void>}
   */
  getScheduleBlockDetailById: async ( { commit }, payload ) => {
    // Get all broadcast
    const res = await BroadcastService.index(),
      allBroadcasts = res.data.data;

    // Get schedule broadcast
    const scheduleBroadcast = allBroadcasts.filter( ( item ) => {
      return item.typeBroadCast === "Thiết lập bộ hẹn";
    } );

    // Find schedule block by id
    const scheduleBlock = scheduleBroadcast[0].blocks.filter( ( item ) => {
      return item._id === payload;
    } );

    await commit( "setScheduleBlockDetail", scheduleBlock[0] );
  }
};
export default {
  state,
  getters,
  mutations,
  actions
};
