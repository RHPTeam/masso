/* eslint-disable new-cap */
import Api from "@/services";

export default {
  index() {
    return Api().get( "events" );
  },
  create( campaignsId, event ) {
    return Api().post( `events?_campaignId=${campaignsId}`, event );
  },
  getEventById( id ) {
    return Api().get( `events?_id=${id}` );
  },
  updateEvent( eventId, data ) {
    return Api().patch( `events?_eventId=${eventId}`, data );
  }
};
