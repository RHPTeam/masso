import Api from "@/services";

export default {
  getColorFb () {
    return Api().get( "core/text-format-presets" );
  }
}
