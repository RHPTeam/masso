/* eslint-disable prettier/prettier */
import RcMorePopover from "../../../popover/more/index";
export default {
  props: [ "timePoint", "weekDays" ],
  data() {
    return {
      eventContainer: {},
      eventContainerWidth: 0,
      isShowMorePopover: false,
      leftVal: null,
      rightVal: null,
      topVal: null
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
    showMorePopover( colIndex, timePoint ) {
      const timeGridContainerHeight = 1392, // 29*48
        // calculate height of more popover element
        eventCount = 6, // number of events
        popoverHeight = 50 + eventCount * 20;

      // set top and left popover style
      let topVal = timePoint * 2 * 29,
        leftVal = 50 + ( this.eventContainerWidth + 0.5 ) * colIndex;

      if ( topVal + popoverHeight >= timeGridContainerHeight ) {
        topVal = topVal - popoverHeight + 57;
      }

      if ( colIndex !== 6 ) {
        this.topVal = topVal;
        this.leftVal = leftVal;
        this.rightVal = null;
      } else {
        this.topVal = topVal;
        this.leftVal = null;
        this.rightVal = 0;
      }
      this.isShowMorePopover = true;
    }
  },
  beforeDestroy() {
    window.removeEventListener( "resize", this.getEventContainerWidth );
  },
  components: {
    RcMorePopover
  }
};

