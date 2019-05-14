import Api from "@/services";

export default {
  getColorFb () {
    return Api().get( "core/text-format-presets" );
  },
  getPlaces () {
    return Api().get( "facebook/places" );
  },
  searchPlaces ( key ) {
    return Api().get( `facebook/places?keyword=${key}` );
  },
  getActivity() {
    return Api().get( "facebook/posts-type-loader" );
  },
  getListItemActivity( itemId ) {
    return Api().get( `facebook/posts-type-loader/${itemId}` );
  }
}
