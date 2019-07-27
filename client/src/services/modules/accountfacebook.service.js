import Api from "@/services";
import request from "axios";

export default {
  index() {
    return Api().get("facebook");
  },
  create(cookie) {
    return Api().post("facebook", cookie);
  },
  delete(fbId) {
    return Api().delete(`facebook?_id=${fbId}`);
  },
  getFBAccountById(id) {
    return Api().get(`facebook?_id=${id}`);
  },
  login(fb_id) {
    return Api().post(`facebook/login?_fbId=${fb_id}`);
  },
  logout(fb_id) {
    return Api().post(`facebook/login?_fbId=${fb_id}`);
  },
  update(fbId, cookie) {
    return Api().patch(`facebook?_facebookId=${fbId}`, cookie);
  }
};
