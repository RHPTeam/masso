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
      :disabledView="campaignDetail.status"
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
import AppHeader from "./header/index";
import EventPopup from "@/views/user/post/campaigns/desktop/popup/event";
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
    if ( Object.entries( this.campaignDetail ).length === 0 && this.campaignDetail.constructor === Object ) {
      const campaignId = this.$route.params.campaignId;
      await this.$store.dispatch( "getCampaignDetail", campaignId );
    }
    await this.$store.dispatch("setCampainControl", 1);
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
.alert {
  font-size: 0.875rem;
  padding: 0.375rem 0.5rem;
}
</style>
