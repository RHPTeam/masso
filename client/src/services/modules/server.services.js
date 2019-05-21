import Api from "@/services"

export default {
  index(){
    return Api().get( "vps" );
  },
  create( data ) {
    return Api().post( "vps", data );
  },
  getVpsById( id ) {
    return Api().get( `vps?_id=${id}` );
  },
  updateVps( serverId ){
    return Api().patch( `vps?_serverId=${serverId}` );
  },
  deleteVps( serverId ){
    return Api().delete( `vps?_serverId=${serverId}` );
  }
}
