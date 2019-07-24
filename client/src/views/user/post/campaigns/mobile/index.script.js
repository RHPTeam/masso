import PopupDelete from "./popup/delete";
import PopupSearch from "./popup/search";
import PopupCopy from "./popup/copy";
import PopupDetailCampaign from "./popup/detail";
import PopupDuplicateCampaign from "./popup/campaigns/duplicate";
import ItemCampaign from "./item/campaign"
import ItemCampaignDefault from "./item/campaign-default"

export default {
  components: {
    PopupSearch,
    PopupDelete,
    PopupCopy,
    PopupDetailCampaign,
    PopupDuplicateCampaign,
    ItemCampaign,
    ItemCampaignDefault
  },
  data() {
    return {
      search: "",
      selectedCampaign: {},
      isShowTabCampaginDefault: false,
      isShowTabCampaign: true,
      isShowPopupDelete: false,
      isShowPopupSearch: false,
      isShowPopupCopy: false,
      isShowPopupDetailCampaign: false,
      isTriggerAction: false
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    campaigns() {
      return this.$store.getters.campaigns;
    },
    campaignsDefault() {
      return this.$store.getters.campSimple;
    },
    campaignStatus() {
      return this.$store.getters.campaignStatus;
    }
  },
  methods: {
    showCampaign() {
      this.isShowTabCampaign = true;
      this.isShowTabCampaginDefault = false;
    },
    showTabCampaign() {
      this.isShowTabCampaign = true;
      this.isShowTabCampaginDefault = false;
    },
    showTabCampaginDefault() {
      this.isShowTabCampaign = false;
      this.isShowTabCampaginDefault = true;
    },
    showPopupDelete(campaign) {
      this.selectedCampaign = campaign;
      this.isShowPopupDelete = true;
    },
    showPopupSearch() {
      this.isShowPopupSearch = true;
    },
    showPopupCopy(campaign) {
      this.selectedCampaign = campaign;
      this.isShowPopupCopy = true;
    },
    showPopupDetailCampaign(campaign) {
      this.selectedCampaign = campaign;
      this.isShowPopupDetailCampaign = true;
    },
    onClosePopupSearch(event) {
      this.isShowPopupSearch = event;
      this.$store.dispatch("getAllCampaigns");
      this.$store.dispatch("getCampaignSimple");
    },
    formatDate(d) {
      const dateTime = new Date(d);
      const date = String(dateTime.getDate()).padStart(2, "0");
      const month = String(dateTime.getMonth() + 1).padStart(2, "0");
      const year = dateTime.getFullYear();

      return `${date}/${month}/${year}`;
    },
    confirmDeleteCampaign(event) {
      if (event === true) {
        this.selectedCampaign.id = this.selectedCampaign._id;
        this.$store.dispatch("deleteCampaign", this.selectedCampaign);
      }
    },
    confirmCopyCampaign(event) {
      if (event === true) {
        // Not done yet
        const dataSender = {
          campaignId: this.selectedCampaign._id,
          facebookId: ''
        };
        console.log(dataSender);
        this.$store.dispatch("duplicateCampaignSimple", dataSender);
      }
    }
  },
  async created() {
    const campaignNo = this.$store.getters.campaigns;
    if (campaignNo.length === 0) {
      const dataSender = {
        size: 25,
        page: 1
      };
      await this.$store.dispatch( "getCampaignsByPage", dataSender );
    }
    const campaignDefaultNo = this.$store.getters.campSimple;
    if (campaignDefaultNo.length === 0) {
      this.$store.dispatch("getCampaignSimple");
    }
  }
};
