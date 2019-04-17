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
        <!-- Start: Data Table -->
        <div>This is data table.</div>
        <!-- End: Data Table -->
      </div>
      <!-- End: Content -->
    </div>
    <!-- End: Desktop Component-->
  </div>
</template>

<script>
import AppHeader from "./header";
export default {
  components: {
    AppHeader
  }
};
</script>

<style lang="scss" scoped></style>
