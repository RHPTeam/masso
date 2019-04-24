import vi from "./locale/translations/vi";
import DateInput from "./components/input.vue";
import PickerDay from "./components/day.vue";
import PickerMonth from "./components/month.vue";
import PickerYear from "./components/year.vue";
import utils, { makeDateUtils } from "./utils/date.util";
export default {
  components: {
    DateInput,
    PickerDay,
    PickerMonth,
    PickerYear
  },
  props: {
    value: {
      validator: ( val ) => utils.validateDateInput( val )
    },
    name: String,
    refName: String,
    id: String,
    format: {
      type: [ String, Function ],
      default: "dd MMM yyyy"
    },
    language: {
      type: Object,
      default: () => vi
    },
    openDate: {
      validator: ( val ) => utils.validateDateInput( val )
    },
    dayCellContent: Function,
    fullMonthName: Boolean,
    disabledDates: Object,
    highlighted: Object,
    placeholder: String,
    inline: Boolean,
    calendarClass: [ String, Object, Array ],
    inputClass: [ String, Object, Array ],
    wrapperClass: [ String, Object, Array ],
    mondayFirst: Boolean,
    clearButton: Boolean,
    clearButtonIcon: String,
    calendarButton: Boolean,
    calendarButtonIcon: String,
    calendarButtonIconContent: String,
    bootstrapStyling: Boolean,
    initialView: String,
    disabled: Boolean,
    required: Boolean,
    typeable: Boolean,
    useUtc: Boolean,
    minimumView: {
      type: String,
      default: "day"
    },
    maximumView: {
      type: String,
      default: "year"
    }
  },
  data() {
    const startDate = this.openDate ? new Date( this.openDate ) : new Date(),
      constructedDateUtils = makeDateUtils( this.useUtc ),
      pageTimestamp = constructedDateUtils.setDate( startDate, 1 );

    return {
      /*
       * Vue cannot observe changes to a Date Object so date must be stored as a timestamp
       * This represents the first day of the current viewing month
       * {Number}
       */
      pageTimestamp,
      /*
       * Selected Date
       * {Date}
       */
      selectedDate: null,
      /*
       * Flags to show calendar views
       * {Boolean}
       */
      showDayView: false,
      showMonthView: false,
      showYearView: false,
      /*
       * Positioning
       */
      calendarHeight: 0,
      resetTypedDate: new Date(),
      utils: constructedDateUtils
    };
  },
  watch: {
    value( value ) {
      this.setValue( value );
    },
    openDate() {
      this.setPageDate();
    },
    initialView() {
      this.setInitialView();
    }
  },
  computed: {
    computedInitialView() {
      if ( !this.initialView ) {
        return this.minimumView;
      }

      return this.initialView;
    },
    pageDate() {
      return new Date( this.pageTimestamp );
    },

    translation() {
      return this.language;
    },

    calendarStyle() {
      return {
        position: this.isInline ? "static" : undefined
      };
    },
    isOpen() {
      return this.showDayView || this.showMonthView || this.showYearView;
    },
    isInline() {
      return !!this.inline;
    },
    isRtl() {
      return this.translation.rtl === true;
    }
  },
  methods: {
    /**
     * Called in the event that the user navigates to date pages and
     * closes the picker without selecting a date.
     */
    resetDefaultPageDate() {
      if ( this.selectedDate === null ) {
        this.setPageDate();
        return;
      }
      this.setPageDate( this.selectedDate );
    },
    /**
     * Effectively a toggle to show/hide the calendar
     * @return {mixed}
     */
    showCalendar() {
      if ( this.disabled || this.isInline ) {
        return false;
      }
      if ( this.isOpen ) {
        return this.close( true );
      }
      this.setInitialView();
    },
    /**
     * Sets the initial picker page view: day, month or year
     */
    setInitialView() {
      const initialView = this.computedInitialView;

      if ( !this.allowedToShowView( initialView ) ) {
        throw new Error(
          `initialView '${
            this.initialView
          }' cannot be rendered based on minimum '${
            this.minimumView
          }' and maximum '${this.maximumView}'`
        );
      }
      switch ( initialView ) {
        case "year":
          this.showYearCalendar();
          break;
        case "month":
          this.showMonthCalendar();
          break;
        default:
          this.showDayCalendar();
          break;
      }
    },
    /**
     * Are we allowed to show a specific picker view?
     * @param {String} view
     * @return {Boolean}
     */
    allowedToShowView( view ) {
      const views = [ "day", "month", "year" ],
        minimumViewIndex = views.indexOf( this.minimumView ),
        maximumViewIndex = views.indexOf( this.maximumView ),
        viewIndex = views.indexOf( view );

      return viewIndex >= minimumViewIndex && viewIndex <= maximumViewIndex;
    },
    /**
     * Show the day picker
     * @return {Boolean}
     */
    showDayCalendar() {
      if ( !this.allowedToShowView( "day" ) ) {
        return false;
      }
      this.close();
      this.showDayView = true;
      return true;
    },
    /**
     * Show the month picker
     * @return {Boolean}
     */
    showMonthCalendar() {
      if ( !this.allowedToShowView( "month" ) ) {
        return false;
      }
      this.close();
      this.showMonthView = true;
      return true;
    },
    /**
     * Show the year picker
     * @return {Boolean}
     */
    showYearCalendar() {
      if ( !this.allowedToShowView( "year" ) ) {
        return false;
      }
      this.close();
      this.showYearView = true;
      return true;
    },
    /**
     * Set the selected date
     * @param {Number} timestamp
     */
    setDate( timestamp ) {
      const date = new Date( timestamp );

      this.selectedDate = date;
      this.setPageDate( date );
      this.$emit( "selected", date );
      this.$emit( "input", date );
    },
    /**
     * Clear the selected date
     */
    clearDate() {
      this.selectedDate = null;
      this.setPageDate();
      this.$emit( "selected", null );
      this.$emit( "input", null );
      this.$emit( "cleared" );
    },
    /**
     * @param {Object} date
     */
    selectDate( date ) {
      this.setDate( date.timestamp );
      if ( !this.isInline ) {
        this.close( true );
      }
      this.resetTypedDate = new Date();
    },
    /**
     * @param {Object} date
     */
    selectDisabledDate( date ) {
      this.$emit( "selectedDisabled", date );
    },
    /**
     * @param {Object} month
     */
    selectMonth( month ) {
      const date = new Date( month.timestamp );

      if ( this.allowedToShowView( "day" ) ) {
        this.setPageDate( date );
        this.$emit( "changedMonth", month );
        this.showDayCalendar();
      } else {
        this.selectDate( month );
      }
    },
    /**
     * @param {Object} year
     */
    selectYear( year ) {
      const date = new Date( year.timestamp );

      if ( this.allowedToShowView( "month" ) ) {
        this.setPageDate( date );
        this.$emit( "changedYear", year );
        this.showMonthCalendar();
      } else {
        this.selectDate( year );
      }
    },
    /**
     * Set the datepicker value
     * @param {Date|String|Number|null} date
     */
    setValue( date ) {
      let dateTime = date;

      if ( typeof dateTime === "string" || typeof dateTime === "number" ) {
        let parsed = new Date( dateTime );

        dateTime = isNaN( parsed.valueOf() ) ? null : parsed;
      }
      if ( !dateTime ) {
        this.setPageDate();
        this.selectedDate = null;
        return;
      }
      this.selectedDate = dateTime;
      this.setPageDate( dateTime );
    },
    /**
     * Sets the date that the calendar should open on
     */
    setPageDate( date ) {
      let dateTime = date;

      if ( !date ) {
        if ( this.openDate ) {
          dateTime = new Date( this.openDate );
        } else {
          dateTime = new Date();
        }
      }
      this.pageTimestamp = this.utils.setDate( new Date( dateTime ), 1 );
    },
    /**
     * Handles a month change from the day picker
     */
    handleChangedMonthFromDayPicker( date ) {
      this.setPageDate( date );
      this.$emit( "changedMonth", date );
    },
    /**
     * Set the date from a typedDate event
     */
    setTypedDate( date ) {
      this.setDate( date.getTime() );
    },
    /**
     * Close all calendar layers
     * @param {Boolean} emitEvent - emit close event
     */
    close( emitEvent ) {
      this.showDayView = this.showMonthView = this.showYearView = false;
      if ( !this.isInline ) {
        if ( emitEvent ) {
          this.$emit( "closed" );
        }
        document.removeEventListener( "click", this.clickOutside, false );
      }
    },
    /**
     * Initiate the component
     */
    init() {
      if ( this.value ) {
        this.setValue( this.value );
      }
      if ( this.isInline ) {
        this.setInitialView();
      }
    }
  },
  mounted() {
    this.init();
  }
};
