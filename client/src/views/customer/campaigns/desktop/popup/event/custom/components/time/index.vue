<template>
  <div class="time">
    <div class="header mb_2">
      <!-- Start: Title header -->
      <div class="title mr_2 d_flex align_items_center">
        <icon-base
          class="icon--sort-down"
          icon="icon--sort-down"
          width="14px"
          heigh="5px"
          viewBox="0 0 14 14"
        >
          <icon-sort-down></icon-sort-down>
        </icon-base>
        <span>Tùy chỉnh thời gian</span>
      </div>
      <!-- End: Title header -->
    </div>
    <div class="body">
      <div class="date d_flex align_items_center mb_3">
        <div class="desc mr_3">Thời gian bắt đầu sự kiện:</div>
        <time-picker
          :value.sync="time"
          @change="changeTimeSetup"
        />
        <date-picker
          v-model="event.started_at"
          class="ml_3"
          @change="changeDateSetup"
        />
      </div>
      <div class="break d_flex align_items_center">
        <div class="desc mr_3">Thời gian chờ giữa các lần gửi:</div>
        <div class="item d_flex align_items_center mr_2">
          <input class="input--time" type="number" min="5" v-model="timeNumberDefault" />
        </div>
        <div class="item d_flex align_items_center">
          <input class="input--time" type="text" v-model="timeDescDefault" readonly />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const currentTimeStamp = new Date();
import DateFunction from "@/utils/functions/date";
export default {
  data() {
    return {
      disabledDates: {
        to: new Date(currentTimeStamp.getFullYear(), currentTimeStamp.getMonth(), currentTimeStamp.getDate()) // Disable all dates up to specific date
      },
      timeNumberDefault: 15,
      timeDescDefault: "Phút",
      currrentDefault: new Date()
    }
  },
  computed: {
    event() {
      return this.$store.getters.event;
    },
    time() {
      return {
        HH: ( new Date( this.event.started_at ) ).getHours(),
        mm: ( new Date( this.event.started_at ) ).getMinutes()
      }
    }
  },
  methods: {
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
    }
  },
}
</script>

<style lang="scss" scoped>
.time {
  .header {
    .title {
      span {
        font-weight: 600;
      }
    }
  }
  .body {
    .break {
      .input--time {
        background-color: #ffffff;
        width: 80px;
        height: 38px;
        border: none;
        border-radius: calc(.5rem + 2px);
        text-align: center;
        &:hover, &:active, &:visited, &:focus {
          box-shadow: none;
          outline: 0;
        }
      }
    }
  }
}
</style>
