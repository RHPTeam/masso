import ActiveCampaign from "@/components/switch";
import PopupHistory from "../history";
import PopupCreateEvent from "../event";
import PopupDeleteEvent from "@/components/popups/mobile/delete";
import DatePickerInline from "@/components/datepickerinline";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
export default {
  data() {
    return {
      calendarView: "list",
      dateStartedAtDetail: this.formatDateStartedAt(new Date()),
      dateStartedAtDatePicker: new Date(),
      isShowHistory: false,
      isShowCreateEvent: false,
      isShowActionSave: false,
      isShowPopupDelete: false,
      eventSelected: {},
      dataDelete: {
        eventId: "",
        campaignId: ""
      }
    };
  },
  props: ["campaign"],
  components: {
    ActiveCampaign,
    PopupHistory,
    PopupCreateEvent,
    PopupDeleteEvent,
    DatePickerInline,
    VuePerfectScrollbar
  },
  computed: {
    campaignDetail() {
      return this.$store.getters.campaignDetail;
    },
    currentTheme() {
      return this.$store.getters.themeName;
    },
    eventsOfDay() {
      const listEvents = [];

      if (this.campaignDetail._events && this.campaignDetail._events.length > 0) {
        this.campaignDetail._events.map(item => {
          if (this.formatDateStartedAt(item.started_at) === this.dateStartedAtDetail) {
            listEvents.push(item);
          }
        });
      }
      return listEvents;
    }
  },
  methods: {
    closeActiveSave() {
      this.isShowActionSave = false;
    },
    changeStartedAt(value) {
      this.dateStartedAtDetail = this.formatDateStartedAt(value);
      // this.showCreateEvent();
    },
    closePopup() {
      this.$emit("closePopup", false);
    },
    formatDateStartedAt(d) {
      const dateTime = new Date(d),
        date = String(dateTime.getDate()).padStart(2, "0"),
        month = String(dateTime.getMonth() + 1).padStart(2, "0"),
        year = dateTime.getFullYear();

      return `${date}/${month}/${year}`
    },
    formatTime(d) {
      const dateTime = new Date(d),
        hours = String(dateTime.getHours()).padStart(2, "0"),
        mins = String(dateTime.getMinutes()).padStart(2, "0");

      return `${hours}:${mins}`;
    },
    showActionSave() {
      this.isShowActionSave = true;
    },
    showPopupDeleteEvent(event) {
      this.eventSelected = event;      
      this.dataDelete.eventId = event._id;
      this.dataDelete.campaignId = this.campaign._id;
      this.isShowPopupDelete = true;
    },
    async openEventPopup(event) {
      await this.$store.dispatch("getEventById", event._id);
      this.showCreateEvent();
    },
    showCreateEvent() {
      this.isShowCreateEvent = true;
    },
    showHistory() {
      this.isShowHistory = true;
    },
    updateTitleCampaign() {
      const objSender = {
        campId: this.campaign._id,
        campaign: {
          title: this.campaign.title
        }
      };
      this.$store.dispatch("updateCampaignDetail", objSender);
    },
    updateCampaignStatus() {
      const campaignId = this.campaign._id;
      this.$store.dispatch("updateCampaignStatus", campaignId);
    }
  },
  async created() {
    const campaignId = this.campaign._id;
    await this.$store.dispatch("getCampaignDetail", campaignId);
  }
}
