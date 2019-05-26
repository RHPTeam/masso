<template>
  <!--Section option hours-->
  <div class="timer" :data-theme="currentTheme">
    <!-- <div
      class="option--time-repeat position_relative"
    ></div> -->
    <div class="option--time py_3 d_flex align_items_center mt_4">
      <date-picker
        class="option--time-days position_relative"
        placeholder="Chọn ngày"
        name="date-setting"
      ></date-picker>
      <div class="option--time-hours mr_4 ml_4">
        <input
          type="text"
          placeholder="12:00"
          class="form_control option--time-item text_center"
        />
      </div>
      <div
        class="option--time-repeat position_relative"
      >
        <input
          type="text"
          readonly
          class="form_control option--time-item"
        />
        <div class="icon position_absolute">
          <icon-base
            icon-name="arrow-down"
            width="10"
            height="10"
            viewBox="0 0 130 130"
          >
            <icon-arrow-down />
          </icon-base>
        </div>
        <div
          class="option--repeat position_absolute text_left d_none"
        >
          <div
            class="option--repeat-item"
          >
            Lặp lại: item.value
          </div>
          <div class="option--repeat-item">
            Lặp lại: Tùy chỉnh
          </div>
        </div>
      </div>
    </div>
    <div class="option--custom d_none">
      <div class="option--custom-wrap d_flex mb_3">
        <div
          class="option--custom-item"
        >
          item.value
        </div>
      </div>
    </div>
  </div>
  <!--End Section option hours-->
</template>
<script>
import BroadcastService from "@/services/modules/chat/broadcast.service";
import StringFunction from "@/utils/functions/string";

const currentTimeStamp = new Date();

export default {
  data() {
    return {
      showOptionRepeat: false,
      showOptionDays: false,
      showCustom: false,
      repeatContent: "Lặp Lại: Không",
      repeats: [
        { key: 0, value: "Không" },
        { key: 1, value: "Hằng ngày" },
        { key: 2, value: "Cuối tuần" },
        { key: 3, value: "Hàng tháng" },
        { key: 4, value: "Làm việc" }
      ],
      options: [
        { key: 0, value: "CN" },
        { key: 1, value: "T2" },
        { key: 2, value: "T3" },
        { key: 3, value: "T4" },
        { key: 4, value: "T5" },
        { key: 5, value: "T6" },
        { key: 6, value: "T7" }
      ],
      setupHours: "",
      selectedOption: [],
      nowTimeStamp: Date.now(),
      disabledDates: {
        to: new Date(currentTimeStamp.getFullYear(), currentTimeStamp.getMonth(), currentTimeStamp.getDate()) // Disable all dates up to specific date
      }
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    // schedule() {
    //   if (this.$store.getters.schedule === undefined) return;
    //   return this.$store.getters.schedule;
    // }
  },
  methods: {
    // async chooseDaysRepeat(id) {
    //   if (this.selectedOption.includes(id)) {
    //     // remove item out ot array
    //     this.selectedOption = this.selectedOption.filter(item => item !== id);
    //   } else {
    //     // add item in array
    //     this.selectedOption.push(id);
    //   }
    //   this.schedule.timeSetting.repeat.valueRepeat = this.selectedOption.toString();
    //   const schedules = await this.getSchedules();
    //   const objSender = {
    //     bc_id: schedules._id,
    //     b_id: this.$route.params.scheduleId,
    //     type: 5,
    //     value: this.schedule.timeSetting.repeat.valueRepeat
    //   };
    //   this.$store.dispatch("updateSchedule", objSender);
    // },
    // async chooseOption(item) {
    //   let type;
    //   this.schedule.timeSetting.repeat.typeRepeat = item.value;
    //   if (item.key === 0) {
    //     this.schedule.timeSetting.repeat.valueRepeat = "";
    //     type = 0;
    //   } else if (item.key === 1) {
    //     this.schedule.timeSetting.repeat.valueRepeat = "0,1,2,3,4,5,6";
    //     type = 1;
    //   } else if (item.key === 2) {
    //     this.schedule.timeSetting.repeat.valueRepeat = "0,6";
    //     type = 2;
    //   } else if (item.key === 3) {
    //     this.schedule.timeSetting.repeat.valueRepeat = "";
    //     type = 3;
    //   } else if (item.key === 4) {
    //     this.schedule.timeSetting.repeat.valueRepeat = "1,2,3,4,5";
    //     type = 4;
    //   }
    //   let result = await BroadcastService.index();
    //   result = result.data.data.filter(
    //     item =>
    //       StringFunction.convertUnicode(item.typeBroadCast)
    //         .toLowerCase()
    //         .trim() === "thiet lap bo hen"
    //   );
    //   const objSender = {
    //     bc_id: result[0]._id,
    //     b_id: this.$route.params.scheduleId,
    //     type: type
    //   };
    //   this.$store.dispatch("updateSchedule", objSender);
    //   this.$router.push({
    //     name: "f_broadcast_schedule",
    //     params: { scheduleId: this.$route.params.scheduleId }
    //   });
    // },
    // closeOptionRepeat() {
    //   this.showOptionRepeat = false;
    // },
    // async getSchedules() {
    //   let result = await BroadcastService.index();
    //   result = result.data.data.filter(
    //     item =>
    //       StringFunction.convertUnicode(item.typeBroadCast)
    //         .toLowerCase()
    //         .trim() === "thiet lap bo hen"
    //   );
    //   return result[0];
    // },
    // openCustom() {
    //   this.showCustom = true;
    //   this.schedule.timeSetting.repeat.typeRepeat = "Tùy chỉnh";
    // },
    // async updateTimeSchedule() {
    //   const schedules = await this.getSchedules();
    //   const objSender = {
    //     bcId: schedules._id,
    //     blockId: this.schedule._id,
    //     value: this.schedule.timeSetting.hour
    //   };
    //   console.log(objSender);
    //   this.$store.dispatch("updateTimeSchedule", objSender);
    // },
    // async updateDate() {
    //   const schedules = await this.getSchedules();
    //   const objSender = {
    //     bcId: schedules._id,
    //     blockId: this.schedule._id,
    //     value: this.schedule.timeSetting.dateMonth
    //   };
    //   this.$store.dispatch("updateDateSchedule", objSender);
    // }
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
  .mx-input{
    background: #27292d;
    border: 0;
  }
}
</style>
