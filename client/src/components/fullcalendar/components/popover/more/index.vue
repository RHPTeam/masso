<template>
  <div
    class="rc--popover rc--more-popover "
    :style="{
      top: topVal + 'px',
      left: leftVal + 'px',
      right: rightVal + 'px'
    }"
  >
    <div class="rc--header rc--widget-header">
      <span class="rc--title">{{ title }}</span>
      <span
        class="rc--close rc--icon rc--icon-x"
        @click="closeMorePopover"
      ></span>
    </div>
    <div class="rc--body rc--widget-content">
      <div class="rc--event-container">
        <div
          class="rc--day-grid-event rc--h-event rc--event rc--start rc--end rc--draggable"
          v-for="(event, index) in eventsPopupData"
          :key="index"
          :style="{ backgroundColor: event.color }"
          @click="eventClick(event)"
        >
          <div class="rc--content">
            <span class="rc--title">{{ showEventContent(event) }}</span>
          </div>
          <transition name="fade">
            <rc-card-hover
              class="rc--card-hover-control"
              :eventData="event"
              :leftVal="null"
              :rightVal="200"
              :topVal="0"
            ></rc-card-hover>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RcCardHover from "../cardhover";

export default {
  components: {
    RcCardHover
  },
  props: [ "eventsPopupData", "leftVal", "rightVal", "title", "topVal" ],
  methods: {
    closeMorePopover() {
      this.$emit( "closeMorePopover", false );
    },
    eventClick( data) {
      this.$emit( "eventClick", data );
    },
    formatTime( d ) {
      const dateTime = new Date( d ),
            hours = String( dateTime.getHours() ).padStart( 2, "0"),
            mins = String( dateTime.getMinutes() ).padStart( 2, "0" );

      return `${hours}:${mins}`;
    },
    showEventContent( eventVal) {
      if ( eventVal=== undefined || eventVal.length === 0 ) {
        return '';
      } else {
        return `${this.formatTime( eventVal.started_at )}  ${eventVal.title}`;
      }
    }
  }
};
</script>

<style lang="scss">
@import "../../../style";
</style>
