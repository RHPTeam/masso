import PopupDelete from "./popup/delete";
import PopupSearch from "./popup/search";
import PopupCopy from "./popup/copy";
import PopupDetailCampaign from "./popup/detail";
import PopupDuplicateCampaign from "./popup/duplicate";
import ItemCampaign from "./components/campaign"
import ItemCampaignDefault from "./components/campaign-default"

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
      currentPage: 1,
      pageSize: 25,
      isShowTabCampaginDefault: false,
      isShowTabCampaign: true,
      isShowPopupDelete: false,
      isShowPopupSearch: false,
      isShowPopupCopy: false,
      isShowPopupDetailCampaign: false,
      isShowPopupDuplicateCampaign: false,
      isTriggerAction: false,
      search: "",
      selectedCampaign: {}
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
    },
    campaignsPagesSize() {
      return this.$store.getters.campaignsPagesSize;
    }
  },
  methods: {
    async loadMore() {
      this.currentPage += 1;

      await this.$store.dispatch("getCampaignsByPageMobile", {
        size: this.pageSize,
        page: this.currentPage
      });
    },
    confirmDeleteCampaign(event) {
      if (event === true) {
        this.selectedCampaign.id = this.selectedCampaign._id;
        this.$store.dispatch("deleteCampaignMobile", this.selectedCampaign);
      }
    },
    confirmCopyCampaign(event) {
      if (event === true) {
        // Not done yet
        const dataSender = {
          campaignId: this.selectedCampaign._id,
          facebookId: ''
        };
        this.$store.dispatch("duplicateCampaignSimple", dataSender);
      }
    },
    formatDate(d) {
      const dateTime = new Date(d);
      const date = String(dateTime.getDate()).padStart(2, "0");
      const month = String(dateTime.getMonth() + 1).padStart(2, "0");
      const year = dateTime.getFullYear();

      return `${date}/${month}/${year}`;
    },
    onClosePopupSearch(event) {
      this.isShowPopupSearch = event;
      // this.$store.dispatch("getAllCampaigns");
      this.$store.dispatch("getCampaignSimple");
    },
    showCampaign() {
      this.isShowTabCampaign = true;
      this.isShowTabCampaginDefault = false;
    },
    showTabCampaign() {
      // this.$store.dispatch("getCampaignsByPage", {
      //   size: 25,
      //   page: 1
      // });
      this.isShowTabCampaign = true;
      this.isShowTabCampaginDefault = false;
    },
    showTabCampaginDefault() {
      const campaignDefaultNo = this.$store.getters.campSimple;
      if (campaignDefaultNo.length === 0) {
        this.$store.dispatch("getCampaignSimple");
      }
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
    showPopupDuplicateCampaign(campaign) {
      this.selectedCampaign = campaign;
      this.isShowPopupDuplicateCampaign = true;
    }
  },
  async created() {
    // const campaignNo = this.$store.getters.campaigns;
    // if (campaignNo.length === 0) {
    //   const dataSender = {
    //     size: 25,
    //     page: 1
    //   };
    //   await this.$store.dispatch( "getCampaignsByPageMobile", dataSender );
    // }
  }
};
