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
      :events="events"
      :theme="currentTheme"
      :view="calendarView"
    />
    <!-- End: FullCalendar -->
    <!-- Start: Event Popup -->
    <transition name="popup">
      <event-popup
        v-if="isOpenEventPopup"
        :eventData="eventSelected"
        @closePopup="isOpenEventPopup = $event"
      />
    </transition>
    <!-- End: Event Popup -->
  </div>
</template>

<script>
import AppHeader from "./header";
import EventPopup from "../popup/event";
export default {
  components: {
    AppHeader,
    EventPopup
  },
  data() {
    return {
      calendarView: "month",
      eventSelected: {},
      isOpenEventPopup: false
    };
  },
  computed: {
    campaignDetail() {
      return this.$store.getters.campaignDetail;
    },
    currentTheme() {
      return this.$store.getters.themeName;
    },
    events() {
      return this.$store.getters.events;
    }
  },
  async created() {
    const campaignId = this.$route.params.campaignId;

    await this.$store.dispatch( "getCampaignDetail", campaignId );
    await this.$store.dispatch( "getAllEvents" );
  },
  methods: {
    openEventPopup( data ) {
      this.eventSelected = data;
      this.isOpenEventPopup = true;
    }
  }
};
</script>

<style>
.custom {
  background-color: #f7f7f7;
}
</style>
