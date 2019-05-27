<template>
  <div :data-theme="currentTheme">
    <div class="card card_body script--body-timer position_relative mb_4">
      <div class="timer--title mb_2 text_left">
        <img src="@/assets/images/upload/icon_time_round.svg" height="30" class="mr_1">
        Khoảng thời gian giữa các lần gửi tin nhắn
      </div>
      <div class="time--adjust">
        <input
          type="range"
          :min="mintime"
          :max="maxtime"
          :style="{ 'background-size': percentTime + '% 100%' }"
        />
        <div class="time--value position_relative pt_1">
          <div
            class="time--value-limit d_flex justify_content_between align_items_end"
          >
            <span>{{ mintime }}s</span>
            <span>{{ maxtime }}s</span>
          </div>
          <!-- <div
            class="time--value-current position_absolute"
            :style="{ left: percentTime + '%' }"
            v-if="item.valueText > mintime && item.valueText < maxtime"
          >
            {{ item.valueText }}s
          </div> -->
        </div>
      </div>
      <div class="script--body-delete" @click="isDeleteItemBlock = true">
        <icon-base
          icon-name="remove"
          width="20"
          height="20"
          viewBox="0 0 15 15"
        >
          <icon-remove />
        </icon-base>
      </div>
      <div class="script--body-move d_none mt_4">
        <icon-base
          icon-name="remove"
          width="20"
          height="20"
          viewBox="0 0 64 64"
        >
          <icon-move />
        </icon-base>
      </div>
    </div>
    <!-- Start: Delete Item Popup-->
    <transition name="popup">
      <delete-campaign-popup
          v-if="isDeleteItemBlock === true"
          :data-theme="currentTheme"
          title="Delete Property"
          @closePopup="isDeleteItemBlock = $event"
          storeActionName="deleteProperty"
          typeName="Property"
      ></delete-campaign-popup>
    </transition>
    <!-- End: Delete Item Popup -->
  </div>
</template>
<script>
import BroadcastService from "@/services/modules/chat/broadcast.service";
import StringFunction from "@/utils/functions/string";
import DeleteCampaignPopup from "@/components/popups/delete";
export default {
  props: ["item", "schedule"],
  data() {
    return {
      maxtime: 20,
      mintime: 0,
      percentTime: 0,
      isDeleteItemBlock: false
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  components: {
    DeleteCampaignPopup
  },
  // watch: {
  //   "item.valueText"() {
  //     this.percentTime =
  //       (parseInt(this.item.valueText) * 100) /
  //       (parseInt(this.maxtime) - parseInt(this.mintime));
  //   }
  // },
  async created() {
    this.percentTime =
      ( 10 * 100) /
      (parseInt(this.maxtime) - parseInt(this.mintime));
  },
  // methods: {
  //   async changeTime(e, id) {
  //     this.item.valueText = e.target.value;
  //     let result = await BroadcastService.index();
  //     result = result.data.data.filter(
  //       item =>
  //         StringFunction.convertUnicode(item.typeBroadCast)
  //           .toLowerCase()
  //           .trim() === "thiet lap bo hen"
  //     );
  //     const objSender = {
  //       bcId: result[0]._id,
  //       blockId: this.$store.getters.schedule._id,
  //       contentId: id,
  //       value: e.target.value
  //     };
  //     this.$store.dispatch("updateItemSchedule", objSender);
  //   }
  // }
};
</script>
<style lang="scss" scoped>
/**    Script Body Timer      **/
.script--body-timer {
  max-width: 450px;
  border-radius: 10px;
  transition: 0.3s;
  &:hover{
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.11), 0 1px 0 0 rgba(0, 0, 0, 0.08);
  }
  .time--adjust {
    max-width: 320px;
  }
  input[type="range"] {
    background-image: linear-gradient(#ffb94a, #ffb94a);
    background-repeat: no-repeat;
    // background-size: 0% 100%;
    border-radius: 10px;
    cursor: pointer;
    height: 7.5px;
    outline: none;
    padding: 0;
    width: 100%;
    -webkit-appearance: none;
    &::-webkit-slider-runnable-track {
      box-shadow: none;
      border: none;
      background: transparent;
      -webkit-appearance: none;
    }
    &::-moz-range-track {
      box-shadow: none;
      border: none;
      background: transparent;
    }
    &::-moz-focus-outer {
      border: 0;
    }
    &::-webkit-slider-thumb {
      width: 15px;
      height: 15px;
      border: 0;
      background: #ffb94a;
      border-radius: 100%;
      -webkit-appearance: none;
    }
    &::-moz-range-thumb {
      width: 15px;
      height: 15px;
      border: 0;
      background: #ffb94a;
      border-radius: 100%;
    }
  }
  .time--value {
    font-weight: 600;
  }
  .time--value-current {
    bottom: 0;
    color: #ffb94a;
    transform: translateX(-50%);
  }
  /*    Icon Delete   */
  .script--body-delete {
    cursor: pointer;
    position: absolute;
    right: -30px;
    top: 50%;
    transform: translateY(-50%);
  }
  /*    Icon Move   */
  .script--body-move {
    cursor: pointer;
    position: absolute;
    right: -30px;
    top: 30px;
  }
}
div[data-theme="light"] {
  /*****Script Body Timer*****/
  .script--body-timer {
    color: #ccc;
    input[type="range"] {
      background-color: #e4e4e4;
    }
    .timer--title {
      font-weight: 600;
      font-size: 16px;
      color: #000000ed;
    }
    .script--body-delete{
      color: #666;
    }
  }
}
div[data-theme="dark"] {
  /*****Script Body Timer*****/
  .script--body-timer {
    color: #ccc;
    background: #2f3136;
    background: #212529;
    input[type="range"] {
      background-color: #2f3136;
    }
    .timer--title {
      color: #ccc;
    }
  }
}

@media only screen and (max-width: 845px) and (min-width: 768px){
  .script--body{
      &-timer{
          width: 280px!important;
      }
  }
}
</style>
