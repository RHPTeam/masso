import Api from "@/services";

export default {
  createNewCategory( name ) {
    return Api().post( "help-categories", name );
  },
  getNewCategory() {
    return Api().get( "help-categories" );
  }
}
