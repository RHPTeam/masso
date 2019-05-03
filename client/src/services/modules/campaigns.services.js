/* eslint-disable new-cap */
import Api from "@/services";

export default {
  index() {
    return Api().get( "campaigns" );
  },
  create( campaign ) {
    return Api().post( "campaigns", campaign );
  },
  delete( id ) {
    return Api().delete( `campaigns?_campaignId=${id}` );
  },
  getCampaignById( id ) {
    return Api().get( `campaigns?_id=${id}` );
  },
  updateStatus( id ) {
    return Api().patch( `campaigns?_campaignId=${id}&_type=status` );
  }
};
