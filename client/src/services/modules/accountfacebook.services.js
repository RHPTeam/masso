import Api from "@/services";

export default {
  getAllAccountFb () {
    return Api().get( "facebook" );
  },
  getFBAccountById( fbId ) {
    return Api().get(`facebook?_id=${fbId}`);
  },
  createAccountFb ( cookie ) {
    return Api().post( "facebook", cookie );
  },
  updateCookieFb ( fbId, cookie ) {
    return Api().patch( `facebook?_fbId=${fbId}`, cookie );
  },
  deleteAccountFb ( fbId ) {
    return Api().delete(`facebook?_fbId=${fbId}`);
  }
}
