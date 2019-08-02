<template>
  <div class="section mt_3">
    <!-- Start: Started At -->
    <div class="section--block d_flex align_items_center mb_2">
      <div class="section--title mr_2">Bắt đầu:</div>
      <div class="section--body">
        <div class="box time position_relative" title="Setup date time">
          <div class="box--detail" @click.prevent="isShowChangeStartedAtPopup = true">{{ formatTime( event.started_at ) }}</div>
          <!-- Start: Change Started At Popup -->
          <transition name="popup">
            <div class="popup" v-if="isShowChangeStartedAtPopup === true">
              <!-- Start: Popup Header -->
              <div class="popup--header position_relative mx_3 pt_2">
                <div class="popup--title text_center mt_1">Thay đổi thời gian bắt đầu</div>
                <div class="btn--close position_absolute"
                      @click.prevent="isShowChangeStartedAtPopup = false"
                >
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
                      <input type="text"
                              :class="inputDateInvalid ? 'error' : null"
                              placeholder="dd/mm/yyyy"
                              title="Date Picker"
                              v-model="dateStartedAt"
                              @input="changeStartedAtForDatePicker"
                              v-click-outside="resetDateStartedAt"
                      >
                    </div>
                    <div class="col time">
                      <div class="col--title mb_2">Thời gian</div>
                      <input type="text"
                              :class="inputTimeInvalid ? 'error' : null"
                              placeholder="hh:mm"
                              title="Time Picker"
                              v-model="timeStartedAt"
                              v-click-outside="resetTimeStartedAt"
                      >
                    </div>
                  </div>
                </div>
                <!--End: Date Input Time-->

                <!--Start: Calendar Picker-->
                <div class="date picker mt_3">
                  <date-picker-inline :inline="true" v-model="dateStartedAtDatePicker" @input="changeStartedAt" />
                </div>
                <!--End: Calendar Picker-->
              </div>
              <!-- End: Popup Body -->
              <!-- Start: Popup Footer -->
              <div class="popup--footer mx_3 mt_2">
                <div class="d_flex">
                  <button class="btn btn_success save" @click="updateEventStartedAt">Lưu</button>
                </div>
              </div>
              <!-- End: Popup Footer -->
            </div>
          </transition>
          <!-- End: Change Started At Popup -->
        </div>
      </div>
    </div>
    <!-- End: Started At -->
    <!-- Start: Waiting Time -->
    <div class="section--block d_flex align_items_center">
      <div class="section--title mr_2">Chờ giữa các lần đăng:</div>
      <div class="section--body">
        <div class="box">
          <div class="form--group d_flex align_items_center">
            <input
              class="form--control text_center mr_2"
              :class="{ error: breakPointError }"
              type="text"
              v-model="event.break_point"
              @input="changeTimeWaitDefault()"
            >
            <div class="unit">phút</div>
          </div>
        </div>
      </div>
    </div>
    <!-- End: Waiting Time -->
    <!-- Start: Modal Show Alert Error Break Poin -->
    <transition name="popup">
      <app-alert
        v-if="isShowAlertBreakPoint === true"
        @closeAlert="isShowAlertBreakPoint = $event"
      ></app-alert>
    </transition>
    <!-- End: Modal Show Alert Error Break Poin -->
  </div>
</template>

<script src="./index.script.js"></script>

<style scoped lang="scss">
@import "./index.style";
</style>
