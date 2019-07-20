import Api from "@/services";

export default {
  create(size, page){
    return Api().post(`friends?_size=${size}&_page=${page}`);
  },
  index(){
    return Api().get("friends");
  },
  getById(id){
    return Api().get(`friends?_id=${id}`);
  },
  getBySize(size, page){
    return Api().get(`friends?_size=${size}&_page=${page}`);
  }
}
