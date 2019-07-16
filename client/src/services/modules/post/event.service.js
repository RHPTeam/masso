/* eslint-disable new-cap */
import Api from "@/services";

export default {
  index() {
    return Api().get( "events" );
  },
  addAdvanceContent() {
    return Api().patch();
  },
  create( campaignsId, event ) {
    return Api().post( `events?_campaignId=${campaignsId}`, event );
  },
  duplicate( eventId, data ) {
    return Api().post( `events/duplicate?_eventId=${ eventId }`, data );
  },
  getEventById( id ) {
    return Api().get( `events?_id=${id}` );
  },
  updateEvent( eventId, data ) {
    return Api().patch( `events?_eventId=${eventId}`, data );
  },
  delete( eventId ){
    return Api().delete(`events?_eventId=${eventId}`);
  }
};
