/* eslint-disable prettier/prettier */
import RcMorePopover from "../../more-popover/index";
export default {
  props: [ "timePoint", "activeDay" ],
  data() {
    return {
      events: [
        { time: "08:00", name: "Khởi động chiến dịch" },
        { time: "08:05", name: "Khuyến mại khủng sinh nhật đầu tiên" },
        { time: "08:10", name: "Khởi động" },
        { time: "08:20", name: "Ngày đầu tiên" },
        { time: "08:25", name: "Giới thiệu sản phẩm mới" },
        { time: "08:25", name: "Chương trình chăm sóc khách hàng đặc biệt" }
      ],
      eventContainer: {},
      eventContainerWidth: 0,
      eventContentWidth: 0,
      isShowMorePopover: false,
      leftVal: null,
      rightVal: 0,
      topVal: null
    };
  },
  mounted() {
    this.$nextTick( function() {
      const container = document.querySelector( "#eventColumWidth" );

      this.eventContainer = container;
      window.addEventListener( "resize", this.getEventContainerWidth );

      // Init
      this.getEventContainerWidth();

      // event
      let w = 64 + 2 * ( this.$refs.events.length - 1 );

      this.$refs.events.forEach( ( item ) => {
        w = w + item.clientWidth;
      } );
      this.eventContentWidth = w;

      if ( w > this.eventContainerWidth ) {
        this.$refs.events[ 5 ].remove();
      }
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
    isToday( day ) {
      const now = new Date(); // now date time

      let today = new Date( now.getFullYear(), now.getMonth(), now.getDate() ); // now date at 00:00:00

      if ( day.toDateString() === today.toDateString() ) {
        return true;
      }
      return false;
    },
    showMorePopover( timePoint ) {
      const timeGridContainerHeight = 1392, // 29*48
        // calculate height of more popover element
        eventCount = 6, // number of events
        popoverHeight = 50 + eventCount * 20;

      // set top and left popover style
      let topVal = timePoint * 2 * 29;

      if ( topVal + popoverHeight >= timeGridContainerHeight ) {
        topVal = topVal - popoverHeight + 57;
      }

      this.topVal = topVal;
      this.isShowMorePopover = true;
    }
  },
  components: {
    RcMorePopover
  }
};

