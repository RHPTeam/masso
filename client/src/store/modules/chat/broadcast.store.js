import StringFunction from "@/utils/functions/string";
import BroadcastService from "@/services/modules/chat/broadcast.service";

const state = {
  allBroadcasts: [],
  broadcastStatus: "",
  scheduleBlocks: [],
  scheduleBlockDetail: {},
  idScheduleDefault: "",
  ///
  now: {
    content: [
      {
        typeContent: "text",
        valueText: "Nothing"
      }
    ],
    _friends: [],
    _account: ""
  },
  statusBroadcast: "",
  statusNow: "",
  schedules: [],
  itemBroadcasts: [],
  schedule: {},
  listFilter: [],
  infoGroupFilter: [],
  filterFriendAttribute: [],
  filterFriendCondition: [],
  filterFriendConditionIsNot: []
};
const getters = {
  allBroadcasts: ( state ) => state.allBroadcasts,
  broadcastStatus: ( state ) => state.allBroadcastsStatus,
  scheduleBlocks: ( state ) => state.scheduleBlocks,
  scheduleBlockDetail: ( state ) => state.scheduleBlockDetail,
  idScheduleDefault: ( state ) => state.idScheduleDefault,
  /// Difference
  statusBroadcast: state => state.statusBroadcast,
  statusNow: state => state.statusNow,
  schedules: state => state.schedules,
  itemBroadcasts: state => state.itemBroadcasts,
  now: state => state.now,
  schedule: state => state.schedule,
  listFilter: state => state.listFilter,
  infoGroupFilter: state => state.infoGroupFilter,
  filterFriendAttribute: state => state.filterFriendAttribute,
  filterFriendCondition: state => state.filterFriendCondition,
  filterFriendConditionIsNot: state => state.filterFriendConditionIsNot
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
  setIdScheduleDefault: (state, payload) => {
    state.idScheduleDefault = payload;
  },
  /******************** CHECK STATUS BROADCASTS *********************/
  broadcast_request: state => {
    state.statusBroadcast = "loading";
  },
  broadcast_success: state => {
    state.statusBroadcast = "success";
  },
  broadcast_error: state => {
    state.statusBroadcast = "error";
  },
  /******************** CHECK STATUS BROADCASTS NOW *********************/
  now_request: state => {
    state.statusNow = "loading";
  },
  now_success: state => {
    state.statusNow = "success";
  },
  now_error: state => {
    state.statusNow = "error";
  },
  /******************** ALL BROADCASTS *********************/
  setSchedules: (state, payload) => {
    state.schedules = payload;
  },
  setSchedule: (state, payload) => {
    state.schedule = payload;
  },
  /******************** BROADCASTS NOW *********************/
  setBroadcastsNow: (state, payload) => {
    state.now = payload;
  },
  setListFilter: (state, payload) => {
    state.listFilter = payload;
  },
  setInfoGroupFilter: (state, payload) => {
    state.infoGroupFilter = payload;
  },
  setFilterFriendAttribute: (state, payload) => {
    state.filterFriendAttribute = payload;
  },
  setFilterWithCondition: (state, payload) => {
    state.filterFriendCondition = payload;
  },
  setFilterWithConditionIsNot: (state, payload) => {
    state.filterFriendConditionIsNot = payload;
  }
};
const actions = {
  /**
   *
   */
  createItemSchedule: async ({ commit }, payload) => {
    await BroadcastService.createItemSchedule(
      payload.scheduleId,
      payload.itemId,
      payload.type
    );
    const resultShowData = await BroadcastService.showSchedule(
      payload.scheduleId,
      payload.itemId
    );
    console.log("hello");
    console.log(resultShowData.data.data);
    commit("setSchedule", resultShowData.data.data[0]);
  },
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
   *
   */
  setIdScheduleDefault: async ({commit}, payload) => {
    commit("setIdScheduleDefault", payload);
  },
  /**
   * Update time setting of schedule block
   */
  updateTimeSettingScheduleBlockDetail: async ( { commit }, payload ) => {
    // Update
    await BroadcastService.updateTimeSettingScheduleBlock(
      state.allBroadcasts[1]._id, payload.blockId, payload.type, payload.block
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
  },
  /**
   *
   */
  getSchedule: async ({ commit }, payload) => {
    const resultShowData = await BroadcastService.showSchedule(
      payload.broadId,
      payload.blockId
    );
    commit("setSchedule", resultShowData.data.data[0]);
  },
  /**
   *
   */
  updateItemSchedule: async ({ commit }, payload) => {
    await BroadcastService.updateItemSchedule(
      payload.bcId,
      payload.blockId,
      payload.contentId,
      {
        valueText: payload.value
      }
    );
  },
  updateItemImageSchedule: async ({ commit }, payload) => {
    const result = await BroadcastService.updateItemSchedule(
      payload.bcId,
      payload.blockId,
      payload.contentId,
      payload.value
    );
    commit("setSchedule", result.data.data);
  },
};
export default {
  state,
  getters,
  mutations,
  actions
};
