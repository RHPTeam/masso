import StringFunction from "@/utils/functions/string";
const currentTimeStamp = new Date();

export default {
  data() {
    return {
      disabledDates: {
        to: new Date(currentTimeStamp.getFullYear(), currentTimeStamp.getMonth(), currentTimeStamp.getDate()) // Disable all dates up to specific date
      },
      repeatDaysSelected: [ 1, 2, 3 ],
      repeatType: "",
      scheduleBlockHour: "12:00",
      scheduleBlockHourValid: false,
      showOptionRepeat: false,
    };
  },
  computed: {
    allBroadcasts() {
      return this.$store.getters.allBroadcasts;
    },
    currentTheme() {
      return this.$store.getters.themeName;
    },
    scheduleBlockDetail() {
      return this.$store.getters.scheduleBlockDetail;
    }
  },
  watch: {
    scheduleBlockHour( value ) {
      const regexTime = new RegExp( "^(0[0-9]|1[0-9]|2[0-3]|[0-9]):[0-5][0-9]$" );
      this.scheduleBlockHourValid = !regexTime.test( value.toLowerCase() );
    }
  },
  async created() {
    const scheduleBlockId = this.$route.params.scheduleBlockId;

    await this.$store.dispatch( "getScheduleBlockDetailById", scheduleBlockId );

    // Set value for repeatType
    const type = StringFunction.convertUnicode( this.scheduleBlockDetail.timeSetting.repeat.typeRepeat ).toLowerCase();
    if ( type === 'khong') {
      this.repeatType = 0;
    } else if ( type === 'hang ngay') {
      this.repeatType = 1;
    } else if ( type === 'cuoi tuan' ) {
      this.repeatType = 2;
    } else if ( type === 'hang thang' ) {
      this.repeatType = 3;
    } else if ( type === 'ngay lam viec' ) {
      this.repeatType = 4;
    } else {
      this.repeatType = 5;
    }

    this.scheduleBlockHour = this.scheduleBlockDetail.timeSetting.hour;
  },
  methods: {
    async chooseDaysRepeat( id ) {
      if ( this.repeatDaysSelected.includes( id ) ) {
        // remove item out ot array
        this.repeatDaysSelected = this.repeatDaysSelected.filter( item => item !== id );
      } else {
        // add item in array
        this.repeatDaysSelected.push( id );
      }
      this.scheduleBlockDetail.timeSetting.repeat.valueRepeat = this.repeatDaysSelected.toString();
      this.updateTimeSettingScheduleBlock();
    },
    closeShowOptionRepeat(){
      this.showOptionRepeat = false;
    },
    disabledDays( date ) {
      const dateTime = new Date( date );
      let nowTime = new Date();
      nowTime.setHours( 0, 0, 0 );
      nowTime.setDate( nowTime.getDate() - 1 );

      if ( dateTime < nowTime ) {
        return true;
      }
    },
    resetScheduleBlockHour() {
      //Validate scheduleBlockHour, in case of invalid, set value is 12:00.
      const regexTime = new RegExp( "^(0[0-9]|1[0-9]|2[0-3]|[0-9]):[0-5][0-9]$" );
      if ( !regexTime.test( this.scheduleBlockHour.toLowerCase() ) ) {
        this.scheduleBlockHour = "12:00";
      }
    },
    updateScheduleBlockDate( date ) {
      const dateTime = new  Date( date ),
        year = dateTime.getFullYear(),
        month = dateTime.getMonth() + 1,
        day = dateTime.getDate();

      this.scheduleBlockDetail.timeSetting.dateMonth = `${year}-${month}-${day}`;
      this.updateTimeSettingScheduleBlock();
    },
    async updateScheduleBlockHour() {
      await this.resetScheduleBlockHour();

      this.scheduleBlockDetail.timeSetting.hour = this.scheduleBlockHour;
      this.updateTimeSettingScheduleBlock();
    },
    updateRepeatType( option, type ) {
      this.repeatDaysSelected = [];
      this.scheduleBlockDetail.timeSetting.repeat.typeRepeat = option;
      this.repeatType = type;
      this.showOptionRepeat = false;
      if ( type !== 5 ) {
        this.updateTimeSettingScheduleBlock();
      }
    },
    updateTimeSettingScheduleBlock() {
      let dataSender;

      if ( this.repeatType !== 5 ) {
        dataSender = {
          blockId: this.scheduleBlockDetail._id,
          type: this.repeatType,
          block: {
            dateMonth: this.scheduleBlockDetail.timeSetting.dateMonth,
            hour: this.scheduleBlockDetail.timeSetting.hour
          }
        };
      } else {
        dataSender = {
          blockId: this.scheduleBlockDetail._id,
          type: this.repeatType,
          block: {
            dateMonth: this.scheduleBlockDetail.timeSetting.dateMonth,
            hour: this.scheduleBlockDetail.timeSetting.hour,
            day: this.scheduleBlockDetail.timeSetting.repeat.valueRepeat
          }
        };
      }

      this.$store.dispatch( "updateTimeSettingScheduleBlockDetail", dataSender );
    }
  }
};
