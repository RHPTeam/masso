<template>
  <div class="time">
    <div class="header mb_3">
      <div class="title">Tùy chỉnh thời gian đăng bài</div>
    </div>
    <div class="body d_flex align_items_center">
      <div class="date d_flex align_items_center mr_5">
        <div class="desc mr_3">Bắt đầu:</div>
        <time-picker
          theme="dark"
          v-if="event.type_event === 0"
          :value="time"
          @change="changeTimeSetup"
        />
        <date-picker
          :value="event.started_at"
          class="ml_3"
          format="DD/MM/YYYY"
          @change="changeDateSetup( $event )"
        />
      </div>
      <div class="break d_flex align_items_center" v-if="event.type_event === 0">
        <div class="desc mr_3">Chờ giữa các lần đăng:</div>
        <div class="item d_flex align_items_center mr_2">
          <input
            class="input--time mr_2"
            title="dark"
            type="number"
            min="5"
            v-model="event.break_point"
            @input="changeTimeWaitDefault()"
          />
          <span>{{ timeDescDefault }}</span>
        </div>
      </div>
    </div>
    <!-- Start: Modal Show Alert Error Break Poin -->
    <app-alert
      v-if="isShowAlertBreakPoin === true"
      @closeAlert="isShowAlertBreakPoin = $event"
    />
    <!-- End: Modal Show Alert Error Break Poin -->
  </div>
</template>

<script>
import AppAlert from "../alert";

const currentTimeStamp = new Date();
export default {
  components: {
    AppAlert
  },
  data() {
    return {
      disabledDates: {
        to: new Date(currentTimeStamp.getFullYear(), currentTimeStamp.getMonth(), currentTimeStamp.getDate()) // Disable all dates up to specific date
      },
      timeDescDefault: "phút",
      currrentDefault: new Date(),
      isShowAlertBreakPoin: false
    }
  },
  computed: {
    event() {
      return this.$store.getters.event;
    },
    time() {
      return {
        HH: String( ( new Date( this.event.started_at ) ).getHours() ).padStart( 2, 0 ),
        mm: String( ( new Date( this.event.started_at ) ).getMinutes() ).padStart( 2, 0 )
      }
    }
  },
  watch: {
    "event.break_point"(value){
      if(value < 5) {
        this.isShowAlertBreakPoin = true;
      }
    }
  },
  methods: {
    close(){
      this.$emit("close", false);
    },
    changeTimeSetup( value ) {
      this.$store.dispatch( "setEvent", {
        key: "started_at",
        value: new Date( ( new Date( this.event.started_at ) ).getFullYear(), ( new Date( this.event.started_at ) ).getMonth(), ( new Date( this.event.started_at ) ).getDate(), value.HH, value.mm, 0 )
      } )
    },
    changeDateSetup( value ) {
      this.$store.dispatch( "setEvent", {
        key: "started_at",
        value: new Date(
          ( new Date( value ) ).getFullYear(),
          ( new Date( value ) ).getMonth(),
          ( new Date( value ) ).getDate(),
          ( new Date( this.event.started_at ) ).getHours(),
          ( new Date( this.event.started_at ) ).getMinutes(),
          0 )
      } )
    },
    changeTimeWaitDefault() {
      this.$store.dispatch( "setEvent", {
        key: "break_point",
        value: this.event.break_point
      } );
    }
  },
}
</script>

<style lang="scss" scoped>
.time {
  .header {
    .title {
      color: #ccc;
      font-weight: 600;
      span {
        font-weight: 600;
      }
    }
  }
  .body {
    .date {
      width: 100%;
    }
    .break {
      width: 100%;
      .input--time {
        background-color: #ffffff;
        border: none;
        border-radius: .625rem;
        height: 40px;
        padding-left: 10px;
        text-align: center;
        width: 60px;
        &[title="dark"] {
          background-color: #2f3136;
          border: 1px solid #444;
          color: #F7F7F7;
        }
        &:hover, &:active, &:visited, &:focus {
          box-shadow: none;
          outline: 0;
        }
      }
    }
  }
  .bottom {
    border-top: 1px solid #e4e4e4;
    label {
      border: 1px solid #e4e4e4;
      border-radius: .625rem;
      cursor: pointer;
      padding: .5rem 1rem;
    }
  }
}
</style>
