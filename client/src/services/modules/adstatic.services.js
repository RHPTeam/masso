import Api from "@/services";

export default {
  indexStistic(){
    return Api().get( "ads/statistics" );
  }
}
