import Api from "@/synchronize";

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
    return Api().patch( `facebook?_facebookId=${fbId}`, cookie );
  },
  deleteAccountFb ( fbId ) {
    return Api().delete(`facebook?_facebookId=${fbId}`);
  }
}
