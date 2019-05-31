<template>
  <div>
    <div class="card card_body script--body-timer position_relative mb_4">
      <div class="timer--title mb_2 text_left">
        <img src="@/assets/images/upload/icon_time_round.svg" height="30px" alt="" class="mr_1">
        {{ $t('chat.common.card.timerSendMessage') }}
      </div>
      <div class="time--adjust">
        <input
          type="range"
          :style="{ 'background-size': percentTime + '% 100%' }"
        />
        <div class="time--value position_relative pt_1">
          <div
            class="time--value-limit d_flex justify_content_between align_items_end"
          >
            <span>{{ mintime }}s</span>
            <span>{{ maxtime }}s</span>
          </div>
          <div
            class="time--value-current position_absolute"
          >
            <!-- 10 s -->
          </div>
        </div>
      </div>
      <div class="script--body-delete" @click="isDeleteItemBlock = true">
        <icon-base
          class="icon--delete"
          icon-name="remove"
          width="20"
          height="20"
          viewBox="0 0 15 15"
        >
          <icon-remove />
        </icon-base>
      </div>
      <div class="script--body-move d_none ">
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
    <!--Delete Item Popup-->
    <transition name="popup">
      <delete-campaign-popup
          v-if="isDeleteItemBlock === true"
          :data-theme="currentTheme"
          title="Delete Time"
          @closePopup="isDeleteItemBlock = $event"
          storeActionName="deleteTime"
          typeName="TIME"
      ></delete-campaign-popup>
    </transition>
  </div>
</template>
<script>
import DeleteCampaignPopup from "@/components/popups/delete";
export default {
  props: ["index.vue", "block"],
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
  //   changeTime(e, id) {
  //     this.item.valueText = e.target.value;
  //     const objSender = {
  //       itemId: id,
  //       valueText: this.item.valueText,
  //       type: "time",
  //       block: this.$store.getters.block
  //     };
  //     this.$store.dispatch("updateItemBlock", objSender);
  //   }
  // },
  components: {
    DeleteCampaignPopup
  }
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
  .timer--title {
    font-weight: 600;
    font-size: 16px;
    color: #000000ed;
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
    .icon--delete{
      transition: 0.3s;
      &:hover{
        color: #ffb94a;
      }
    }
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
      color: #000000ed;
      font-weight: bold;
    }
  }
  .script--body-delete{
    svg{
      color: #333;
      &:hover{
        color: #ffb94a;
      }
    }
  }
}
div[data-theme="dark"] {
  /*****Script Body Timer*****/
  .script--body-timer {
    color: #ccc;
    background: #2f3136;
    input[type="range"] {
      background-color: #2f3136;
    }
    .timer--title {
      color: #ccc;
    }

    &:hover{
      border: 1px solid rgb(72, 72, 72);
      box-shadow: 0;
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
