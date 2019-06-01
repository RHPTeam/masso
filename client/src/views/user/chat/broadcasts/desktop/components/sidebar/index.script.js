import StringFunction from "@/utils/functions/string";

export default {
  data() {
    return {
      isActive: "",
      isShowAlert: false,
      listScriptClose: [],
      showTooltip: false,
      scheduleBlockSelected: "",
    };
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
  async created() {
    const scheduleBlockId = this.$route.params.scheduleBlockId;

    if ( scheduleBlockId !== "" ) {
      this.scheduleBlockSelected = scheduleBlockId;
    }
  },
  methods: {
    createScheduleBlock() {
      const id = this.allBroadcasts[1]._id;

      this.$store.dispatch("createScheduleBlock", id );
    },
    goToScheduleBlock( block ){
      this.scheduleBlockSelected = block._id;
      this.$store.dispatch( "setScheduleBlockDetail", block );

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

       const repeatType = StringFunction.convertUnicode( block.repeat.typeRepeat ).toLowerCase();

      // Set case for name
      if ( repeatType === "khong") {
        return `${dateMonth} ${block.hour}`;
      } else if ( repeatType === "hang ngay" ) {
        return `Hằng ngày ${block.hour}`;
      } else if ( repeatType === "cuoi tuan" ) {
        return `Cuối tuần ${block.hour}`;
      } else if ( repeatType === "hang thang" ) {
        return `Mỗi ngày ${date} của tháng ${block.hour}`;
      } else if ( repeatType === "ngay lam viec" ) {
        return `Ngày làm việc ${block.hour}`;
      } else if ( repeatType === "tuy chinh" ) {
        if (
          block.repeat.valueRepeat
            .split(",")
            .sort()
            .toString() === "0,6"
        ) {
          return `Cuối tuần ${block.hour}`;
        } else if (
          block.repeat.valueRepeat
            .split(",")
            .sort()
            .toString() === "1,2,3,4,5"
        ) {
          return `Ngày làm việc ${block.hour}`;
        } else if (
          block.repeat.valueRepeat
            .split(",")
            .sort()
            .toString() === "0,1,2,3,4,5,6"
        ) {
          return `Hằng ngày ${block.hour}`;
        } else {
          let arrDate = block.repeat.valueRepeat.split(",");
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
