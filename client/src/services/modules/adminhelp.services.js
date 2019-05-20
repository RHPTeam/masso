import Api from "@/services";

export default {

  createNewCategory( name ) {
    return Api().post( "help-categories", name );
  },
  getNewCategory() {
    return Api().get( "help-categories" );
  },
  getCateById( id ){
    return Api().get( `help-categories?_id=${id}` );
  },
  // update
  updateCateById( id, content ){
    return Api().patch( `help-categories?_categoryId=${id}`, content );
  },

  // delete
  deleteCategoryAdmin( id ) {
    return Api().delete( `help-categories?_categoryId=${id}` );
  },

  // =================== Start Bolg Help
  createBlogHelpAdmin( blog ){
    return Api().post( "help-blogs", blog );
  },
  getAllBlogAdmin(){
    return Api().get( "help-blogs");
  },
  updateBlogHelp(id, content){
    return Api().patch( `help-blogs?_helpId=${id}`, content);
  }

}
