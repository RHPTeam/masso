<template>
  <!--Section option hours-->
  <div class="timer--wrapper" :data-theme="currentTheme" >
    <div class="title mb_2">Thời gian chờ giữa các lần đăng <i class="note">(ít nhất 5 phút)</i></div>
    <div class="align_items_center justify_content_between">
      <!-- Start: Input Group -->
      <div class="input--group">
        <!-- Start: Input -->
        <div class="input--item">
          <div class="d_flex align_items_center mb_3">
            <div class="desc mr_3">Bắt đầu:</div>
            <input
              type="text"
              :class="inputTimeInvalid ? 'error' : null"
              placeholder="hh:mm"
              title="Time Picker"
              v-model="timeStartedAt"
              v-click-outside="resetTimeStartedAt"
            >
          </div>
          <div class="d_flex align_items_center mb_3">
            <div class="desc mr_3">Ngày:</div>
            <date-picker
            :value="postSchedule.started_at"
            class="ml_3 mr_2"
            format="DD/MM/YYYY"
            @change="changeDateSetup( $event )"
          />
          </div>
          <div class="d_flex align_items_center">
            <div class="desc mr_3">Thời gian chờ giữa các lần đăng:</div>
            <input
            class="text_center mr_2"
            type="number"
            min="5"
            v-model="postSchedule.breakPoint"
            @input="updatePostSchedule"
          >
          <span class="unit">phút</span>
          </div>
        </div>
        <!-- End: Input -->
      </div>
      <!-- End: Input Group -->
      <!-- Start: Information -->
      <div class="information d_flex align_items_center mt_3">
        <div class="information--text mr_2">
          <i>Để tránh sự cố tiêu chuẩn cộng đồng trên facebook bạn nên xét thời gian giữa các lần đăng cho hợp lý</i>
        </div>
      </div>
      <!-- End: Information -->
    </div>
    <!-- Start: Modal Show Alert Error Break Poin -->
    <app-alert
      v-if="isShowAlertBreakPoin === true"
      @closeAlert="isShowAlertBreakPoin = $event"
    />
    <!-- End: Modal Show Alert Error Break Poin -->
  </div>
  <!--End Section option hours-->
</template>

<script>
import AppAlert from "../alert";
export default {
  components: {
    AppAlert
  },
  props: [ "postSchedule" ],
  data() {
    return {
      isShowAlertBreakPoin: false,
      inputTimeInvalid: false,
      timeStartedAt: "12:00",
      currrentDefault: new Date(),
    }
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  watch: {
    "timeStartedAt"( value ) {
      const regexTime = new RegExp( "^(0[0-9]|1[0-9]|2[0-3]|[0-9]):[0-5][0-9]$" );
      this.inputTimeInvalid = !regexTime.test(value.toLowerCase());
    }
  },
  created(){
    const dateTime = new Date( this.postSchedule.started_at ),
          hour = String( dateTime.getHours() ).padStart( 2, "0" ),
          min = String( dateTime.getMinutes() ).padStart( 2, "0" );

    this.timeStartedAt = `${ hour }:${ min }`;
  },
  methods: {
    updatePostSchedule() {
      this.$emit( "updatePostSchedule", this.postSchedule );
    },
    changeDateSetup(value){
      const hours  = this.timeStartedAt.slice(0,2),
            minutes  = this.timeStartedAt.slice(3,5);

      this.postSchedule.started_at = new Date(
        ( new Date( value ) ).getFullYear(),
        ( new Date( value ) ).getMonth(),
        ( new Date( value ) ).getDate(),
        parseInt(hours),
        parseInt(minutes),
        0 );
    },
    resetTimeStartedAt() {
      //Validate timeStartedAt, in case of invalid, set value is 12:00.
      const regexTime = new RegExp( "^(0[0-9]|1[0-9]|2[0-3]|[0-9]):[0-5][0-9]$" );
      if ( !regexTime.test( this.timeStartedAt.toLowerCase() ) ) {
        this.timeStartedAt = "12:00";
      }

      const hours  = this.timeStartedAt.slice(0,2),
            minutes  = this.timeStartedAt.slice(3,5);

      this.postSchedule.started_at = new Date(
        ( new Date( this.postSchedule.started_at ) ).getFullYear(),
        ( new Date( this.postSchedule.started_at ) ).getMonth(),
        ( new Date( this.postSchedule.started_at ) ).getDate(),
        parseInt(hours),
        parseInt(minutes),
        0 );
    },
  }
};
</script>
<style lang="scss" scoped>
@import "./index.style";
</style>

