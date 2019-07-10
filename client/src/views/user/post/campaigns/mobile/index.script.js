import PopupDelete from "./popup/delete";
import PopupSearch from "./popup/search";
import PopupCopy from "./popup/copy";
import PopupDetailCampaign from "./popup/detail";
import PopupDuplicateCampaign from "./popup/campaigns/duplicate";
export default {
  components: {
    PopupSearch,
    PopupDelete,
    PopupCopy,
    PopupDetailCampaign,
    PopupDuplicateCampaign
  },
  data() {
    return {
      isShowTabCampaginDefault: false,
      isShowTabCampaign: true,
      isShowPopupDelete: false,
      isShowPopupSearch: false,
      isShowPopupCopy: false,
      isShowPopupDetailCampaign: false
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    showTabCampaign() {
      this.isShowTabCampaign = true;
      this.isShowTabCampaginDefault = false;
    },
    showTabCampaginDefault() {
      this.isShowTabCampaign = false;
      this.isShowTabCampaginDefault = true;
    },
    showPopupDelete() {
      this.isShowPopupDelete = true;
    },
    showPopupSearch() {
      this.isShowPopupSearch = true;
    },
    showPopupCopy() {
      this.isShowPopupCopy = true;
    },
    showPopupDetailCampaign() {
      this.isShowPopupDetailCampaign = true;
    }
  }
};
