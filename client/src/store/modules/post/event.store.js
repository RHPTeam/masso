import EventsServices from "@/services/modules/post/event.service";
import CampaignsServices from "@/services/modules/post/campaign.service";

const state = {
  events: [],
  event: {
    title: "",
    color: "#85CFFF",
    type_event: 0,
    break_point: 15,
    started_at: new Date,
    post_custom: [],
    post_category: "",
    target_custom: [],
    target_category: null,
    timeline: [],
    plugins: "",
  },
  errorEvent: [],
  statusEvent: "",
  caseEvent: {
    post: 0, // 0: None, 1: Category, 2: Custom
    target: 0, // 0: None, 1: Category, 2: Custom, 3: Timeline
    libraries: 0, // 0: All, 1: Libraries,
    active: 1, // 0: Active
    listPost: 1, // 0: Category, 1: Custom
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
  },
  set_event_special: ( state, payload ) => {
    if ( payload.typeTarget === 0 ) {
      // remove all old selected groups
      const arr = state.event[ payload.key ].filter( ( target ) => {
        return target.typeTarget === 1;
      } );
      // update new selected groups
      state.event[ payload.key ] = arr.concat( payload.value );
    } else {
      // remove all old selected pages
      const arr = state.event[ payload.key ].filter( ( target ) => {
        return target.typeTarget === 0;
      } );
      // update new selected pages
      state.event[ payload.key ] = arr.concat( payload.value );
    }
  },
  set_event_push: ( state, payload ) => {
    state.event[ payload.key ].push( payload.value );
    state.event[ payload.key ] = [ ...new Set( state.event[ payload.key ] ) ];
  },
  set_caseEvent: ( state, payload ) => {
    state.caseEvent[ payload.key ] = payload.value;
  },
  set_event_remove: ( state, payload ) => {
    delete state.event[ payload ];
  },
  set_event_post_remove: ( state, payload ) => {
    const postCustom = state.event.post_custom,
      res = postCustom.filter( ( item ) => {
      return item._id !== payload;
    } );

    state.event.post_custom = res;
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
    // Check type event then result array contain group facebook and fan page facebook type =0 : group, type = 1 fan page
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
    // check post by category if it empty then delete
    if ( payload.event.post_category === "" ) {
      delete payload.event.post_category;
    }
    // check post custom if it empty then delete
    if ( payload.event.post_custom.length === 0 ) {
      delete payload.event.post_custom;
    }

    if ( payload.event.post_custom && payload.event.post_custom.length > 0 )  {
      payload.event.post_custom  =  payload.event.post_custom.map( item => item._id );
    }

    if ( payload.event.timeline && payload.event.timeline.length > 0 )  {
      payload.event.timeline  =  payload.event.timeline.map( item => item._id );
    }

    if ( payload.event.plugins === "" ) {
      delete payload.event.plugins;
    }

    await EventsServices.create(payload.campaignId, payload.event);
    const campaignDetail = await CampaignsServices.getCampaignById( payload.campaignId );
    await commit( "setCampaignDetail", campaignDetail.data.data );
    commit( "ev_success");
  },
  duplicateEvent: async ( { commit }, payload ) => {
    await EventsServices.duplicate( payload.eventId, payload.data );
  },
  getAllEvents: async ( { commit } ) => {
    const res = await EventsServices.index();
    await commit( "setEvents", res.data.data );
  },
  getEventById: async ( { commit, state }, payload ) => {
    const res = await EventsServices.getEventById( payload );
    if ( res.data.data.plugins === undefined ) {
      res.data.data.plugins = "";
    }
    await  commit( "setEvent", res.data.data );
    commit( "set_caseEvent", {
      key: "post",
      value: res.data.data.post_custom.length > 0 ? 2 : 1
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
    if ( payload.event.post_category === "" ) {
      delete payload.event.post_category;
    }
    if ( payload.event.post_custom && payload.event.post_custom.length === 0 ) {
      delete payload.event.post_custom;
    }
    if ( payload.event.post_custom && payload.event.post_custom.length > 0 )  {
      payload.event.post_custom  =  payload.event.post_custom.map( item => item._id );
    }
    if ( payload.event.plugins === "" ) {
      delete payload.event.plugins;
    }

    const res = await EventsServices.updateEvent( payload.event._id, payload.event );
    await  commit( "setEvent", res.data.data );
    //update campaign detail
    const campaignDetail = await CampaignsServices.getCampaignById( payload.campaignId );
    await commit( "setCampaignDetail", campaignDetail.data.data );
  },
  deleteEvent: async ({commit}, payload) => {
    await EventsServices.delete(payload.eventId);
    const result = await EventsServices.index();
    await commit( "setEvents", result.data.data );
    //update campaign detail
    const campaignDetail = await CampaignsServices.getCampaignById( payload.campaignId );
    await commit( "setCampaignDetail", campaignDetail.data.data );
  },
  setErrorEvent: ( { commit }, payload ) => {
    commit( "setErrorEvent", payload );
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
  setEventPostRemove: ( { commit }, payload ) => {
    commit( "set_event_post_remove", payload )
  },
  setEventReset: ( { commit } ) => {
    commit( "setEvent", {
      title: "",
      color: "#85CFFF",
      type_event: 0,
      break_point: 15,
      started_at: new Date,
      post_category: "",
      post_custom: [],
      target_custom: [],
      timeline: [],
      plugins: ""
    } );
    commit( "setCaseEvent", {
      post: 1, // 0: None, 1: Category, 2: Custom
      target: 0, // 0: None, 1: Category, 2: Custom, 3: Timeline
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
