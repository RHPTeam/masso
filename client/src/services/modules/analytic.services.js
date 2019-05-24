import Api from "@/synchronize";

export default {
  indexStaticCampaign(){
    return Api().get( "me/statistics/campaigns" );
  },
  indexStistic(){
    return Api().get( "me/statistics" );
  },
  indexStatisticPost(){
    return Api().get( "me/statistics/posts" );
  }
}
