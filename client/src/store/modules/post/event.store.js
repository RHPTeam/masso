
import EventsServices from "@/synchronize/modules/events.synchronize";
import CampaignsServices from "@/synchronize/modules/campaigns.synchronize";

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
    libraries: 0, // 0: All, 1: Libraries
    popup: false
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
  setEvent: ( state, payload ) => {
    state.event = payload;
  },
  setCaseEvent: ( state, payload ) => {
    state.caseEvent = payload;
  },
  setErrorEvent: ( state, payload ) => {
    state.errorEvent = payload;
  },
  set_event: ( state, payload ) => {
    state.event[ payload.key ] = payload.value;
    console.log(state.event);
  },
  set_event_special: ( state, payload ) => {
    let tempPage = [], temGroup = [];
    state.event[ payload.key ] = state.event[ payload.key ].concat( payload.value );

    tempPage = state.event[ payload.key ].filter( target => target.typeTarget === 1 );
    console.log( tempPage );
    tempPage = ArrayFunction.removeDuplicateObject( tempPage, "target", "pageId" );

    temGroup = state.event[ payload.key ].filter( target => target.typeTarget === 0 );
    temGroup = ArrayFunction.removeDuplicateObject( temGroup, "target", "groupId" );

    state.event[ payload.key ] = tempPage.concat( temGroup );
    console.log(state.event[ payload.key ] )
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
  set_event_remove: ( state, payload ) => {
    delete state.event[ payload ];
    console.log( state.event );
  },
  ev_request: state => {
    state.statusEvent = 'loading';
  },
  ev_success: state => {
    state.statusEvent = 'success';
  }
};
const actions = {
  createEvent: async ( { commit }, payload ) => {
    commit( "ev_request");
    if ( payload.event.type_event === 0 ) {
      payload.event.target_custom = payload.event.target_custom.map( target => {
        if ( target.typeTarget === 0 ) {
          return {
            id: target.target.groupId,
            typeTarget: target.typeTarget
          }
        } else if ( target.typeTarget === 1 ) {
          return {
            id: target.target.pageId,
            typeTarget: target.typeTarget
          }
        }
      } );
    }
    await EventsServices.create(payload.campaignId, payload.event);
    const campaignDetail = await CampaignsServices.getCampaignById( payload.campaignId );
    await commit( "setCampaignDetail", campaignDetail.data.data );
    commit( "ev_success");
  },
  getAllEvents: async ( { commit } ) => {
    const res = await EventsServices.index();
    await commit( "setEvents", res.data.data );
  },
  getEventById: async ( { commit, state }, payload ) => {
    const res = await EventsServices.getEventById( payload );
    await  commit( "setEvent", res.data.data );
    console.log( res.data.data );
    commit( "set_caseEvent", {
      key: "post",
      value: res.data.data.post_custom.length > 0 ? 2 : 1
    } );
    commit( "set_caseEvent", {
      key: "target",
      value: res.data.data.target_custom.length > 0 ? 2 : 1
    } );
  },
  updateEvent: async ( { commit }, payload ) => {
    if ( payload.event.type_event === 0 ) {
      payload.event.target_custom = payload.event.target_custom.map( target => {
        if ( target.typeTarget === 0 ) {
          return {
            id: target.target.groupId,
            typeTarget: target.typeTarget
          }
        } else if ( target.typeTarget === 1 ) {
          return {
            id: target.target.pageId,
            typeTarget: target.typeTarget
          }
        }
      } );
    }
    const res = await EventsServices.updateEvent( payload.event._id, payload.event );
    await  commit( "setEvent", res.data.data );
    //update campaign detail
    const campaignDetail = await CampaignsServices.getCampaignById( payload.campaignId );
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
  },
  setEventRemove: ( { commit }, payload ) => {
    commit( "set_event_remove", payload );
  },
  setEventReset: ( { commit } ) => {
    commit( "setEvent", {
      title: "",
      color: "#85CFFF",
      type_event: 0,
      break_point: 15,
      started_at: new Date,
      post_custom: [],
      target_custom: []
    } );
    commit( "setCaseEvent", {
      post: 0, // 0: None, 1: Category, 2: Custom
      target: 0, // 0: None, 1: Category, 2: Custom
      libraries: 0, // 0: All, 1: Libraries
      popup: false
    } );
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
