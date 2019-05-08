
import EventsServices from "@/services/modules/events.services";
import CampaignsServices from "@/services/modules/campaigns.services";

const state = {
    events: [],
    eventDetail: {},
  },
  getters = {
    events: ( s ) => {
      return s.events;
    },
    eventDetail: ( s ) => {
      return s.eventDetail;
    }
  },
  mutations = {
    setEvents: ( s, payload ) => {
      s.events = payload;
    },
    setEventDetail: ( s, payload ) => {
      s.eventDetail = payload;
    }
  },
  actions = {
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
