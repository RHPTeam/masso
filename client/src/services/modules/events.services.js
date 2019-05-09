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
  updateEvent( data ) {
    return Api().patch( `events?_eventId=${data.eventId}`, data.event );
  }
};
