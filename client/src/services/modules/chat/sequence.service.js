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
  },

  // create a new block for sequence 
  createBlockInASequence( id ){
    return Api().post(`sequence/addBlock?_sqId=${id}`);
  },
  // get block sequence by id
  getAllBlockSequenceById( id ){
    return Api().get(`sequence?_id=${id}`);
  },
  // update time  sequence
  updateTimeSequence(sqId, blockId, content){
    return Api().patch(`sequence?_sqId=${sqId}&_blockId=${blockId}`, content);
  }
};
