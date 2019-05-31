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
    },
    broadcastStatus() {
      return this.$store.getters.allBroadcastsStatus;
    },
    scheduleBlocks() {
      return this.$store.getters.scheduleBlocks;
    }
  },
  methods: {
    addSchedule() {
      this.$store.dispatch("createSchedule");
    },
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
    goToScheduleBlock( block ){
      this.$store.dispatch( "getScheduleBlockDetail", block );

      this.$router.push( {
        name: "chat_broadcast_schedule",
        params: { scheduleBlockId: block._id }
      } );
    }
  },
  filters: {
    filteredName( block ) {
      let dateCustom = new Date(block.dateMonth),
        date = dateCustom.getDate(),
        dateMonth = `Ngày ${dateCustom.getDate()} tháng ${dateCustom.getMonth() + 1}`;

      // Set case for name
      if ( block.repeat.typeRepeat === "Không") {
        return `${dateMonth} ${block.hour}`;
      } else if ( block.repeat.typeRepeat === "Hằng ngày" ) {
        return `Hằng ngày ${block.hour}`;
      } else if ( block.repeat.typeRepeat === "Cuối tuần" ) {
        return `Cuối tuần ${block.hour}`;
      } else if ( block.repeat.typeRepeat.toLowerCase() === "Hằng tháng" ) {
        return `Mỗi ngày ${date} của tháng ${block.hour}`;
      } else if ( block.repeat.typeRepeat.toLowerCase() === "Ngày làm việc" ) {
        return `Ngày làm việc ${block.hour}`;
      } else if ( block.repeat.typeRepeat.toLowerCase() === "Tùy chỉnh" ) {
        if (
          block.repeat.blockRepeat
            .split(",")
            .sort()
            .toString() === "0,6"
        ) {
          return `Cuối tuần ${block.hour}`;
        } else if (
          block.repeat.blockRepeat
            .split(",")
            .sort()
            .toString() === "1,2,3,4,5"
        ) {
          return `Ngày làm việc ${block.hour}`;
        } else if (
          block.repeat.blockRepeat
            .split(",")
            .sort()
            .toString() === "0,1,2,3,4,5,6"
        ) {
          return `Hằng ngày ${block.hour}`;
        } else {
          let arrDate = block.repeat.blockRepeat.split(",");
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
          return `${arrOther.toString()} ${block.hour}`;
        }
      }
    }
  }
};
