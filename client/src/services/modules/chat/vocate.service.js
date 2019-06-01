import Api from "@/services"

export default {
  createVocate(name){
    return Api().post("vocate", name);
  },
 getAllVocate () {
   return Api().get( "vocate");
 },
  getVocateById(id){
    return Api().get(`vocate?_id=${id}`);
  },
  deleteVocate(id){
    return Api().delete(`vocate?_vocateId=${id}`);
  }
}
