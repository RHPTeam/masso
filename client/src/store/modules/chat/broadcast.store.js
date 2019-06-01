import StringFunction from "@/utils/functions/string";
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
  /**
   * Create a block of schedule broadcast
   * @param commit
   * @param payload is schedule broadcast id
   */
  createScheduleBlock: async ( { commit }, payload ) => {
    commit("setBroadcastStatus", "loading");
    await BroadcastService.createScheduleBlock( payload );

    // Get all broadcasts
    const res = await BroadcastService.index(),
      allBroadcasts = res.data.data;

    await commit( "setAllBroadcasts", allBroadcasts );

    // Get all blocks of schedule broadcast
    const scheduleBroadcast = allBroadcasts.filter( ( item ) => {
      return StringFunction.convertUnicode( item.typeBroadCast ).toLowerCase() === "thiet lap bo hen";
    } );
    await commit( "setScheduleBlocks", scheduleBroadcast[0].blocks );

    commit("setBroadcastStatus", "success");
  },
  /**
   * Create content item on schedule block
   * @param commit
   * @param payload
   * @returns {Promise<void>}
   */
  createScheduleBlockItem: async ( { commit }, payload ) => {
    await BroadcastService.createScheduleBlockItem(
      state.allBroadcasts[1]._id,
      payload.scheduleBlockId,
      payload.type
    );
    const resultShowData = await BroadcastService.getScheduleBlockById(
      state.allBroadcasts[1]._id,
      payload.scheduleBlockId
    );
    commit("setScheduleBlockDetail", resultShowData.data.data[0]);
  },
  /**
   * Get all broadcasts and set data for schedule blocks
   * @param commit
   * @returns {Promise<void>}
   */
  getAllBroadcasts: async ( { commit } ) => {
    commit( "setBroadcastStatus", "loading" );
    // Get all broadcasts
    const res = await BroadcastService.index(),
      allBroadcasts = res.data.data;

    await commit( "setAllBroadcasts", allBroadcasts );

    // Get all blocks of schedule broadcast
    const scheduleBroadcast = allBroadcasts.filter( ( item ) => {
      return StringFunction.convertUnicode( item.typeBroadCast ).toLowerCase() === "thiet lap bo hen";
    } );
    await commit( "setScheduleBlocks", scheduleBroadcast[0].blocks );

    commit( "setBroadcastStatus", "success" );
  },
  /**
   * Get schedule block detail by id
   * @param commit
   * @param payload is block detail id
   */
  getScheduleBlockDetailById: async ( { commit }, payload ) => {
    // Get all broadcast
    const res = await BroadcastService.index(),
      allBroadcasts = res.data.data;

    // Get schedule broadcast
    const scheduleBroadcast = allBroadcasts.filter( ( item ) => {
      return StringFunction.convertUnicode( item.typeBroadCast ).toLowerCase() === "thiet lap bo hen";
    } );

    // Find schedule block by id
    const scheduleBlock = scheduleBroadcast[0].blocks.filter( ( item ) => {
      return item._id === payload;
    } );

    await commit( "setScheduleBlockDetail", scheduleBlock[0] );
  },
  /**
   * Set data for schedule block detail
   * @param commit
   * @param payload is a schedule block
   */
  setScheduleBlockDetail: ( { commit }, payload ) => {
    commit( "setScheduleBlockDetail", payload );
  },
  /**
   * Update time setting of schedule block
   */
  updateTimeSettingScheduleBlockDetail: async ( { commit }, payload ) => {
    // Update
    await BroadcastService.updateTimeSettingScheduleBlock(
      state.allBroadcasts[1]._id,
      payload.blockId,
      payload.type,
      payload.block
    );

    // Get all broadcasts
    const res = await BroadcastService.index(),
      allBroadcasts = res.data.data;

    await commit( "setAllBroadcasts", allBroadcasts );

    // Get all blocks of schedule broadcast
    const scheduleBroadcast = allBroadcasts.filter( ( item ) => {
      return StringFunction.convertUnicode( item.typeBroadCast ).toLowerCase() === "thiet lap bo hen";
    } );

    await commit( "setScheduleBlocks", scheduleBroadcast[0].blocks );
  }
};
export default {
  state,
  getters,
  mutations,
  actions
};
