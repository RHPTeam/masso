<template>
  <div class="popup">
    <!-- Start: Popup Header -->
    <div class="popup--header position_relative mx_3 pt_2">
      <div class="popup--title text_center mt_1">Chọn thời gian bắt đầu</div>
      <div class="btn--close position_absolute" @click.prevent="isShowChangeStartedAtPopup = false">
        <icon-base
          class="icon--close"
          icon--name="Hủy"
          height="12px"
          width="12px"
          viewBox="0 0 20 20"
        >
          <icon-close></icon-close>
        </icon-base>
      </div>
    </div>
    <!-- End: Popup Header -->
    <!-- Start: Popup Body -->
    <div class="popup--body mx_3">
      <!--Start: Date Input Time-->
      <div class="input">
        <div class="row d_flex">
          <div class="col date">
            <div class="col--title mb_2">Ngày</div>
            <input
              type="text"
              :class="inputDateInvalid ? 'error' : null"
              placeholder="dd/mm/yyyy"
              title="Date Picker"
              v-model="dateStartedAt"
              @input="changeStartedAtForDatePicker"
              v-click-outside="resetDateStartedAt"
            />
          </div>
          <div class="col time">
            <div class="col--title mb_2">Thời gian</div>
            <input
              type="text"
              :class="inputTimeInvalid ? 'error' : null"
              placeholder="HH:mm"
              title="Time Picker"
              v-model="timeStartedAt"
              v-click-outside="resetTimeStartedAt"
            />
          </div>
        </div>
      </div>
      <!--End: Date Input Time-->

      <!--Start: Calendar Picker-->
      <div class="date picker mt_3">
        <date-picker-inline
          :inline="true"
          v-model="dateStartedAtDatePicker"
          @input="changeStartedAt"
        />
      </div>
      <!--End: Calendar Picker-->
    </div>
    <!-- End: Popup Body -->
  </div>
</template>

<script src="./index.script.js"></script>

<style scoped lang="scss">
@import "./index.style";
</style>
