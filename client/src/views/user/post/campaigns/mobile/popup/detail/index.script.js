import ActiveCampaign from "@/components/switch";
import PopupHistory from "../history";
import PopupCreateEvent from "../event";
import DatePickerInline from "@/components/datepickerinline";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
export default {
  data() {
    return {
      calendarView: "list",
      isShowHistory: false,
      isShowCreateEvent: false
    };
  },
  props: ["campaign"],
  components: {
    ActiveCampaign,
    PopupHistory,
    PopupCreateEvent,
    DatePickerInline,
    VuePerfectScrollbar
  },
  computed: {
    campaignDetail() {
      return this.$store.getters.campaignDetail;
    },
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    updateCampaignStatus() {
      const campaignId = this.campaign._id;

      this.$store.dispatch( "updateCampaignStatus", campaignId );
    },
    showHistory() {
      this.isShowHistory = true;
    },
    closePopup() {
      const dataSender = {
        size: 25,
        page: 1
      };
      this.$store.dispatch("getCampaignsByPage", dataSender);
      this.$emit("closePopup", false);
    },
    showCreateEvent() {
      this.isShowCreateEvent = true;
    }
  },
  async created() {
    // if ( Object.entries( this.campaignDetail ).length === 0 && this.campaignDetail.constructor === Object ) {
      const campaignId = this.campaign._id;
      await this.$store.dispatch( "getCampaignDetail", campaignId );
    // }
    // await this.$store.dispatch("setCampainControl", 1);
  }
}
