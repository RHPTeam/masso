<template>
  <div class="post--time mt_4">
    <div class="title mb_2">
      <icon-base
        class="icon--sort-down"
        icon="icon--sort-down"
        width="14px"
        heigh="14px"
        viewBox="0 0 14 14"
      >
        <icon-sort-down></icon-sort-down>
      </icon-base>
      Thời gian
    </div>
    <div class="px_3">
      <div class="post--time-item d_flex align_items_center mb_3">
        <div class="item--label mr_3">Thời gian bắt đầu:</div>
        <div class="item--input d_flex align_items_center">
          <time-picker class="mr_2" v-model="yourTimeValue" @change="updateTime" />
          <date-picker
            class="time--datepicker"
            @selected="updateDate"
            :disabledDates="disabledDates"
          />
        </div>
      </div>
      <div class="post--time-item d_flex align_items_center">
        <div class="item--label mr_3">Thời gian chờ giữa các lần gửi:</div>
        <div class="item--input d_flex align_items_center mr_2">
          <input class="input--time" type="number" min="5" v-model="timeNumberDefault" />
        </div>
        <div class="item--input d_flex align_items_center">
          <input class="input--time" type="text" v-model="timeDescDefault" readonly />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const currentTimeStamp = new Date();

import DateFunction from "@/utils/date.util";

export default {
  components: {
  },
  data() {
    return {
      disabledDates: {
        to: new Date(currentTimeStamp.getFullYear(), currentTimeStamp.getMonth(), currentTimeStamp.getDate()) // Disable all dates up to specific date
      },
      timeNumberDefault: 15,
      timeDescDefault: "Phút",
      yourTimeValue: {
        HH: "07",
        mm: "00"
      },
      newDate: {
        minute: null,
        hour: null,
        date: null,
        month: null,
        year: null
      }
    }
  },
  watch: {
    timeNumberDefault(value){
      this.$emit( "updateTimeBreakPoint", value );
    }
  },
  methods: {
    updateDate( val ) {
      const time = DateFunction.getObjectDate(val);
      this.newDate.date = time.date;
      this.newDate.month = time.month;
      this.newDate.year = time.year;
      this.$emit( "updateDateToMiddleComponent", this.newDate );
    },
    updateTime(val){
      this.newDate.minute = parseInt(val.mm);
      this.newDate.hour = parseInt(val.HH);
      this.$emit( "updateTimeToMiddleComponent", this.newDate );
    }
  },
}
</script>

<style scoped lang="scss">
  .post--time {
    .title {
      color: #666;
      font-weight: 600;
      .icon--sort-down {
        vertical-align: middle;
        vertical-align: -webkit-baseline-middle;
      }
    }
    .post--time-item {
      .item--input {
        input {
          border: 0;
          border-radius: .625rem;
          height: 40px;
          line-height: 40px;
          text-align: center;
          &:focus {
            border: 0;
            box-shadow: none;
            outline: 0;
          }
          &::-webkit-outer-spin-button,
          &::-webkit-inner-spin-button {
            /* display: none; <- Crashes Chrome on hover */
            -webkit-appearance: none;
            margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
          }
        }
        .input--number {
          width: 80px;
        }
        .input--time {
          width: 89px;
        }
      }
    }
  }
</style>
