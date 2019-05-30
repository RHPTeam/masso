import BroadcastService from "@/services/modules/chat/broadcast.service";
import StringFunction from "@/utils/functions/string";

export default {
  data() {
    return {
      listScriptClose: [],
      showTooltip: false,
      isActive: "",
      isShowAlert: false
    };
  },
  async created() {
    // await this.$store.dispatch("getSchedules");
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    allBroadcasts() {
      return this.$store.getters.allBroadcasts;
    }
    // schedules() {
    //   return this.$store.getters.schedules;
    // }
  },
  methods: {
    // addSchedule() {
    //   this.$store.dispatch("createSchedule");
    // },
    // async showSchedule(schedule) {
    //   const dateNow = Date.now();
    //   const scheduleCron =
    //     schedule.timeSetting.dateMonth + " " + schedule.timeSetting.hour;
    //   const dateUpdated = new Date(scheduleCron.replace(/-/g, "/"));
    //   if (Date.parse(dateUpdated) < dateNow) {
    //     this.isActive = schedule._id;
    //     this.$router.push({
    //       name: "f_broadcast_schedule",
    //       params: { scheduleId: schedule._id }
    //     });
    //     let result = await BroadcastService.index();
    //     result = result.data.data.filter(
    //       item =>
    //         StringFunction.convertUnicode(item.typeBroadCast)
    //           .toLowerCase()
    //           .trim() === "thiet lap bo hen"
    //     );
    //     const objSender = {
    //       broadId: result[0]._id,
    //       blockId: schedule._id
    //     };
    //     this.$store.dispatch("getSchedule", objSender);
    //     // this.isShowAlert = true;
    //     // this.$store.dispatch("getStatusDoneSender");
    //   } else {
    //     this.isActive = schedule._id;
    //     this.$router.push({
    //       name: "f_broadcast_schedule",
    //       params: { scheduleId: schedule._id }
    //     });
    //     let result = await BroadcastService.index();
    //     result = result.data.data.filter(
    //       item =>
    //         StringFunction.convertUnicode(item.typeBroadCast)
    //           .toLowerCase()
    //           .trim() === "thiet lap bo hen"
    //     );
    //     const objSender = {
    //       broadId: result[0]._id,
    //       blockId: schedule._id
    //     };
    //     this.$store.dispatch("getSchedule", objSender);
    //   }
    // },
    // closeAlert() {
    //   this.isShowAlert = false;
    // },
    goToSchedule(){
      this.$router.push( {
        name: "broadcast_schedule"
      } );
    }
  },
  filters: {
    filteredName(value) {
      let dateCustom = new Date(value.dateMonth);
      let date = dateCustom.getDate();

      let dateMonth = `Ngày ${dateCustom.getDate()} tháng ${dateCustom.getMonth() +
        1}`;
      // Set case for name
      if (
        StringFunction.convertUnicode(value.repeat.typeRepeat.toLowerCase()) ===
        "khong"
      ) {
        return `${dateMonth} ${value.hour}`;
      } else if (
        StringFunction.convertUnicode(value.repeat.typeRepeat.toLowerCase()) ===
        "hang ngay"
      ) {
        return `Hằng ngày ${value.hour}`;
      } else if (
        StringFunction.convertUnicode(value.repeat.typeRepeat.toLowerCase()) ===
        "cuoi tuan"
      ) {
        return `Cuối tuần ${value.hour}`;
      } else if (
        StringFunction.convertUnicode(value.repeat.typeRepeat.toLowerCase()) ===
        "hang thang"
      ) {
        return `Mỗi ngày ${date} của tháng ${value.hour}`;
      } else if (
        StringFunction.convertUnicode(value.repeat.typeRepeat.toLowerCase()) ===
        "ngay lam viec"
      ) {
        return `Ngày làm việc ${value.hour}`;
      } else if (
        StringFunction.convertUnicode(value.repeat.typeRepeat.toLowerCase()) ===
        "tuy chinh"
      ) {
        if (
          value.repeat.valueRepeat
            .split(",")
            .sort()
            .toString() === "0,6"
        ) {
          return `Cuối tuần ${value.hour}`;
        } else if (
          value.repeat.valueRepeat
            .split(",")
            .sort()
            .toString() === "1,2,3,4,5"
        ) {
          return `Ngày làm việc ${value.hour}`;
        } else if (
          value.repeat.valueRepeat
            .split(",")
            .sort()
            .toString() === "0,1,2,3,4,5,6"
        ) {
          return `Hằng ngày ${value.hour}`;
        } else {
          let arrDate = value.repeat.valueRepeat.split(",");
          let arrOther = [];
          arrDate.sort().map(item => {
            switch (item) {
              case "0":
                return arrOther.push("CN");
              case "1":
                return arrOther.push("T2");
              case "2":
                return arrOther.push("T3");
              case "3":
                return arrOther.push("T4");
              case "4":
                return arrOther.push("T5");
              case "5":
                return arrOther.push("T6");
              case "6":
                return arrOther.push("T7");
            }
          });
          return `${arrOther.toString()} ${value.hour}`;
        }
      }
    }
  }
};
