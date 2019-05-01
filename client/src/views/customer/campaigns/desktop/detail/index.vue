<template>
  <div class="main" :data-theme="currentTheme">
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
          :theme="currentTheme"
          :view="calendarView"
        />
        <!-- End: FullCalendar -->
      </div>
      <!-- End: Content -->
    </div>
    <!-- End: Desktop Component-->
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
import EventPopup from "./popup/event";
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
    currentTheme() {
      return this.$store.getters.themeName;
    }
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
