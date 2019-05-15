<template>
  <div class="time">
    <div class="header mb_2">
      <!-- Start: Title header -->
      <div class="title mr_2 d_flex align_items_center">
        <icon-base
          class="icon--sort-down"
          icon="icon--sort-down"
          width="14px"
          heigh="5px"
          viewBox="0 0 14 14"
        >
          <icon-sort-down></icon-sort-down>
        </icon-base>
        <span>Tùy chỉnh thời gian</span>
      </div>
      <!-- End: Title header -->
    </div>
    <div class="body">
      <div class="date d_flex align_items_center mb_3">
        <div class="desc mr_3">Thời gian bắt đầu sự kiện:</div>
        <time-picker
          v-model="yourTimeValue"
          @change="changeTimeSetup"
        />
        <date-picker 
          class="ml_3"
          @selected="changeDateSetup"
          :disabledDates="disabledDates"
          v-model="currrentDefault"
        />
      </div>
      <div class="break d_flex align_items_center">
        <div class="desc mr_3">Thời gian chờ giữa các lần gửi:</div>
        <div class="item d_flex align_items_center mr_2">
          <input class="input--time" type="number" min="5" v-model="timeNumberDefault" />
        </div>
        <div class="item d_flex align_items_center">
          <input class="input--time" type="text" v-model="timeDescDefault" readonly />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const currentTimeStamp = new Date();
import DateFunction from "@/utils/functions/date";
export default {
  data() {
    return {
      disabledDates: {
        to: new Date(currentTimeStamp.getFullYear(), currentTimeStamp.getMonth(), currentTimeStamp.getDate()) // Disable all dates up to specific date
      },
      yourTimeValue: {
        HH: "07",
        mm: "00"
      },
      timeNumberDefault: 15,
      timeDescDefault: "Phút",
      currrentDefault: new Date()
    }
  },
  watch: {
    "timeNumberDefault"( val ) {
      localStorage.setItem( "breakPoin", val );
    }
  },
  methods: {
    changeTimeSetup( val ) {
      const setTime = {
        year: this.currrentDefault.getFullYear(),
        month: this.currrentDefault.getMonth(),
        date: this.currrentDefault.getDate(),
        hour: parseInt( val.HH ),
        minute: parseInt( val.mm )
      };
      const result = new Date( setTime.year, setTime.month, setTime.date, setTime.hour, setTime.minute );
      localStorage.setItem( "startAt", result );
    },
    changeDateSetup( val ) {
      const setTime = {
        year: val.getFullYear(),
        month: val.getMonth(),
        date: val.getDate(),
        hour: parseInt( this.yourTimeValue.HH ),
        minute: parseInt( this.yourTimeValue.mm )
      };
      const result = new Date( setTime.year, setTime.month, setTime.date, setTime.hour, setTime.minute );
      localStorage.setItem( "startAt", result );
    }
  },
}
</script>

<style lang="scss" scoped>
.time {
  .header {
    .title {
      span {
        font-weight: 600;
      }
    }
  }
  .body {
    .break {
      .input--time {
        background-color: #ffffff;
        width: 80px;
        height: 38px;
        border: none;
        border-radius: calc(.5rem + 2px);
        text-align: center;
        &:hover, &:active, &:visited, &:focus {
          box-shadow: none;
          outline: 0;
        }
      }
    }
  }
}
</style>
