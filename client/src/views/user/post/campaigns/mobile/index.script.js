import PopupDelete from './popup/delete';
import PopupSearch from './popup/search';
import PopupCopy from './popup/copy';
import PopupDetailCampaign from './popup/detail';
import PopupDuplicateCampaign from './popup/campaigns/duplicate';
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
      search: '',
      selectedCampaign: {},
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
  watch: {},
  methods: {
    async showTabCampaign() {
      // await this.$store.dispatch('getAllCampaigns');
      this.isShowTabCampaign = true;
      this.isShowTabCampaginDefault = false;
    },
    async showTabCampaginDefault() {
      await this.$store.dispatch('getCampaignSimple');
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
    showPopupCopy() {
      this.isShowPopupCopy = true;
    },
    showPopupDetailCampaign() {
      this.isShowPopupDetailCampaign = true;
    },
    onClosePopupSearch(event) {
      this.isShowPopupSearch = event;
      this.$store.dispatch('getAllCampaigns');
      this.$store.dispatch('getCampaignSimple');
    },
    formatDate(d) {
      const dateTime = new Date(d);
      const date = String(dateTime.getDate()).padStart(2, '0');
      const month = String(dateTime.getMonth() + 1).padStart(2, '0');
      const year = dateTime.getFullYear();

      return `${date}/${month}/${year}`;
    },
    selectCampaign(campaign) {
      this.selectedCampaign = campaign;
    },
    confirmDeleteCampaign(event) {
      if (event === true) {
        this.selectedCampaign.id = this.selectedCampaign._id;
        this.$store.dispatch('deleteCampaign', this.selectedCampaign);
      }
    },
    confirmCopyCampaign(event) {
      if (event === true) {
        this.selectedCampaign.id = this.selectedCampaign._id;
        // this.$store.dispatch("deleteCampaign", this.selectedCampaign);
      }
    }
  }
};
