/* eslint-disable prettier/prettier */

export default {
  props: [ "eventsOfWeek", "timePoint", "weekDays" ],
  data() {
    return {
      eventContainer: {},
      eventContainerWidth: 0,
    };
  },
  mounted() {
    this.$nextTick( () => {
      const container = document.querySelector( "#eventColumnWidth" );

      this.eventContainer = container;
      window.addEventListener( "resize", this.getEventContainerWidth );

      // Init
      this.getEventContainerWidth();
    } );
  },
  methods: {
    closeCardHover() {
      this.$emit( "closeCardHover", false );
    },
    compareDate( d1, d2 ) {
      const d1Time = new Date( d1 ),
        d1Date = d1Time.getDate(),
        d1Month = d1Time.getMonth() + 1,
        d1Year = d1Time.getFullYear(),

        d2Time = new Date( d2 ),
        d2Date = d2Time.getDate(),
        d2Month = d2Time.getMonth() + 1,
        d2Year = d2Time.getFullYear();

      return d1Date === d2Date && d1Month === d2Month && d1Year === d2Year;
    },
    eventClick( data) {
      this.$emit( "eventClick", data );
    },
    eventHover( colIndex, timePoint, eventData ) {
      const timeGridContainerHeight = 1392;

      // set top and left popover style
      let cardHoverHeight,
        topVal = timePoint * 2 * 29,
        leftVal = 50 + ( this.eventContainerWidth + 0.5 ) * colIndex;

      // card hover height
      eventData.type_event === 1 ? cardHoverHeight = 124 : cardHoverHeight = 200;

      if ( topVal + cardHoverHeight >= timeGridContainerHeight ) {
        topVal = topVal - cardHoverHeight + 57;
      }

      if ( colIndex < 4 ) {
        this.$emit( "setTopVal", topVal);
        this.$emit( "setLeftVal", leftVal + this.eventContainerWidth);
        this.$emit( "setRightVal", null );
      } else {
        this.$emit( "setTopVal", topVal);
        this.$emit( "setLeftVal", leftVal - 395);
        this.$emit( "setRightVal", null );
      }
      this.$emit( "eventHover", eventData );
    },
    filterEventsByDay( day ) {
      if ( Array.isArray( this.eventsOfWeek ) ) {
        return this.eventsOfWeek.filter( ( event ) => {
          return this.compareDate( day, event.started_at );
        } );
      }
    },
    filterEventsByTime( hour, events ) {
      if ( Array.isArray( events ) ) {
        return events.filter( ( event ) => {
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
    getEventContainerWidth() {
      this.eventContainerWidth = this.eventContainer.offsetWidth;
    },
    showEventContent( eventVal) {
      if ( eventVal=== undefined || eventVal.length === 0 ) {
        return '';
      } else {
        return `${this.formatTime( eventVal.started_at )}  ${eventVal.title}`;
      }
    },
    showMorePopover( colIndex, timePoint , events) {
      const timeGridContainerHeight = 1426, // 29*48
        // calculate height of more popover element
        eventCount = events.length, // number of events
        popoverHeight = 50 + eventCount * 26;

      // set top and left popover style
      let topVal = timePoint * 2 * 29 + 33,
        leftVal = 50 + ( this.eventContainerWidth + 0.5 ) * colIndex;

      if ( topVal + popoverHeight > timeGridContainerHeight ) {
        topVal = topVal - popoverHeight + 58;
      }

      if ( colIndex !== 6 ) {
        this.$emit( "setTopVal", topVal );
        this.$emit( "setLeftVal", leftVal );
        this.$emit( "setRightVal", null );
      } else {
        this.$emit( "setTopVal", topVal );
        this.$emit( "setLeftVal", null );
        this.$emit( "setRightVal", 0 );
      }

      this.$emit( "showMorePopover", true );
      this.$emit( "getEvents", events);
    },
    timeClick( timePoint, index ) {
      let timeSelected = new Date( this.weekDays[index].time );
      timeSelected.setHours( timePoint/2 );

      if ( timePoint % 2 === 0) {
        timeSelected.setMinutes( 0 );
      } else {
        timeSelected.setMinutes( 30 );
      }
      console.log(timeSelected);

      this.$emit( "timeClick", timeSelected );
    },
  },
  beforeDestroy() {
    window.removeEventListener( "resize", this.getEventContainerWidth );
  }
};

