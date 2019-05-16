import Api from "@/services";

export default {
  indexHelp(){
    return Api().get("help-categories");
  },
  createCategories( content ){
    return Api().post( "help-categories", content );
  },
  getAllCategories() {
    return Api().get( "help-categories" );
  }
}
