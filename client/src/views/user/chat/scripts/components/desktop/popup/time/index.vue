<template>
  <!--Start: Popup choose option time-->
  <div>
    <div class="after--day" @click="showAfterDay">
      <span>{{ $t("chat.scripts.sidebar.sequence.items.after") }}</span>
      <span class="px_1">{{ item.time.numberTime }}</span>
      <span>{{ item.time.descTime }}</span>
    </div>
    <div
      class="show--after-day position_absolute text_left"
      v-if="isShowAfterDay === true"
      v-click-outside="closeShowAfterDay"
    >
      <div>{{ $t("chat.scripts.sidebar.sequence.items.popup.title") }}</div>
      <div class="d_inline_flex hours--day position_relative my_1">
        <contenteditable
          class="editable input text_center number--day"
          tag="div"
          placeholder="..."
          :contenteditable="true"
          v-model="item.time.numberTime"
          @keyup="upTypingText('timesequence', item)"
          @keydown="clear"
        />
        <div class="day" @click="showOptionsDay">
          <contenteditable
            class="editable input"
            tag="span"
            placeholder="..."
            :contenteditable="true"
            v-model="item.time.descTime"
          />
          <icon-base
            class="icon--sort-down float_right mt_2"
            icon-name="IconSortDown"
            width="17"
            height="10"
            viewBox="0 0 10 10"
          >
            <icon-sort-down/>
          </icon-base>
        </div>
        <div class="d_none">{{ $t("chat.scripts.sidebar.sequence.items.popup.optionsDay.now") }}</div>
        <div
          class="position_absolute options--day"
          v-if="isOptionsDay === true"
        >
          <div class="options">
            <div
              class="py_1 pl_1 py_2 desc--time"
              v-for="(option, index) in dataOption"
              :key="index"
              @click="updateDescTimeSequence(option)">
              {{ option.value }}
            </div>
          </div>
        </div>
      </div>
      <div class="follow">{{ $t("chat.scripts.sidebar.sequence.items.popup.followBroadcast") }}</div>
      <div class="follow">{{ $t("chat.scripts.sidebar.sequence.items.popup.followOther") }}</div>
    </div>
  </div>
  <!--End: Popup choose option time-->
</template>

<script>
let typingTimer;
export default {
  props: {
    sequenceId: String,
    item: Object
  },
  data() {
    return {
      isShowAfterDay: false,
      isOptionsDay: false,
      dataOption: [
        { key: 0, value: "Gửi ngay" },
        { key: 1, value: "Giây" },
        { key: 2, value: "Phút" },
        { key: 3, value: "Giờ" },
        { key: 4, value: "Ngày" },
        { key: 5, value: "Tắt" }
      ]
    };
  },
  methods: {
    showAfterDay() {
      this.isShowAfterDay = true;
    },
    closeShowAfterDay() {
      this.isShowAfterDay = false;
    },
    showOptionsDay() {
      this.isOptionsDay = true;
    },
    closeOptionsDay() {
      this.isOptionsDay = false;
    },

    // update time or day
    upTypingText(type, group) {
      clearTimeout(typingTimer);
      if (type === "timesequence") {
        typingTimer = setTimeout(this.updateTimeSequence(group), 800);
      }
    },
    clear() {
      clearTimeout(typingTimer);
    },
    updateTimeSequence() {
      const objSender = {
        sqId: this.sequenceId,
        blockId: this.item._id,
        numberTime: this.item.time.numberTime
      };
      this.$store.dispatch("updateNumberTimeItemSqc", objSender);
    },
    updateDescTimeSequence( option ) {
      this.isOptionsDay = false;
      const objSender = {
        sqId: this.sequenceId,
        blockId: this.item._id,
        descTime: option.value
      };
      this.$store.dispatch("updateDescTimeItemSqc", objSender);
    }
  }
};
</script>

<style lang="scss" scoped>
.after--day {
  padding: 10px 5px;
  text-overflow: ellipsis;
  cursor: pointer;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
}
.show--after-day {
  top: 100%;
  background: #fff;
  font-size: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  z-index: 5;
  padding: 6px;
  width: 170px;
  color: #262626;
  .number--day {
    outline: none;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 5px 0;
    width: 60px;
    margin-right: 5px;
    text-overflow: ellipsis;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
}
.show--after-day{
    top: 100%;
    background: #fff;
    font-size: 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
    z-index: 5;
    padding: 6px;
    width: 170px;
    color: #262626;
    .number--day{
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 5px 0;
        width: 60px;
        margin-right: 5px;
        text-overflow: ellipsis;
        cursor: pointer;
        white-space: nowrap; 
        overflow: hidden;
    }
    .follow{
        font-size: 13px;
    }
}
    .day{
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 5px;
        width: 90px;
    }
.options--day{
    right: 0;
    top: 0;
    font-size: 14px;
    box-shadow: 0 8px 32px 0 rgba(32, 32, 32, 0.08), 0 0 0 1px rgba(16, 16, 16, 0.04);
    .options{
        background: rgba(255, 255, 255, 0.96);
        border-radius: 5px;
        list-style: none;
        overflow: hidden;
        padding: 0;
        margin: 0;
        width: 90px;
        .desc--time{
            color: #000;
            &:hover{
                background: #ffb94a;
                color: #fff;
            }
        }
      }
    }
}
</style>
