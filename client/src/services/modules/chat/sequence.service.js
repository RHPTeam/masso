import Api from "@/services";

export default {
  createNewSequence(){
    return Api().post("sequence");
  },

  // get all sequence
  getAllSequence(){
    return Api().get("sequence");
  },

  // delete sequence
  deleteASequence( id ){
    return Api().delete(`sequence?_sqId=${id}`);
  },

  // get id a sequence
  getSequenceById( id ){
    return Api().get(`sequence?_id=${id}`);
  },

  //update sequence 
  updateSequence( id, content ){
    return Api().patch(`sequence?_sqId=${id}`, content);
  }
};
