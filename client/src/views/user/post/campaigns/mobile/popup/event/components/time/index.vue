<template>
  <div class="time">
    <div class="content">
      <div class="header mb_2 d_flex align_items_center">
        <div @click="closePopup">
          <icon-base
            icon-name="arrow-down"
            class="arrow-down"
            width="20"
            height="20"
            viewBox="0 0 130 130"
          >
            <icon-arrow-down />
          </icon-base>
        </div>
        <p class="name--modal mb_0 m_auto">Chọn thời gian</p>
        <div class="active mr_3">Xong</div>
      </div>
      <div class="body px_2">
        <div class="date mb_2 d_flex align_items_center">
          <div class="desc mr_3">Bắt đầu:</div>
          <time-picker v-if="event.type_event === 0" :value="time" @change="changeTimeSetup" />
        </div>
        <div class="day mb_2 d_flex align_items_center">
          <div class="desc mr_3">Ngày:</div>
          <date-picker
            :value="event.started_at"
            class="ml_3"
            format="DD/MM/YYYY"
            @change="changeDateSetup( $event )"
          />
        </div>
        <!-- <div class="break d_flex align_items_center" v-if="event.type_event === 0"> -->
        <div class="break mb_2 d_flex align_items_center">
          <div class="desc mr_3">Chờ giữa các lần đăng:</div>
          <div class="item d_flex align_items_center mr_2">
            <input
              class="input--time mr_2"
              type="number"
              min="5"
              v-model="event.break_point"
              @input="changeTimeWaitDefault()"
            />
            <span>{{ timeDescDefault }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const currentTimeStamp = new Date();
export default {
  data() {
    return {
      disabledDates: {
        to: new Date(
          currentTimeStamp.getFullYear(),
          currentTimeStamp.getMonth(),
          currentTimeStamp.getDate()
        ) // Disable all dates up to specific date
      },
      timeDescDefault: "phút",
      currrentDefault: new Date()
    };
  },
  computed: {
    event() {
      return this.$store.getters.event;
    },
    time() {
      return {
        HH: String(new Date(this.event.started_at).getHours()).padStart(2, 0),
        mm: String(new Date(this.event.started_at).getMinutes()).padStart(2, 0)
      };
    }
  },
  methods: {
    closePopup() {
      this.$emit("closePopup", false);
    },
    changeTimeSetup(value) {
      this.$store.dispatch("setEvent", {
        key: "started_at",
        value: new Date(
          new Date(this.event.started_at).getFullYear(),
          new Date(this.event.started_at).getMonth(),
          new Date(this.event.started_at).getDate(),
          value.HH,
          value.mm,
          0
        )
      });
    },
    changeDateSetup(value) {
      this.$store.dispatch("setEvent", {
        key: "started_at",
        value: new Date(
          new Date(value).getFullYear(),
          new Date(value).getMonth(),
          new Date(value).getDate(),
          new Date(this.event.started_at).getHours(),
          new Date(this.event.started_at).getMinutes(),
          0
        )
      });
    },
    changeTimeWaitDefault() {
      this.$store.dispatch("setEvent", {
        key: "break_point",
        value: this.event.break_point
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.time {
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background: #2f3136;
  color: #ccc;
  z-index: 10;
  font-size: 0.875rem;
  .header {
    padding: 0.625rem 0;
    border-bottom: 1px solid #ccc;

    .arrow-down {
      transform: rotate(90deg);
      margin-left: 0.5rem;
    }
  }
  .body {
    .break {
      .input--time {
        background-color: #ffffff;
        border: none;
        border-radius: 0.625rem;
        height: 40px;
        padding-left: 10px;
        text-align: center;
        width: 60px;
        &:hover,
        &:active,
        &:visited,
        &:focus {
          box-shadow: none;
          outline: 0;
        }
      }
    }
  }
}
</style>
