/* eslint-disable new-cap */
import Api from "@/services";

export default {
  index() {
    return Api().get( "campaigns" );
  },
  create( campaign ) {
    const dataSender = {
      "title": campaign.title,
      "description": campaign.description,
      "started_at": campaign.startedAt,
      "finished_at": campaign.finishedAt
    };

    return Api().post( "campaigns", dataSender );
  },
  updateStatus( id ) {
    return Api().patch( `campaigns?_campId=${id}&_type=status` );
  }
};
