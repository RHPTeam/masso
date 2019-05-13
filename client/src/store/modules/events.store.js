
import EventsServices from "@/services/modules/events.services";
import CampaignsServices from "@/services/modules/campaigns.services";

const state = {
    events: [],
    eventDetail: {},
    errorEvent: [],
    statusEvent: ""
  },
  getters = {
    events: ( state ) => {
      return state.events;
    },
    eventDetail: ( state ) => {
      return state.eventDetail;
    },
    errorEvent: state => state.errorEvent,
    statusEvent: state => state.statusEvent
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
    },
    ev_request: state => {
      state.statusEvent = 'loading';
    },
    ev_success: state => {
      state.statusEvent = 'success';
    }
  },
  actions = {
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
    }
  };

export default {
  state,
  getters,
  mutations,
  actions
};
