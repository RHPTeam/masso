
import EventsServices from "@/services/modules/events.services";
import CampaignsServices from "@/services/modules/campaigns.services";

import ArrayFunction from "@/utils/functions/array";

const state = {
  events: [],
  event: {
    title: "",
    color: "#85CFFF",
    type_event: 0,
    break_point: 15,
    started_at: new Date,
    post_custom: [],
    target_custom: []
  },
  errorEvent: [],
  statusEvent: "",
  caseEvent: {
    post: 0, // 0: None, 1: Category, 2: Custom
    target: 0, // 0: None, 1: Category, 2: Custom
    libraries: 0 // 0: All, 1: Libraries
  }
};
const getters = {
  events: ( state ) => {
    return state.events;
  },
  event: ( state ) => {
    return state.event;
  },
  errorEvent: state => state.errorEvent,
  statusEvent: state => state.statusEvent,
  caseEvent: state => state.caseEvent
};
const mutations = {
  setEvents: ( state, payload ) => {
    state.events = payload;
  },
  setEventDetail: ( state, payload ) => {
    state.eventDetail = payload;
  },
  setErrorEvent: ( state, payload ) => {
    state.errorEvent = payload;
  },
  set_event: ( state, payload ) => {
    state.event[ payload.key ] = payload.value;
    console.log(state.event);
  },
  set_event_special: ( state, payload ) => {
    state.event[ payload.key ] = state.event[ payload.key ].concat( payload.value );
    state.event[ payload.key ] = ArrayFunction.removeDuplicateObject( state.event[ payload.key ], "id" )
    console.log(state.event);
  },
  set_event_push: ( state, payload ) => {
    state.event[ payload.key ].push( payload.value );
    state.event[ payload.key ] = [ ...new Set( state.event[ payload.key ] ) ];
    console.log( state.event )
  },
  set_caseEvent: ( state, payload ) => {
    state.caseEvent[ payload.key ] = payload.value;
    console.log( state.caseEvent );
  },
  ev_request: state => {
    state.statusEvent = 'loading';
  },
  ev_success: state => {
    state.statusEvent = 'success';
  }
};
const actions = {
  createdNewEvent: async ( { commit }, payload ) => {
    commit( "ev_request");
    await EventsServices.create(payload.campaignsId, payload.content);
    const campaignDetail = await CampaignsServices.getCampaignById( payload.campaignsId );
    await commit( "setCampaignDetail", campaignDetail.data.data );
    commit( "ev_success");
  },
  getAllEvents: async ( { commit } ) => {
    const res = await EventsServices.index();
    await commit( "setEvents", res.data.data );
  },
  getEventById: async ( { commit }, payload ) => {
    const res = await EventsServices.getEventById( payload );
    await  commit( "setEventDetail", res.data.data );
  },
  updateEvent: async ( { commit }, payload ) => {
    console.log(payload);
    console.log(payload.content._id);
    const res = await EventsServices.updateEvent( payload.content._id, payload.content );
    await  commit( "setEventDetail", res.data.data );
    //update campaign detail
    const campaignDetail = await CampaignsServices.getCampaignById( payload.campId );
    await commit( "setCampaignDetail", campaignDetail.data.data );
  },
  setEvent: ( { commit }, payload ) => {
    commit( "set_event", payload );
  },
  setCaseEvent: ( { commit }, payload ) => {
    commit( "set_caseEvent", payload );
  },
  setEventSpecial: ( { commit }, payload ) => {
    commit( "set_event_special", payload );
  },
  setEventPush: ( { commit }, payload ) => {
    commit( "set_event_push", payload );
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
