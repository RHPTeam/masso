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
  duplicate( id ) {
    return Api().post( `campaigns/duplicate?_campaignId=${id}` );
  },
  getCampaignById( id ) {
    return Api().get( `campaigns?_id=${id}` );
  },
  getCampaignsByPage( size, page ) {
    return Api().get( `campaigns?_size=${size}&_page=${page}` );
  },
  updateCampaign( data ) {
    return Api().patch( `campaigns?_campaignId=${data.campId}`, data.campaign );
  },
  updateStatus( id ) {
    return Api().patch( `campaigns?_campaignId=${id}&_type=status` );
  }
};
