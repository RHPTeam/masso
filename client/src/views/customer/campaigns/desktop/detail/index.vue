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
        @closePopup="isOpenEventPopup = $event"
      />
    </transition>
    <!-- End: Event Popup -->
  </div>
</template>

<script>
import AppHeader from "./header";
import EventPopup from "../popup/update";
export default {
  components: {
    AppHeader,
    EventPopup
  },
  data() {
    return {
      calendarView: "month",
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
    eventDetail() {
      return this.$store.getters.eventDetail;
    }
  },
  async created() {
    const campaignId = this.$route.params.campaignId;
    await this.$store.dispatch( "getCampaignDetail", campaignId );
  },
  methods: {
    openEventPopup( data ) {
      this.$store.dispatch( "getEventById", data._id );
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
