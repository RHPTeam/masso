/* eslint-disable prettier/prettier */
import RcCardHover from "../../../popover/cardhover";
import RcMorePopover from "../../../popover/more/index";

export default {
  props: [ "activeDay", "eventOfDay", "timePoint", ],
  data() {
    return {
      eventContent: {},
      eventContentWidth: 0,
      eventHoverData: {},
      eventsPopupData: [],
    };
  },
  methods: {
    closeCardHover() {
      this.$emit( "closeCardHover", false );
    },
    eventClick( data) {
      this.$emit( "eventClick", data );
    },
    eventHover( timePoint, eventData ) {
      const timeGridContainerHeight = 1426, // 29*48
        // calculate height of more popover element
        eventCount = 6, // number of events
        popoverHeight = 50 + eventCount * 26;

      // set top and left popover style
      let topVal = timePoint * 2 * 29 + 4;

      if ( topVal + popoverHeight >= timeGridContainerHeight ) {
        topVal = topVal - popoverHeight + 57;
      }

      this.$emit( "setTopVal", topVal + 29 );
      this.$emit( "setLeftVal", null );
      this.$emit( "setRightVal", 0 );

      this.$emit( "eventHover", eventData );
    },
    filterEventsByTime( hour) {
      if ( Array.isArray( this.eventOfDay ) ) {
        return this.eventOfDay.filter( ( event ) => {
          const eventStartTime = new Date( event.started_at ).getHours();

          return eventStartTime === hour;
        } );
      }
    },
    formatTime( d ) {
      const dateTime = new Date( d ),
        hours = String( dateTime.getHours() ).padStart( 2, "0"),
        mins = String( dateTime.getMinutes() ).padStart( 2, "0" );

      return `${hours}:${mins}`;
    },
    isToday( day ) {
      const now = new Date(); // now date time

      let today = new Date( now.getFullYear(), now.getMonth(), now.getDate() ); // now date at 00:00:00

      return day.toDateString() === today.toDateString();

    },
    showEventContent( eventVal) {
      if ( eventVal=== undefined || eventVal.length === 0 ) {
        return '';
      } else {
        return `${this.formatTime( eventVal.started_at )}  ${eventVal.title}`;
      }
    },
    showMorePopover( timePoint, events ) {
      const timeGridContainerHeight = 1426, // 29*48
        // calculate height of more popover element
        eventCount = events.length, // number of events
        popoverHeight = 50 + eventCount * 26;

      // set top and left popover style
      let topVal = timePoint * 2 * 29 + 33;

      if ( topVal + popoverHeight >= timeGridContainerHeight ) {
        topVal = topVal - popoverHeight + 57;
      }

      this.$emit( "setTopVal", topVal );
      this.$emit( "setLeftVal", null );
      this.$emit( "setRightVal", 0 );

      this.$emit( "showMorePopover", true );
      this.$emit( "getEvents", events);
    },
    timeClick( timePoint ) {
      let timeSelected = new Date( this.activeDay );
      timeSelected.setHours( timePoint/2 );

      if ( timePoint % 2 === 0) {
        timeSelected.setMinutes( 0 );
      } else {
        timeSelected.setMinutes( 30 );
      }

      this.$emit( "timeClick", timeSelected );
    },
  },
  components: {
    RcCardHover,
    RcMorePopover
  }
};

