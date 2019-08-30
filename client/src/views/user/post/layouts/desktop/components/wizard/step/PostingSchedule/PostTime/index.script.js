import DatePickerInline from "@/components/datepickerinline";

export default {
  components: {
    DatePickerInline
  },
  data() {
    return {
      breakPointError: false,
      dateStartedAt: this.formatDateStartedAt( new Date() ),
      dateStartedAtDatePicker: new Date(),
      isShowChangeStartedAtPopup: false,
      isShowAlertBreakPoint: false,
      inputDateInvalid: false,
      inputTimeInvalid: false,
      statusDatePicker: true,
      timeStartedAt: "12:00"
    }

  },
  computed: {
    event() {
      return this.$store.getters.event;
    }
  },
  created() {
    const dateTime = new Date( this.event.started_at ),
      hour = String( dateTime.getHours() ).padStart( 2, "0" ),
      min = String( dateTime.getMinutes() ).padStart( 2, "0" );

    this.timeStartedAt = `${ hour }:${ min }`;
  },
  watch: {
    "dateStartedAt"( value ) {
      const regexDate = new RegExp( "^(?:(?:31(\\/|-|\\.)(?:0?[13578]|1[02]))\\1|(?:(?:29|30)(\\/|-|\\.)(?:0?[13-9]|1[0-2])\\2))(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$|^(?:29(\\/|-|\\.)0?2\\3(?:(?:(?:1[6-9]|[2-9]\\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\\d|2[0-8])(\\/|-|\\.)(?:(?:0?[1-9])|(?:1[0-2]))\\4(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$" );
      this.inputDateInvalid = !regexDate.test( value.toLowerCase() );
    },
    "event.break_point"( value ) {
      if ( isNaN( value ) ) {
        this.event.break_point = 5;
      }
      if ( Number( value ) < 5 ) {
        this.isShowAlertBreakPoint = true;
        this.event.break_point = 5;
      }
    },
    "timeStartedAt"( value ) {
      const regexTime = new RegExp( "^(0[0-9]|1[0-9]|2[0-3]|[0-9]):[0-5][0-9]$" );
      this.inputTimeInvalid = !regexTime.test(value.toLowerCase());
    }
  },
  methods: {
    changeTimeWaitDefault() {
      this.$store.dispatch( "setEvent", {
        key: "break_point",
        value: Number( this.event.break_point )
      } );
    },
    changeStartedAt( value ) {
      this.dateStartedAt = this.formatDateStartedAt( value );
    },
    changeStartedAtForDatePicker() {
      const dateTemp = this.dateStartedAt.split( "/" ),
        newDateTime = new Date( `${dateTemp[1]}/${dateTemp[0]}/${dateTemp[2]}` );

      if ( !isNaN( newDateTime ) ) {
        this.dateStartedAtDatePicker = newDateTime;
      }
    },
    formatTime( d ) {
      const dateTime = new Date( d ),
        hour = String( dateTime.getHours() ).padStart( 2 , "0" ),
        min = String( dateTime.getMinutes() ).padStart( 2 , "0" ),
        date = String( dateTime.getDate() ).padStart( 2 , "0" ),
        month = String( dateTime.getMonth() + 1 ).padStart( 2 , "0" ),
        year = dateTime.getFullYear();

      return `lúc ${hour}:${min} ngày ${date}/${month}/${year}`
    },
    formatDateStartedAt( d ) {
      const dateTime = new Date( d ),
        date = String( dateTime.getDate() ).padStart( 2 , "0" ),
        month = String( dateTime.getMonth() + 1 ).padStart( 2 , "0" ),
        year = dateTime.getFullYear();

      return `${date}/${month}/${year}`
    },
    resetDateStartedAt() {
      //Validate dateStartedAt, in case of invalid, set value is current date.
      const regex = new RegExp( "^(?:(?:31(\\/|-|\\.)(?:0?[13578]|1[02]))\\1|(?:(?:29|30)(\\/|-|\\.)(?:0?[1,3-9]|1[0-2])\\2))(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$|^(?:29(\\/|-|\\.)0?2\\3(?:(?:(?:1[6-9]|[2-9]\\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\\d|2[0-8])(\\/|-|\\.)(?:(?:0?[1-9])|(?:1[0-2]))\\4(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$" );
      if ( !regex.test( this.dateStartedAt.toLowerCase() ) ) {
        this.dateStartedAt = this.formatDateStartedAt( new Date() );
      }
    },
    resetTimeStartedAt() {
      //Validate timeStartedAt, in case of invalid, set value is 12:00.
      const regexTime = new RegExp( "^(0[0-9]|1[0-9]|2[0-3]|[0-9]):[0-5][0-9]$" );
      if ( !regexTime.test( this.timeStartedAt.toLowerCase() ) ) {
        this.timeStartedAt = "12:00";
      }
    },
    async updateEventStartedAt() {
      await this.resetDateStartedAt();
      await this.resetTimeStartedAt();

      const dateTemp = this.dateStartedAt.split( "/" ),
        timeTemp = this.timeStartedAt.split( ":" ),
        dateTime = new Date( dateTemp[2], Number( dateTemp[1] ) - 1, dateTemp[0], timeTemp[0], timeTemp[1] );

      this.$store.dispatch( "setEvent", {
        key: "started_at",
        value: dateTime
      } );

      this.isShowChangeStartedAtPopup = false;
    }
  }
}
