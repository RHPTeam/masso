
import EventsServices from "@/services/modules/events.services";
import CampaignsServices from "@/services/modules/campaigns.services";

const state = {
    events: [],
    eventDetail: {},
    errorEvent: []
  },
  getters = {
    events: ( state ) => {
      return state.events;
    },
    eventDetail: ( state ) => {
      return state.eventDetail;
    },
    errorEvent: state => state.errorEvent
  },
  mutations = {
    setEvents: ( state, payload ) => {
      state.events = payload;
    },
    setEventDetail: ( state, payload ) => {
      state.eventDetail = payload;
    },
    setErrorEvent: ( state, payload ) => {
      state.errorEvent = payload;
    }
  },
  actions = {
  createdNewEvent: async ( { commit }, payload ) => {
    try {
      await EventsServices.create(payload.campaignsId, payload.content);
      const result = EventsServices.index();
      commit( "setEvents", result.data.data );
    } catch (e) {
      console.log(e.response);
      if(e.response.status === 403) commit( "setErrorEvent", e.response.data )
    }
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
      const res = await EventsServices.updateEvent( payload );

      await  commit( "setEventDetail", res.data.data );

      //update campaign detail
       const campaignDetail = await CampaignsServices.getCampaignById( payload.campId );

      await commit( "setCampaignDetail", campaignDetail.data.data );
    }
  };

export default {
  state,
  getters,
  mutations,
  actions
};
