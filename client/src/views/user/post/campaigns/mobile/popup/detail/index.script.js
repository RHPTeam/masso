import ActiveCampaign from "@/components/switch";
import PopupHistory from "../history";
import PopupCreateEvent from "../event";
export default {
  data() {
    return {
      calendarView: "list",
      isShowHistory: false,
      isShowCreateEvent: false
    };
  },
  components: {
    ActiveCampaign,
    PopupHistory,
    PopupCreateEvent
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
    showHistory() {
      this.isShowHistory = true;
    },
    closePopup() {
      this.$emit("closePopup", false);
    },
    showCreateEvent() {
      this.isShowCreateEvent = true;
    }
  },
}
