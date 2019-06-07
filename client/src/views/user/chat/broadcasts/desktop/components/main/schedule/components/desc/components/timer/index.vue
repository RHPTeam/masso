<template>
  <!--Section option hours-->
  <div class="timer" :data-theme="currentTheme" v-if="scheduleBlockDetail.timeSetting !== undefined">
    <!-- Start: Option time -->
    <div class="option--time py_3 d_flex align_items_center mt_2"
    >
      <!-- Start: Day Setting-->
      <date-picker
        class="option--time-days position_relative"
        placeholder="Chọn ngày"
        v-model="scheduleBlockDetail.timeSetting.dateMonth"
        format="DD/MM/YYYY"
        @change="updateScheduleBlockDate($event)"
      ></date-picker>
      <!-- End: Day Setting-->
      <!-- Start: Time Setting -->
      <div class="option--time-hours mr_4 ml_4">
        <time-picker
          class="option--time-item text_center"
          v-model="scheduleBlockHour"
          @change="updateScheduleBlockHour($event)"
        />
      </div>
      <!-- End: Time Setting-->
      <!-- Start: Repeat setting -->
      <div class="option--time-repeat position_relative"
           v-click-outside="closeShowOptionRepeat"
      >
        <div @click="showOptionRepeat = true">
          <input
            type="text"
            readonly
            class="form_control option--time-item"
            :value="'Lặp lại: ' + scheduleBlockDetail.timeSetting.repeat.typeRepeat">
        </div>
        <div class="icon position_absolute">
          <icon-base
            icon-name="arrow-down"
            width="10"
            height="10"
            viewBox="0 0 130 130">
            <icon-arrow-down/>
          </icon-base>
        </div>
        <div class="option--repeat position_absolute text_left" v-show="showOptionRepeat">
          <div class="option--repeat-item"
               :class="{ active: repeatDaysSelected.includes(index) }"
               v-for="( option, index ) in $t('chat.broadcast.main.scripts.timer.repeatOptions')"
               :key="index"
               @click="updateRepeatType( option, index )"
          >
            Lặp lại: {{ option }}
          </div>
        </div>
      </div>
      <!-- End: Repeat setting -->
    </div>
    <!-- End: Option time -->
    <!-- Start: Repeat custom option-->
    <div class="option--custom mb_3" v-if="scheduleBlockDetail.timeSetting.repeat.typeRepeat === 'Tùy chỉnh'">
      <div class="option--custom-wrap d_inline_flex">
        <div class="item"
             @click.prevent="chooseDaysRepeat(index)"
             :class="[
                scheduleBlockDetail.timeSetting.repeat.valueRepeat
                  .split(',')
                  .includes(index.toString())
                  ? 'active'
                  : ''
              ]"
             v-for="( item, index ) in $t('chat.broadcast.main.scripts.timer.options')"
             :key="index"
        >
          {{ item }}
        </div>
      </div>
    </div>
    <!-- End: Repeat custom option-->
  </div>
  <!--End Section option hours-->
</template>
<script>
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
    },
    scheduleBlockHour() {
      const blockHour = this.scheduleBlockDetail.timeSetting.hour,
            hour = blockHour.substr( 0, blockHour.indexOf( ":" ) ),
            min = blockHour.substr( blockHour.indexOf(":") + 1 );

      return {
        HH: hour,
        mm: min
      }
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
    updateScheduleBlockDate( date ) {
      const dateTime = new  Date( date ),
            year = dateTime.getFullYear(),
            month = dateTime.getMonth() + 1,
            day = dateTime.getDate();

      this.scheduleBlockDetail.timeSetting.dateMonth = `${year}-${month}-${day}`;
      this.updateTimeSettingScheduleBlock();
    },
    updateScheduleBlockHour( val ) {
      this.scheduleBlockDetail.timeSetting.hour = `${val.HH}:${val.mm}`;
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
</script>
<style lang="scss" scoped>
@import "index.style";
</style>

<style lang="scss">
div[data-theme="light"] .timer {
  .option--time-days {
    input[name="date-setting"] {
      background: #ffffff;
      border: 1px solid #e4e4e4;
      color: #495057;
      cursor: pointer;
      font-size: 1rem;
      border-radius: 10px;
      height: 40px;
      padding-left: 1rem;
      &:hover,
      &:active,
      &:visited,
      &:focus {
        box-shadow: none;
        outline: 0;
        border-color: #e4e4e4;
      }
    }
  }
  .option--time .icon svg {
    color: #666;
  }
}

div[data-theme="dark"] .timer {
  .option--time-days {
    input[name="date-setting"] {
      background: #27292d;
      border: 1px solid #27292d;
      color: #ccc;
      cursor: pointer;
      font-size: 1rem;
      border-radius: 0.5rem;
      height: 40px;
      padding-left: 1rem;
      &:hover,
      &:active,
      &:visited,
      &:focus {
        box-shadow: none;
        outline: 0;
        border-color: #27292d;
      }
    }
  }
  .mx-input {
    background: #27292d;
    border: 0;
  }
}
</style>
