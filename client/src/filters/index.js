import Vue from "vue";
import StringFunction from "@/utils/string.util";

Vue.filter("filterLinkContent", {
  read: function (val) {
    return val;
  },
  write: function (val) {
    return StringFunction.urlify(val);
  }
})
