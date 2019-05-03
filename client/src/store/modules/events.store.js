
import EventsServices from "@/services/modules/events.services";

const state = {
    events: [],
  },
  getters = {
    events: ( s ) => {
      return s.events;
    }
  },
  mutations = {
    setEvents: ( s, payload ) => {
      s.events = payload;
    },
  },
  actions = {
    getAllEvents: async ( { commit } ) => {
      const res = await EventsServices.index();

      await commit( "setEvents", res.data.data );
    }
  };

export default {
  state,
  getters,
  mutations,
  actions
};
