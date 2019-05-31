<template>
  <!--Start: Popup choose option time-->
  <div>
    <div class="after--day" @click="showAfterDay">
      <span>{{ $t("chat.scripts.sidebar.sequence.items.after") }}</span>
      <span class="px_1">X</span>
      <span>Ngày</span>
    </div>
    <div
      class="show--after-day position_absolute text_left"
      v-if="isShowAfterDay === true"
      v-click-outside="closeShowAfterDay"
    >
      <div>{{ $t("chat.scripts.sidebar.sequence.items.popup.title") }}</div>
      <div class="d_inline_flex hours--day position_relative my_1">
        <contenteditable
          class="text_center number--day"
          tag="div"
          :contenteditable="true"
          v-model="sequenceId.time.numberTime"
          @returned="updateTime(sequenceId)"
          :noNL="true"
        />
        <div class="day" @click="showOptionsDay">
          <span>{{ sequenceId.time.descTime }}</span>
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
        <div class="position_absolute options--day" v-if="isOptionsDay === true">
          <ul>
            <li
              class="py_1 pl_1 py_2"
              @click="closeOptionsDay"
            >{{ $t("chat.scripts.sidebar.sequence.items.popup.optionsDay.now") }}</li>
            <li
              class="py_1 pl_1 py_2"
              @click="closeOptionsDay"
            >{{ $t("chat.scripts.sidebar.sequence.items.popup.optionsDay.seconds") }}</li>
            <li
              class="py_1 pl_1 py_2"
              @click="closeOptionsDay"
            >{{ $t("chat.scripts.sidebar.sequence.items.popup.optionsDay.minute") }}</li>
            <li
              class="py_1 pl_1 py_2"
              @click="closeOptionsDay"
            >{{ $t("chat.scripts.sidebar.sequence.items.popup.optionsDay.hours") }}</li>
            <li
              class="py_1 pl_1 py_2"
              @click="closeOptionsDay"
            >{{ $t("chat.scripts.sidebar.sequence.items.popup.optionsDay.day") }}</li>
            <li
              class="py_1 pl_1 py_2"
              @click="closeOptionsDay"
            >{{ $t("chat.scripts.sidebar.sequence.items.popup.optionsDay.off") }}</li>
          </ul>
        </div>
      </div>
      <div class="follow">{{ $t("chat.scripts.sidebar.sequence.items.popup.followBroadcast") }}</div>
      <div class="follow">{{ $t("chat.scripts.sidebar.sequence.items.popup.followOther") }}</div>
    </div>
  </div>
  <!--End: Popup choose option time-->
</template>

<script>
export default {
  props: ["sequenceId"],
  data() {
    return {
      isShowAfterDay: false,
      isOptionsDay: false
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
    getAllBlockInASequence() {
      this.$store.dispatch("getAllBlockInSequence", this.sequenceId);
    },
    updateTime(content) {
      console.log(content);
      this.$store.dispatch("updateTimeBlockSequence", content);
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
  .day {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 5px;
    width: 90px;
  }
  .follow {
    font-size: 13px;
  }
  .options--day {
    right: 0;
    top: 0;
    font-size: 14px;
    box-shadow: 0 8px 32px 0 rgba(32, 32, 32, 0.08),
      0 0 0 1px rgba(16, 16, 16, 0.04);
    ul {
      background: rgba(255, 255, 255, 0.96);
      border-radius: 5px;
      list-style: none;
      overflow: hidden;
      padding: 0;
      margin: 0;
      width: 90px;
      li {
        color: #000;
        &:hover {
          background: #ffb94a;
          color: #fff;
        }
      }
    }
  }
}
</style>
