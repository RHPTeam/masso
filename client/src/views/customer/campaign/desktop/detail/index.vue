<template>
  <div class="main">
    <!-- Start: Desktop Component-->
    <div class="d_none d_md_block">
      <breadcrumb
        nameBread="Chiến dịch"
        subBread="Lorem ipsum dolor sit amet, consetetur sadipscing elitr"
      />
      <!-- Start: Header -->
      <app-header
        :view="calendarView"
        @updateCalendarView="calendarView = $event"
      />
      <!-- End: Header -->
      <!-- Start: Content -->
      <div class="main--content">
        <!-- Start: FullCalendar -->
        <fullcalendar
          @eventClick="openEventPopup($event)"
          :view="calendarView"
        />
        <!-- End: FullCalendar -->
      </div>
      <!-- End: Content -->
    </div>
    <!-- End: Desktop Component-->
    <!-- Start: Event Popup -->
    <event-popup
      v-if="isOpenEventPopup"
      :eventData="eventSelected"
      @closePopup="isOpenEventPopup = $event"
    />
    <!-- End: Event Popup -->
  </div>
</template>

<script>
import AppHeader from "./header";
import EventPopup from "./popup/event";
export default {
  data() {
    return {
      calendarView: "month",
      eventSelected: {},
      isOpenEventPopup: false
    };
  },
  methods: {
    openEventPopup(data) {
      this.eventSelected = data;
      this.isOpenEventPopup = true;
    }
  },
  components: {
    AppHeader,
    EventPopup
  }
};
</script>

<style>
.custom {
  background-color: #f7f7f7;
}
</style>
