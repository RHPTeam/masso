<template>
  <div class="campaigns--wrapper" :data-theme="currentTheme">
    <!-- Start: Header -->
    <app-header
      :view="calendarView"
      @updateCalendarView="calendarView = $event"
    />
    <!-- End: Header -->
    <!-- Start: FullCalendar -->
    <fullcalendar
      @eventClick="openEventPopup($event)"
      :events="campaignDetail._events"
      :theme="currentTheme"
      :view="calendarView"
    />
    <!-- End: FullCalendar -->
    <!-- Start: Event Popup -->
    <transition name="popup">
      <event-popup
        v-if="isOpenEventPopup"
        :statusUpdateEvent="statusUpdateEvent"
        @closePopup="isOpenEventPopup = $event">
      </event-popup>
    </transition>
    <!-- End: Event Popup -->
  </div>
</template>

<script>
import AppHeader from "./header";
import EventPopup from "@/views/customer/campaigns/desktop/popup/event";
export default {
  components: {
    AppHeader,
    EventPopup
  },
  data() {
    return {
      calendarView: "month",
      isOpenEventPopup: false,
      statusUpdateEvent: false
    };
  },
  computed: {
    campaignDetail() {
      return this.$store.getters.campaignDetail;
    },
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  async created() {
    const campaignId = this.$route.params.campaignId;
    await this.$store.dispatch( "getCampaignDetail", campaignId );
  },
  methods: {
    async openEventPopup( event ) {
      await this.$store.dispatch( "getEventById", event._id );
      this.$store.dispatch( "setCaseEvent", {
        key: "popup",
        value: true
      } );
    }
  }
};
</script>

<style>
.custom {
  background-color: #f7f7f7;
}
</style>
