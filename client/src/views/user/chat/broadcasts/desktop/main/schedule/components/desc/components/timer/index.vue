<template>
  <!--Section option hours-->
  <div class="timer" :data-theme="currentTheme" v-if="scheduleBlockDetail.timeSetting !== undefined">
    <!-- Start: Option time -->
    <div class="option--time py_3 d_flex align_items_center mt_2"
    >
      <!-- Start: Day Setting-->
      <date-picker
        class="option--time-days position_relative"
        placeholder="Chọn ngày"
        v-model="scheduleBlockDetail.timeSetting.dateMonth"
        format="DD/MM/YYYY"
        :clearable="false"
        :disabled-days="disabledDays"
        @change="updateScheduleBlockDate($event)"
      ></date-picker>
      <!-- End: Day Setting-->
      <!-- Start: Time Setting -->
      <div class="option--time-hours mr_4 ml_4">
        <!--<time-picker
          class="option--time-item text_center"
          v-model="scheduleBlockHour"
          @change="updateScheduleBlockHour($event)"
        />-->
        <input type="text"
               class="option--time-item text_center"
               :class="scheduleBlockHourValid ? 'error' : null"
               placeholder="HH:mm"
               v-model="scheduleBlockHour"
               @change="updateScheduleBlockHour"
        >
      </div>
      <!-- End: Time Setting-->
      <!-- Start: Repeat setting -->
      <div class="option--time-repeat position_relative"
           v-click-outside="closeShowOptionRepeat"
      >
        <div @click="showOptionRepeat = true">
          <input
            type="text"
            readonly
            class="form_control option--time-item"
            :value="'Lặp lại: ' + scheduleBlockDetail.timeSetting.repeat.typeRepeat">
        </div>
        <div class="icon position_absolute">
          <icon-base
            icon-name="arrow-down"
            width="10"
            height="10"
            viewBox="0 0 130 130">
            <icon-arrow-down/>
          </icon-base>
        </div>
        <div class="option--repeat position_absolute text_left" v-show="showOptionRepeat">
          <div class="option--repeat-item"
               :class="{ active: repeatDaysSelected.includes(index) }"
               v-for="( option, index ) in $t('chat.broadcast.main.scripts.timer.repeatOptions')"
               :key="index"
               @click="updateRepeatType( option, index )"
          >
            Lặp lại: {{ option }}
          </div>
        </div>
      </div>
      <!-- End: Repeat setting -->
    </div>
    <!-- End: Option time -->
    <!-- Start: Repeat custom option-->
    <div class="option--custom mb_3" v-if="scheduleBlockDetail.timeSetting.repeat.typeRepeat === 'Tùy chỉnh'">
      <div class="option--custom-wrap d_inline_flex">
        <div class="item"
             @click.prevent="chooseDaysRepeat(index)"
             :class="[
                scheduleBlockDetail.timeSetting.repeat.valueRepeat
                  .split(',')
                  .includes(index.toString())
                  ? 'active'
                  : ''
              ]"
             v-for="( item, index ) in $t('chat.broadcast.main.scripts.timer.options')"
             :key="index"
        >
          {{ item }}
        </div>
      </div>
    </div>
    <!-- End: Repeat custom option-->
  </div>
  <!--End Section option hours-->
</template>

<script src="./index.script.js"></script>

<style lang="scss" scoped>
@import "index.style";
</style>
