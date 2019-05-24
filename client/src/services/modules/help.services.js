import Api from "@/synchronize";

export default {
  indexHelp(){
    return Api().get("help-categories");
  },
  createCategories( content ){
    return Api().post( "help-categories", content );
  },
  getAllCategories() {
    return Api().get( "help-categories" );
  },
  getCateById( id ) {
    return Api().get( `help-categories?_id=${id}` )
  }
}
