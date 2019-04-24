/* eslint-disable prettier/prettier */
export default {
  props: [ "monthDays", "rowIndex" ],
  data() {
    return {
      eventContainer: {},
      eventContainerWidth: 0
    };
  },
  mounted() {
    this.$nextTick( () => {
      const container = document.querySelector( "#eventColumWidth" );

      this.eventContainer = container;
      window.addEventListener( "resize", this.getEventContainerWidth );

      // Init
      this.getEventContainerWidth();
    } );
  },
  computed: {},
  methods: {
    eventClick( name, time ) {
      const dataEmmit = {
        name: name,
        time: time
      };

      this.$emit( "eventClick", dataEmmit );
    },
    getEventContainerWidth() {
      this.eventContainerWidth = this.eventContainer.offsetWidth;
    },
    showMorePopover( colIndex ) {
      const dayGridMonthHeight = 779,
        // calculate height of more popover element
        eventCount = 6, // number of events
        popoverHeight = 50 + eventCount * 26;

      // set top and left popover style
      let topVal = 32 + this.rowIndex * 124 + 1,
        leftVal = this.eventContainerWidth * colIndex;

      if ( this.rowIndex !== 0 ) {
        topVal = topVal + 1;
      }

      if ( colIndex !== 0 ) {
        leftVal = leftVal + 1;
      }

      if ( topVal + popoverHeight >= dayGridMonthHeight ) {
        topVal = topVal - popoverHeight + 124;
      }

      // emit data
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
    }
  },
  beforeDestroy() {
    window.removeEventListener( "resize", this.getEventContainerWidth );
  }
};
