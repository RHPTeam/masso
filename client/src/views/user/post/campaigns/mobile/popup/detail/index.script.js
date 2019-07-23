import ActiveCampaign from "@/components/switch";
import PopupHistory from "../history";
import PopupCreateEvent from "../event";
import DatePickerInline from "@/components/datepickerinline";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
export default {
  data() {
    return {
      calendarView: "list",
      dateStartedAtDetail: this.formatDateStartedAt( new Date() ),
      dateStartedAtDatePicker: new Date(),
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
    },
    eventsOfDay() {
      const listEvents = [];

      if(this.campaignDetail._events && this.campaignDetail._events.length > 0) {
        this.campaignDetail._events.map( item => {
          if (this.formatDateStartedAt(item.started_at) === this.dateStartedAtDetail) {
            listEvents.push(item);
          }
        });
      }
      return listEvents;
    }
  },
  methods: {
    changeStartedAt( value ) {
      this.dateStartedAtDetail = this.formatDateStartedAt(value);
      // this.showCreateEvent();
    },
    closePopup() {
      const dataSender = {
        size: 25,
        page: 1
      };
      this.$store.dispatch("getCampaignsByPage", dataSender);
      this.$emit("closePopup", false);
    },
    async openEventPopup( event ) {
      await this.$store.dispatch( "getEventById", event._id );
      this.showCreateEvent();
      // this.$store.dispatch( "setCaseEvent", {
      //   key: "popup",
      //   value: true
      // } );
    },
    updateTitleCampaign() {
      const objSender = {
        campId: this.campaign._id,
        campaign: {
          title: this.campaign.title
        }
      };
      this.$store.dispatch( "updateCampaignDetail", objSender );
    },
    updateCampaignStatus() {
      const campaignId = this.campaign._id;

      this.$store.dispatch( "updateCampaignStatus", campaignId );
    },
    formatDateStartedAt( d ) {
      const dateTime = new Date( d ),
        date = String( dateTime.getDate() ).padStart( 2 , "0" ),
        month = String( dateTime.getMonth() + 1 ).padStart( 2 , "0" ),
        year = dateTime.getFullYear();

      return `${date}/${month}/${year}`
    },
    formatTime( d ) {
      const dateTime = new Date( d ),
        hours = String( dateTime.getHours() ).padStart( 2, "0"),
        mins = String( dateTime.getMinutes() ).padStart( 2, "0" );

      return `${hours}:${mins}`;
    },
    showCreateEvent() {
      this.isShowCreateEvent = true;
    },
    showHistory() {
      this.isShowHistory = true;
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
